package com.example.QuanLyNhaXe.dto;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatisTicForMonth {

	List<StatisticOneDay> statisticForDays;

	@Data
	@Builder
	public static class StatisticOneDay {
		private LocalDate date;
		private Integer tickets;
		private long revenue;
	}

}
