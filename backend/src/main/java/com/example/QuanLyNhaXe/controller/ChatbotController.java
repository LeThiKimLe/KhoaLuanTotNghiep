package com.example.QuanLyNhaXe.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.ChatDTO;
import com.example.QuanLyNhaXe.service.BusCompanyService;
import com.example.QuanLyNhaXe.service.ChatbotService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
@Tag(name = "Chat", description = "Chat Controller")
public class ChatbotController {
    private final ChatbotService chatbotService = new ChatbotService();
	private final BusCompanyService busCompanyService;

    @PostMapping("/chatbot")
	public ResponseEntity<Object> getBotAnswer(@RequestBody ChatDTO chatDTO){
		return new ResponseEntity<>(chatbotService.getBotAnswer(chatDTO), HttpStatus.OK);
	}
	@GetMapping("/company")
	public ResponseEntity<Object> getAllBusCompany() {
		return new ResponseEntity<>(busCompanyService.getAllBusCompany(), HttpStatus.OK);
	}
	
}
