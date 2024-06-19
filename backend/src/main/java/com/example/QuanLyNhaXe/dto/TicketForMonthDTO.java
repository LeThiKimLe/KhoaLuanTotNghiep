package com.example.QuanLyNhaXe.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TicketForMonthDTO {
	BusCompanyDTO busCompany;
	List<TicKetFullDTO> ticKets;

}
