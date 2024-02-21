package com.example.QuanLyNhaXe.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MaximumScheduleDTO {
	
	private Integer  maxSchedule;
	private long driverCount;
	private long busCount;

}
