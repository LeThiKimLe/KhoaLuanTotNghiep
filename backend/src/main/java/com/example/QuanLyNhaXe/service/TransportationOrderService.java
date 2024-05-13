package com.example.QuanLyNhaXe.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.TransportationOrderCreate;
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.ReviewRepository;
import com.example.QuanLyNhaXe.repository.ScheduleRepository;
import com.example.QuanLyNhaXe.repository.TransportationOrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransportationOrderService {
	private final TransportationOrderRepository transportationOrderRepository;
	private final UtilityService utilityService;
	
	
	public void createTransportationOrder(TransportationOrderCreate transportationOrderCreate) {
		String code=utilityService.generateRandomString(10);
		
		
	}

}
