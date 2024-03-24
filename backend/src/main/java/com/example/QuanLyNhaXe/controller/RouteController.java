package com.example.QuanLyNhaXe.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.dto.RouteFullDTO;
import com.example.QuanLyNhaXe.model.OfficialRoute;
import com.example.QuanLyNhaXe.service.RouteService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/routes")
@RequiredArgsConstructor
@Tag(name = "Routes",description = "Route Controller")
public class RouteController {
	private final RouteService routeService;
	
	@GetMapping
    public ResponseEntity<List<RouteFullDTO>> getAll() {
        return new ResponseEntity<>(routeService.getAllRoutes(), HttpStatus.OK);
    }

    @GetMapping("/data")
	public ResponseEntity<List<OfficialRoute>> getRouteData() throws IOException{
		return new ResponseEntity<>(routeService.readDataRouteFile(), HttpStatus.OK);
	}

}
