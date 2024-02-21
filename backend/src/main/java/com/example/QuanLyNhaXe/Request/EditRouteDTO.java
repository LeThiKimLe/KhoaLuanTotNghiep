package com.example.QuanLyNhaXe.Request;

import lombok.Data;

@Data
public class EditRouteDTO {
	private Integer id;
	private Integer distance;
	private Integer price;
	private String schedule;
	private Integer parents;
	private float hours;
	private Integer busType;

}
