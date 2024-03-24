package com.example.QuanLyNhaXe.dto;


import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
@Data
public class UserDTO {
	private Integer id;
	private String name;
	private String email;
	private String tel;
	private String gender;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private AccountDTO account;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private StaffDTO staff;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private DriverDTO driver;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private CustomerDTO customer;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private SystemManagerDTO systemManager;

}
