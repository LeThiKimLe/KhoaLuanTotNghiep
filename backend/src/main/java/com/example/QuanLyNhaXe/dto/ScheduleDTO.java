package com.example.QuanLyNhaXe.dto;

import java.sql.Time;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDTO {
	
	private Integer id;
	private Date departDate;
	private Time departTime;
	private Integer ticketPrice;
	private Time finishTime;
	private Integer availability;
	private String note;
	private UserDTO driverUser;
	private UserDTO driverUser2;
	private BusDTO bus;
	private List<TicketTripDTO> tickets;
	
}