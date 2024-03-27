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
public class TripDTO {
	private Integer id;
	private boolean turn;
	private Integer price;
	private StationDTO startStation;
	private StationDTO endStation;
	private List<ScheduleDTO> schedules;
	private List<StopStationDTO> stopStations;
	private RouteDTO route;
	private BusCompanyDTO busCompany;
	private boolean isActive;

}
