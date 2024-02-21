package com.example.QuanLyNhaXe.dto;

import java.util.List;

import com.example.QuanLyNhaXe.model.History;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PolicyDTO {
	private Integer id;
	private String action;
	private float timeRequired;
	private Integer numberRequired;
	private Integer minNumberRequired;
	private float refundRate;
	private String description;

}
