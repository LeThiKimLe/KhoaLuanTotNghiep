package com.example.QuanLyNhaXe.service;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.CreateSchedules;
import com.example.QuanLyNhaXe.Request.DistributeSchedule;
import com.example.QuanLyNhaXe.Request.EditStateSchedule;
import com.example.QuanLyNhaXe.dto.MaximumScheduleDTO;
import com.example.QuanLyNhaXe.dto.ScheduleDTO;
import com.example.QuanLyNhaXe.dto.ScheduleTranDTO;
import com.example.QuanLyNhaXe.dto.TripTranDTO;
import com.example.QuanLyNhaXe.enumration.BusAvailability;
import com.example.QuanLyNhaXe.enumration.ScheduleState;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Bus;
import com.example.QuanLyNhaXe.model.Driver;
import com.example.QuanLyNhaXe.model.Schedule;
import com.example.QuanLyNhaXe.model.SpecialDay;
import com.example.QuanLyNhaXe.model.Trip;
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
	private final ScheduleRepository scheduleRepository;
	private final ModelMapper modelMapper;
	private final TripRepository tripRepository;
	private final TripBusRepository tripBusRepository;
	private final TripDriverRepository tripDriverRepository;
	private final BusRepository busRepository;
	private final DriverRepository driverRepository;
	private final SpecialDayRepository specialDayRepository;

	public Object maximumSchedule(Integer tripId) {
		Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
		if (!trip.isActive()) {
			throw new BadRequestException(Message.TRIP_DELETED);
		}
		long busCount = tripBusRepository.countByTripIdAndBusAvailability(tripId, BusAvailability.AVAILABLE.getLabel());
		long driverCount = tripDriverRepository.countByTripIdAndDriverUserAccountIsActive(tripId, true);
		Integer max1 = (int) Math.floor((12 / (trip.getHours() + 1)) * busCount);
		Integer max2 = (int) Math.floor((10 * driverCount) / (2 * trip.getHours()));
		int smallerNumber = Math.min(max1, max2);

		return MaximumScheduleDTO.builder().driverCount(driverCount).busCount(busCount).maxSchedule(smallerNumber)
				.build();

	}

	public Object scheduleDistribute(DistributeSchedule distributeSchedule) {
		Schedule schedule = scheduleRepository.findById(distributeSchedule.getScheduleId())
				.orElseThrow(() -> new NotFoundException(Message.SCHEDULE_NOT_FOUND));
		if (distributeSchedule.getBusId() != 0 && distributeSchedule.getBusId() != null) {

			Bus bus = busRepository.findById(distributeSchedule.getBusId())
					.orElseThrow(() -> new NotFoundException(Message.BUS_NOT_FOUND));
			schedule.setBus(bus);

		}
		if (distributeSchedule.getDriverId() == distributeSchedule.getDriverId2()
				&& distributeSchedule.getDriverId() != 0 && distributeSchedule.getDriverId2() != 0) {
			throw new BadRequestException(Message.NOT_SAME_DRIVER);
		}
		if (distributeSchedule.getDriverId() != 0 && distributeSchedule.getDriverId() != null) {
			Driver driver = driverRepository.findById(distributeSchedule.getDriverId())
					.orElseThrow(() -> new NotFoundException(Message.DRIVER_NOT_FOUND));
			schedule.setDriver(driver);
		}
		if (distributeSchedule.getDriverId2() != 0 && distributeSchedule.getDriverId2() != null) {
			Driver driver2 = driverRepository.findById(distributeSchedule.getDriverId2())
					.orElseThrow(() -> new NotFoundException(Message.DRIVER_NOT_FOUND));
			schedule.setDriver2(driver2);
		}
		schedule.setNote(distributeSchedule.getNote());
		scheduleRepository.save(schedule);
		return new ResponseMessage(Message.SUCCESS);

	}

	public Object createManySchedules(CreateSchedules createSchedules) {
		Trip trip = tripRepository.findById(createSchedules.getTripId())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
		String note = createSchedules.getNote();
		Integer avaiability = trip.getBusType().getCapacity();
		List<Date> consecutiveDates = new ArrayList<>();
		List<Schedule> schedules = new ArrayList<>();
		Date departDate = createSchedules.getDateSchedule();
		Boolean specialDayTrue = specialDayRepository.existsByDate(departDate);
		consecutiveDates.add(departDate);
		LocalDate localDateSchedule = departDate.toLocalDate();
		for (int i = 1; i <= createSchedules.getRepeat(); i++) {
			LocalDate currentDate = localDateSchedule.plusDays(i);
			Date date = Date.valueOf(currentDate);
			if (!specialDayRepository.existsByDate(date).equals(specialDayTrue)) {
				throw new BadRequestException("Không thể xếp lịch cho ngày lễ và ngày thường cùng lúc");
			}
			consecutiveDates.add(date);
		}
		for (Date scheduleDate : consecutiveDates) {
			Integer price = trip.getPrice() + trip.getBusType().getFee();
			SpecialDay specialDay = null;
			if (specialDayTrue) {
				specialDay = specialDayRepository.findByDate(scheduleDate).orElseThrow(
						() -> new NotFoundException("Không thể xếp lich cho ngày lễ và ngày thường cùng lúc"));
				price += specialDay.getFee();
			}
			for (Time scheduleTime : createSchedules.getTimes()) {
				Schedule schedule = Schedule.builder().availability(avaiability).trip(trip).departTime(scheduleTime)
						.departDate(scheduleDate).specialDay(specialDay).ticketPrice(price)
						.state(ScheduleState.VE_BAI_DO.getLabel()).finishTime(Time.valueOf("00:00:00")).note(note)
						.build();
				schedules.add(schedule);
			}
		}
		scheduleRepository.saveAll(schedules);
		return schedules.stream().filter(schedule -> schedule.getDepartDate() == departDate).peek(schedule -> {
			if (schedule.getTransportationOrder() != null) {
				schedule.getTransportationOrder().setSchedule(null);

			}
		}).map(schedule -> modelMapper.map(schedule, ScheduleDTO.class)).toList();
	}

	public Object getScheduleByDriver(Integer driverId) {
		ModelMapper customModelMapper = new ModelMapper();

		customModelMapper.typeMap(Schedule.class, ScheduleTranDTO.class)
				.addMapping(src -> src.getDriver().getUser(), ScheduleTranDTO::setDriverUser)
				.addMapping(src -> src.getDriver2().getUser(), ScheduleTranDTO::setDriverUser2);

		customModelMapper.typeMap(Trip.class, TripTranDTO.class).addMappings(mapper -> {
			mapper.using(ctx -> customModelMapper.map(ctx.getSource(), new TypeToken<List<ScheduleTranDTO>>() {
			}.getType())).map(Trip::getSchedules, TripTranDTO::setSchedules);
		});

		List<Schedule> schedules = scheduleRepository.findByDriverDriverId(driverId);
		if (schedules.isEmpty()) {
			throw new NotFoundException(Message.SCHEDULE_NOT_FOUND);
		}
		return schedules.stream().peek(schedule -> {
			if (schedule.getTransportationOrder() != null) {
				schedule.getTransportationOrder().setSchedule(null);
			}

		}).map(schedule -> customModelMapper.map(schedule, ScheduleTranDTO.class)).toList();

	}

	public Object getScheduleByBus(Integer busId) {
		ModelMapper customModelMapper = new ModelMapper();

		customModelMapper.typeMap(Schedule.class, ScheduleTranDTO.class)
				.addMapping(src -> src.getDriver().getUser(), ScheduleTranDTO::setDriverUser)
				.addMapping(src -> src.getDriver2().getUser(), ScheduleTranDTO::setDriverUser2);

		customModelMapper.typeMap(Trip.class, TripTranDTO.class).addMappings(mapper -> {
			mapper.using(ctx -> customModelMapper.map(ctx.getSource(), new TypeToken<List<ScheduleTranDTO>>() {
			}.getType())).map(Trip::getSchedules, TripTranDTO::setSchedules);
		});

		List<Schedule> schedules = scheduleRepository.findByBusId(busId);
		if (schedules.isEmpty()) {
			throw new NotFoundException(Message.SCHEDULE_NOT_FOUND);
		}
		return schedules.stream().peek(schedule -> {
			if (schedule.getTransportationOrder() != null) {
				schedule.getTransportationOrder().setSchedule(null);

			}
		}).map(schedule -> customModelMapper.map(schedule, ScheduleTranDTO.class)).toList();

	}

	public Object updateState(EditStateSchedule edit) {

		Schedule schedule = scheduleRepository.findById(edit.getScheduleId())
				.orElseThrow(() -> new NotFoundException(Message.SCHEDULE_NOT_FOUND));
		String state = edit.getState();
		if (!state.equals(ScheduleState.DANG_DI.getLabel()) && !state.equals(ScheduleState.DEN_BEN_DEN.getLabel())
				&& !state.equals(ScheduleState.DEN_BEN_DI.getLabel())
				&& !state.equals(ScheduleState.DEN_TRAM_DON.getLabel())
				&& !state.equals(ScheduleState.DEN_TRAM_DUNG.getLabel())
				&& !state.equals(ScheduleState.ROI_BAI_DO.getLabel())
				&& !state.equals(ScheduleState.VE_BAI_DO.getLabel())) {
			throw new BadRequestException("Trạng thái không hợp lệ");
		}

		schedule.setState(state);
		scheduleRepository.save(schedule);
		if (schedule.getTransportationOrder() != null) {
			schedule.getTransportationOrder().setSchedule(null);

		}
		return modelMapper.map(schedule, ScheduleTranDTO.class);

	}

}
