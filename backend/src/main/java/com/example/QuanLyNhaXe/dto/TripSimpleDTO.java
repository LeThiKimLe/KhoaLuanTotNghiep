package com.example.QuanLyNhaXe.dto;

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
	private BusTypeDTO busType;
	private Integer price;
	private String schedule;
	private Integer busCompanyId;
	private boolean isActive;
	

}
