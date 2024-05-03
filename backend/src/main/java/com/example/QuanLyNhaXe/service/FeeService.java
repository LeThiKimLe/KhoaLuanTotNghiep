package com.example.QuanLyNhaXe.service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.QuanLyNhaXe.Request.PaymentServiceFee;
import com.example.QuanLyNhaXe.dto.ServiceFeeDTO;
import com.example.QuanLyNhaXe.enumration.TicketState;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Admin;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.ServiceFee;
import com.example.QuanLyNhaXe.model.SystemTransaction;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.AdminRepository;
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.RouteAssignRepository;
import com.example.QuanLyNhaXe.repository.ServiceFeeRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeeService {
	
	private Integer feeOneDay=34000;
	private final RouteAssignRepository routeAssignRepository;
	private final BusCompanyRepository busCompanyRepository;
	private final UtilityService utilityService;
	private final ModelMapper modelMapper;
	private final EmailService emailService;
	private final AdminRepository adminRepository;
	private final ServiceFeeRepository feeRepository;
	private final VNPayService vnPayService;
	private final SystemTransactionService systemTransactionService;

	
	public ServiceFeeDTO createServiceFee(Integer companyId) {
		BusCompany busCompany=busCompanyRepository.findById(companyId)
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		
		String orderId = utilityService.getRandomNumber(8);
		
		Integer routeTotal=routeAssignRepository.countBybusCompanyId(companyId);
		
		LocalDate dueDate=utilityService.addDays(busCompany.getCoopDay(), 15);
		long days=utilityService.countDaysToEndOfMonth(dueDate);
		double fee=routeTotal*feeOneDay*days;
		ServiceFee serviceFee=ServiceFee.builder().fee(fee).feeCode(orderId).status(TicketState.PENDING_PAYMENT.getLabel()).busCompany(busCompany).dueDate(dueDate).build();
		feeRepository.save(serviceFee);
		return modelMapper.map(serviceFee, ServiceFeeDTO.class);
				
		
	}
	
	public Object  sendNotificationForFee(Integer companyId) {
		BusCompany busCompany=busCompanyRepository.findById(companyId)
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		
		Admin admin=adminRepository.findById(busCompany.getAdminId())
				.orElseThrow(() -> new NotFoundException(Message.USER_NOT_FOUND));
		User user=admin.getStaff().getUser();
		ServiceFeeDTO serviceFeeDTO=createServiceFee(companyId);
		if (emailService.checkEmail(user.getEmail())){
			emailService.sendNotification(busCompany, user, serviceFeeDTO.getFee());
		}
		else {
			throw new BadRequestException("Yêu cầu không hợp lệ. Email không tồn tại");
		}
		return new ResponseMessage("Gửi thông báo thành công");
		
	}
	
	public Object paymentServiceFee(Integer feeId, HttpServletRequest request) {
		
		ServiceFee serviceFee=feeRepository.findById(feeId)
				.orElseThrow(() -> new NotFoundException(Message.FEE_NOT_FOUND));
		try {
			int fee = (int)serviceFee.getFee(); 
			String paymentURL = vnPayService.generatePaymentUrl(request, fee, serviceFee.getFeeCode(), serviceFee.getId().toString());

			return paymentURL;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			throw new BadRequestException("Có lỗi xảy ra trong quá trình thanh toán");
		}	

	}
	
	
	public ServiceFee createDdefaultFee(LocalDate day, Integer companyId) {
		Integer routeTotal=routeAssignRepository.countBybusCompanyId(companyId);
		 LocalDate nextMonthFirstDay = day.plusMonths(1).withDayOfMonth(1);
		 LocalDate dueDate=nextMonthFirstDay.withDayOfMonth(5);
		 int lastDayOfMonth = nextMonthFirstDay.lengthOfMonth();
		 double fee=routeTotal*feeOneDay*lastDayOfMonth;
		BusCompany busCompany=busCompanyRepository.findById(companyId)
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		String orderId = utilityService.getRandomNumber(8);
		ServiceFee serviceFee=ServiceFee.builder().fee(fee).feeCode(orderId).status(TicketState.PENDING_PAYMENT.getLabel()).busCompany(busCompany).dueDate(dueDate).build();
		feeRepository.save(serviceFee);
		return serviceFee;
		
	}
	 
	@Transactional
	public Object updateServiceFee(PaymentServiceFee paymentServiceFee) {
		
		ServiceFee serviceFee=feeRepository.findById(paymentServiceFee.getFeeServiceId())
				.orElseThrow(() -> new NotFoundException(Message.FEE_NOT_FOUND));
		
		try {
			SystemTransaction transaction=systemTransactionService.createSysTransaction(paymentServiceFee, serviceFee.getFee());
			serviceFee.setStatus(TicketState.PAID.getLabel());
			serviceFee.setSystemTransaction(transaction);
			feeRepository.save(serviceFee);
			ServiceFee newFee=createDdefaultFee(serviceFee.getDueDate(), serviceFee.getBusCompany().getId());
			return modelMapper.map(newFee,ServiceFeeDTO.class);
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new BadRequestException("Lỗi trong xử lý dữ liệu");
		}
		
		
	}

}
