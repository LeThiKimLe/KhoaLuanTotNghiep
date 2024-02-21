package com.example.QuanLyNhaXe.Request;



import java.sql.Date;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetTripDTO {
	
	private Integer routeId;
	private Integer availability;
	private Date departDate;
	private Boolean turn;

}
