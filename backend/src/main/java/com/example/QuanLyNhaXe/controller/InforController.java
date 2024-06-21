package com.example.QuanLyNhaXe.controller;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.dto.StaffDTO;
import com.example.QuanLyNhaXe.dto.UserDTO;
import com.example.QuanLyNhaXe.service.AuthenticationService;
import com.example.QuanLyNhaXe.service.ExcelService;
import com.example.QuanLyNhaXe.service.StaffService;
import com.example.QuanLyNhaXe.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/infomation")
@RequiredArgsConstructor
public class InforController {
	private final StaffService staffService;
	private final UserService userService;
	private final ExcelService excelService;
	@GetMapping("/{userId}")
    public ResponseEntity<StaffDTO> searchByUserId(@PathVariable(value = "userId") Integer userId) {
		 return new ResponseEntity<>(staffService.getStaffByUserId(userId), HttpStatus.OK);
    }
	
	@GetMapping("/user/{accountId}")
	public ResponseEntity<UserDTO> searchByAccountId(@PathVariable(value = "accountId") Integer accountId){
		return new ResponseEntity<>(userService.getUserInfor(accountId),HttpStatus.OK);
	}

	@GetMapping("/download-sample")
    public ResponseEntity<Object> downloadSampleExcelFile(@RequestParam String fileType) throws IOException {
		return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=template.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(excelService.downloadSampleFile(fileType));
    }
	
}
