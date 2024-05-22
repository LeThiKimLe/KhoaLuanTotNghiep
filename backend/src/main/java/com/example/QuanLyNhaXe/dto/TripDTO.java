package com.example.QuanLyNhaXe.dto;

import java.util.List;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TripDTO {
	private Integer id;
	private boolean turn;
	private Integer price;
	private Integer distance;
	private float hours;
	private String schedule;
	private StationDTO startStation;
	private StationDTO endStation;
	private List<ScheduleDTO> schedules;
	private List<StopStationDTO> stopStations;
	private RouteDTO route;
	private BusTypeDTO busType;
	private BusCompanyDTO busCompany;
	private boolean isActive;
	private String routeCode;

}
