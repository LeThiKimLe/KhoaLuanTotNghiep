package com.example.QuanLyNhaXe.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.dto.SeatDTO;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Seat;
import com.example.QuanLyNhaXe.repository.SeatRepository;
import com.example.QuanLyNhaXe.repository.StaffRepository;
import com.example.QuanLyNhaXe.util.Message;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class SeatService {

	private final SeatRepository seatRepository;
	private final ModelMapper modelMapper;
	
	 public List<SeatDTO> getSeatsBySeatMap(Integer SeatMapId) {
	        List<Seat> seats = seatRepository.findBySeatMapId(SeatMapId);
	        if (seats.isEmpty()){
	            throw new NotFoundException(Message.ROLE_NOT_FOUND);
	        }
	        return seats.stream()
	        		.map(seat -> modelMapper.map(seat, SeatDTO.class))
	        		.toList();
	    }
	 
	 
	 public List<SeatDTO> getAllSeats() {
	        List<Seat> seats = seatRepository.findAll();
	        if (seats.isEmpty()){
	            throw new NotFoundException(Message.ROLE_NOT_FOUND);
	        }
	        return seats.stream()
	        		.map(seat -> modelMapper.map(seat, SeatDTO.class))
	        		.toList();
	    }

}
