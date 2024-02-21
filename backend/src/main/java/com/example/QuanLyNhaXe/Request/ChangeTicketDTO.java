package com.example.QuanLyNhaXe.Request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ChangeTicketDTO {
	private String bookingCode;
	private Integer numberTicket;
	private List<TicketForChangeDTO> tickets;
	private Integer newScheduleId;
	
	

}