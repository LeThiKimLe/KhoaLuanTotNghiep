package com.example.QuanLyNhaXe.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;
@Builder
@Data
public class TripBusDriver {
	
	private List<UserDTO> drivers;
	private List<BusDTO> buses;

}
