package com.example.QuanLyNhaXe.controller;

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
import com.example.QuanLyNhaXe.Request.ChangeTicketDTO;
import com.example.QuanLyNhaXe.Request.CreatePaymentDTO;
import com.example.QuanLyNhaXe.Request.CreatePaymentReturnTicket;
import com.example.QuanLyNhaXe.Request.EditTicketDTO;
import com.example.QuanLyNhaXe.dto.CancelRequestDTO;
import com.example.QuanLyNhaXe.dto.TicketDTO;
import com.example.QuanLyNhaXe.service.TicketService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {
	private final TicketService ticketService;
	@PutMapping("/payment")
	public ResponseEntity<Object> payment(@RequestBody CreatePaymentDTO createPaymentDTO){
		return new ResponseEntity<>(ticketService.paymentTicket(createPaymentDTO), HttpStatus.OK);
	}
	
	
	
	@SecurityRequirement(name="bearerAuth")
	@PostMapping("/cancel-policy")
	public ResponseEntity<Object> cancelTicketPolicy(@RequestBody CancelTicketsDTO cancelTicketsDTO,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization){
		return new ResponseEntity<>(ticketService.getPolicyForCancelTicket(cancelTicketsDTO,authorization), HttpStatus.OK);
	}
	
	@SecurityRequirement(name="bearerAuth")
	@PostMapping("/change")
	public ResponseEntity<Object> changeTicket(@RequestBody ChangeTicketDTO changeTicketDTO,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization){
		return new ResponseEntity<>(ticketService.changeTicket(changeTicketDTO,authorization), HttpStatus.OK);
	}
	
	
	@SecurityRequirement(name="bearerAuth")
	@PutMapping("/edit")
	public ResponseEntity<Object> editTicket(@RequestBody EditTicketDTO editTicketDTO,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization){
		return new ResponseEntity<>(ticketService.editTicket(editTicketDTO,authorization), HttpStatus.OK);
	}
	
	@SecurityRequirement(name="bearerAuth")
	@PostMapping("/request-cancel")
	public ResponseEntity<Object> sendRequestCancelTicket(@RequestBody CancelTicketsDTO cancelTicketsDTO,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization){
		return new ResponseEntity<>(ticketService.sendRequestCancelTicket(cancelTicketsDTO,authorization), HttpStatus.OK);
	}
	
	@GetMapping("/bill")
	public ResponseEntity<Object> getBill(@Parameter String referCode){
		return new ResponseEntity<>(ticketService.searchTicketBill(referCode), HttpStatus.OK);
	}
	
	@PutMapping("/payments")
	public ResponseEntity<Object> payments(@RequestBody CreatePaymentReturnTicket createPaymentDTO){
		return new ResponseEntity<>(ticketService.paymentReturnTicket(createPaymentDTO), HttpStatus.OK);
	}
	
	
	
	
	
	
	
	

}
