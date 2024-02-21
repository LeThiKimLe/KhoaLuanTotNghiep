package com.example.QuanLyNhaXe.controller;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import lombok.RequiredArgsConstructor;

@RequestMapping("/")
@RequiredArgsConstructor
@RestController
public class StartController {
	
	
	@GetMapping
    public ResponseEntity<Object> getStart() {
        return new ResponseEntity<>("Xin chào", HttpStatus.OK);
    }

	

}
