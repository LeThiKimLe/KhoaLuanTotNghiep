package com.example.QuanLyNhaXe.Request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class TransportationOrderCreate {
	private Integer scheduleId;
	private MultipartFile file;

}
