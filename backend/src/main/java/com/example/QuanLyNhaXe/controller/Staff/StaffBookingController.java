package com.example.QuanLyNhaXe.controller.Staff;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.dto.BookingDTO;
import com.example.QuanLyNhaXe.service.BookingService;
import com.example.QuanLyNhaXe.service.ReviewService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/staff/bookings")
@SecurityRequirement(name="bearerAuth")
@RequiredArgsConstructor
@Tag(name = "Staff", description = "Staff Controller")
public class StaffBookingController {
	
	private final BookingService bookingService;
	private final ReviewService reviewService;

	@GetMapping("/search-tel")
	public ResponseEntity<List<BookingDTO>> getTicketsByTel(@Parameter String tel){
		return new ResponseEntity<>(bookingService.searchBookingHistoryByTel(tel), HttpStatus.OK);
	}
	
	@PutMapping("/is-ticketing")
	public ResponseEntity<Object> isTicketing(@RequestParam String bookingCode){
		return new ResponseEntity<>(bookingService.bookingIsTicketing(bookingCode), HttpStatus.OK);
	}
	
	@GetMapping("/schedules/reviews")
	public ResponseEntity<Object> getReviews(){
		return new ResponseEntity<>(reviewService.getAllReview(), HttpStatus.OK);
	}
	
	@PutMapping("/schedules/reviews")
	public ResponseEntity<Object> aproveReviews(EditActiveDTO editActiveDTO){
		return new ResponseEntity<>(reviewService.editStateReview(editActiveDTO), HttpStatus.OK);
	}
	
	

}
