package com.example.QuanLyNhaXe.controller.Admin;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.CreateTrip;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
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
	
	@PutMapping("/active")
	public ResponseEntity<Object> editActiveStation(@RequestBody EditActiveDTO editActiveDTO) {
		return new ResponseEntity<>(tripService.editStateTrip(editActiveDTO), HttpStatus.OK);
	}
	
	@PostMapping("/distribute")
	public ResponseEntity<Object> distributeTripDriversBuses(@RequestBody TripAssignment tripAssignment) {
		return new ResponseEntity<>(tripService.tripAssignment(tripAssignment), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<Object> createTrip(@RequestBody CreateTrip createTrip) {
		return new ResponseEntity<>(tripService.createTrip(createTrip), HttpStatus.OK);
	}
	
	@GetMapping("/stop-station")
	public ResponseEntity<Object> getStopStationForTrip(@Parameter Integer tripId) {
		return new ResponseEntity<>(tripService.getStopStation(tripId), HttpStatus.OK);
	}
	
	

	@GetMapping("/driver-bus")
	public ResponseEntity<Object> getDriversAndBusForTrip(@Parameter Integer tripId) {
		return new ResponseEntity<>(tripService.getBusAndDriverForTrip(tripId), HttpStatus.OK);
	}
	
	
	@GetMapping("/statistic")
	public ResponseEntity<Object> statistic(@Parameter Integer year,@Parameter Integer month) {
		return new ResponseEntity<>(tripService.getStatisticTickets(year,month), HttpStatus.OK);
	}
	
	@GetMapping("/statistic-trip")
	public ResponseEntity<Object> statisticByTrip(@Parameter Integer year,@Parameter Integer month) {
		return new ResponseEntity<>(tripService.statisTicTripTicket(year,month), HttpStatus.OK);
	}
	
	
	
	@DeleteMapping("/distribute")
	public ResponseEntity<Object> distributeDeleteTripDriversBuses(@RequestBody TripAssignment tripAssignment) {
		return new ResponseEntity<>(tripService.tripAssignmentDelete(tripAssignment), HttpStatus.OK);
	}
	
	
	
	
	
	
	
	
	

}
