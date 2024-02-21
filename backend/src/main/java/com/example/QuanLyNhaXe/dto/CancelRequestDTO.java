package com.example.QuanLyNhaXe.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CancelRequestDTO {

	private Integer id;
	private PolicyDTO policy;
	private LocalDateTime requestTime;
	private String state;
	private List<TicKetFullDTO> tickets;
	private StaffDTO staff;
}
