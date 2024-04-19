package com.example.QuanLyNhaXe.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ServiceFeeDTO {
	private Integer id;
	private String status;
	private double fee;
	private LocalDate dueDate;

}
