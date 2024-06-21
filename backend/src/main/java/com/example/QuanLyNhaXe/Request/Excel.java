package com.example.QuanLyNhaXe.Request;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class Excel {
	private MultipartFile file;
}
