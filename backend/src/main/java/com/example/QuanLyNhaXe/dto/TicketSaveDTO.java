package com.example.QuanLyNhaXe.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class TicketSaveDTO {
	
	private Integer id;
	private Date fromDate;
	private Date toDate;
	private double ticketSales;
	private double profit;

}
