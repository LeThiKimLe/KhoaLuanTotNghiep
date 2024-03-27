package com.example.QuanLyNhaXe.dto;

import java.sql.Time;

import lombok.Data;

@Data
public class FixedScheduleDTO {
	private Integer tripId;
	private Time time;
	private Integer dayOfWeek;
	private TripDTO trip;

}
