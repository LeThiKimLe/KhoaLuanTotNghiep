package com.example.QuanLyNhaXe.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.ChatDTO;
import com.example.QuanLyNhaXe.Request.CreateBusCompany;
import com.example.QuanLyNhaXe.service.ChatbotService;
import com.example.QuanLyNhaXe.service.PartnerService;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RestController
@RequestMapping("/partner")
@Tag(name = "Partner", description = "Partner Controller")
public class PartnerController {
    private final PartnerService partnerService;
    @PostMapping("/register")
	public ResponseEntity<Object> registerBusCompany(@RequestBody CreateBusCompany createBusCompany) {
		return new ResponseEntity<>(partnerService.registerBusCompany(createBusCompany), HttpStatus.CREATED);
	}
}
