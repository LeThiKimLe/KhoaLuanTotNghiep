package com.example.QuanLyNhaXe.Request;

import org.springframework.web.multipart.MultipartFile;

import com.example.QuanLyNhaXe.model.SeatMap;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class CreateBusType {
	private String name;
	private Integer capacity;
	private Integer fee;
	private String description;
	private Integer seatMapId;
	private MultipartFile image;
	private boolean wifi;
	private boolean water;
	private boolean coolTissue;
	private boolean phoneCharge;
	private boolean blanket;
	private boolean pillow;
	private boolean breakingHammer;
	private boolean conditioner;
	private boolean toilet;
	private boolean readingLight;
	private boolean curtain;
	private boolean tiviLed;
}
