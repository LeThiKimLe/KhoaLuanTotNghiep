package com.example.QuanLyNhaXe.Request;

import lombok.Data;

@Data
public class EditStopStation {
	private Integer stopStationId;
	private Integer tripId;
	private Integer stationId;
	private String stationType;
	private float arrivalTime;

}
