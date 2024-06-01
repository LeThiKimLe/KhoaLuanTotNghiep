package com.example.QuanLyNhaXe.Request;

import java.util.List;

import lombok.Data;

@Data
public class BookingReturnTicket {
	
	private Integer ticketNumber;
	private String name;
	private String email;
	private String tel;
	private Integer tripId;
	private Integer scheduleId;
	private Integer pickStationId;
	private Integer dropStationId;
	private List<String> seatName;
	
	private Integer ticketNumberReturn;
	private Integer tripReturnId;
	private Integer scheduleReturnId;
	private Integer pickStationReturnId;
	private Integer dropStationReturnId;
	private List<String> seatNameReturn;

}
