package com.example.QuanLyNhaXe.controller;

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

import com.example.QuanLyNhaXe.Request.BookingReturnTicket;
import com.example.QuanLyNhaXe.Request.CreateBookingDTO;
import com.example.QuanLyNhaXe.Request.CreateReview;
import com.example.QuanLyNhaXe.Request.SearchBookingDTO;
import com.example.QuanLyNhaXe.service.BookingService;
import com.example.QuanLyNhaXe.service.ReviewService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor

public class BookingController {
	private final BookingService bookingService;
	private final ReviewService reviewService;
	@SecurityRequirement(name="bearerAuth")
	@PostMapping("/booking-users")
	public ResponseEntity<Object> createBookingForUser(@RequestBody CreateBookingDTO createBookingDTO, @Parameter(hidden = true) @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,HttpServletRequest httpServletRequest) {
		return new ResponseEntity<>(bookingService.booking(createBookingDTO,authorization,httpServletRequest), HttpStatus.OK);
	}
	
	@PostMapping("/booking-guest")
	public ResponseEntity<Object> createBookingForGuest(@RequestBody CreateBookingDTO createBookingDTO,HttpServletRequest httpServletRequest) {
		return new ResponseEntity<>(bookingService.bookingForGuest(createBookingDTO,httpServletRequest), HttpStatus.OK);
	}
	
	@PostMapping("/keep-booking")
	public ResponseEntity<Object> createKeepBooking(@RequestParam String bookingCode,HttpServletRequest httpServletRequest) {
		return new ResponseEntity<>(bookingService.keepBookingSession(bookingCode,httpServletRequest), HttpStatus.OK);
	}


	@PutMapping("/cancel")
	public ResponseEntity<Object> bookingCancle(@RequestParam String bookingCode) {
		return new ResponseEntity<>(bookingService.bookingCancel(bookingCode), HttpStatus.OK);
	}
	
	@PostMapping("/tickets")
	public ResponseEntity<Object> searchTickets(@RequestBody SearchBookingDTO searchBookingDTO) {
		return new ResponseEntity<>(bookingService.searchTicketsByBooking(searchBookingDTO), HttpStatus.OK);
	}
	
	@SecurityRequirement(name="bearerAuth")
	@GetMapping("/booking-history")
	public ResponseEntity<Object> searchBookingHistory( @Parameter(hidden = true) @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
		return new ResponseEntity<>(bookingService.searchBookingHistory(authorization), HttpStatus.OK);
	}
	@SecurityRequirement(name="bearerAuth")
	@PostMapping("/schedules/reviews")
	public ResponseEntity<Object> createReview(@Valid @RequestBody CreateReview createReview,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(reviewService.createReview(createReview, authorization), HttpStatus.OK);
	}
	@GetMapping("/schedules/reviews")
	public ResponseEntity<Object> getApprovedReviews(){
		return new ResponseEntity<>(reviewService.getAllApprovedReviews(), HttpStatus.OK);
	}
	@SecurityRequirement(name="bearerAuth")
	@GetMapping("/schedules/my-reviews")
	public ResponseEntity<Object> getMyReviews(@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization){
		return new ResponseEntity<>(reviewService.getMyReview(authorization), HttpStatus.OK);
	}
	
	@PostMapping("/booking-return-ticket")
	public ResponseEntity<Object> createBookingReturnTicket(@RequestBody BookingReturnTicket createBookingDTO,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false)  String authorizationHeader, HttpServletRequest request) {
		return new ResponseEntity<>(bookingService.bookingReturnTicket(createBookingDTO, authorizationHeader, request), HttpStatus.OK);
	}

	@GetMapping("/schedules/get-payment")
	public ResponseEntity<Object> getNewPayment(@RequestParam String bookingCode, @Parameter(hidden = true) @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization, HttpServletRequest httpServletRequest){
		return new ResponseEntity<>(bookingService.generateNewPaymentUrl(bookingCode, authorization), HttpStatus.OK);
	}
	
	@GetMapping("/customer-statistics")
	public ResponseEntity<Object> getTotalCustomer(){
		return new ResponseEntity<>(bookingService.getCustomerTotal(), HttpStatus.OK);
	}
	

}
