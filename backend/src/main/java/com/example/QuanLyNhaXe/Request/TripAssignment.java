package com.example.QuanLyNhaXe.Request;

import java.util.List;

import lombok.Data;

@Data
public class TripAssignment {
	private Integer tripId;
	private List<Integer> busId;
	private List<Integer> driverId;
}
