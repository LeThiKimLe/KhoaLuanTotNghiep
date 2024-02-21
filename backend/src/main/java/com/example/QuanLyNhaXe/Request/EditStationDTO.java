package com.example.QuanLyNhaXe.Request;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class EditStationDTO {

	private Integer id;
	private String name;
	private String address;
	private BigDecimal latitude;
	private BigDecimal longitude;

}
