package com.example.QuanLyNhaXe.controller.SystemManager;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.AssignRoute;
import com.example.QuanLyNhaXe.Request.CreateBusCompany;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditBusCompany;
import com.example.QuanLyNhaXe.service.BusCompanyService;
import com.example.QuanLyNhaXe.service.TicketService;
import com.example.QuanLyNhaXe.service.TransactionService;

import io.swagger.v3.oas.annotations.Parameter;
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
	private final TransactionService transactionService;
	private final TicketService ticketService;

	@GetMapping
	public ResponseEntity<Object> getAllBusCompany() {
		return new ResponseEntity<>(busCompanyService.getAllBusCompany(), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Object> createBusCompany(@Valid @RequestBody CreateBusCompany createBusCompany) {
		return new ResponseEntity<>(busCompanyService.createBusCompany(createBusCompany), HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<Object> editBusCompany(@Valid @RequestBody EditBusCompany editBusCompany) {
		return new ResponseEntity<>(busCompanyService.editBusCompany(editBusCompany), HttpStatus.OK);
	}
	
	@PostMapping("/assign-company")
	public ResponseEntity<Object> assignBusCompany(@RequestBody AssignRoute assignRoute) {
		return new ResponseEntity<>(busCompanyService.routeAssign(assignRoute), HttpStatus.CREATED);
	}
	
	@GetMapping("/assign-company")
	public ResponseEntity<Object> getAllBusCompanyAsignRoute(@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(busCompanyService.getRouteAssign(authorization), HttpStatus.OK);
	}
	
	@PutMapping("/state")
	public ResponseEntity<Object> editActiveBusCompany(@RequestBody EditActiveDTO editActiveDTO) {
		return new ResponseEntity<>(busCompanyService.eidtStateCompany(editActiveDTO), HttpStatus.OK);
	}
	
	@GetMapping("/money")
	public ResponseEntity<Object> getTicketMoneyForMonth( @RequestParam Integer month,@RequestParam Integer year) {
		return new ResponseEntity<>(ticketService.getMoneyForAllCompany(month, year), HttpStatus.OK);
	}
	
}
