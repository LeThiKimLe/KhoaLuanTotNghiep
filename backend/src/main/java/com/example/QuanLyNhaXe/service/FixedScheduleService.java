package com.example.QuanLyNhaXe.service;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.CreateFixedSchedule;
import com.example.QuanLyNhaXe.dto.FixedScheduleDTO;
import com.example.QuanLyNhaXe.dto.RouteFullDTO;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.FixSchedule;
import com.example.QuanLyNhaXe.model.Trip;
import com.example.QuanLyNhaXe.repository.FixedScheduleRepository;
import com.example.QuanLyNhaXe.repository.TripRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class FixedScheduleService {
	private final FixedScheduleRepository fixedScheduleRepository;
	private final  TripRepository tripRepository;
	private final ModelMapper modelMapper;
	
	
	public Object createFixedSchedule(CreateFixedSchedule createFixedSchedule) {
		List<FixSchedule> fixSchedules=new ArrayList<>();
		Trip trip=tripRepository.findById(createFixedSchedule.getTripId())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
		for(Integer dayInteger: createFixedSchedule.getDayOfWeeks()) {
			for(Time time :createFixedSchedule.getTimes()) {
				FixSchedule fixSchedule=FixSchedule.builder().dayOfWeek(dayInteger).time(time).trip(trip).build();
				fixSchedules.add(fixSchedule);
			}
			
		}
		fixedScheduleRepository.saveAll(fixSchedules);
		return fixSchedules.stream().map(fixschedule -> modelMapper.map(fixschedule, FixedScheduleDTO.class)).toList();		
	}
	
	public Object getFixedSchedules() {
		List<FixSchedule> fixSchedules;
		fixSchedules=fixedScheduleRepository.findAll();
		if (fixSchedules.isEmpty()) {
			throw new NotFoundException(Message.FIXEDSCHEDULE_NOT_FOUND);
		}
		
		return fixSchedules.stream().map(fixschedule -> modelMapper.map(fixschedule, FixedScheduleDTO.class)).toList();		
		
	}
	
public Object deleteFixedSchedule(List<Integer> fixedScheduleIds) {
	
	List<FixSchedule> fixSchedules=new ArrayList();
	for(Integer id: fixedScheduleIds) {
		FixSchedule fixSchedule=fixedScheduleRepository.findById(id)
				.orElseThrow(() -> new NotFoundException(Message.FIXEDSCHEDULE_NOT_FOUND));
		fixSchedules.add(fixSchedule);
		
				
	}
	try {
		fixedScheduleRepository.deleteAll(fixSchedules);
		
	} catch (Exception e) {
		e.printStackTrace();
		throw new BadRequestException(Message.BAD_REQUEST);
	}
	return new ResponseMessage (Message.SUCCESS);
		
	}
	
	

}
