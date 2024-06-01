package com.example.QuanLyNhaXe.dto;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleTicketsDTO {
	private Integer id;
	private Date departDate;
	private Time departTime;
	private Integer ticketPrice;
	private LocalDateTime finishTime;
	private Integer availability;
	private String note;
	private BusDTO bus;
	private String state;
	private String currentStation;

}
