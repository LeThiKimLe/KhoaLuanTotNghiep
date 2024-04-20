package com.example.QuanLyNhaXe.Request;

import lombok.Data;

@Data
public class EditTrip {
	private Integer tripId;
	private Integer price;
	private String schedule;
	private Integer busTypeId;

}
