package com.example.QuanLyNhaXe.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.GetSameTripDTO;
import com.example.QuanLyNhaXe.Request.GetTripDTO;
import com.example.QuanLyNhaXe.dto.TripDTO;
import com.example.QuanLyNhaXe.dto.TripTranDTO;
import com.example.QuanLyNhaXe.service.TripService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/trips")
@RequiredArgsConstructor
public class TripController {
	private final TripService tripService;
	
	@SecurityRequirement(name="bearerAuth")
	@GetMapping
    public ResponseEntity<List<TripTranDTO>> getTRipsForRoute(@RequestBody GetTripDTO getTripDTO,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
        return new ResponseEntity<>(tripService.getTripsForRoute(getTripDTO,authorization), HttpStatus.OK);
    }
	
	@SecurityRequirement(name="bearerAuth")
	@GetMapping("/same-trip")
    public ResponseEntity<Object> getSameTripForChangeTicket(@RequestBody GetSameTripDTO getSameTripDTO,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
        return new ResponseEntity<>(tripService.searchSameTrip(getSameTripDTO,authorization), HttpStatus.OK);
    }
	
	
}
