package com.example.QuanLyNhaXe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StopStationDTO {
	
	private Integer id;
	private float arrivalTime;
	private String stationType;
	private StationDTO station;
	private boolean isActive;

}