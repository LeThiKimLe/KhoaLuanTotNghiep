package com.example.QuanLyNhaXe.dto;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SeatMapDTO {
	private Integer id;
	private Integer rowNo;
	private Integer colNo;
	private Integer floorNo;
	private List<SeatDTO> seats;

}
