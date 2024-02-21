package com.example.QuanLyNhaXe.controller.Admin;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.CreateStopStation;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditStationDTO;
import com.example.QuanLyNhaXe.Request.EditStopStation;
import com.example.QuanLyNhaXe.Request.RequestStationDTO;
import com.example.QuanLyNhaXe.service.StationService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("admin/stations")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin Controller")
public class AdminStationController {
	private final StationService stationService;

	@PostMapping()
	public ResponseEntity<Object> createStation(@RequestBody RequestStationDTO requestStationDTO) {
		return new ResponseEntity<>(stationService.createStation(requestStationDTO), HttpStatus.OK);
	}

	@PutMapping()
	public ResponseEntity<Object> editStation(@RequestBody EditStationDTO editStationDTO) {
		return new ResponseEntity<>(stationService.editStation(editStationDTO), HttpStatus.OK);
	}

	@PutMapping("/active")
	public ResponseEntity<Object> editActiveStation(@RequestBody EditActiveDTO editActiveDTO) {
		return new ResponseEntity<>(stationService.editStateStation(editActiveDTO), HttpStatus.OK);
	}
	
	@PutMapping("/stop-station/active")
	public ResponseEntity<Object> editActiveStopStation(@RequestBody EditActiveDTO editActiveDTO) {
		return new ResponseEntity<>(stationService.editStateStopStation(editActiveDTO), HttpStatus.OK);
	}
	
	@PutMapping("/stop-station")
	public ResponseEntity<Object> editStopStation(@RequestBody EditStopStation editStopStation) {
		return new ResponseEntity<>(stationService.updateStopStation(editStopStation), HttpStatus.OK);
	}
	
	@PostMapping("/stop-station")
	public ResponseEntity<Object> createStopStation(@RequestBody CreateStopStation createStopStation) {
		return new ResponseEntity<>(stationService.createStopStation(createStopStation), HttpStatus.OK);
	}



}
