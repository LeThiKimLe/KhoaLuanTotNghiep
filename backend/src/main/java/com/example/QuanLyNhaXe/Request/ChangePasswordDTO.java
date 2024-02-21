package com.example.QuanLyNhaXe.Request;

import lombok.Data;

@Data
public class ChangePasswordDTO {
	private String oldPassword;
	private String newPassword;

}
