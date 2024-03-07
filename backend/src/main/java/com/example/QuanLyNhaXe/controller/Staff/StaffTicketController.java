package com.example.QuanLyNhaXe.controller.Staff;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.CancelTicketApproval;
import com.example.QuanLyNhaXe.Request.CancelTicketsDTO;
import com.example.QuanLyNhaXe.Request.CreatePaymentDTO;
import com.example.QuanLyNhaXe.Request.EditBookingDTO;
import com.example.QuanLyNhaXe.dto.CancelRequestDTO;
import com.example.QuanLyNhaXe.service.TicketService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/staff/tickets")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
@Tag(name = "Staff", description = "Staff Controller")
public class StaffTicketController {

	private final TicketService ticketService;

	@PostMapping("/cancel")
	public ResponseEntity<Object> cancelTicketForStaff(@RequestBody CancelTicketsDTO cancelTicketsDTO,
			@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization,HttpServletRequest httpServletRequest) {
		return new ResponseEntity<>(ticketService.cancelTicket(cancelTicketsDTO, authorization,httpServletRequest), HttpStatus.OK);
	}

	@GetMapping("/schedule-ticket")
	public ResponseEntity<Object> getListTicketsByScheduleId(@RequestParam Integer scheduleId) {
		return new ResponseEntity<>(ticketService.getListTicketByScheduleId(scheduleId), HttpStatus.OK);
	}

	@GetMapping("/request-cancel")
	public ResponseEntity<List<CancelRequestDTO>> getAllCancelRequest() {
		return new ResponseEntity<>(ticketService.getAllCancelRequest(), HttpStatus.OK);
	}

	@PostMapping("/cancel-approval")
	public ResponseEntity<Object> cancelTicket(@RequestBody CancelTicketApproval cancelTicketApproval,
			@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization,HttpServletRequest httpServletRequest) {
		return new ResponseEntity<>(ticketService.cancelTicketForStaff(cancelTicketApproval, authorization,httpServletRequest),
				HttpStatus.OK);
	}
	
	@PostMapping("/payment")
	public ResponseEntity<Object> paymentTicketForStaff(@RequestBody CreatePaymentDTO createPaymentDTO) {
		return new ResponseEntity<>(ticketService.paymentTicketForStaff(createPaymentDTO), HttpStatus.OK);
	}
	
	@PutMapping("/edit")
	public ResponseEntity<Object> editTicketForStaff(@RequestBody EditBookingDTO editBookingDTO,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(ticketService.editBookingForStaff(editBookingDTO, authorization), HttpStatus.OK);
	}

}
