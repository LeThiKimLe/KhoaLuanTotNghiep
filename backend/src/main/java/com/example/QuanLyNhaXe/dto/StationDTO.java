package com.example.QuanLyNhaXe.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class StationDTO {
	
	 private Integer id;
	 private String name;
	 private String address;
	 @JsonInclude(JsonInclude.Include.NON_NULL)
	 private LocationDTO location;
	 private BigDecimal latitude;
	 private BigDecimal longitude;
	 private boolean isActive;
	 private Integer busCompanyId;

}