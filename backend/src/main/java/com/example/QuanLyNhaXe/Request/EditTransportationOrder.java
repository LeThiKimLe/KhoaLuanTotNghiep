package com.example.QuanLyNhaXe.Request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class EditTransportationOrder {
	private Integer id;
	private String status;
	private MultipartFile file;

}
