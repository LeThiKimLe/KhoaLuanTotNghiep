package com.example.QuanLyNhaXe.service;

import java.time.LocalDate;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.dto.ServiceFeeDTO;
import com.example.QuanLyNhaXe.enumration.TicketState;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Admin;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.ServiceFee;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.AdminRepository;
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.BusQualityRepository;
import com.example.QuanLyNhaXe.repository.BusRepository;
import com.example.QuanLyNhaXe.repository.BusTypeRepository;
import com.example.QuanLyNhaXe.repository.RouteAssignRepository;
import com.example.QuanLyNhaXe.repository.SeatMapRepository;
import com.example.QuanLyNhaXe.repository.SeatRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeeService {
	
	private Integer feeOneDay=34000000;
	private final RouteAssignRepository routeAssignRepository;
	private final BusCompanyRepository busCompanyRepository;
	private final UtilityService utilityService;
	private final ModelMapper modelMapper;
	private final EmailService emailService;
	private final AdminRepository adminRepository;

	
	public ServiceFeeDTO createServiceFee(Integer companyId) {
		BusCompany busCompany=busCompanyRepository.findById(companyId)
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		
		Integer routeTotal=routeAssignRepository.countBybusCompanyId(companyId);
		
		LocalDate dueDate=utilityService.addDays(busCompany.getCoopDay(), 15);
		long days=utilityService.countDaysToEndOfMonth(dueDate);
		double fee=routeTotal*feeOneDay*days;
		ServiceFee serviceFee=ServiceFee.builder().fee(fee).status(TicketState.PENDING_PAYMENT.getLabel()).busCompany(busCompany).build();
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
		return new ResponseMessage("Gửi thông báo thành công");
		
	}

}
