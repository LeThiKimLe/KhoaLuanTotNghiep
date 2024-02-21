package com.example.QuanLyNhaXe.dto;

import java.time.YearMonth;
import java.util.List;

import com.example.QuanLyNhaXe.dto.StatisticTripTicketsForMonth.SumTicKet;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class StatisticTripTicketsForYear {
	
	private YearMonth month;
	List<SumTicKet> statisticTickets;

}
