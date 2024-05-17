package com.example.QuanLyNhaXe.Request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class EditBusType {
	private Integer id;
	private String name;
	private Integer capacity;
	private Integer fee;
	private String description;
	
	private Integer seatMapId;
	private MultipartFile image;

}
