package com.example.QuanLyNhaXe.dto;

import java.sql.Date;
import java.time.YearMonth;
import java.util.List;

import com.example.QuanLyNhaXe.dto.StatisTicForMonth.StatisticOneDay;

import lombok.Builder;
import lombok.Data;
@Builder
@Data
public class StatisticForYear {
	
	List<StatisticOneMonth> statisticFor;
	
	
	@Data
	@Builder
	public static class StatisticOneMonth {
		private YearMonth month;
		private Integer tickets;
		private long revenue;
	}

}
