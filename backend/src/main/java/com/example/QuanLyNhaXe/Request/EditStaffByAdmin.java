package com.example.QuanLyNhaXe.Request;

import java.sql.Date;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EditStaffByAdmin {
	@NotNull(message = "Mã nhân viên không được để trống")
	private Integer staffId;
	@NotEmpty(message = "Tên không được để trống")
	private String name;
	@Email(message = "Email không hợp lệ")
	private String email;
	@NotEmpty(message = "Số điện thoại không được để trống")
	private String tel;
	private Boolean gender;
	@NotEmpty(message = "Định danh không được để trống")
	private String idCard;
	@NotEmpty(message = "TĐịa chỉ không được để trống")
	private String address;
	@NotNull(message = "Ngày bắt đầu công việc không được để trống")
	private Date beginWorkDate;
	private MultipartFile file;

}
