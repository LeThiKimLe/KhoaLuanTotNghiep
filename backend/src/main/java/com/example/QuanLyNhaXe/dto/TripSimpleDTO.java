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
	private boolean isActive;

}
