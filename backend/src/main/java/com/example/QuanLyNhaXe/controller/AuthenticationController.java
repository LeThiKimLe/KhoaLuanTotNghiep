package com.example.QuanLyNhaXe.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.ChangePasswordDTO;
import com.example.QuanLyNhaXe.Request.LoginDTO;
import com.example.QuanLyNhaXe.Request.ResetPassword;
import com.example.QuanLyNhaXe.Request.SignupDTO;
import com.example.QuanLyNhaXe.service.AuthenticationService;
import com.example.QuanLyNhaXe.service.TwilioService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "Auth Controller")

public class AuthenticationController {
	private final AuthenticationService authenticationService;
	private final TwilioService twilioService;

	@PostMapping("/login")
	public ResponseEntity<Object> login(@Valid @RequestBody LoginDTO loginDTO) {
		return new ResponseEntity<>(authenticationService.login(loginDTO), HttpStatus.OK);
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@PostMapping("/signup")
	public ResponseEntity<Object> registerCustomer(@Valid @RequestBody SignupDTO signupDTO,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(authenticationService.registerCustomer(signupDTO,authorization), HttpStatus.CREATED);
	}

	

	@SecurityRequirement(name = "bearerAuth")
	@PostMapping("/refresh-token")
	public ResponseEntity<Object> refreshToken(HttpServletRequest request) {
		Object result = authenticationService.refreshToken(request);
		if (result.equals("Token has expired"))
			return new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@SecurityRequirement(name = "bearerAuth")
	@PostMapping("/logout")
	public ResponseEntity<Object> logout(HttpServletRequest request, HttpServletResponse response) {
		return new ResponseEntity<>(authenticationService.logout(request, response), HttpStatus.OK);
	}

	@SecurityRequirement(name = "bearerAuth")
	@PutMapping("/password-change")
	public ResponseEntity<Object> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO,
			@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(authenticationService.changePassword(changePasswordDTO, authorization),
				HttpStatus.OK);
	}
	@PostMapping("/sms-verify")
	public ResponseEntity<Object> verifyAccount(@RequestBody ResetPassword resetPassword) {
		return new ResponseEntity<>(authenticationService.verifyAccount(resetPassword),
				HttpStatus.OK);
	}
	
	@PostMapping("/send-sms")
    public ResponseEntity<Object> sendOtp(@RequestParam String phoneNumber) {
        try {
        	return new ResponseEntity<>(twilioService.sendOtp(phoneNumber),HttpStatus.OK);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send OTP");
        }
    }
	
	@SecurityRequirement(name = "bearerAuth")
	@PostMapping("/password-reset")
	public ResponseEntity<Object> resetPassword(@RequestParam String password,
			@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(authenticationService.resetPassword(password, authorization),
				HttpStatus.OK);
	}

}
