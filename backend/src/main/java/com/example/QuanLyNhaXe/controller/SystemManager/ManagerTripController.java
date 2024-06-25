package com.example.QuanLyNhaXe.controller.SystemManager;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.CreateTrip;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.service.TicketService;
import com.example.QuanLyNhaXe.service.TripService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/manager/trips")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
@Tag(name = "Manager", description = "Manager Controller")
public class ManagerTripController {

	private final TripService tripService;
	private final TicketService ticketService;

	@PutMapping("/active")
	public ResponseEntity<Object> editActiveStation(@RequestBody EditActiveDTO editActiveDTO) {
		return new ResponseEntity<>(tripService.editStateTrip(editActiveDTO), HttpStatus.OK);
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

	@GetMapping("tickets/count-Route")
	public ResponseEntity<Object> getSumTicketsByRoute() {
		return new ResponseEntity<>(ticketService.countTicketOnlineByRoute(), HttpStatus.OK);
	}

	@GetMapping("tickets/count-company")
	public ResponseEntity<Object> getSumTicketsByCompany() {
		return new ResponseEntity<>(ticketService.countTicketOnlineByCompany(), HttpStatus.OK);
	}

}
