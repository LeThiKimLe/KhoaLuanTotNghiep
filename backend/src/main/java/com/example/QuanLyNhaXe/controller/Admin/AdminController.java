package com.example.QuanLyNhaXe.controller.Admin;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditDriverByAdmin;
import com.example.QuanLyNhaXe.Request.EditStaffByAdmin;
import com.example.QuanLyNhaXe.Request.SignupDriverDTO;
import com.example.QuanLyNhaXe.Request.SignupStaffDTO;
import com.example.QuanLyNhaXe.service.AuthenticationService;
import com.example.QuanLyNhaXe.service.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin Controller")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {
	
	private final AuthenticationService authenticationService;
	private final UserService userService;
	
	

	@PostMapping("/staffs")
	public ResponseEntity<Object> createStaff(@Valid @RequestBody SignupStaffDTO signupStaffDTO) {
		return new ResponseEntity<>(authenticationService.createStaff(signupStaffDTO), HttpStatus.CREATED);
	}

	@PostMapping("/drivers")
	public ResponseEntity<Object> createDriver(@Valid @RequestBody SignupDriverDTO signupDriverDTO) {
		return new ResponseEntity<>(authenticationService.createDriver(signupDriverDTO), HttpStatus.CREATED);
	}
	
	@GetMapping("/drivers")
	public ResponseEntity<Object> getAllDrivers() {
		return new ResponseEntity<>(userService.getAllDrivers(), HttpStatus.OK);
	}
	
	@GetMapping("/staffs")
	public ResponseEntity<Object> getAllStaffs() {
		return new ResponseEntity<>(userService.getAllStaffs(), HttpStatus.OK);
	}
	
	@PutMapping("/staffs")
	public ResponseEntity<Object> editStaff( @Valid @ModelAttribute EditStaffByAdmin editStaffByAdmin) {
		return new ResponseEntity<>(userService.editStaffByAdmin(editStaffByAdmin), HttpStatus.OK);
	}
	
	@PutMapping("/drivers")
	public ResponseEntity<Object> editDriver( @Valid @ModelAttribute EditDriverByAdmin editDriverByAdmin) {
		return new ResponseEntity<>(userService.editDriverByAdmin(editDriverByAdmin), HttpStatus.OK);
	}
	
	@PutMapping("/user-active")
	public ResponseEntity<Object> editActiveUser( @RequestBody EditActiveDTO editActiveDTO) {
		return new ResponseEntity<>(userService.editStateAccount(editActiveDTO), HttpStatus.OK);
	}
	
	@GetMapping("/admins")
	public ResponseEntity<Object> getAllAdmins() {
		return new ResponseEntity<>(userService.getAllAdmins(), HttpStatus.OK);
	}
	
	
	@GetMapping("/drivers/not-distribute")
	public ResponseEntity<Object> getAllDriversNotDistribute() {
		return new ResponseEntity<>(userService.getDriversNotDistribute(), HttpStatus.OK);
	}
	
	
	

}
