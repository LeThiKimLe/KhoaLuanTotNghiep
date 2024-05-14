package com.example.QuanLyNhaXe.dto;

import java.util.List;

import com.example.QuanLyNhaXe.enumration.BusAvailability;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BusTypeDTO {
	private Integer id;
	private String name;
	private Integer capacity;
	private Integer fee;
	private String description;
	private String image;
	private SeatMapDTO seatMap;
	private Integer busCompanyId;

}
