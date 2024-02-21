package com.example.QuanLyNhaXe.Request;

import lombok.Data;

@Data
public class EditBusDTO {
	
	private Integer id;
	private int manufactureYear;
	private String color;
	private String licensePlate;
	private Integer typeId;
	private String availability;

}
