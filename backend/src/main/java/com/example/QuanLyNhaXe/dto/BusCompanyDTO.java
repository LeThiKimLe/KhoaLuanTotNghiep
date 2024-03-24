package com.example.QuanLyNhaXe.dto;


import java.time.LocalDate;

import lombok.Data;

@Data
public class BusCompanyDTO {
	private Integer id;
	private String businessLicense;
	private String name;
	private LocalDate coopDay;
	private AdminDTO admin;
	private boolean isActive;

}
