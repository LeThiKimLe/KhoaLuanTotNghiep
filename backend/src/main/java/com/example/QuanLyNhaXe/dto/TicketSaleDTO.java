package com.example.QuanLyNhaXe.dto;

import java.sql.Date;
import java.time.LocalDate;

import lombok.Data;

@Data
public class TicketSaleDTO {

	private Integer id;
	private LocalDate fromDate;
	private LocalDate toDate;
	private double ticketSales;
	private double profit;
	private SystemTransactionDTO systemTransaction;
}
