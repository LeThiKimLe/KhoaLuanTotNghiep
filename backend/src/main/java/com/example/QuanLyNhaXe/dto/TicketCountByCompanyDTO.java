package com.example.QuanLyNhaXe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketCountByCompanyDTO {
    private BusCompanyDTO busCompany;
    private Integer count;
}
