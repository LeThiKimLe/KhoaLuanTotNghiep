package com.example.QuanLyNhaXe.Request;

import java.sql.Date;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupDriverDTO {
	@NotEmpty(message = "Số điện thoại không được để trống")
	private String tel;
	@NotEmpty(message = "Tên không được để trống")
	private String name;
	@Email(message = "Email không hợp lệ")
	private String email;
	private Boolean gender;
	@NotEmpty(message = "Định danh không được để trống")
	private String idCard;
	@NotEmpty(message = "Địa chỉ không được để trống")
	private String address;
	private String driverLicense;
	@NotNull(message = "Ngày bắt đầu công việc không được để trống")
	private Date beginWorkDate;
	@NotNull(message = "Ngày phát hành giấy phép không được để trống")
	private Date issueDate;
	@NotEmpty(message = "Số giấy phép  không được để trống")
	private String licenseNumber;

}
