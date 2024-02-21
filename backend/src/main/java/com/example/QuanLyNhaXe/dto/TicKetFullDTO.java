package com.example.QuanLyNhaXe.dto;

import java.util.List;

import com.example.QuanLyNhaXe.model.Bill;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class TicKetFullDTO {
	
	private Integer id;
	private String seat;
	private String state;
	private Integer ticketPrice;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private BillDTO bill;
	private boolean checkedIn;
	private BookingDTO booking;
	private List<HistoryDTO> histories;
    private ScheduleTicketsDTO schedule;

}

