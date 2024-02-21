package com.example.QuanLyNhaXe.dto;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
	private Integer id;
	private Integer rate;
	private String comment;
	private String state;	
	private UserDTO reviewer;
	private LocalDateTime sendDate;
	private TripDTO scheduleTrip;
	private ScheduleDTO schedule;

}
