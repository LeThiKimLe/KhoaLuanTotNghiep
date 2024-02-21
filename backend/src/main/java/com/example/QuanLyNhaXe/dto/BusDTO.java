package com.example.QuanLyNhaXe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BusDTO {

	private Integer id;
	private int manufactureYear;
	private String licensePlate;
	private String color;
	private String availability;
	private LocationDTO currentPosition;
	private BusQualityDTO state;
	private BusTypeDTO type;

	

}
