package com.example.QuanLyNhaXe.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.dto.SeatMapDTO;
import com.example.QuanLyNhaXe.exception.NotFoundException;

import com.example.QuanLyNhaXe.model.SeatMap;
import com.example.QuanLyNhaXe.repository.SeatMapRepository;
import com.example.QuanLyNhaXe.util.Message;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SeatMapService {
	private final SeatMapRepository seatMapRepository;
	private final ModelMapper modelMapper;
	
	 public List<SeatMapDTO> getAllSeatMaps() {
	        List<SeatMap> seatMaps = seatMapRepository.findAll();
	        if (seatMaps.isEmpty()){
	            throw new NotFoundException(Message.ROLE_NOT_FOUND);
	        }
	        return seatMaps.stream()
	        		.map(seatMap -> modelMapper.map(seatMap, SeatMapDTO.class))
	        		.toList();
	    }
	
	

}
