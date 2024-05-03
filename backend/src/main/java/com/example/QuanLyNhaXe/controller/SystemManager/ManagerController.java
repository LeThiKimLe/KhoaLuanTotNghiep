package com.example.QuanLyNhaXe.controller.SystemManager;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.CreateManager;
import com.example.QuanLyNhaXe.Request.SignupDTO;
import com.example.QuanLyNhaXe.service.AuthenticationService;
import com.example.QuanLyNhaXe.service.BusCompanyService;
import com.example.QuanLyNhaXe.service.FeeService;
import com.example.QuanLyNhaXe.service.UserService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/manager")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
@Tag(name = "Manager", description = "ManagerController")
public class ManagerController {
	private final AuthenticationService authenticationService;
	private final UserService userService;
	private final FeeService feeService;
	
	@PostMapping()
	public ResponseEntity<Object> registerManager(@Valid @RequestBody CreateManager createManager) {
		return new ResponseEntity<>(authenticationService.createManager(createManager), HttpStatus.CREATED);
	}
	
	@GetMapping("/admins")
	public ResponseEntity<Object> getAllAdmins() {
		return new ResponseEntity<>(userService.getAllAdmins(), HttpStatus.OK);
	}
	
	@PostMapping("/confirm-email")
	public ResponseEntity<Object> sendConfirmEmail(@RequestParam Integer companyId) {
		return new ResponseEntity<>(feeService.sendNotificationForFee(companyId), HttpStatus.OK);
	}
	

}
