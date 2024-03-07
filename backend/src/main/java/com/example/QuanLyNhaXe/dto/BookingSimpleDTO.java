package com.example.QuanLyNhaXe.dto;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingSimpleDTO {
	private String code;
	private LocalDateTime bookingDate;
	private String status;
	private String paymentURL;

}
