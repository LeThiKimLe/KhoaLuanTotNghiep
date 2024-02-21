package com.example.QuanLyNhaXe.dto;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatisticTripTicketsForMonth {
	
	private LocalDate date;
	List<SumTicKet> statisticTickets;
	
	
	@Data
	@Builder
	public static class SumTicKet{
		private Integer tickets;
		private Integer tripId;
		
	}

}
