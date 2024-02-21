package com.example.QuanLyNhaXe.dto;

import java.util.Date;

import lombok.Data;

@Data
public class DriverDTO {
	private Integer driverId;
	private String idCard;
	private String address;
	private String img;
	private Date beginWorkDate;
	private String licenseNumber;
	private Date issueDate;


}
