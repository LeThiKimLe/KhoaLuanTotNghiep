package com.example.QuanLyNhaXe.dto;

import java.time.LocalDate;

import com.example.QuanLyNhaXe.model.SystemTransaction;

import lombok.Data;

@Data
public class ServiceFeeDTO {
	private Integer id;
	private String status;
	private double fee;
	private LocalDate dueDate;
	private BusCompanyDTO company;
	private SystemTransactionDTO systemTransaction;
	

}
