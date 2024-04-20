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

import com.example.QuanLyNhaXe.Request.CreateBusDTO;
import com.example.QuanLyNhaXe.Request.CreateBusType;
import com.example.QuanLyNhaXe.Request.CreateSeat;
import com.example.QuanLyNhaXe.Request.CreateSeatMap;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditBusDTO;
import com.example.QuanLyNhaXe.Request.EditBusType;
import com.example.QuanLyNhaXe.Request.EditSeat;
import com.example.QuanLyNhaXe.Request.EditSeatMap;
import com.example.QuanLyNhaXe.service.BusService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/bus")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin Controller")
public class AdminBusController {
	private final  BusService busService;
	
	
	@GetMapping()
	public ResponseEntity<Object> getAllBus(@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(busService.getAllBus(authorization), HttpStatus.OK);
	}
	
	@GetMapping("/types")
	public ResponseEntity<Object> getAllBusTypes(@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(busService.getAllBusType(authorization), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<Object> createBus(@RequestBody  CreateBusDTO createBusDTO) {
		return new ResponseEntity<>(busService.createBus(createBusDTO), HttpStatus.OK);
	}
	
	@PutMapping()
	public ResponseEntity<Object> editBus(@RequestBody  EditBusDTO editBusDTO) {
		return new ResponseEntity<>(busService.editBus(editBusDTO), HttpStatus.OK);
	}
	
	
	@GetMapping("/not-distribute")
	public ResponseEntity<Object> getAllBusNotDistribute() {
		return new ResponseEntity<>(busService.getBusesNotDistribute(), HttpStatus.OK);
	}
	
	@PostMapping("/type")
	public ResponseEntity<Object> createBusType(@RequestBody  CreateBusType createBusType,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(busService.createBusType(createBusType, authorization), HttpStatus.OK);
	}
	
	@PutMapping("/type")
	public ResponseEntity<Object> editBusType(@RequestBody  EditBusType editBusType) {
		return new ResponseEntity<>(busService.editBusType(editBusType), HttpStatus.OK);
	}
	
	@PostMapping("/seat-map")
	public ResponseEntity<Object> createSeatMap(@RequestBody  CreateSeatMap createSeatMap) {
		return new ResponseEntity<>(busService.createSeatMap(createSeatMap), HttpStatus.OK);
	}
	
	@PutMapping("/seat-map")
	public ResponseEntity<Object> editSeatMap(@RequestBody EditSeatMap editSeatMap) {
		return new ResponseEntity<>(busService.editSeatMap(editSeatMap), HttpStatus.OK);
	}
	
	@PutMapping("type/state")
	public ResponseEntity<Object> editBusType(@RequestBody  EditActiveDTO editActiveDTO) {
		return new ResponseEntity<>(busService.editStateBusType(editActiveDTO), HttpStatus.OK);
	}
	
	@PostMapping("/seat")
	public ResponseEntity<Object> createSeat(@RequestBody CreateSeat createSeat) {
		return new ResponseEntity<>(busService.createSeat(createSeat), HttpStatus.OK);
	}
	
	@PutMapping("/seat")
	public ResponseEntity<Object> editSeat(@RequestBody  EditSeat editSeat) {
		return new ResponseEntity<>(busService.editSeat(editSeat), HttpStatus.OK);
	}
	
	@PutMapping("/seat/state")
	public ResponseEntity<Object> editSeatState(@RequestBody  EditSeat editSeat) {
		return new ResponseEntity<>(busService.editSeat(editSeat), HttpStatus.OK);
	}
	
	
	
	
	
	
	
	
	
	

}
