package com.example.QuanLyNhaXe.service;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.CreateSchedules;
import com.example.QuanLyNhaXe.Request.CreateStopStation;
import com.example.QuanLyNhaXe.Request.DistributeSchedule;
import com.example.QuanLyNhaXe.dto.MaximumScheduleDTO;
import com.example.QuanLyNhaXe.dto.ScheduleDTO;
import com.example.QuanLyNhaXe.dto.TripDTO;
import com.example.QuanLyNhaXe.enumration.BusAvailability;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.ConflictException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Bus;
import com.example.QuanLyNhaXe.model.Driver;
import com.example.QuanLyNhaXe.model.Schedule;
import com.example.QuanLyNhaXe.model.SpecialDay;
import com.example.QuanLyNhaXe.model.Trip;
import com.example.QuanLyNhaXe.model.Trip_Bus;
import com.example.QuanLyNhaXe.repository.BusRepository;
import com.example.QuanLyNhaXe.repository.DriverRepository;
import com.example.QuanLyNhaXe.repository.ScheduleRepository;
import com.example.QuanLyNhaXe.repository.SpecialDayRepository;
import com.example.QuanLyNhaXe.repository.TripBusRepository;
import com.example.QuanLyNhaXe.repository.TripDriverRepository;
import com.example.QuanLyNhaXe.repository.TripRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScheduleService {
	private final  ScheduleRepository scheduleRepository;
	private final ModelMapper modelMapper;
	private final TripRepository tripRepository;
	private final TripBusRepository tripBusRepository;
	private final TripDriverRepository tripDriverRepository;
	private final BusRepository busRepository;
	private final DriverRepository driverRepository;
	private final SpecialDayRepository specialDayRepository;

	
	public Object maximumSchedule(Integer tripId) {
		Trip trip=tripRepository.findById(tripId)
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
		if(!trip.isActive()) {
			throw new BadRequestException(Message.TRIP_DELETED);
		}
		long busCount=tripBusRepository.countByTripIdAndBusAvailability(tripId,BusAvailability.AVAILABLE.getLabel());
		long driverCount=tripDriverRepository.countByTripIdAndDriverUserAccountIsActive(tripId,true);
		Integer max1=(int) Math.floor((12 / (trip.getRoute().getHours()+1))*busCount);
		Integer max2=(int) Math.floor((10*driverCount)/(2*trip.getRoute().getHours()));
		int smallerNumber = Math.min(max1, max2);
		
		return MaximumScheduleDTO.builder().driverCount(driverCount).busCount(busCount).maxSchedule(smallerNumber).build();
		
	}
	
	public Object scheduleDistribute(DistributeSchedule distributeSchedule) {
		Schedule schedule=scheduleRepository.findById(distributeSchedule.getScheduleId())
				.orElseThrow(() -> new NotFoundException(Message.SCHEDULE_NOT_FOUND));
		if(distributeSchedule.getBusId()!=0&&distributeSchedule.getBusId()!=null) {

			Bus bus=busRepository.findById(distributeSchedule.getBusId())
					.orElseThrow(() -> new NotFoundException(Message.BUS_NOT_FOUND));
			schedule.setBus(bus);
			
			
		}
		if(distributeSchedule.getDriverId()!=0&&distributeSchedule.getDriverId()!=null) {
			Driver driver=driverRepository.findById(distributeSchedule.getDriverId())
					.orElseThrow(() -> new NotFoundException(Message.DRIVER_NOT_FOUND));
			schedule.setDriver(driver);
		}
		schedule.setNote(distributeSchedule.getNote());	
		scheduleRepository.save(schedule);
		return new ResponseMessage(Message.SUCCESS);		
				
	}
	 public Object createManySchedules(CreateSchedules createSchedules) {
		 Trip trip=tripRepository.findById(createSchedules.getTripId())
				 .orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
		 String note=createSchedules.getNote();
		 Integer avaiability=trip.getRoute().getBusType().getCapacity();
		 List<Date> consecutiveDates = new ArrayList<>();
		 List<Schedule> schedules=new ArrayList<>();
		 Date departDate=createSchedules.getDateSchedule();
		 Boolean specialDayTrue=specialDayRepository.existsByDate(departDate);
		 consecutiveDates.add(departDate);
		 LocalDate localDateSchedule = departDate.toLocalDate();
		 for (int i = 1; i <= createSchedules.getRepeat(); i++) {
			 LocalDate currentDate = localDateSchedule.plusDays(i);
			 Date date=Date.valueOf(currentDate);
			 if(!specialDayRepository.existsByDate(date).equals(specialDayTrue)) {
				 throw new BadRequestException("Không thể xếp lịch cho ngày lễ và ngày thường cùng lúc");
			 }
			 consecutiveDates.add(date);            
	        }
		 for(Date scheduleDate: consecutiveDates) {
			 Integer price=trip.getRoute().getPrice()+trip.getRoute().getBusType().getFee();
			 SpecialDay specialDay=null;
			 if(specialDayTrue) {
				 specialDay=specialDayRepository.findByDate(scheduleDate)
						 .orElseThrow(() -> new NotFoundException("Không thể xếp lich cho ngày lễ và ngày thường cùng lúc"));
				 price+=specialDay.getFee();
			 }
			 for(Time scheduleTime:createSchedules.getTimes()) {
					Schedule schedule = Schedule.builder().availability(avaiability).trip(trip).departTime(scheduleTime)
							.departDate(scheduleDate)
							.specialDay(specialDay).ticketPrice(price).finishTime(Time.valueOf("00:00:00")).note(note).build();
				 schedules.add(schedule);
			 }
		 }
		 scheduleRepository.saveAll(schedules);
		 return schedules.stream()
		            .filter(schedule -> schedule.getDepartDate() == departDate)
		            .map(schedule -> modelMapper.map(schedule, ScheduleDTO.class))
		            .toList();

			
	 }
	 
	 public Object getScheduleByDriver(Integer driverId) {
		 List<Schedule> schedules=scheduleRepository.findByDriverDriverId(driverId);
		 if(schedules.isEmpty()) {
				throw new NotFoundException(Message.SCHEDULE_NOT_FOUND);
			}
		 return schedules.stream().map(schedule -> modelMapper.map(schedule, ScheduleDTO.class)).toList();
		
	}
	 
	 public Object getScheduleByBus(Integer busId) {
		 List<Schedule> schedules=scheduleRepository.findByBusId(busId);
		 if(schedules.isEmpty()) {
				throw new NotFoundException(Message.SCHEDULE_NOT_FOUND);
			}
		 return schedules.stream().map(schedule -> modelMapper.map(schedule, ScheduleDTO.class)).toList();
		
	}

}
