package com.example.QuanLyNhaXe.Request;

import lombok.Data;

@Data
public class EditBookingDTO {
	
	private String bookingCode;
	private String name;
	private String tel;
	private Integer pickStationId;
	private Integer dropStationId;

}
