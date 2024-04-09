package com.example.QuanLyNhaXe.Request;

import java.util.List;

import lombok.Data;

@Data
public class CreateSeat {
	private Integer saetMapId;
	private List<SeatInfor> seatInfors;
	@Data
	public class SeatInfor{
		private Integer rowId;
		private Integer colId;
		private Integer floorId;
		private String name;
		
	}

}
