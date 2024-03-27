package com.example.QuanLyNhaXe.Request;

import java.sql.Time;
import java.util.List;

import lombok.Data;

@Data
public class CreateFixedSchedule {
	private Integer tripId;
	private List<Time> times;
	private List<Integer> dayOfWeeks;

}
