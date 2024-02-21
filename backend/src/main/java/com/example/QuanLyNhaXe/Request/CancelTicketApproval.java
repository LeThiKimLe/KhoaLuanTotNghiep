package com.example.QuanLyNhaXe.Request;

import lombok.Data;

@Data
public class CancelTicketApproval {
	private Integer cancelRequestId;
	private Boolean approved;

}
