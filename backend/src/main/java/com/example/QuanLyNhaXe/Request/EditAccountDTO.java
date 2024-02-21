package com.example.QuanLyNhaXe.Request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EditAccountDTO {
	@NotEmpty(message = "Số điện thoại không được để trống")
	private String tel;
	@NotEmpty(message = "Tên không được để trống")
	private String name;
	@Email(message = "Email không hợp lệ")
	private String email;
	@NotEmpty(message = "Địa chỉ không được để trống")
	private String address;
	private Boolean gender;
	private MultipartFile file;
}
