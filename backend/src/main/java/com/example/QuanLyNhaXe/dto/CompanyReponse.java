package com.example.QuanLyNhaXe.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyReponse {
	private BusCompanyDTO busCompany;
	private AdminDTO admin;

}
