package com.example.QuanLyNhaXe.controller.SystemManager;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.CreateBusCompany;
import com.example.QuanLyNhaXe.Request.CreateFixedSchedule;
import com.example.QuanLyNhaXe.service.BusCompanyService;
import com.example.QuanLyNhaXe.service.FixedScheduleService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/manager/fixed-schedule")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
@Tag(name = "FixedSchedule", description = "FixedScheduleController")
public class FixedScheduleController {
	
	private final FixedScheduleService fixedScheduleService;
	
	@PostMapping
	public ResponseEntity<Object> createFixedSchedule(@RequestBody CreateFixedSchedule createFixedSchedule) {
		return new ResponseEntity<>(fixedScheduleService.createFixedSchedule(createFixedSchedule), HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<Object> getAllFixedSchedule(@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(fixedScheduleService.getFixedSchedules(authorization), HttpStatus.CREATED);
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteFixedSchedules(@RequestBody List<Integer> fixedScheduleIds) {
	    return new ResponseEntity<>(fixedScheduleService.deleteFixedSchedule(fixedScheduleIds), HttpStatus.CREATED);
	}

}
