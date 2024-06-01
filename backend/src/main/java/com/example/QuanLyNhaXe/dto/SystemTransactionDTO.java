package com.example.QuanLyNhaXe.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class SystemTransactionDTO {

	private Integer id;
	private String transactionType;
	private double amount;
	private LocalDateTime paymentTime;
	private String transactionNo;
	private String paymentMethod;

}
