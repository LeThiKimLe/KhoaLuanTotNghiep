package com.example.QuanLyNhaXe.Request;

import java.sql.Date;

import lombok.Data;

@Data
public class CreateSpecialDay {
	private Date date;
	private Integer fee;

}
