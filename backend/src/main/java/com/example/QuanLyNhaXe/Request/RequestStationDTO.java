package com.example.QuanLyNhaXe.Request;

import java.math.BigDecimal;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestStationDTO {

	private Integer locationId;
	List<StationOfLocation> stationOfLocations;
	@Data
	public static class StationOfLocation{
		private String name;
		private String address;
		private BigDecimal latitude;
		private BigDecimal longitude;
	}
	

}
