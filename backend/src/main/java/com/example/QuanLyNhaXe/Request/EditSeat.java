package com.example.QuanLyNhaXe.Request;

import lombok.Data;

@Data
public class EditSeat {
	private Integer seatId;
	private Integer rowId;
	private Integer colId;
	private Integer floorId;
	private String name;

}
