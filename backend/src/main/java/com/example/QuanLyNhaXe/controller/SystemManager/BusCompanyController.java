package com.example.QuanLyNhaXe.controller.SystemManager;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.AssignRoute;
import com.example.QuanLyNhaXe.Request.CreateBusCompany;
import com.example.QuanLyNhaXe.Request.EditBusCompany;
import com.example.QuanLyNhaXe.service.BusCompanyService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/manager/company")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
@Tag(name = "BusCompany", description = "BusCompanyController")
public class BusCompanyController {

	private final BusCompanyService busCompanyService;

	@GetMapping
	public ResponseEntity<Object> getAllBusCompany() {
		return new ResponseEntity<>(busCompanyService.getAllBusCompany(), HttpStatus.CREATED);
	}

	@PostMapping
	public ResponseEntity<Object> createBusCompany(@Valid @RequestBody CreateBusCompany createBusCompany) {
		return new ResponseEntity<>(busCompanyService.createBusCompany(createBusCompany), HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<Object> editBusCompany(@Valid @RequestBody EditBusCompany editBusCompany) {
		return new ResponseEntity<>(busCompanyService.editBusCompany(editBusCompany), HttpStatus.CREATED);
	}
	
	@PostMapping("/assign-company")
	public ResponseEntity<Object> assignBusCompany(@RequestBody AssignRoute assignRoute) {
		return new ResponseEntity<>(busCompanyService.routeAssign(assignRoute), HttpStatus.CREATED);
	}
	
}