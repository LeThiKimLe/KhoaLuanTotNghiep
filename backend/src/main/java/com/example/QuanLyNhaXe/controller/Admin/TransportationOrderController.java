package com.example.QuanLyNhaXe.controller.Admin;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.EditTransportationOrder;
import com.example.QuanLyNhaXe.Request.TransportationOrderCreate;
import com.example.QuanLyNhaXe.service.TransportationOrderService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/transportation_order")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin Controller")
public class TransportationOrderController {
	
	private final TransportationOrderService transportationOrderService;
	
	@GetMapping()
	public ResponseEntity<Object> getAllTransportationOrders() {
		return new ResponseEntity<>(transportationOrderService.getAllTransportationOrder(), HttpStatus.OK);
	}
	
	
	
	
	@PostMapping()
	public ResponseEntity<Object> createTransportationOrder(@ModelAttribute TransportationOrderCreate transportationOrderCreate) throws IOException {
		return new ResponseEntity<>(transportationOrderService.createTransportationOrder(transportationOrderCreate), HttpStatus.OK);
	}
	
	
	
	@DeleteMapping()
	public ResponseEntity<Object> deleteTransportationOrder(@RequestParam Integer transportationOrderId)  {
		return new ResponseEntity<>(transportationOrderService.deleteTransportationOrder(transportationOrderId), HttpStatus.OK);
	}
	
	

}
