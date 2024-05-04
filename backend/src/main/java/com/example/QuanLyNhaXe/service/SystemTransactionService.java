package com.example.QuanLyNhaXe.service;

import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.PaymentServiceFee;
import com.example.QuanLyNhaXe.enumration.PaymentMethod;
import com.example.QuanLyNhaXe.enumration.TransactionType;
import com.example.QuanLyNhaXe.model.SystemTransaction;
import com.example.QuanLyNhaXe.repository.SystemTransactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SystemTransactionService {

	private final SystemTransactionRepository systemTransactionRepository;
	private final UtilityService utilityService;

	public SystemTransaction createSysTransaction(PaymentServiceFee pay, double fee) {

		SystemTransaction systemTransaction = SystemTransaction.builder().transactionNo(pay.getTransactionNo())
				.transactionType(TransactionType.PAYMENT.getLabel())
				.paymentTime(utilityService.convertStringToDateTime(pay.getTransactionDate())).amount(fee)
				.paymentMethod(PaymentMethod.VNPAY.getLabel()).build();
		systemTransactionRepository.save(systemTransaction);
		return systemTransaction;

	}

}
