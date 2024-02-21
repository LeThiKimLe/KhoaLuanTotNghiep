package com.example.QuanLyNhaXe.Request;



import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EditTicketDTO {
	private String bookingCode;
	private Integer pickStationId;
	private Integer dropStationId;

}
