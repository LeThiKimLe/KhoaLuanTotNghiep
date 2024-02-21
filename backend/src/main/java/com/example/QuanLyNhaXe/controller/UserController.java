package com.example.QuanLyNhaXe.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.QuanLyNhaXe.Request.EditAccountDTO;
import com.example.QuanLyNhaXe.dto.UserDTO;
import com.example.QuanLyNhaXe.service.UserService;


import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "User",description = "User Controller")
public class UserController {
	
	private final UserService userService;
	
	@SecurityRequirement(name="bearerAuth")
	@PutMapping("/edit")
	public ResponseEntity<UserDTO> update(@Valid @ModelAttribute  EditAccountDTO editAccountDTO,@Parameter(hidden = true) @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
		return new ResponseEntity<>(userService.updateInfor(authorization, editAccountDTO), HttpStatus.OK);
	}
	
	@SecurityRequirement(name="bearerAuth")
	@GetMapping("/tel")
	public ResponseEntity<UserDTO> searchUserByTel(@Parameter String tel) {
		return new ResponseEntity<>(userService.searchByTel(tel), HttpStatus.OK);
	}
	


}
