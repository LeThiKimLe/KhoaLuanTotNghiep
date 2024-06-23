package com.example.QuanLyNhaXe.controller.SystemManager;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.CompanyPayment;
import com.example.QuanLyNhaXe.Request.CreateManager;
import com.example.QuanLyNhaXe.Request.ScheduleForDay;
import com.example.QuanLyNhaXe.Request.SignupDTO;
import com.example.QuanLyNhaXe.service.AuthenticationService;
import com.example.QuanLyNhaXe.service.BusCompanyService;
import com.example.QuanLyNhaXe.service.FeeService;
import com.example.QuanLyNhaXe.service.ScheduleService;
import com.example.QuanLyNhaXe.service.SystemTransactionService;
import com.example.QuanLyNhaXe.service.TicketService;
import com.example.QuanLyNhaXe.service.TransactionService;
import com.example.QuanLyNhaXe.service.UserService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/manager")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
@Tag(name = "Manager", description = "ManagerController")
public class ManagerController {
	private final AuthenticationService authenticationService;
	private final UserService userService;
	private final FeeService feeService;
	private final ScheduleService scheduleService;
	private final SystemTransactionService systemTransactionService;
	private final TicketService ticketService;

	
	@GetMapping()
	public ResponseEntity<Object> getManagers() {
		return new ResponseEntity<>(userService.getManagers(), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<Object> registerManager(@Valid @RequestBody CreateManager createManager) {
		return new ResponseEntity<>(authenticationService.createManager(createManager), HttpStatus.CREATED);
	}
	
	@GetMapping("/admins")
	public ResponseEntity<Object> getAllAdmins() {
		return new ResponseEntity<>(userService.getAllAdmins(), HttpStatus.OK);
	}
	
	@PostMapping("/confirm-email")
	public ResponseEntity<Object> sendConfirmEmail(@RequestParam Integer companyId) {
		return new ResponseEntity<>(feeService.sendNotificationForFee(companyId), HttpStatus.OK);
	}
	
	@GetMapping("/service-fee")
	public ResponseEntity<Object> getServiceFee( @Parameter(hidden = true) @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,HttpServletRequest httpServletRequest) {
		return new ResponseEntity<>(feeService.getServiceFee(authorization), HttpStatus.OK);
	}
	
	@GetMapping("/schedules")
	public ResponseEntity<Object> getSchedulesForMonth( @RequestParam Integer month,@RequestParam Integer year) {
		return new ResponseEntity<>(scheduleService.getScheduleForMonth(month, year), HttpStatus.OK);
	}
	
	@PostMapping("/schedules-date")
	public ResponseEntity<Object> getSchedulesForDay(@RequestBody ScheduleForDay scheduleForDay) {
		return new ResponseEntity<>(scheduleService.getScheduleForDay(scheduleForDay), HttpStatus.OK);
	}
	
	@PostMapping("/payments-company")
	public ResponseEntity<Object> getSchedulesForDay(@RequestBody CompanyPayment ticketSaleId) {
		return new ResponseEntity<>(systemTransactionService.peymentTicketsForCompany(ticketSaleId), HttpStatus.OK);
	}
	
	@GetMapping("/tickets-month")
	public ResponseEntity<Object> getTicketsForMonth( @RequestParam Integer month,@RequestParam Integer year,@Parameter(hidden = true) @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
		return new ResponseEntity<>(ticketService.getTicketForMonth(month, year, authorization), HttpStatus.OK);
	}
	
	
	

}
