package com.example.QuanLyNhaXe.Request;

import org.springframework.web.multipart.MultipartFile;

import com.example.QuanLyNhaXe.model.SeatMap;

import lombok.Data;

@Data
public class CreateBusType {
	private String name;
	private Integer capacity;
	private Integer fee;
	private String description;
	private Integer seatMapId;
	private MultipartFile image;

}
