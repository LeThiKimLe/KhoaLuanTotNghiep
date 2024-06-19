package com.example.QuanLyNhaXe.service;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.CreateTrip;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditTrip;
import com.example.QuanLyNhaXe.Request.GetSameTripDTO;
import com.example.QuanLyNhaXe.Request.GetTripDTO;
import com.example.QuanLyNhaXe.Request.TripAssignment;
import com.example.QuanLyNhaXe.dto.BusDTO;
import com.example.QuanLyNhaXe.dto.DriverDTO;
import com.example.QuanLyNhaXe.dto.ScheduleDTO;
import com.example.QuanLyNhaXe.dto.ScheduleTranDTO;
import com.example.QuanLyNhaXe.dto.StatisTicForMonth;
import com.example.QuanLyNhaXe.dto.StatisTicForMonth.StatisticOneDay;
import com.example.QuanLyNhaXe.dto.StatisticForYear;
import com.example.QuanLyNhaXe.dto.StatisticForYear.StatisticOneMonth;
import com.example.QuanLyNhaXe.dto.StatisticTripTicketsForMonth;
import com.example.QuanLyNhaXe.dto.StatisticTripTicketsForMonth.SumTicKet;
import com.example.QuanLyNhaXe.dto.StatisticTripTicketsForYear;
import com.example.QuanLyNhaXe.dto.StopStationDTO;
import com.example.QuanLyNhaXe.dto.TripBusDriver;
import com.example.QuanLyNhaXe.dto.TripDTO;
import com.example.QuanLyNhaXe.dto.TripReponseDTO;
import com.example.QuanLyNhaXe.dto.TripTranDTO;
import com.example.QuanLyNhaXe.dto.UserDTO;
import com.example.QuanLyNhaXe.enumration.TicketState;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.ConflictException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Bus;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.BusType;
import com.example.QuanLyNhaXe.model.Driver;
import com.example.QuanLyNhaXe.model.Route;
import com.example.QuanLyNhaXe.model.Schedule;
import com.example.QuanLyNhaXe.model.Station;
import com.example.QuanLyNhaXe.model.StopStation;
import com.example.QuanLyNhaXe.model.Ticket;
import com.example.QuanLyNhaXe.model.Trip;
import com.example.QuanLyNhaXe.model.Trip_Bus;
import com.example.QuanLyNhaXe.model.Trip_Driver;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.BusRepository;
import com.example.QuanLyNhaXe.repository.BusTypeRepository;
import com.example.QuanLyNhaXe.repository.DriverRepository;
import com.example.QuanLyNhaXe.repository.RouteRepository;
import com.example.QuanLyNhaXe.repository.ScheduleRepository;
import com.example.QuanLyNhaXe.repository.StationRepository;
import com.example.QuanLyNhaXe.repository.StopStationRepository;
import com.example.QuanLyNhaXe.repository.TripBusRepository;
import com.example.QuanLyNhaXe.repository.TripDriverRepository;
import com.example.QuanLyNhaXe.repository.TripRepository;
import com.example.QuanLyNhaXe.repository.UserRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TripService {
	private final TripRepository tripRepository;
	private final ModelMapper modelMapper;
	private final ScheduleRepository scheduleRepository;
	private final UserService userService;
	private final UtilityService utilityService;
	private final TripBusRepository tripBusRepository;
	private final TripDriverRepository tripDriverRepository;
	private final DriverRepository driverRepository;
	private final BusRepository busRepository;
	private final RouteRepository routeRepository;
	private final StationRepository stationRepository;
	private final StopStationRepository stopStationRepository;
	private final TransactionService transactionService;
	private final BookingService bookingService;
	private final JwtService jwtService;
	private final UserRepository userRepository;
	private final BusCompanyRepository busCompanyRepository;
	private final BusTypeRepository busTypeRepository;

	public List<TripTranDTO> getAllTrips() {
		List<Trip> trips = tripRepository.findAll();
		if (trips.isEmpty()) {
			throw new NotFoundException(Message.ROUTE_NOT_FOUND);
		}
		return trips.stream()
				.peek(trip -> {
					for(Schedule schedule: trip.getSchedules()) {
						schedule.getTransportationOrder().setSchedule(null);
					}
			        // ...
			    })
				.map(trip -> modelMapper.map(trip, TripTranDTO.class)).toList();
	}

	public List<TripTranDTO> getTripsForRoute(GetTripDTO getTripDTO, String authorizationHeader) {
		Boolean filter = true;
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			String jwt = authorizationHeader.substring(7);
			Integer userId = Integer.valueOf(jwtService.extractUsername(jwt));

			User user = userRepository.findById(userId)
					.orElseThrow(() -> new NotFoundException(Message.USER_NOT_FOUND));
			if (!user.getAccount().isActive()) {
				throw new BadRequestException(Message.ACCOUNT_DISABLED);
			}
			if (user.getAccount().getRole().getId() != 4) {
				filter = false;
			}
		}
		List<Trip> trips = tripRepository.findByRouteIdAndTurn(getTripDTO.getRouteId(), getTripDTO.getTurn());
		if (trips.isEmpty()) {
			throw new NotFoundException(Message.TRIP_NOT_FOUND);
		}
		Integer routeParentId = trips.stream().findFirst().get().getRoute().getParents();
		if (routeParentId != null) {
			List<Trip> tripsParent = tripRepository.findByRouteIdAndTurn(routeParentId, getTripDTO.getTurn());
			if (!tripsParent.isEmpty())
				trips.addAll(tripsParent);
		}

		Time time = getTimeForSearchTrip(getTripDTO.getDepartDate(), filter);

		ModelMapper customModelMapper = new ModelMapper();

		customModelMapper.typeMap(Schedule.class, ScheduleTranDTO.class)
				.addMapping(src -> src.getDriver().getUser(), ScheduleTranDTO::setDriverUser)
				.addMapping(src -> src.getDriver2().getUser(), ScheduleTranDTO::setDriverUser2);

		customModelMapper.typeMap(Trip.class, TripTranDTO.class).addMappings(mapper -> {
			mapper.using(ctx -> customModelMapper.map(ctx.getSource(), new TypeToken<List<ScheduleTranDTO>>() {
			}.getType())).map(Trip::getSchedules, TripTranDTO::setSchedules);
		});

		List<TripTranDTO> tripsDTO = trips.stream().map(trip -> {
			List<Schedule> schedules = scheduleRepository
					.findByTripIdAndDepartDateAndAvailabilityGreaterThanEqualAndDepartTimeAfter(trip.getId(),
							getTripDTO.getDepartDate(), getTripDTO.getAvailability(), time);
			for (Schedule schedule : schedules) {
				if (schedule.getTransportationOrder() != null) {
					schedule.getTransportationOrder().setSchedule(null);

				}
			}
			trip.setSchedules(schedules);
			return customModelMapper.map(trip, TripTranDTO.class);

		}).filter(tripDTO -> !tripDTO.getSchedules().isEmpty()).toList();
		if (tripsDTO.isEmpty()) {
			throw new NotFoundException(Message.TRIP_NOT_FOUND);
		}
		return tripsDTO;

	}

	public TripDTO searchSameTrip(GetSameTripDTO getSameTripDTO, String authorizationHeader) {
		Boolean filter = true;
		User user = userService.getUserByAuthorizationHeader(authorizationHeader);

		if (user.getAccount().getRole().getId() != 4) {
			filter = false;
		}

		Trip trip = tripRepository.findById(getSameTripDTO.getTripId())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
		Time time = getTimeForSearchTrip(getSameTripDTO.getDepartDate(), filter);
		List<Schedule> schedules = scheduleRepository
				.findByTripIdAndDepartDateAndAvailabilityGreaterThanEqualAndDepartTimeAfter(trip.getId(),
						getSameTripDTO.getDepartDate(), 0, time);
		if (schedules.isEmpty()) {
			throw new NotFoundException(Message.SCHEDULE_NOT_FOUND);
		} else {
			trip.setSchedules(filterTicketCancel(schedules));
		}
		return modelMapper.map(trip, TripDTO.class);

	}

	public List<Schedule> filterTicketCancel(List<Schedule> schedules) {
		return schedules.stream().map(schedule -> {
			List<Ticket> activeTickets = schedule.getTickets().stream()
					.filter(ticket -> !TicketState.CANCELED.getLabel().equals(ticket.getState())).toList();
			schedule.setTickets(activeTickets);
			return schedule;
		}).toList();
	}

	public Time getTimeForSearchTrip(Date date, Boolean filter) {
		LocalDateTime currentDateTime = utilityService.convertHCMDateTime();
		LocalDate localDate = currentDateTime.toLocalDate();
		Date currentDate = Date.valueOf(localDate);
		Time time = Time.valueOf("00:00:00");
		boolean isSame = date.compareTo(currentDate) == 0;
		if (isSame && filter) {
			LocalTime localTime = currentDateTime.toLocalTime().plusHours(2);
			time = Time.valueOf(localTime);
		}
		return time;

	}

	public Object editStateTrip(EditActiveDTO edit) {

		Trip trip = tripRepository.findById(edit.getId())
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		if (edit.isActive() && (!trip.getRoute().isActive() || !trip.getStartStation().isActive()
				|| !trip.getEndStation().isActive())) {
			throw new BadRequestException(Message.BAD_REQUEST);
		}
		trip.setActive(edit.isActive());
		tripRepository.save(trip);
		return new ResponseMessage(Message.UPDATE_SUCCESS);
	}

	@Transactional
	public Object tripAssignment(TripAssignment tripAssignment) {
		List<Trip_Bus> tripBuses = new ArrayList<>();
		List<Trip_Driver> tripDrivers = new ArrayList<>();
		Trip trip = tripRepository.findById(tripAssignment.getTripId())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
		Trip returnTrip = tripRepository
				.findByStartStationIdAndEndStationIdAndTurn(trip.getEndStation().getId(),
						trip.getStartStation().getId(), !trip.isTurn())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
		for (Integer driverId : tripAssignment.getDriverId()) {
			Driver driver = driverRepository.findById(driverId)
					.orElseThrow(() -> new NotFoundException(Message.DRIVER_NOT_FOUND));
			if (tripDriverRepository.existsByTripIdAndDriverDriverId(trip.getId(), driverId)) {
				throw new BadRequestException(Message.BAD_REQUEST);

			}
			Trip_Driver tripDriver = Trip_Driver.builder().trip(trip).driver(driver).build();
			Trip_Driver returnTripDriver = Trip_Driver.builder().trip(returnTrip).driver(driver).build();
			tripDrivers.add(tripDriver);
			tripDrivers.add(returnTripDriver);

		}
		for (Integer busId : tripAssignment.getBusId()) {
			Bus bus = busRepository.findById(busId).orElseThrow(() -> new NotFoundException(Message.BUSES_NOT_FOUND));
			if (tripBusRepository.existsByTripIdAndBusId(trip.getId(), busId)) {
				throw new BadRequestException(Message.BAD_REQUEST);
			}
			Trip_Bus tripBus = Trip_Bus.builder().trip(trip).bus(bus).build();
			Trip_Bus returnTripBus = Trip_Bus.builder().trip(returnTrip).bus(bus).build();
			tripBuses.add(tripBus);
			tripBuses.add(returnTripBus);
		}
		try {
			tripBusRepository.saveAll(tripBuses);
			tripDriverRepository.saveAll(tripDrivers);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BadRequestException("Lỗi xảy ra trong quá trình xử lý");
		}
		return new ResponseMessage(Message.SUCCESS);

	}

	public Object createTrip(CreateTrip createTrip) {
		if (tripRepository.existsByStartStationIdAndEndStationIdAndBusCompanyId(createTrip.getStartStationId(),
				createTrip.getEndStationId(), createTrip.getCompanyId())
				|| tripRepository.existsByStartStationIdAndEndStationIdAndBusCompanyId(createTrip.getEndStationId(),
						createTrip.getStartStationId(), createTrip.getCompanyId())) {
			throw new ConflictException(Message.TRIP_EXISTS);
		}
		BusType busType = null;
		if (createTrip.getBusType() != 0 && createTrip.getBusType() != null) {
			busType = busTypeRepository.findById(createTrip.getBusType())
					.orElseThrow(() -> new NotFoundException(Message.BUSTYPE_NOT_FOUND));

		}

		Route route = routeRepository.findById(createTrip.getRouteId())
				.orElseThrow(() -> new NotFoundException(Message.ROUTE_NOT_FOUND));
		Station startStation = stationRepository.findById(createTrip.getStartStationId())
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		Station endStation = stationRepository.findById(createTrip.getEndStationId())
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		BusCompany busCompany = busCompanyRepository.findById(createTrip.getCompanyId())
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));

		Trip trip = Trip.builder().startStation(startStation).endStation(endStation).route(route)
				.price(createTrip.getPrice()).busCompany(busCompany).isActive(true).turn(true).busType(busType).routeCode(createTrip.getRouteCode())
				.schedule(createTrip.getSchedule()).distance(createTrip.getDistance()).hours(createTrip.getHours())
				.build();
		Trip returnTrip = Trip.builder().startStation(endStation).endStation(startStation).price(createTrip.getPrice())
				.busCompany(busCompany).route(route).isActive(true).turn(false).busType(busType).routeCode(createTrip.getRouteCode())
				.schedule(createTrip.getScheduleReturn()).distance(createTrip.getDistance())
				.hours(createTrip.getHours()).build();
		tripRepository.save(trip);
		tripRepository.save(returnTrip);
		return TripReponseDTO.builder().trip(modelMapper.map(trip, TripDTO.class))
				.tripReturn(modelMapper.map(returnTrip, TripDTO.class)).build();

	}

	public Object getStopStation(Integer tripId) {
		List<StopStation> stopStations = stopStationRepository.findByTripId(tripId);
		if (stopStations.isEmpty()) {
			throw new NotFoundException(Message.STOPSTATION_NOT_FOUND);
		}
		return stopStations.stream().map(stopStation -> modelMapper.map(stopStation, StopStationDTO.class)).toList();

	}

	public Object getTripByDriver(Integer driverId) {
		List<Trip_Driver> tripDrivers = tripDriverRepository.findByDriverDriverId(driverId);
		if (tripDrivers.isEmpty()) {
			throw new NotFoundException(Message.TRIP_NOT_FOUND);
		}
		List<Trip> trips = new ArrayList<>();
		for (Trip_Driver tripDriver : tripDrivers) {
			trips.add(tripDriver.getTrip());
		}
		return trips.stream().map(trip -> modelMapper.map(trip, TripDTO.class)).toList();

	}

	public Object getTripByBus(Integer busId) {
		List<Trip_Bus> tripBuses = tripBusRepository.findByBusId(busId);
		if (tripBuses.isEmpty()) {
			throw new NotFoundException(Message.TRIP_NOT_FOUND);
		}
		List<Trip> trips = new ArrayList<>();
		for (Trip_Bus tripBus : tripBuses) {
			trips.add(tripBus.getTrip());
		}
		return trips.stream().map(trip -> modelMapper.map(trip, TripDTO.class)).toList();
	}

	public Object getBusAndDriverForTrip(Integer tripId) {

		List<Driver> drivers = new ArrayList<>();
		List<Bus> buses = new ArrayList<>();
		List<Trip_Bus> tripBuses = tripBusRepository.findByTripId(tripId);
		if (!tripBuses.isEmpty()) {
			for (Trip_Bus tripBus : tripBuses) {
				buses.add(tripBus.getBus());
			}
		}

		List<Trip_Driver> tripDrivers = tripDriverRepository.findByTripId(tripId);
		if (!tripDrivers.isEmpty()) {
			for (Trip_Driver tripDriver : tripDrivers) {
				drivers.add(tripDriver.getDriver());
			}
		}

		List<UserDTO> driverDTOs = drivers.stream().filter(driver -> driver.getUser().getAccount().isActive())
				.map(driver -> modelMapper.map(driver.getUser(), UserDTO.class)).toList();
		List<BusDTO> busDTOs = buses.stream().map(bus -> modelMapper.map(bus, BusDTO.class)).toList();

		return TripBusDriver.builder().drivers(driverDTOs).buses(busDTOs).build();
	}

	public Object getStatisticTickets(Integer year, Integer month, String authentication) {
		User user=userService.getByAuthorizationHeader(authentication);
		BusCompany busCompany=busCompanyRepository.findByAdminId(user.getStaff().getAdmin().getAdminId())
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
				
		if (year <= 0 || month < 0 || month > 12) {
			throw new BadRequestException(Message.BAD_REQUEST);

		}
		long calculateRevenue = 0L;
		Integer sumTickets = 0;
		List<StatisticOneDay> statisticOneDays = new ArrayList<>();
		List<StatisticOneMonth> statisticOneMonths = new ArrayList<>();

		if (month == 0) {
			List<YearMonth> yearMonths = getAllYearMonths(year);
			for (YearMonth yearMonth : yearMonths) {
				calculateRevenue = transactionService.calculateRevenueOneMonth(yearMonth,busCompany);
				sumTickets = bookingService.getTicketsForMonth(yearMonth,busCompany);
				StatisticOneMonth statisticOneDay = StatisticOneMonth.builder().tickets(sumTickets)
						.revenue(calculateRevenue).month(yearMonth).build();
				statisticOneMonths.add(statisticOneDay);
			}
			return StatisticForYear.builder().statisticFor(statisticOneMonths).build();
		} else {
			List<LocalDate> localDates = getAllDaysInMonth(year, month);
			for (LocalDate localDate : localDates) {
				calculateRevenue = transactionService.calculateRevenueOneDay(localDate,busCompany);
				sumTickets = bookingService.getTicketsForDay(localDate,busCompany);
				StatisticOneDay statisticOneDay = StatisticOneDay.builder().date(localDate).revenue(calculateRevenue)
						.tickets(sumTickets).build();
				statisticOneDays.add(statisticOneDay);

			}
			return StatisTicForMonth.builder().statisticForDays(statisticOneDays).build();

		}

	}

	public static List<LocalDate> getAllDaysInMonth(int year, int month) {
		List<LocalDate> allDays = new ArrayList<>();
		LocalDate startDate = LocalDate.of(year, month, 1);
		LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

		while (!startDate.isAfter(endDate)) {
			allDays.add(startDate);
			startDate = startDate.plusDays(1);
		}

		return allDays;
	}

	public List<YearMonth> getAllYearMonths(int currentYear) {
		List<YearMonth> allYearMonths = new ArrayList<>();
		for (Month month : Month.values()) {
			if (currentYear == YearMonth.now().getYear() && month.compareTo(YearMonth.now().getMonth()) > 0) {
				break;
			}
			YearMonth yearMonth = YearMonth.of(currentYear, month);
			allYearMonths.add(yearMonth);
		}
		return allYearMonths;
	}

	public Object tripAssignmentDelete(TripAssignment tripAssignment) {
		List<Trip_Bus> tripBuses = new ArrayList<>();
		List<Trip_Driver> deleteTripDrivers = new ArrayList<>();
		Trip trip = tripRepository.findById(tripAssignment.getTripId())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));

		Trip returnTrip = tripRepository
				.findByStartStationIdAndEndStationIdAndTurn(trip.getEndStation().getId(),
						trip.getStartStation().getId(), !trip.isTurn())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));

		for (Integer driverId : tripAssignment.getDriverId()) {
			Trip_Driver trip_Driver = tripDriverRepository.findByDriverDriverIdAndTripId(driverId, trip.getId())
					.orElseThrow(() -> new NotFoundException(Message.INACCURATE_DATA));
			Trip_Driver trip_DriverReturn = tripDriverRepository
					.findByDriverDriverIdAndTripId(driverId, returnTrip.getId())
					.orElseThrow(() -> new NotFoundException(Message.INACCURATE_DATA));

			deleteTripDrivers.add(trip_Driver);
			deleteTripDrivers.add(trip_DriverReturn);
		}
		for (Integer busId : tripAssignment.getBusId()) {

			Trip_Bus tripBus = tripBusRepository.findByBusIdAndTripId(busId, trip.getId())
					.orElseThrow(() -> new NotFoundException(Message.INACCURATE_DATA));
			Trip_Bus returnTripBus = tripBusRepository.findByBusIdAndTripId(busId, returnTrip.getId())
					.orElseThrow(() -> new NotFoundException(Message.INACCURATE_DATA));
			tripBuses.add(tripBus);
			tripBuses.add(returnTripBus);
		}
		try {
			tripBusRepository.deleteAll(tripBuses);
			tripDriverRepository.deleteAll(deleteTripDrivers);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BadRequestException("Lỗi xảy ra trong quá trình xử lý");
		}
		return new ResponseMessage(Message.SUCCESS);

	}

	public Object statisTicTripTicket(Integer year, Integer month, String authentication) {
		User user=userService.getByAuthorizationHeader(authentication);
		BusCompany busCompany=busCompanyRepository.findByAdminId(user.getStaff().getAdmin().getAdminId())
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		List<StatisticTripTicketsForMonth> statisticTripTicketsForMonths = new ArrayList<>();
		List<StatisticTripTicketsForYear> statisticTripTicketsForYears = new ArrayList<>();
		List<SumTicKet> sumTicKets;
		if (year <= 0 || month < 0 || month > 12) {
			throw new BadRequestException(Message.BAD_REQUEST);

		}
		if (month == 0) {
			List<YearMonth> yearMonths = getAllYearMonths(year);
			for (YearMonth yearMonth : yearMonths) {
				LocalDate firstDayOfMonth = yearMonth.atDay(1);
				LocalDateTime startDateTime = firstDayOfMonth.atStartOfDay();
				LocalDate lastDayOfMonth = yearMonth.atEndOfMonth();
				LocalDateTime endDateTime = lastDayOfMonth.atTime(LocalTime.MAX);
				sumTicKets = bookingService.getTicketForTrip(startDateTime, endDateTime,busCompany);
				StatisticTripTicketsForYear statisticTripTicketsForYear = StatisticTripTicketsForYear.builder()
						.month(yearMonth).statisticTickets(sumTicKets).build();
				statisticTripTicketsForYears.add(statisticTripTicketsForYear);
			}
			return statisticTripTicketsForYears;
		} else {
			List<LocalDate> localDates = getAllDaysInMonth(year, month);
			for (LocalDate date : localDates) {
				LocalDateTime startDateTime = date.atStartOfDay();
				LocalDateTime endDateTime = date.atTime(LocalTime.MAX);
				sumTicKets = bookingService.getTicketForTrip(startDateTime, endDateTime,busCompany);
				StatisticTripTicketsForMonth statisticTripTicketsForMonth = StatisticTripTicketsForMonth.builder()
						.statisticTickets(sumTicKets).date(date).build();
				statisticTripTicketsForMonths.add(statisticTripTicketsForMonth);
			}
			return statisticTripTicketsForMonths;

		}

	}

	public Object editTrip(EditTrip editTrip) {
		Trip trip = tripRepository.findById(editTrip.getTripId())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
		BusType busType = null;
		if (editTrip.getBusTypeId() != 0 && editTrip.getBusTypeId() != null) {
			busType = busTypeRepository.findById(editTrip.getBusTypeId())
					.orElseThrow(() -> new NotFoundException(Message.BUSTYPE_NOT_FOUND));

		}
		trip.setBusType(busType);
		trip.setPrice(editTrip.getPrice());
		trip.setSchedule(editTrip.getSchedule());
		tripRepository.save(trip);
		return modelMapper.map(trip, TripDTO.class);

	}

}