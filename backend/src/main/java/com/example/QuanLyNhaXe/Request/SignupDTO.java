package com.example.QuanLyNhaXe.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class SignupDTO {
	@NotEmpty(message = "Số điện thoại không được để trống")
	private String tel;
	@NotEmpty(message = "Mật khẩu không được để trống")
	@Size(min = 6, max = 20, message = "Mật khẩu phải từ 6 đến 20 ký tự")
	private String password;
	@NotEmpty(message = "Tên không được để trống")
	private String name;
	@NotEmpty(message = "Email không được để trống")
	@Email(message = "Email không hợp lệ")
	private String email;
	private Boolean gender;
	private String oauthId;
}
