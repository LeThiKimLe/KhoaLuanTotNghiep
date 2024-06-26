package com.example.QuanLyNhaXe.controller.Driver;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.EditStateSchedule;
import com.example.QuanLyNhaXe.Request.EditTransportationOrder;
import com.example.QuanLyNhaXe.dto.BusQualityDTO;
import com.example.QuanLyNhaXe.service.BusService;
import com.example.QuanLyNhaXe.service.ScheduleService;
import com.example.QuanLyNhaXe.service.TicketService;
import com.example.QuanLyNhaXe.service.TransportationOrderService;
import com.example.QuanLyNhaXe.service.TripService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/driver")
@SecurityRequirement(name="bearerAuth")
@RequiredArgsConstructor
@Tag(name = "Driver", description = "Driver Controller")
public class DriverController {
	private final TripService tripService;
	private final ScheduleService scheduleService;
	private final BusService busService;
	private final TicketService ticketService;
	private final TransportationOrderService transportationOrderService;
	
	@GetMapping("/trips")
	public ResponseEntity<Object> getTripsForDriver(@Parameter Integer driverId){
		return new ResponseEntity<>(tripService.getTripByDriver(driverId), HttpStatus.OK);
	}
	
	
	@GetMapping("/schedules")
	public ResponseEntity<Object> getSchedulesForDriver(@Parameter Integer driverId){
		return new ResponseEntity<>(scheduleService.getScheduleByDriver(driverId), HttpStatus.OK);
	}
	
	@PutMapping("/bus/state")
	public ResponseEntity<Object> editBusState(BusQualityDTO busQualityDTO) {
		return new ResponseEntity<>(busService.editBusState(busQualityDTO), HttpStatus.OK);
	}
	
	@PutMapping("/ticket/checked-in")
	public ResponseEntity<Object> ticketCheckIn(@Parameter Integer ticketId) {
		return new ResponseEntity<>(ticketService.checkIn(ticketId), HttpStatus.OK);
	}
	
	@GetMapping("/schedule-ticket")
	public ResponseEntity<Object> getListTicketsByScheduleId(@RequestParam Integer scheduleId) {
		return new ResponseEntity<>(ticketService.getListTicketByScheduleId(scheduleId), HttpStatus.OK);
	}
	
	@GetMapping("bus/schedules")
	public ResponseEntity<Object> getSchedulesByBus(@Parameter Integer busId) {
		return new ResponseEntity<>(scheduleService.getScheduleByBus(busId), HttpStatus.OK);
	}
	
	@GetMapping("bus/trips")
	public ResponseEntity<Object> getTripsByBus(@Parameter Integer busId) {
		return new ResponseEntity<>(tripService.getTripByBus(busId), HttpStatus.OK);
	}
	
	@GetMapping("/transportation-order")
	public ResponseEntity<Object> getAllTransportationOrders(@RequestParam Integer scheduleId) {
		return new ResponseEntity<>(transportationOrderService.getAllTransportationOrderByScheduleId(scheduleId), HttpStatus.OK);
	}
	@PutMapping("/transportation-order")
	public ResponseEntity<Object> editTransportationOrder(@ModelAttribute EditTransportationOrder editTransportationOrder) throws IOException  {
		return new ResponseEntity<>(transportationOrderService.updateTransportationOrder(editTransportationOrder), HttpStatus.OK);
	}
	
	@PutMapping("/schedule/state")
	public ResponseEntity<Object> editScheduleState(@RequestBody EditStateSchedule edit) {
		return new ResponseEntity<>(scheduleService.updateState(edit), HttpStatus.OK);
	}

}
