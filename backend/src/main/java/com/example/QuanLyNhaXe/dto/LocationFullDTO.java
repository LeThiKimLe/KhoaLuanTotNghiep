package com.example.QuanLyNhaXe.dto;

import java.util.List;

import lombok.Data;

@Data
public class LocationFullDTO {
	
	private Integer id;
	private String name;
	private boolean isActive;
	private List<StationDTO> stations;

}
