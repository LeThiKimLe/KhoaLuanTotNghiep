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
public class RouteFullDTO {
	private Integer id;
	private Integer distance;
	private LocationDTO departure;
	private LocationDTO destination;
	private Integer price;
	private String schedule;
	private Integer parents;
	private float hours;
	private List<TripSimpleDTO> trips;
	private BusTypeDTO busType;
	private boolean isActive;

}
