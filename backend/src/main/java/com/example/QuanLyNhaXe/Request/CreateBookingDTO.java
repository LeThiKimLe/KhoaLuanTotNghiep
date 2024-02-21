package com.example.QuanLyNhaXe.Request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateBookingDTO {
	private Integer ticketNumber;
	private String name;
	private String email;
	private String tel;
	private Integer tripId;
	private Integer scheduleId;
	private Integer pickStationId;
	private Integer dropStationId;
	private List<String> seatName;

}
