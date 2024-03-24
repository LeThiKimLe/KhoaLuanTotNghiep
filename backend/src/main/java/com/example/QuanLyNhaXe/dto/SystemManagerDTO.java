package com.example.QuanLyNhaXe.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class SystemManagerDTO {
	
	private Integer id;
	private String idCard;
	private String address;
	private String img;
	private Date beginWorkDate;

}
