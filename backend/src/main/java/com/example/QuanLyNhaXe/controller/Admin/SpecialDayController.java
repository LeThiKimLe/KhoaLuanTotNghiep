package com.example.QuanLyNhaXe.controller.Admin;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.CreateSpecialDay;
import com.example.QuanLyNhaXe.Request.EditSpecialDay;
import com.example.QuanLyNhaXe.service.SpecialDayService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/special-day")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin Controller")
public class SpecialDayController {
	private final SpecialDayService specialDayService;
	
	@GetMapping()
	public ResponseEntity<Object> getAllSpecialDays() {
		return new ResponseEntity<>(specialDayService.getAllSpecialDay(), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<Object> createSpecialDay(@RequestBody CreateSpecialDay createSpecialDay, @Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(specialDayService.createSpecialDay(createSpecialDay, authorization), HttpStatus.OK);
	}
	
	@PutMapping()
	public ResponseEntity<Object> editSpecialDay(@RequestBody EditSpecialDay editSpecialDay) {
		return new ResponseEntity<>(specialDayService.editSpecialDay(editSpecialDay), HttpStatus.OK);
	}
	
	

}
