package com.example.QuanLyNhaXe.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryDTO {
	 private Integer id;
	 private String action;
	 private LocalDateTime timestamp;
	 private UserDTO  user;
	 private PolicyDTO policy;
	 private TransactionDTO transaction;
	


}
