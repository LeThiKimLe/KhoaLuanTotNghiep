package com.example.QuanLyNhaXe.Request;

import lombok.Data;

@Data
public class CreateStopStation {
	private Integer tripId;
	private Integer stationId;
	private String stationType;
	private float arrivalTime;

}
