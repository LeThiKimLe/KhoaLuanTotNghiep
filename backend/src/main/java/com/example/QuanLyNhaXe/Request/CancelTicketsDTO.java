package com.example.QuanLyNhaXe.Request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CancelTicketsDTO {
	private String bookingCode;
	private Integer numberTicket;
	private String paymentMethod;
	private List<Integer> ticketIdList;

}
