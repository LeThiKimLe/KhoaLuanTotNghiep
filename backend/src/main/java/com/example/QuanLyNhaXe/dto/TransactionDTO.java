package com.example.QuanLyNhaXe.dto;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
	
	 private Integer id;
	 private String transactionType;
	 private double amount;
	 private LocalDateTime paymentTime;
	 private String referenceId;
	 private String paymentMethod;
	// private BookingSimpleDTO booking;
}
