package com.example.QuanLyNhaXe.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketTripDTO {
	private Integer id;
	private String seat;
	private String state;
	private Integer ticketPrice;
	private boolean checkedIn;
	private List<HistoryDTO> histories;
}
