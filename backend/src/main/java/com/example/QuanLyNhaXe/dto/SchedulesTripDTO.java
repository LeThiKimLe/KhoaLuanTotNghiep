package com.example.QuanLyNhaXe.dto;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class SchedulesTripDTO {
	private Integer id;
	private TripDTO trip;
	private Date departDate;
	private Time departTime;
	private Integer ticketPrice;
	private LocalDateTime updateTime;
	private Integer availability;
	private String note;
	private String state;
	private String currentStation;
	private UserDTO driverUser;
	private UserDTO driverUser2;
	private BusDTO bus;
	private List<TicketTripDTO> tickets;
	private TransportationOrderDTO transportationOrder;

}
