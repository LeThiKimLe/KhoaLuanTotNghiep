package com.example.QuanLyNhaXe.controller.SystemManager;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.dto.LocationDTO;
import com.example.QuanLyNhaXe.dto.LocationFullDTO;
import com.example.QuanLyNhaXe.service.LocationService;

import org.springframework.web.bind.annotation.RequestBody;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/manager/locations")
@RequiredArgsConstructor
@Tag(name = "Manager", description = "Manager Controller")
@SecurityRequirement(name = "bearerAuth")
public class ManagerLocationController {

	private final LocationService locationService;

	@GetMapping
	public ResponseEntity<List<LocationFullDTO>> getLocation() {
		return new ResponseEntity<>(locationService.getAllLocation(), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<LocationDTO> createLocation(@RequestParam String name) {
		return new ResponseEntity<>(locationService.createLocation(name), HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Object> editLocation(@RequestBody LocationDTO editLocationDTO) {
		return new ResponseEntity<>(locationService.editLocation(editLocationDTO), HttpStatus.OK);
	}
	
	@PutMapping("/active")
	public ResponseEntity<Object> editActiveLocation(@RequestBody EditActiveDTO editActiveDTO) {
		return new ResponseEntity<>(locationService.editStateLocation(editActiveDTO), HttpStatus.OK);
	}
	
}
