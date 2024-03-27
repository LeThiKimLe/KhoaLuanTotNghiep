package com.example.QuanLyNhaXe.dto;

import com.example.QuanLyNhaXe.model.Role;
import com.example.QuanLyNhaXe.model.User;

import lombok.Data;

@Data
public class AccountDTO {
	private Integer id;
	private String username;
	private boolean isActive;
	private String roleName;
	private String oauthId;
	
}
