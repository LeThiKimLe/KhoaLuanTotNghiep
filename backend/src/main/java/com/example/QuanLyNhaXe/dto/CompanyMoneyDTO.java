package com.example.QuanLyNhaXe.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyMoneyDTO {
	private BusCompanyDTO busCompany;
	private long ticketMoney;

}
