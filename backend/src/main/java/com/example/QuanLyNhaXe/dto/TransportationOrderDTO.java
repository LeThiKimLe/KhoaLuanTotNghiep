package com.example.QuanLyNhaXe.dto;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class TransportationOrderDTO {
	private Integer id;
	private LocalDateTime createTime;
	private LocalDateTime updateTime;
	private String code;
	private String status;
	private String image;
	private ScheduleDTO schedule;
	

}
