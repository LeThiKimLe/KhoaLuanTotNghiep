package com.example.QuanLyNhaXe.Request;

import lombok.Data;

@Data
public class EditStateSchedule {
	private Integer scheduleId;
	private String state;
	private Integer stopStationId;

}
