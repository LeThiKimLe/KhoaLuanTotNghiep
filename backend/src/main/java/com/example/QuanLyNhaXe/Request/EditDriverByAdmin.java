package com.example.QuanLyNhaXe.Request;

import java.sql.Date;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EditDriverByAdmin {
	
	@NotNull(message = "Mã tài xế không được để trống")
	private Integer driverId;
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
	@NotEmpty(message = "Số giấy phép  không được để trống")
	private String licenseNumber;
	@NotNull(message = "Ngày phát hành giấy phép không được để trống")
	private Date issueDate;
	private MultipartFile file;

}
