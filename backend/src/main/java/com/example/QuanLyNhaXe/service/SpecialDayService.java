package com.example.QuanLyNhaXe.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.CreateSpecialDay;
import com.example.QuanLyNhaXe.Request.EditSpecialDay;
import com.example.QuanLyNhaXe.dto.SpecialDayDTO;
import com.example.QuanLyNhaXe.exception.ConflictException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Schedule;
import com.example.QuanLyNhaXe.model.SpecialDay;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.ScheduleRepository;
import com.example.QuanLyNhaXe.repository.SpecialDayRepository;
import com.example.QuanLyNhaXe.util.Message;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SpecialDayService {
	private final SpecialDayRepository specialDayRepository;
	private final ModelMapper modelMapper;
	private final ScheduleRepository scheduleRepository;
	private final UserService userService;
	
	public Object getAllSpecialDay() {
		List<SpecialDay> specialDays=specialDayRepository.findAll();
		if(specialDays.isEmpty()) {
			throw new NotFoundException(Message.SPECIALDAY_NOT_FOUND);
		}
		return specialDays.stream()
        		.map(specialDay -> modelMapper.map(specialDay, SpecialDayDTO.class))
        		.toList();	
	}
	 public Object createSpecialDay(CreateSpecialDay createSpecialDay, String token) {
		User adminUser = userService.getUserByAuthorizationHeader(token);
		BusCompany busCompany = adminUser.getStaff().getBusCompany();
		
		 if(specialDayRepository.existsByDate(createSpecialDay.getDate())) {
			 throw new ConflictException(Message.SPECIALDAY_EXISTS);
		 }
		 SpecialDay specialDay=SpecialDay.builder().date(createSpecialDay.getDate()).fee(createSpecialDay.getFee()).busCompany(busCompany).build();
		 specialDayRepository.save(specialDay);
		 return modelMapper.map(specialDay, SpecialDayDTO.class);
	 }
	
	 
	 public Object editSpecialDay(EditSpecialDay editSpecialDay) {
		 SpecialDay specialDay=specialDayRepository.findById(editSpecialDay.getId())
				 .orElseThrow(() -> new NotFoundException(Message.SPECIALDAY_NOT_FOUND));
		 List<Schedule> schedules=specialDay.getSchedules();
		 if(!schedules.isEmpty()) {
			 for(Schedule schedule:schedules) {
				 schedule.setTicketPrice(schedule.getTicketPrice()+(editSpecialDay.getFee()-specialDay.getFee()));
			 }
			 specialDay.setFee(editSpecialDay.getFee());
		 }
		 
		 
		 specialDayRepository.save(specialDay);
		 scheduleRepository.saveAll(schedules);
		 return modelMapper.map(specialDay, SpecialDayDTO.class);
	 }
	
	

}
