package com.example.QuanLyNhaXe.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TripReponseDTO {
	private TripDTO trip;
	private TripDTO tripReturn;
	

}
