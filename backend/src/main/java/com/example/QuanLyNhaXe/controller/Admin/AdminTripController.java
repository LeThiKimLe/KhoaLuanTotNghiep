package com.example.QuanLyNhaXe.controller.Admin;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.CreateTrip;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditTrip;
import com.example.QuanLyNhaXe.Request.TripAssignment;
import com.example.QuanLyNhaXe.service.TripService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/trips")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin Controller")
public class AdminTripController {
	
	private final  TripService tripService;
	
	
	
	@PostMapping("/distribute")
	public ResponseEntity<Object> distributeTripDriversBuses(@RequestBody TripAssignment tripAssignment) {
		return new ResponseEntity<>(tripService.tripAssignment(tripAssignment), HttpStatus.OK);
	}
	
	@PutMapping()
	public ResponseEntity<Object> editTrip(@RequestBody EditTrip editTrip) {
		return new ResponseEntity<>(tripService.editTrip(editTrip), HttpStatus.OK);
	}
	
	@GetMapping("/statistic")
	public ResponseEntity<Object> statistic(@Parameter Integer year,@Parameter Integer month, @Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(tripService.getStatisticTickets(year,month,authorization), HttpStatus.OK);
	}
	
	@GetMapping("/statistic-trip")
	public ResponseEntity<Object> statisticByTrip(@Parameter Integer year,@Parameter Integer month,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(tripService.statisTicTripTicket(year,month,authorization), HttpStatus.OK);
	}
	
	@DeleteMapping("/distribute")
	public ResponseEntity<Object> distributeDeleteTripDriversBuses(@RequestBody TripAssignment tripAssignment) {
		return new ResponseEntity<>(tripService.tripAssignmentDelete(tripAssignment), HttpStatus.OK);
	}

}
