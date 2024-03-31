package com.example.QuanLyNhaXe.controller.SystemManager;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.CreateRouteDTO;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditRouteDTO;
import com.example.QuanLyNhaXe.Request.GetRouteParents;
import com.example.QuanLyNhaXe.service.RouteService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/manager/routes")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
@Tag(name = "Manager", description = "Manager Controller")
public class ManagerRouteController {
	private final RouteService routeService;

	@PostMapping
	public ResponseEntity<Object> createRoute(@RequestBody CreateRouteDTO createRouteDTO) {
		return new ResponseEntity<>(routeService.createRoute(createRouteDTO), HttpStatus.OK);
	}

	@GetMapping("/parent")
	public ResponseEntity<Object> getRouteSimilar(@ModelAttribute GetRouteParents getRouteParents) {
		return new ResponseEntity<>(routeService.getRouteParents(getRouteParents), HttpStatus.OK);
	}

	@PutMapping
	public ResponseEntity<Object> editRoute(@RequestBody EditRouteDTO editRouteDTO) {
		return new ResponseEntity<>(routeService.editRoute(editRouteDTO), HttpStatus.OK);
	}

	@PutMapping("/active")
	public ResponseEntity<Object> editActiveRoute(@RequestBody EditActiveDTO editActiveDTO) {
		return new ResponseEntity<>(routeService.editStateRoute(editActiveDTO), HttpStatus.OK);
	}

}
