package com.example.QuanLyNhaXe.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreatePaymentReturnTicket {
	private String bookingCode;
	private String bookingCodeReturn;
	private String paymentMethod;
	private String transactionNo;
	private String transactionDate;

}
