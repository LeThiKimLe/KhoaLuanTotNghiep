package com.example.QuanLyNhaXe.Request;

import java.util.List;

import lombok.Data;

@Data
public class CreateSeat {
	private Integer seatMapId;
	private List<SeatInfor> seatInfors;
	@Data
	public static class SeatInfor{
		private Integer rowId;
		private Integer colId;
		private Integer floorId;
		private String name;
		
	}

}
