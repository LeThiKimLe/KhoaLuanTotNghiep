package com.example.QuanLyNhaXe.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.CompanyPayment;
import com.example.QuanLyNhaXe.Request.CreatePaymentDTO;
import com.example.QuanLyNhaXe.Request.PaymentServiceFee;
import com.example.QuanLyNhaXe.dto.SystemTransactionDTO;
import com.example.QuanLyNhaXe.enumration.PaymentMethod;
import com.example.QuanLyNhaXe.enumration.TransactionType;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.SystemTransaction;
import com.example.QuanLyNhaXe.model.TicketSale;
import com.example.QuanLyNhaXe.repository.SystemTransactionRepository;
import com.example.QuanLyNhaXe.repository.TicketSaveRepository;
import com.example.QuanLyNhaXe.util.Message;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SystemTransactionService {

	private final SystemTransactionRepository systemTransactionRepository;
	private final UtilityService utilityService;
	private final TicketSaveRepository ticketSaveRepository;
	private final  ModelMapper modelMapper;

	public SystemTransaction createSysTransaction(PaymentServiceFee pay, double fee) {

		SystemTransaction systemTransaction = SystemTransaction.builder().transactionNo(pay.getTransactionNo())
				.transactionType(TransactionType.PAYMENT.getLabel())
				.paymentTime(utilityService.convertStringToDateTime(pay.getTransactionDate())).amount(fee)
				.paymentMethod(pay.getPaymentMethod()).build();
		systemTransactionRepository.save(systemTransaction);
		return systemTransaction;

	}
	
	public SystemTransaction createModelSystemTransactionForCompany( double fee ) {
		String transactionNoString=utilityService.getRandomNumber(8);
		while (systemTransactionRepository.existsByTransactionNo(transactionNoString)) {
			transactionNoString=utilityService.getRandomNumber(8);
		}
		SystemTransaction systemTransaction = SystemTransaction.builder().transactionNo(transactionNoString)
				.transactionType(TransactionType.REFUND.getLabel())
				.paymentTime(utilityService.convertHCMDateTime()).amount(fee)
				.paymentMethod(PaymentMethod.VNPAY.getLabel()).build();
		systemTransactionRepository.save(systemTransaction);
		return systemTransaction;
		
	}
	
	public Object peymentTicketsForCompany(CompanyPayment ticketSaleData) {
		Integer ticketSaleId=ticketSaleData.getTicketSaleId();
		TicketSale ticketSale=ticketSaveRepository.findById(ticketSaleId)
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		if(ticketSale.getSystemTransaction()!=null) {
			throw new BadRequestException(Message.BAD_REQUEST);
		}
		SystemTransaction systemTransaction=createModelSystemTransactionForCompany(ticketSale.getProfit());
		ticketSale.setSystemTransaction(systemTransaction);
		ticketSaveRepository.save(ticketSale);
		return modelMapper.map(systemTransaction,SystemTransactionDTO.class);
	}

}
