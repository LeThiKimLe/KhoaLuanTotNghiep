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

	private LocationDTO departure;
	private LocationDTO destination;
	private Integer parents;

	private List<TripSimpleDTO> trips;

	private boolean isActive;

}
