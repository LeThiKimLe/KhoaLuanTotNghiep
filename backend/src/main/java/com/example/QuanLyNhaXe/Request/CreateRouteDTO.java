package com.example.QuanLyNhaXe.Request;

import lombok.Data;

@Data
public class CreateRouteDTO {
	
	private Integer distance;
	private Integer departureId;
	private Integer destinationId;
	private Integer parents;
	private float hours;
	

}
