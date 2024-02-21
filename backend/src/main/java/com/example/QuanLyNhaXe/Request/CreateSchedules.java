package com.example.QuanLyNhaXe.Request;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import lombok.Data;

@Data
public class CreateSchedules {
	
	private Integer tripId;
    private Date dateSchedule;
    private Integer repeat;
    private String note;
    private List<Time> times;
   

}
