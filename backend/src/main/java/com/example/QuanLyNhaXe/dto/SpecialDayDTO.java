package com.example.QuanLyNhaXe.dto;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SpecialDayDTO {
	private Integer id;
	private Date date;
	private Integer fee;

}
