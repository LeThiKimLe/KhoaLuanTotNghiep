package com.example.QuanLyNhaXe.dto;

import java.sql.Date;
import java.time.LocalDateTime;

import lombok.Data;

@Data

public class CompanyRouteDTO {
	private Integer busCompanyId;
	private Integer routeId;
	private LocalDateTime assignDate;
}
