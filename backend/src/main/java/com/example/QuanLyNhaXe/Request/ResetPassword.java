package com.example.QuanLyNhaXe.Request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ResetPassword {
	private String tel;
	private String otp;

}
