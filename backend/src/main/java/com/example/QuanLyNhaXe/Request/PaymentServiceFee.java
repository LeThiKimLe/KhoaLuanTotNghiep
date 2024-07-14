package com.example.QuanLyNhaXe.Request;

import lombok.Data;

@Data
public class PaymentServiceFee {
	private Integer feeServiceId;
	private String paymentMethod;
	private String transactionNo;
	private String transactionDate;

}
