package com.example.QuanLyNhaXe.service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.QuanLyNhaXe.Request.BookingReturnTicket;
import com.example.QuanLyNhaXe.Request.CreateBookingDTO;
import com.example.QuanLyNhaXe.Request.SearchBookingDTO;
import com.example.QuanLyNhaXe.dto.BookingDTO;
import com.example.QuanLyNhaXe.dto.BookingSimpleDTO;
import com.example.QuanLyNhaXe.dto.StatisticTripTicketsForMonth.SumTicKet;
import com.example.QuanLyNhaXe.enumration.BookingStatus;
import com.example.QuanLyNhaXe.enumration.TicketState;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Booking;
import com.example.QuanLyNhaXe.model.Schedule;
import com.example.QuanLyNhaXe.model.Staff;
import com.example.QuanLyNhaXe.model.StopStation;
import com.example.QuanLyNhaXe.model.Ticket;
import com.example.QuanLyNhaXe.model.Trip;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.BookingRepository;
import com.example.QuanLyNhaXe.repository.ScheduleRepository;
import com.example.QuanLyNhaXe.repository.StopStationRepository;
import com.example.QuanLyNhaXe.repository.TicketRepository;
import com.example.QuanLyNhaXe.repository.TripRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService {
	private final BookingRepository bookingRepository;
	private final ScheduleRepository scheduleRepository;

	private final StopStationRepository stopStationRepository;
	private final TicketRepository ticketRepository;
	private final TripRepository tripRepository;
	private final CaptchaService captchaService;
	private final UserService userService;
	private final ModelMapper modelMapper;
	private final EmailService emailService;
	private final UtilityService utilityService;
	private final VNPayService vnPayService;
	

	@Transactional
	public Object booking(CreateBookingDTO createBookingDTO, String authorization, HttpServletRequest request) {
		User user = null;
		Staff staff = null;

		user = userService.getUserByAuthorizationHeader(authorization);
		if (user.getAccount().getRole().getId() != 4 && user.getAccount().getRole().getId() != 3) {
			staff = user.getStaff();
			user = null;
		}

		Trip trip = tripRepository.findById(createBookingDTO.getTripId())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
		Schedule schedule = scheduleRepository.findById(createBookingDTO.getScheduleId())
				.orElseThrow(() -> new NotFoundException(Message.SCHEDULE_NOT_FOUND));

		StopStation pickStation = stopStationRepository
				.findByIdAndTripIdAndStationType(createBookingDTO.getPickStationId(), createBookingDTO.getTripId(),
						"pick")
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		StopStation dropStation = stopStationRepository
				.findByIdAndTripIdAndStationType(createBookingDTO.getDropStationId(), createBookingDTO.getTripId(),
						"drop")
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		if (createBookingDTO.getSeatName().size() != createBookingDTO.getTicketNumber()) {
			throw new BadRequestException("Số lượng vé và danh sách tên ghế chưa khớp");
		}

		String bookingCode = utilityService.generateRandomString(6);
		while (bookingRepository.existsByCode(bookingCode)) {
			bookingCode = utilityService.generateRandomString(6);
		}
		String orderId = utilityService.getRandomNumber(8);

		Integer price = schedule.getTicketPrice();
		if (schedule.getSpecialDay() != null) {
			price += schedule.getSpecialDay().getFee();
		}

		Booking booking = Booking.builder().code(bookingCode).trip(trip).bookingUser(user).conductStaff(staff)
				.pickStation(pickStation).dropStation(dropStation).tel(createBookingDTO.getTel())
				.name(createBookingDTO.getName()).email(createBookingDTO.getEmail())
				.ticketNumber(createBookingDTO.getTicketNumber()).status(BookingStatus.RESERVE.getLabel())
				.bookingDate(utilityService.convertHCMDateTime()).build();
		try {

			if (schedule.getAvailability() - createBookingDTO.getTicketNumber() >= 0) {
				schedule.setAvailability(schedule.getAvailability() - createBookingDTO.getTicketNumber());
				scheduleRepository.save(schedule);
			} else
				throw new BadRequestException("Vé chỉ còn lại: " + schedule.getAvailability().toString());

			List<Ticket> tickets = new ArrayList<>();
			for (String name : createBookingDTO.getSeatName()) {
				if (ticketRepository.existsByScheduleIdAndSeatAndStateNot(createBookingDTO.getScheduleId(), name,
						TicketState.CANCELED.getLabel()))
					throw new BadRequestException(
							"Một hoặc nhiều vé đã chọn đã có người đặt rồi!!! Vui lòng chọn vé khác");
				Ticket ticket = Ticket.builder().booking(booking).schedule(schedule).seat(name).ticketPrice(price)
						.state(TicketState.PENDING_PAYMENT.getLabel()).build();
				tickets.add(ticket);
			}
			booking.setTickets(tickets);
			booking.setOrder_id(orderId);
			bookingRepository.save(booking);
			ticketRepository.saveAll(tickets);

		}

		catch (DataAccessException e) {
			return new ResponseMessage(Message.INACCURATE_DATA);
		}
		BookingSimpleDTO bookingSimpleDTO = modelMapper.map(booking, BookingSimpleDTO.class);
		try {

			String paymentURL = vnPayService.generatePaymentUrl(request, price*createBookingDTO.getTicketNumber(), orderId, booking.getCode());

			bookingSimpleDTO.setPaymentURL(paymentURL);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		return bookingSimpleDTO;
	}

	public Object searchTicketsByBooking(SearchBookingDTO searchBookingDTO) {

		if (captchaService.captchaVerification(searchBookingDTO.getCapchaToken())) {
			Booking booking = bookingRepository
					.findByCodeAndTel(searchBookingDTO.getBookingCode(), searchBookingDTO.getTel())
					.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
			return modelMapper.map(booking, BookingDTO.class);
		}
		throw new BadRequestException("Captcha không hợp lệ");

	}

	public Object searchBookingHistory(String authorizationHeader) {

		User user = userService.getUserByAuthorizationHeader(authorizationHeader);

		List<Booking> bookings = bookingRepository.findByBookingUserId(user.getId())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));

		if (bookings.isEmpty()) {
			throw new NotFoundException(Message.BOOKING_NOT_FOUND);
		}

		return bookings.stream().map(booking -> modelMapper.map(booking, BookingDTO.class)).toList();

	}

	public ResponseMessage bookingCancel(String bookingCodeIn) {
		//split bookingCode by "and"
		String[] bookingCodes=bookingCodeIn.split("and");
		String bookingCode=bookingCodes[0];
		String bookingCode2="";
		if (bookingCodes.length>1) {
			bookingCode2=bookingCodes[1];
		}
		Booking booking = bookingRepository.findByCode(bookingCode)
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
		if (booking.getStatus().equals(BookingStatus.RESERVE.getLabel())) {
			List<Ticket> tickets = booking.getTickets();
			booking.setStatus(BookingStatus.CANCELED.getLabel());
			bookingRepository.save(booking);
			bookingRepository.save(booking);
			for (Ticket ticket : tickets) {
				ticket.setState(TicketState.CANCELED.getLabel());
			}
			Schedule schedule = tickets.get(0).getSchedule();
			schedule.setAvailability(schedule.getAvailability() - booking.getTicketNumber());
			scheduleRepository.save(schedule);
			ticketRepository.saveAll(tickets);
			if (bookingCode2 != "") {
				Booking booking2 = bookingRepository.findByCode(bookingCode2)
						.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
				if (booking2.getStatus().equals(BookingStatus.RESERVE.getLabel())) {
					List<Ticket> tickets2 = booking2.getTickets();
					booking2.setStatus(BookingStatus.CANCELED.getLabel());
					bookingRepository.save(booking2);
					for (Ticket ticket : tickets2) {
						ticket.setState(TicketState.CANCELED.getLabel());
					}
					Schedule schedule2 = tickets2.get(0).getSchedule();
					schedule2.setAvailability(schedule2.getAvailability() - booking2.getTicketNumber());
					scheduleRepository.save(schedule2);
					ticketRepository.saveAll(tickets2);
				}
			}
			return new ResponseMessage("Đã hủy lượt đặt vé");
		}
		throw new BadRequestException("Yêu cầu hủy không hợp lệ");

	}

	@Transactional
	public Object bookingForGuest(CreateBookingDTO createBookingDTO, HttpServletRequest request) {
		User user = null;
		Staff staff = null;

		if (createBookingDTO.getEmail() == "" || createBookingDTO.getName() == "" || createBookingDTO.getTel() == "")
			throw new BadRequestException("Thông tin đặt vé không được để trống");

		Trip trip = tripRepository.findById(createBookingDTO.getTripId())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
		Schedule schedule = scheduleRepository.findById(createBookingDTO.getScheduleId())
				.orElseThrow(() -> new NotFoundException(Message.SCHEDULE_NOT_FOUND));

		StopStation pickStation = stopStationRepository
				.findByIdAndTripIdAndStationType(createBookingDTO.getPickStationId(), createBookingDTO.getTripId(),
						"pick")
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		StopStation dropStation = stopStationRepository
				.findByIdAndTripIdAndStationType(createBookingDTO.getDropStationId(), createBookingDTO.getTripId(),
						"drop")
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));

		if (createBookingDTO.getSeatName().size() != createBookingDTO.getTicketNumber()) {
			throw new BadRequestException("Số lượng vé và danh sách tên ghế chưa khớp");
		}

		Integer price = schedule.getTicketPrice();
		if (schedule.getSpecialDay() != null) {
			price += schedule.getSpecialDay().getFee();
		}

		String bookingCode = utilityService.generateRandomString(6);
		while (bookingRepository.existsByCode(bookingCode)) {
			bookingCode = utilityService.generateRandomString(6);
		}
		String orderId = utilityService.getRandomNumber(8);

		Booking booking = Booking.builder().code(bookingCode).trip(trip).bookingUser(user).conductStaff(staff)
				.pickStation(pickStation).dropStation(dropStation).tel(createBookingDTO.getTel())
				.name(createBookingDTO.getName()).email(createBookingDTO.getEmail())
				.ticketNumber(createBookingDTO.getTicketNumber()).status(BookingStatus.RESERVE.getLabel())
				.bookingDate(utilityService.convertHCMDateTime()).build();
		try {

			if (schedule.getAvailability() - createBookingDTO.getTicketNumber() >= 0) {
				schedule.setAvailability(schedule.getAvailability() - createBookingDTO.getTicketNumber());
				scheduleRepository.save(schedule);
			} else
				throw new BadRequestException("Vé chỉ còn lại: " + schedule.getAvailability().toString());
			List<Ticket> tickets = new ArrayList<>();

			for (String name : createBookingDTO.getSeatName()) {
				if (ticketRepository.existsByScheduleIdAndSeatAndStateNot(createBookingDTO.getScheduleId(), name,
						TicketState.CANCELED.getLabel()))
					throw new BadRequestException(
							"Một hoặc nhiều vé đã chọn đã có người đặt rồi!!! Vui lòng chọn vé khác");
				Ticket ticket = Ticket.builder().booking(booking).schedule(schedule).seat(name).ticketPrice(price)
						.state(TicketState.PENDING_PAYMENT.getLabel()).build();
				tickets.add(ticket);

			}
			booking.setTickets(tickets);
			booking.setOrder_id(orderId);
			bookingRepository.save(booking);
			ticketRepository.saveAll(tickets);

		}

		catch (DataAccessException e) {
			return new ResponseMessage(Message.INACCURATE_DATA);
		}
		BookingSimpleDTO bookingSimpleDTO = modelMapper.map(booking, BookingSimpleDTO.class);
		try {

			String paymentURL = vnPayService.generatePaymentUrl(request, price*createBookingDTO.getTicketNumber(), orderId, booking.getCode());

			bookingSimpleDTO.setPaymentURL(paymentURL);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return bookingSimpleDTO;
	}

	public Object keepBookingSession(String bookingCodeIn,HttpServletRequest request) {
		//split bookingCode by "and"
		String[] bookingCodes=bookingCodeIn.split("and");
		String bookingCode=bookingCodes[0];
		String bookingCode2="";
		if (bookingCodes.length>1) {
			bookingCode2=bookingCodes[1];
		}
		Booking booking = bookingRepository.findByCode(bookingCode)
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
		String orderId = utilityService.getRandomNumber(8);
		if (booking.getStatus().equals(BookingStatus.SUCCESS.getLabel())) {
			throw new BadRequestException("Lượt đặt vé đã thành công không thể thay đổi");
		}
		LocalDateTime currentDateTime = utilityService.convertHCMDateTime();
		boolean isExpired = booking.getBookingDate().plusMinutes(10).plusSeconds(10).isBefore(currentDateTime);
		if (isExpired) {
			throw new BadRequestException("Yêu cầu tiếp tục thanh toán không hợp lệ");
		}
		booking.setBookingDate(currentDateTime);
		booking.setOrder_id(orderId);
		bookingRepository.save(booking);
		BookingSimpleDTO bookingSimpleDTO = modelMapper.map(booking, BookingSimpleDTO.class);
		Integer price=booking.getTicketNumber()*booking.getTickets().get(0).getTicketPrice();
		if (bookingCode2 != "") {
			Booking booking2 = bookingRepository.findByCode(bookingCode2)
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
			if (booking2.getStatus().equals(BookingStatus.SUCCESS.getLabel())) {
				throw new BadRequestException("Lượt đặt vé đã thành công không thể thay đổi");
			}
			isExpired = booking2.getBookingDate().plusMinutes(10).plusSeconds(10).isBefore(currentDateTime);
			if (isExpired) {
				throw new BadRequestException("Yêu cầu tiếp tục thanh toán không hợp lệ");
			}
			booking2.setBookingDate(currentDateTime);
			booking2.setOrder_id(orderId);
			bookingRepository.save(booking2);
			price+=booking2.getTicketNumber()*booking2.getTickets().get(0).getTicketPrice();
		}
		try {
			String paymentURL = vnPayService.generatePaymentUrl(request,price , orderId, bookingCodeIn);
			bookingSimpleDTO.setPaymentURL(paymentURL);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return bookingSimpleDTO;
	}

	public List<BookingDTO> searchBookingHistoryByTel(String tel) {
		List<Booking> bookings = bookingRepository.findByTel(tel);

		if (bookings.isEmpty()) {
			throw new NotFoundException(Message.BOOKING_NOT_FOUND);
		}

		return bookings.stream().map(booking -> modelMapper.map(booking, BookingDTO.class)).toList();

	}

	public Object bookingIsTicketing(String bookingCode) {
		Booking booking = bookingRepository.findByCode(bookingCode)
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
		if (!booking.getStatus().equals(BookingStatus.SUCCESS.getLabel())) {
			throw new BadRequestException("Không thể xuất vé chưa thanh toán, vé hủy");
		}
		if (booking.isTicketing()) {
			throw new BadRequestException("Vé này đã được xuất trước đó");
		}
		booking.setTicketing(true);
		bookingRepository.save(booking);
		return modelMapper.map(booking, BookingDTO.class);

	}

	public Integer getTicketsForMonth(YearMonth yearMonth) {
		Integer sum = 0;
		LocalDate firstDayOfMonth = yearMonth.atDay(1);
		LocalDateTime startDateTime = firstDayOfMonth.atStartOfDay();
		LocalDate lastDayOfMonth = yearMonth.atEndOfMonth();
		LocalDateTime endDateTime = lastDayOfMonth.atTime(LocalTime.MAX);

		List<Booking> bookings = bookingRepository.findByTransactionIsNotNullAndBookingDateBetween(startDateTime,
				endDateTime);
		for (Booking booking : bookings) {
			for (Ticket ticket : booking.getTickets()) {
				if (ticket.getState().equals(TicketState.PAID.getLabel())) {
					sum += 1;
				}
			}

		}
		return sum;
	}

	public Integer getTicketsForDay(LocalDate date) {
		Integer sum = 0;

		LocalDateTime startDateTime = date.atStartOfDay();
		LocalDateTime endDateTime = date.atTime(LocalTime.MAX);

		List<Booking> bookings = bookingRepository.findByTransactionIsNotNullAndBookingDateBetween(startDateTime,
				endDateTime);
		for (Booking booking : bookings) {
			for (Ticket ticket : booking.getTickets()) {
				if (ticket.getState().equals(TicketState.PAID.getLabel())) {
					sum += 1;
				}
			}

		}
		return sum;
	}

	public List<SumTicKet> getTicketForTrip(LocalDateTime startDateTime, LocalDateTime endDateTime) {
		List<SumTicKet> sumTicKets = new ArrayList<>();

		List<Booking> bookings = bookingRepository.findByTransactionIsNotNullAndBookingDateBetween(startDateTime,
				endDateTime);
		Set<Trip> uniqueTrips = new HashSet<>();
		List<Trip> distinctTrips = new ArrayList<>();

		for (Booking booking : bookings) {
			Trip trip = booking.getTrip();
			if (!uniqueTrips.contains(trip)) {
				uniqueTrips.add(trip);
				distinctTrips.add(trip);

			}
		}
		for (Trip trip : distinctTrips) {
			Integer sum = 0;
			for (Booking booking : trip.getBookings()) {
				if (bookings.contains(booking)) {
					for (Ticket ticket : booking.getTickets()) {
						if (ticket.getState().equals(TicketState.PAID.getLabel())) {
							sum += 1;
						}
					}
				}

			}
			SumTicKet sumTicKet = SumTicKet.builder().tripId(trip.getId()).tickets(sum).build();
			sumTicKets.add(sumTicKet);

		}
		return sumTicKets;
	}
	
	public Object bookingReturnTicket(BookingReturnTicket createBookingDTO, String authorizationHeader, HttpServletRequest request) {
		User user=userService.getByAuthorizationHeader(authorizationHeader);
		Staff staff = null;
		if ( user!=null && user.getAccount().getRole().getId() != 3 && user.getAccount().getRole().getId() != 4) {
			staff = user.getStaff();
			user = null;
		}
		Trip trip = tripRepository.findById(createBookingDTO.getTripId())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
		Schedule schedule = scheduleRepository.findById(createBookingDTO.getScheduleId())
				.orElseThrow(() -> new NotFoundException(Message.SCHEDULE_NOT_FOUND));

		StopStation pickStation = stopStationRepository
				.findByIdAndTripIdAndStationType(createBookingDTO.getPickStationId(), createBookingDTO.getTripId(),
						"pick")
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		StopStation dropStation = stopStationRepository
				.findByIdAndTripIdAndStationType(createBookingDTO.getDropStationId(), createBookingDTO.getTripId(),
						"drop")
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		if (createBookingDTO.getSeatName().size() != createBookingDTO.getTicketNumber()) {
			throw new BadRequestException("Số lượng vé và danh sách tên ghế chưa khớp");
		}
		Trip trip2 = tripRepository.findById(createBookingDTO.getTripReturnId())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
		Schedule schedule2 = scheduleRepository.findById(createBookingDTO.getScheduleReturnId())
				.orElseThrow(() -> new NotFoundException(Message.SCHEDULE_NOT_FOUND));

		StopStation pickStation2 = stopStationRepository
				.findByIdAndTripIdAndStationType(createBookingDTO.getPickStationReturnId(), createBookingDTO.getTripReturnId(),
						"pick")
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		StopStation dropStation2 = stopStationRepository
				.findByIdAndTripIdAndStationType(createBookingDTO.getDropStationReturnId(), createBookingDTO.getTripReturnId(),
						"drop")
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		if (createBookingDTO.getSeatNameReturn().size() != createBookingDTO.getTicketNumberReturn()) {
			throw new BadRequestException("Số lượng vé và danh sách tên ghế chưa khớp");
		}

		String bookingCode = utilityService.generateRandomString(6);
		while (bookingRepository.existsByCode(bookingCode)) {
			bookingCode = utilityService.generateRandomString(6);
		}
		String bookingCode2 = utilityService.generateRandomString(6);
		while (bookingRepository.existsByCode(bookingCode2)) {
			bookingCode2 = utilityService.generateRandomString(6);
		}
		String orderId = utilityService.getRandomNumber(8);

		Integer price = schedule.getTicketPrice();
		if (schedule.getSpecialDay() != null) {
			price += schedule.getSpecialDay().getFee();
		}
		Integer price2 = schedule2.getTicketPrice();
		if (schedule2.getSpecialDay() != null) {
			price2 += schedule2.getSpecialDay().getFee();
		}

		Booking booking = Booking.builder().code(bookingCode).trip(trip).bookingUser(user).conductStaff(staff)
				.pickStation(pickStation).dropStation(dropStation).tel(createBookingDTO.getTel())
				.name(createBookingDTO.getName()).email(createBookingDTO.getEmail())
				.ticketNumber(createBookingDTO.getTicketNumber()).status(BookingStatus.RESERVE.getLabel())
				.bookingDate(utilityService.convertHCMDateTime()).build();
		
		Booking bookingReturn = Booking.builder().code(bookingCode2).trip(trip2).bookingUser(user).conductStaff(staff)
				.pickStation(pickStation2).dropStation(dropStation2).tel(createBookingDTO.getTel())
				.name(createBookingDTO.getName()).email(createBookingDTO.getEmail())
				.ticketNumber(createBookingDTO.getTicketNumber()).status(BookingStatus.RESERVE.getLabel())
				.bookingDate(utilityService.convertHCMDateTime()).build();
		try {

			if (schedule.getAvailability() - createBookingDTO.getTicketNumber() >= 0) {
				schedule.setAvailability(schedule.getAvailability() - createBookingDTO.getTicketNumber());
				scheduleRepository.save(schedule);
			} else
				throw new BadRequestException("Vé chỉ còn lại: " + schedule.getAvailability().toString());

			List<Ticket> tickets = new ArrayList<>();
			for (String name : createBookingDTO.getSeatName()) {
				if (ticketRepository.existsByScheduleIdAndSeatAndStateNot(createBookingDTO.getScheduleId(), name,
						TicketState.CANCELED.getLabel()))
					throw new BadRequestException(
							"Một hoặc nhiều vé đã chọn đã có người đặt rồi!!! Vui lòng chọn vé khác");
				Ticket ticket = Ticket.builder().booking(booking).schedule(schedule).seat(name).ticketPrice(price)
						.state(TicketState.PENDING_PAYMENT.getLabel()).build();
				tickets.add(ticket);
			}
			if (schedule2.getAvailability() - createBookingDTO.getTicketNumberReturn() >= 0) {
				schedule2.setAvailability(schedule2.getAvailability() - createBookingDTO.getTicketNumberReturn());
				scheduleRepository.save(schedule2);
			} else
				throw new BadRequestException("Vé lượt về chỉ còn lại: " + schedule.getAvailability().toString());

			List<Ticket> ticketsReturn = new ArrayList<>();
			for (String name : createBookingDTO.getSeatNameReturn()) {
				if (ticketRepository.existsByScheduleIdAndSeatAndStateNot(createBookingDTO.getScheduleReturnId(), name,
						TicketState.CANCELED.getLabel()))
					throw new BadRequestException(
							"Một hoặc nhiều vé đã chọn ở lượt về đã có người đặt rồi!!! Vui lòng chọn vé khác");
				Ticket ticket2 = Ticket.builder().booking(bookingReturn).schedule(schedule2).seat(name).ticketPrice(price2)
						.state(TicketState.PENDING_PAYMENT.getLabel()).build();
				ticketsReturn.add(ticket2);
			}
			booking.setTickets(tickets);
			booking.setOrder_id(orderId);
			bookingReturn.setTickets(ticketsReturn);
			bookingReturn.setOrder_id(orderId);
			bookingRepository.save(booking);
			ticketRepository.saveAll(tickets);
			bookingRepository.save(bookingReturn);
			ticketRepository.saveAll(ticketsReturn);

		}
		catch (DataAccessException e) {
			return new ResponseMessage(Message.INACCURATE_DATA);
		}
		List<BookingSimpleDTO> bookingSimpleDTOs = new ArrayList<>();
		BookingSimpleDTO bookingSimpleDTO = modelMapper.map(booking, BookingSimpleDTO.class);
		bookingSimpleDTOs.add(bookingSimpleDTO);
		BookingSimpleDTO bookingSimpleDTO2 = modelMapper.map(bookingReturn, BookingSimpleDTO.class);
		bookingSimpleDTOs.add(bookingSimpleDTO2);
		try {
			Integer sumPrice=price*createBookingDTO.getTicketNumber()+price2*createBookingDTO.getTicketNumberReturn();
			String bookingInfor=booking.getCode()+"and"+bookingReturn.getCode();
			String paymentURL = vnPayService.generatePaymentUrl(request, sumPrice, orderId, bookingInfor);
			bookingSimpleDTO.setPaymentURL(paymentURL);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		return bookingSimpleDTOs;
	}

	public Object generateNewPaymentUrl (String bookingCode, String authorization) {
		User user = userService.getUserByAuthorizationHeader(authorization);
		Booking booking = bookingRepository.findByCode(bookingCode)
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
		if (booking.getBookingUser() == null || booking.getBookingUser().getId() != user.getId()) {
			throw new BadRequestException("Yêu cầu không hợp lệ");
		}
		if (booking.getStatus().equals(BookingStatus.SUCCESS.getLabel())) {
			throw new BadRequestException("Lượt đặt vé đã thành công không thể thay đổi");
		}
		String orderId = booking.getOrder_id();
	
		BookingSimpleDTO bookingSimpleDTO = modelMapper.map(booking, BookingSimpleDTO.class);
		try {
			Integer price=booking.getTicketNumber()*booking.getTickets().get(0).getTicketPrice();
			String paymentURL = vnPayService.generatePaymentUrl(null, price, orderId, booking.getCode());
			bookingSimpleDTO.setPaymentURL(paymentURL);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return bookingSimpleDTO;
	}

}
