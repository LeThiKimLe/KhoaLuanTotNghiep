package com.example.QuanLyNhaXe.Request;

import lombok.Data;

@Data
public class CreateTrip {
	private Integer routeId;
	private Integer startStationId;
	private Integer endStationId;
	private Integer price;
	private Integer companyId;

}
