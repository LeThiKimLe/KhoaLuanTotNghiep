package com.example.QuanLyNhaXe.dto;

import java.util.List;

import com.example.QuanLyNhaXe.model.Bill;
import com.example.QuanLyNhaXe.model.History;
import com.example.QuanLyNhaXe.model.Schedule;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketDTO {
	private Integer id;
	private String seat;
	private String state;
	private boolean checkedIn;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private BillDTO bill;
	private List<HistoryDTO> histories;
    private ScheduleTicketsDTO schedule;

}