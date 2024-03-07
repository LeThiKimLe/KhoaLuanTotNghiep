package com.example.QuanLyNhaXe.Request;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreatePaymentDTO {
	
	private String bookingCode;
	private String paymentMethod;
	private String transactionNo;
	private String transactionDate;

}
