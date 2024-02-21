package com.example.QuanLyNhaXe.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SeatDTO {
	 private Integer id;
	 private String name;
	 private Integer row;
	 private Integer col;
	 private Integer floor;
	 

}
