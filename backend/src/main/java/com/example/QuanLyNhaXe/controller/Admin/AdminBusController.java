package com.example.QuanLyNhaXe.controller.Admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.CreateBusDTO;
import com.example.QuanLyNhaXe.Request.EditBusDTO;
import com.example.QuanLyNhaXe.dto.BusQualityDTO;
import com.example.QuanLyNhaXe.dto.LocationFullDTO;
import com.example.QuanLyNhaXe.repository.BusTypeRepository;
import com.example.QuanLyNhaXe.service.BusService;
import com.example.QuanLyNhaXe.service.ScheduleService;
import com.example.QuanLyNhaXe.service.TripService;

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
	public ResponseEntity<Object> getAllBus() {
		return new ResponseEntity<>(busService.getAllBus(), HttpStatus.OK);
	}
	
	@GetMapping("/types")
	public ResponseEntity<Object> getAllBusTypes() {
		return new ResponseEntity<>(busService.getAllBusType(), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<Object> createBus(CreateBusDTO createBusDTO) {
		return new ResponseEntity<>(busService.createBus(createBusDTO), HttpStatus.OK);
	}
	
	@PutMapping()
	public ResponseEntity<Object> editBus(EditBusDTO editBusDTO) {
		return new ResponseEntity<>(busService.editBus(editBusDTO), HttpStatus.OK);
	}
	
	
	@GetMapping("/not-distribute")
	public ResponseEntity<Object> getAllBusNotDistribute() {
		return new ResponseEntity<>(busService.getBusesNotDistribute(), HttpStatus.OK);
	}
	
	
	
	
	

}
