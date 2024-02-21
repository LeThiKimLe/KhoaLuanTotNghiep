package com.example.QuanLyNhaXe.controller.Admin;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.QuanLyNhaXe.Request.CreateSchedules;
import com.example.QuanLyNhaXe.Request.DistributeSchedule;
import com.example.QuanLyNhaXe.service.ScheduleService;

import io.swagger.v3.oas.annotations.Parameter;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/schedules")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin Controller")
public class AdminScheduleController {
	private final ScheduleService scheduleService;

	@GetMapping("/maximum")
	public ResponseEntity<Object> getMaximunSchedule(@Parameter Integer tripId) {
		return new ResponseEntity<>(scheduleService.maximumSchedule(tripId), HttpStatus.OK);
	}
	
	
	@PostMapping()
	public ResponseEntity<Object> createManySchedules(@RequestBody CreateSchedules createSchedules) {
		return new ResponseEntity<>(scheduleService.createManySchedules(createSchedules), HttpStatus.OK);
	}
	
	@PutMapping()
	public ResponseEntity<Object> editSchedules(@RequestBody DistributeSchedule distributeSchedule) {
		return new ResponseEntity<>(scheduleService.scheduleDistribute(distributeSchedule), HttpStatus.OK);
	}

}
