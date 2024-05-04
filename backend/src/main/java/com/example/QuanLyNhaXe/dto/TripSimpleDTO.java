package com.example.QuanLyNhaXe.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TripSimpleDTO {
	
	private Integer id;
	private boolean turn;
	private StationDTO startStation;
	private StationDTO endStation;
	private BusCompanyDTO busCompany;
	private BusTypeDTO busType;
	private Integer price;
	private Integer distance;
	private float hours;
	private String schedule;
	private List<StopStationDTO> stopStations;
	private boolean isActive;
}
