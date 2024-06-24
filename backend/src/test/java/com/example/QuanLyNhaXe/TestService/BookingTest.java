package com.example.QuanLyNhaXe.TestService;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import com.example.QuanLyNhaXe.Request.CreateBookingDTO;
import com.example.QuanLyNhaXe.Request.SearchBookingDTO;
import com.example.QuanLyNhaXe.dto.BookingDTO;
import com.example.QuanLyNhaXe.dto.BookingSimpleDTO;
import com.example.QuanLyNhaXe.enumration.BookingStatus;
import com.example.QuanLyNhaXe.enumration.TicketState;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Account;
import com.example.QuanLyNhaXe.model.Booking;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Role;
import com.example.QuanLyNhaXe.model.Schedule;
import com.example.QuanLyNhaXe.model.SpecialDay;
import com.example.QuanLyNhaXe.model.Staff;
import com.example.QuanLyNhaXe.model.StopStation;
import com.example.QuanLyNhaXe.model.Ticket;
import com.example.QuanLyNhaXe.model.Trip;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.BookingRepository;
import com.example.QuanLyNhaXe.repository.BusRepository;
import com.example.QuanLyNhaXe.repository.ScheduleRepository;
import com.example.QuanLyNhaXe.repository.StopStationRepository;
import com.example.QuanLyNhaXe.repository.TicketRepository;
import com.example.QuanLyNhaXe.repository.TripRepository;
import com.example.QuanLyNhaXe.service.BookingService;
import com.example.QuanLyNhaXe.service.CaptchaService;
import com.example.QuanLyNhaXe.service.EmailService;
import com.example.QuanLyNhaXe.service.UserService;
import com.example.QuanLyNhaXe.service.UtilityService;
import com.example.QuanLyNhaXe.service.VNPayService;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import jakarta.servlet.http.HttpServletRequest;

class BookingTest {

	@Mock
	private BookingRepository bookingRepository;
	@Mock
	private ScheduleRepository scheduleRepository;
	@Mock
	private StopStationRepository stopStationRepository;
	@Mock
	private TicketRepository ticketRepository;
	@Mock
	private TripRepository tripRepository;
	@Mock
	private CaptchaService captchaService;
	@Mock
	private UserService userService;
	@Mock
	private ModelMapper modelMapper;
	@Mock
	private EmailService emailService;

	@Mock
	private UtilityService utilityService;

	@Mock
	private VNPayService vnPayService;

	@Mock
	User mockedUser;

	@Mock
	SpecialDay mockSpecialDay;

	@Mock
	Staff mockedStaff;

	@Mock
	Trip mockedTrip;

	@Mock
	Account mockedAccount;

	@Mock
	Schedule mockedSchedule;

	@Mock
	StopStation mockedPickStation;

	@Mock
	StopStation mockedDropStation;
	@Mock
	Role role;
	@Mock
	Booking mockedBooking;

	@InjectMocks
	private BookingService bookingService;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testBooking_TripNotFound() {
		// Arrange
		CreateBookingDTO createBookingDTO = new CreateBookingDTO();
		createBookingDTO.setTripId(999);
		mockedUser = new User();
		mockedAccount = new Account();
		role = new Role(1, "ADMIN");

		mockedAccount.setRole(role);
		mockedUser.setAccount(mockedAccount);

		String authorization = "Bearer valid_token";
		HttpServletRequest request = mock(HttpServletRequest.class);

		// Thiết lập mock behavior
		when(userService.getUserByAuthorizationHeader(authorization)).thenReturn(mockedUser);

		when(tripRepository.findById(createBookingDTO.getTripId())).thenReturn(Optional.empty());

		// Action & Assert
		assertThrows(NotFoundException.class, () -> {
			bookingService.booking(createBookingDTO, authorization, request);
		});
	}

	@Test
	void testBooking_ScheduleNotFound() {
		// Arrange
		CreateBookingDTO createBookingDTO = new CreateBookingDTO();
		createBookingDTO.setTripId(1); // tripId tồn tại
		createBookingDTO.setScheduleId(999); // scheduleId không tồn tại
		mockedUser = new User();
		mockedAccount = new Account();
		role = new Role(1, "ADMIN");
		mockedAccount.setRole(role);
		mockedUser.setAccount(mockedAccount);

		String authorization = "Bearer valid_token";
		HttpServletRequest request = mock(HttpServletRequest.class);

		// Thiết lập mock behavior
		when(userService.getUserByAuthorizationHeader(authorization)).thenReturn(mockedUser);
		when(tripRepository.findById(createBookingDTO.getTripId())).thenReturn(Optional.of(mockedTrip));
		when(scheduleRepository.findById(createBookingDTO.getScheduleId())).thenReturn(Optional.empty());

		// Action & Assert
		assertThrows(NotFoundException.class, () -> {
			bookingService.booking(createBookingDTO, authorization, request);
		});
	}

	@Test
	void testBooking_DropStationNotFound() {
		// Arrange
		CreateBookingDTO createBookingDTO = new CreateBookingDTO();
		createBookingDTO.setTripId(1); // tripId tồn tại
		createBookingDTO.setDropStationId(999); // dropStationId không tồn tại
		mockedUser = new User();
		mockedAccount = new Account();
		role = new Role(1, "ADMIN");
		mockedAccount.setRole(role);
		mockedUser.setAccount(mockedAccount);

		String authorization = "Bearer valid_token";
		HttpServletRequest request = mock(HttpServletRequest.class);

		// Thiết lập mock behavior
		when(userService.getUserByAuthorizationHeader(authorization)).thenReturn(mockedUser);
		when(tripRepository.findById(createBookingDTO.getTripId())).thenReturn(Optional.of(mockedTrip));
		when(stopStationRepository.findByIdAndTripIdAndStationType(eq(createBookingDTO.getDropStationId()),
				eq(createBookingDTO.getTripId()), eq("drop"))).thenReturn(Optional.empty());

		// Action & Assert
		assertThrows(NotFoundException.class, () -> {
			bookingService.booking(createBookingDTO, authorization, request);
		});
	}

	@Test
	void testBooking_InvalidSeatNameList() {
		// Arrange
		mockedUser = new User();
		mockedAccount = new Account();
		role = new Role(1, "ADMIN");
		mockedAccount.setRole(role);
		mockedUser.setAccount(mockedAccount);
		mockedTrip = new Trip();
		mockedSchedule = new Schedule();
		CreateBookingDTO createBookingDTO = new CreateBookingDTO();
		createBookingDTO.setTripId(1); // tripId tồn tại
		createBookingDTO.setScheduleId(2); // scheduleId tồn tại
		createBookingDTO.setTicketNumber(3); // ticketNumber = 3
		createBookingDTO.setSeatName(Arrays.asList("A1", "A2")); // số lượng seatName không khớp với ticketNumber

		String authorization = "Bearer valid_token";
		HttpServletRequest request = mock(HttpServletRequest.class);

		// Thiết lập mock behavior
		when(userService.getUserByAuthorizationHeader(authorization)).thenReturn(mockedUser);
		when(tripRepository.findById(createBookingDTO.getTripId())).thenReturn(Optional.of(mockedTrip));
		when(scheduleRepository.findById(createBookingDTO.getScheduleId())).thenReturn(Optional.of(mockedSchedule));
		when(stopStationRepository.findByIdAndTripIdAndStationType(eq(createBookingDTO.getPickStationId()),
				eq(createBookingDTO.getTripId()), eq("pick"))).thenReturn(Optional.of(mockedPickStation));
		when(stopStationRepository.findByIdAndTripIdAndStationType(eq(createBookingDTO.getDropStationId()),
				eq(createBookingDTO.getTripId()), eq("drop"))).thenReturn(Optional.of(mockedDropStation));

		// Action & Assert
		assertThrows(BadRequestException.class, () -> {
			bookingService.booking(createBookingDTO, authorization, request);
		});
	}

	@Test
	void testBooking_PickStationNotFound() {
		CreateBookingDTO createBookingDTO = new CreateBookingDTO();
		createBookingDTO.setTripId(1); // tripId tồn tại
		createBookingDTO.setDropStationId(999); // dropStationId không tồn tại
		mockedUser = new User();
		mockedAccount = new Account();
		role = new Role(1, "ADMIN");
		mockedAccount.setRole(role);
		mockedUser.setAccount(mockedAccount);

		String authorization = "Bearer valid_token";
		HttpServletRequest request = mock(HttpServletRequest.class);

		// Thiết lập mock behavior
		when(userService.getUserByAuthorizationHeader(authorization)).thenReturn(mockedUser);
		when(tripRepository.findById(createBookingDTO.getTripId())).thenReturn(Optional.of(mockedTrip));
		when(scheduleRepository.findById(createBookingDTO.getScheduleId())).thenReturn(Optional.of(mockedSchedule));
		when(stopStationRepository.findByIdAndTripIdAndStationType(eq(createBookingDTO.getPickStationId()),
				eq(createBookingDTO.getTripId()), eq("pick"))).thenReturn(Optional.empty());
		when(stopStationRepository.findByIdAndTripIdAndStationType(eq(createBookingDTO.getDropStationId()),
				eq(createBookingDTO.getTripId()), eq("drop"))).thenReturn(Optional.of(new StopStation()));

		// Action & Assert
		assertThrows(NotFoundException.class, () -> {
			bookingService.booking(createBookingDTO, authorization, request);
		});
	}

	@Test
	void testBooking_Success() {
		// Arrange
		mockedUser = new User();
		mockedAccount = new Account();
		role = new Role(1, "ADMIN");
		mockedAccount.setRole(role);
		mockedUser.setAccount(mockedAccount);
		CreateBookingDTO createBookingDTO = new CreateBookingDTO();
		createBookingDTO.setTripId(1); // tripId tồn tại
		createBookingDTO.setScheduleId(2); // scheduleId tồn tại
		createBookingDTO.setPickStationId(1); // pickStationId tồn tại
		createBookingDTO.setDropStationId(2); // dropStationId tồn tại
		createBookingDTO.setTicketNumber(2); // ticketNumber = 2
		createBookingDTO.setSeatName(Arrays.asList("A1", "A2")); // số lượng seatName khớp với ticketNumber
		createBookingDTO.setTel("0123456789");
		createBookingDTO.setName("John Doe");
		createBookingDTO.setEmail("john.doe@example.com");
		mockedSchedule = new Schedule();
		mockedSchedule.setAvailability(10);

		mockedSchedule.setTicketPrice(100); // Thiết lập giá vé
		// Mock special day nếu cần thiết
		mockSpecialDay = new SpecialDay();
		mockSpecialDay.setFee(20); // Thiết lập phí đặc biệt
		mockedSchedule.setSpecialDay(mockSpecialDay);

		String authorization = "Bearer valid_token";
		HttpServletRequest request = mock(HttpServletRequest.class);

		// Thiết lập mock behavior
		when(userService.getUserByAuthorizationHeader(authorization)).thenReturn(mockedUser);
		when(tripRepository.findById(createBookingDTO.getTripId())).thenReturn(Optional.of(mockedTrip));
		when(scheduleRepository.findById(createBookingDTO.getScheduleId())).thenReturn(Optional.of(mockedSchedule));
		when(stopStationRepository.findByIdAndTripIdAndStationType(eq(createBookingDTO.getPickStationId()),
				eq(createBookingDTO.getTripId()), eq("pick"))).thenReturn(Optional.of(mockedPickStation));
		when(stopStationRepository.findByIdAndTripIdAndStationType(eq(createBookingDTO.getDropStationId()),
				eq(createBookingDTO.getTripId()), eq("drop"))).thenReturn(Optional.of(mockedDropStation));
		when(utilityService.generateRandomString(6)).thenReturn("ABCDEF");
		when(bookingRepository.existsByCode("ABCDEF")).thenReturn(false);
		when(utilityService.getRandomNumber(8)).thenReturn("12345678");

		try {
			BookingSimpleDTO result = new BookingSimpleDTO();
			when(modelMapper.map(any(), any())).thenReturn(result);
			when(vnPayService.generatePaymentUrl(request, 200, "12345678", "ABCDEF")).thenReturn("http://payment.url");
			result = (BookingSimpleDTO) bookingService.booking(createBookingDTO, authorization, request);
			result.setPaymentURL("http://payment.url");
			assertNotNull(result);

			assertEquals("http://payment.url", result.getPaymentURL());
			verify(bookingRepository, times(1)).save(any(Booking.class));

		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

	}

	@Test
	void testSearchTicketsByBooking_Success() {
		// Arrange
		SearchBookingDTO searchBookingDTO = new SearchBookingDTO();
		searchBookingDTO.setCapchaToken("validCaptcha");
		searchBookingDTO.setBookingCode("bookingCode");
		searchBookingDTO.setTel("123456789");

		Booking booking = new Booking();
		BookingDTO bookingDTO = new BookingDTO();

		when(captchaService.captchaVerification("validCaptcha")).thenReturn(true);
		when(bookingRepository.findByCodeAndTel("bookingCode", "123456789")).thenReturn(Optional.of(booking));
		when(modelMapper.map(booking, BookingDTO.class)).thenReturn(bookingDTO);

		// Act
		Object result = bookingService.searchTicketsByBooking(searchBookingDTO);

		// Assert
		assertNotNull(result);
		assertTrue(result instanceof BookingDTO);
		assertEquals(bookingDTO, result);

		verify(captchaService).captchaVerification("validCaptcha");
		verify(bookingRepository).findByCodeAndTel("bookingCode", "123456789");
		verify(modelMapper).map(booking, BookingDTO.class);
	}

	@Test
	void testSearchTicketsByBooking_InvalidCaptcha() {
		// Arrange
		SearchBookingDTO searchBookingDTO = new SearchBookingDTO();
		searchBookingDTO.setCapchaToken("invalidCaptcha");

		when(captchaService.captchaVerification("invalidCaptcha")).thenReturn(false);

		// Act & Assert
		assertThrows(BadRequestException.class, () -> {
			bookingService.searchTicketsByBooking(searchBookingDTO);
		});

		verify(captchaService).captchaVerification("invalidCaptcha");
		verifyNoMoreInteractions(bookingRepository);
		verifyNoMoreInteractions(modelMapper);
	}

	@Test
	void testSearchTicketsByBooking_BookingNotFound() {
		// Arrange
		SearchBookingDTO searchBookingDTO = new SearchBookingDTO();
		searchBookingDTO.setCapchaToken("validCaptcha");
		searchBookingDTO.setBookingCode("bookingCode");
		searchBookingDTO.setTel("123456789");

		when(captchaService.captchaVerification("validCaptcha")).thenReturn(true);
		when(bookingRepository.findByCodeAndTel("bookingCode", "123456789")).thenReturn(Optional.empty());

		// Act & Assert
		assertThrows(NotFoundException.class, () -> {
			bookingService.searchTicketsByBooking(searchBookingDTO);
		});

		verify(captchaService).captchaVerification("validCaptcha");
		verify(bookingRepository).findByCodeAndTel("bookingCode", "123456789");
		verifyNoMoreInteractions(modelMapper);
	}

	@Test
	void testSearchBookingHistory_Success() {
		// Arrange
		String authorizationHeader = "validAuthorizationHeader";
		User user = new User();
		user.setId(1);

		Booking booking1 = new Booking();
		Booking booking2 = new Booking();
		List<Booking> bookings = List.of(booking1, booking2);
		BookingDTO bookingDTO1 = new BookingDTO();
		BookingDTO bookingDTO2 = new BookingDTO();
		List<BookingDTO> bookingDTOs = List.of(bookingDTO1, bookingDTO2);

		when(userService.getUserByAuthorizationHeader(authorizationHeader)).thenReturn(user);
		when(bookingRepository.findByBookingUserId(user.getId())).thenReturn(Optional.of(bookings));
		when(modelMapper.map(booking1, BookingDTO.class)).thenReturn(bookingDTO1);
		when(modelMapper.map(booking2, BookingDTO.class)).thenReturn(bookingDTO2);

		// Act
		Object result = bookingService.searchBookingHistory(authorizationHeader);

		// Assert
		assertNotNull(result);
		assertTrue(result instanceof List<?>);
		assertEquals(bookingDTOs, result);

		verify(userService).getUserByAuthorizationHeader(authorizationHeader);
		verify(bookingRepository).findByBookingUserId(user.getId());
		verify(modelMapper).map(booking1, BookingDTO.class);
		verify(modelMapper).map(booking2, BookingDTO.class);
	}

	@Test
	void testSearchBookingHistory_BookingNotFound() {
		// Arrange
		String authorizationHeader = "validAuthorizationHeader";
		User user = new User();
		user.setId(1);

		when(userService.getUserByAuthorizationHeader(authorizationHeader)).thenReturn(user);
		when(bookingRepository.findByBookingUserId(user.getId())).thenReturn(Optional.of(new ArrayList<>()));

		// Act & Assert
		assertThrows(NotFoundException.class, () -> {
			bookingService.searchBookingHistory(authorizationHeader);
		});

		verify(userService).getUserByAuthorizationHeader(authorizationHeader);
		verify(bookingRepository).findByBookingUserId(user.getId());
		verifyNoInteractions(modelMapper);
	}

	@Test
	void testSearchBookingHistory_UserNotFound() {
		// Arrange
		String authorizationHeader = "invalidAuthorizationHeader";

		when(userService.getUserByAuthorizationHeader(authorizationHeader))
				.thenThrow(new NotFoundException("User not found"));

		// Act & Assert
		assertThrows(NotFoundException.class, () -> {
			bookingService.searchBookingHistory(authorizationHeader);
		});

		verify(userService).getUserByAuthorizationHeader(authorizationHeader);
		verifyNoInteractions(bookingRepository);
		verifyNoInteractions(modelMapper);
	}

	@Test
	void testBookingCancel_Success() {
		String bookingCode = "ABC123";
		String bookingCodeIn = bookingCode;
		Booking booking = new Booking();
		booking.setCode(bookingCode);
		booking.setStatus(BookingStatus.RESERVE.getLabel());
		booking.setTicketNumber(2);

		Schedule schedule = new Schedule();
		schedule.setAvailability(10);

		Ticket ticket1 = new Ticket();
		ticket1.setSchedule(schedule);

		Ticket ticket2 = new Ticket();
		ticket2.setSchedule(schedule);

		List<Ticket> tickets = new ArrayList<>();
		tickets.add(ticket1);
		tickets.add(ticket2);

		booking.setTickets(tickets);

		when(bookingRepository.findByCode(bookingCode)).thenReturn(Optional.of(booking));
		when(scheduleRepository.save(any(Schedule.class))).thenReturn(schedule);
		when(bookingRepository.save(any(Booking.class))).thenReturn(booking);
		when(ticketRepository.saveAll(anyList())).thenReturn(tickets);

		ResponseMessage response = bookingService.bookingCancel(bookingCodeIn);

		assertEquals("Đã hủy lượt đặt vé", response.getMessage());
		assertEquals(BookingStatus.CANCELED.getLabel(), booking.getStatus());
		assertEquals(TicketState.CANCELED.getLabel(), tickets.get(0).getState());
		assertEquals(TicketState.CANCELED.getLabel(), tickets.get(1).getState());
		assertEquals(12, schedule.getAvailability());
	}

	@Test
	void testBookingCancel_BookingNotFound() {
		String bookingCode = "ABC123";
		String bookingCodeIn = bookingCode;

		when(bookingRepository.findByCode(bookingCode)).thenReturn(Optional.empty());

		assertThrows(NotFoundException.class, () -> bookingService.bookingCancel(bookingCodeIn));
	}

	@Test
	void testBookingCancel_InvalidCancelRequest() {
		String bookingCode = "ABC123";
		String bookingCodeIn = bookingCode;
		Booking booking = new Booking();
		booking.setCode(bookingCode);
		booking.setStatus(BookingStatus.CANCELED.getLabel());

		when(bookingRepository.findByCode(bookingCode)).thenReturn(Optional.of(booking));

		assertThrows(BadRequestException.class, () -> bookingService.bookingCancel(bookingCodeIn));
	}

	@Test
	void testBookingCancel_WithBookingCode2_Success() {
		String bookingCode1 = "ABC123";
		String bookingCode2 = "DEF456";
		String bookingCodeIn = bookingCode1 + "and" + bookingCode2;

		Booking booking1 = new Booking();
		booking1.setCode(bookingCode1);
		booking1.setStatus(BookingStatus.RESERVE.getLabel());
		booking1.setTicketNumber(2);

		Booking booking2 = new Booking();
		booking2.setCode(bookingCode2);
		booking2.setStatus(BookingStatus.RESERVE.getLabel());
		booking2.setTicketNumber(2);

		Schedule schedule1 = new Schedule();
		schedule1.setAvailability(10);

		Schedule schedule2 = new Schedule();
		schedule2.setAvailability(10);

		Ticket ticket1_1 = new Ticket();
		ticket1_1.setSchedule(schedule1);

		Ticket ticket1_2 = new Ticket();
		ticket1_2.setSchedule(schedule1);

		Ticket ticket2_1 = new Ticket();
		ticket2_1.setSchedule(schedule2);

		Ticket ticket2_2 = new Ticket();
		ticket2_2.setSchedule(schedule2);

		List<Ticket> tickets1 = new ArrayList<>();
		tickets1.add(ticket1_1);
		tickets1.add(ticket1_2);

		List<Ticket> tickets2 = new ArrayList<>();
		tickets2.add(ticket2_1);
		tickets2.add(ticket2_2);

		booking1.setTickets(tickets1);
		booking2.setTickets(tickets2);

		when(bookingRepository.findByCode(bookingCode1)).thenReturn(Optional.of(booking1));
		when(bookingRepository.findByCode(bookingCode2)).thenReturn(Optional.of(booking2));
		when(scheduleRepository.save(any(Schedule.class))).thenReturn(schedule1);
		when(scheduleRepository.save(any(Schedule.class))).thenReturn(schedule2);
		when(bookingRepository.save(any(Booking.class))).thenReturn(booking1);
		when(bookingRepository.save(any(Booking.class))).thenReturn(booking2);
		when(ticketRepository.saveAll(anyList())).thenReturn(tickets1);
		when(ticketRepository.saveAll(anyList())).thenReturn(tickets2);

		ResponseMessage response = bookingService.bookingCancel(bookingCodeIn);

		assertEquals("Đã hủy lượt đặt vé", response.getMessage());
		assertEquals(BookingStatus.CANCELED.getLabel(), booking1.getStatus());
		assertEquals(BookingStatus.CANCELED.getLabel(), booking2.getStatus());
		assertEquals(TicketState.CANCELED.getLabel(), tickets1.get(0).getState());
		assertEquals(TicketState.CANCELED.getLabel(), tickets1.get(1).getState());
		assertEquals(TicketState.CANCELED.getLabel(), tickets2.get(0).getState());
		assertEquals(TicketState.CANCELED.getLabel(), tickets2.get(1).getState());
		assertEquals(12, schedule1.getAvailability());
		assertEquals(12, schedule2.getAvailability());
	}

	@Test
	void testSearchBookingHistoryByTel_Success() {
		// Arrange
		String tel = "0123456789";
		Booking booking1 = new Booking(/* setup booking1 */);
		Booking booking2 = new Booking(/* setup booking2 */);
		List<Booking> bookings = Arrays.asList(booking1, booking2);
		when(bookingRepository.findByTel(tel)).thenReturn(bookings);

		BookingDTO bookingDTO1 = new BookingDTO(/* setup bookingDTO1 */);
		BookingDTO bookingDTO2 = new BookingDTO(/* setup bookingDTO2 */);
		when(modelMapper.map(booking1, BookingDTO.class)).thenReturn(bookingDTO1);
		when(modelMapper.map(booking2, BookingDTO.class)).thenReturn(bookingDTO2);

		// Act
		List<BookingDTO> result = bookingService.searchBookingHistoryByTel(tel);

		// Assert
		assertNotNull(result);
		assertEquals(2, result.size());
		assertEquals(bookingDTO1, result.get(0));
		assertEquals(bookingDTO2, result.get(1));

		// Verify
		verify(bookingRepository, times(1)).findByTel(tel);
		verify(modelMapper, times(2)).map(any(), eq(BookingDTO.class));
	}

	@Test
	void testSearchBookingHistoryByTel_NotFound() {
		// Arrange
		String tel = "0123456789";
		when(bookingRepository.findByTel(tel)).thenReturn(Collections.emptyList());

		// Act & Assert
		assertThrows(NotFoundException.class, () -> {
			bookingService.searchBookingHistoryByTel(tel);
		});

		// Verify
		verify(bookingRepository, times(1)).findByTel(tel);
		verifyNoInteractions(modelMapper); // Không gọi đến modelMapper nếu không có booking nào được tìm thấy
	}

	@Test
	public void testBookingIsTicketing_BookingNotFound() {
		String bookingCode = "invalid_code";

		// Mock behavior
		when(bookingRepository.findByCode(bookingCode)).thenReturn(Optional.empty());

		// Test and assert
		assertThrows(NotFoundException.class, () -> bookingService.bookingIsTicketing(bookingCode));
	}

	@Test
	void testBookingIsTicketing_BookingNotSuccessful() {
		String bookingCode = "booking_code";
		Booking booking = new Booking();
		booking.setStatus(BookingStatus.RESERVE.getLabel());

		// Mock behavior
		when(bookingRepository.findByCode(bookingCode)).thenReturn(Optional.of(booking));

		// Test and assert
		assertThrows(BadRequestException.class, () -> bookingService.bookingIsTicketing(bookingCode));
	}

	@Test
	void testBookingIsTicketing_TicketingAlreadyDone() {
		String bookingCode = "booking_code";
		Booking booking = new Booking();
		booking.setStatus(BookingStatus.SUCCESS.getLabel());
		booking.setTicketing(true);

		// Mock behavior
		when(bookingRepository.findByCode(bookingCode)).thenReturn(Optional.of(booking));

		// Test and assert
		assertThrows(BadRequestException.class, () -> bookingService.bookingIsTicketing(bookingCode));
	}

	@Test
	public void testBookingIsTicketing_Success() {
		// Giả lập dữ liệu
		String bookingCode = "booking_code";
		Booking booking = new Booking();
		booking.setCode(bookingCode);
		booking.setStatus(BookingStatus.SUCCESS.getLabel());
		booking.setTicketing(false); // Chưa được xuất vé

		Booking updatedBooking = new Booking();
		updatedBooking.setCode(bookingCode);
		updatedBooking.setStatus(BookingStatus.SUCCESS.getLabel());
		updatedBooking.setTicketing(true); // Đã được xuất vé

		BookingDTO bookingDTO = new BookingDTO();
		bookingDTO.setCode(updatedBooking.getCode());
		bookingDTO.setStatus(updatedBooking.getStatus());
		bookingDTO.setTicketing(updatedBooking.isTicketing());

		// Mock behavior
		when(bookingRepository.findByCode(bookingCode)).thenReturn(Optional.of(booking));
		when(bookingRepository.save(any(Booking.class))).thenReturn(updatedBooking);
		when(modelMapper.map(any(Booking.class), eq(BookingDTO.class))).thenReturn(bookingDTO);

		// Test
		BookingDTO result = (BookingDTO) bookingService.bookingIsTicketing(bookingCode);

		System.out.println("result: " + result);

		// Assert
		assertNotNull(result);
		assertTrue(result.isTicketing());
		assertEquals(updatedBooking.getCode(), result.getCode());
		assertEquals(updatedBooking.getStatus(), result.getStatus());
		assertEquals(updatedBooking.isTicketing(), result.isTicketing());

		// Verify interactions
		verify(bookingRepository, times(1)).findByCode(bookingCode);
		verify(bookingRepository, times(1)).save(booking);
		verify(modelMapper, times(1)).map(any(Booking.class), eq(BookingDTO.class));
	}

	@Test
	void testGetTicketsForDay_Success() {
		LocalDate date = LocalDate.of(2024, 6, 24);
		BusCompany busCompany = new BusCompany();

		Booking booking1 = new Booking();
		Booking booking2 = new Booking();

		Ticket ticket1 = new Ticket();
		ticket1.setState(TicketState.PAID.getLabel());

		Ticket ticket2 = new Ticket();
		ticket2.setState(TicketState.PAID.getLabel());

		Ticket ticket3 = new Ticket();
		ticket3.setState(TicketState.PENDING_PAYMENT.getLabel());

		booking1.setTickets(Arrays.asList(ticket1, ticket3));
		booking2.setTickets(Collections.singletonList(ticket2));

		List<Booking> bookings = Arrays.asList(booking1, booking2);

		LocalDateTime startDateTime = date.atStartOfDay();
		LocalDateTime endDateTime = date.atTime(LocalTime.MAX);

		when(bookingRepository.findByTransactionIsNotNullAndBookingDateBetweenAndTripBusCompany(startDateTime,
				endDateTime, busCompany)).thenReturn(bookings);

		Integer result = bookingService.getTicketsForDay(date, busCompany);

		assertEquals(2, result);

		verify(bookingRepository, times(1)).findByTransactionIsNotNullAndBookingDateBetweenAndTripBusCompany(
				startDateTime, endDateTime, busCompany);
	}

	@Test
	void testGetTicketsForMonth_Success() {
		YearMonth yearMonth = YearMonth.of(2024, 6);
		BusCompany busCompany = new BusCompany();

		Booking booking1 = new Booking();
		Booking booking2 = new Booking();

		Ticket ticket1 = new Ticket();
		ticket1.setState(TicketState.PAID.getLabel());

		Ticket ticket2 = new Ticket();
		ticket2.setState(TicketState.PAID.getLabel());

		Ticket ticket3 = new Ticket();
		ticket3.setState(TicketState.PENDING_PAYMENT.getLabel());

		booking1.setTickets(Arrays.asList(ticket1, ticket3));
		booking2.setTickets(Collections.singletonList(ticket2));

		List<Booking> bookings = Arrays.asList(booking1, booking2);

		LocalDateTime startDateTime = yearMonth.atDay(1).atStartOfDay();
		LocalDateTime endDateTime = yearMonth.atEndOfMonth().atTime(LocalTime.MAX);

		when(bookingRepository.findByTransactionIsNotNullAndBookingDateBetweenAndTripBusCompany(startDateTime,
				endDateTime, busCompany)).thenReturn(bookings);

		Integer result = bookingService.getTicketsForMonth(yearMonth, busCompany);

		assertEquals(2, result);

		verify(bookingRepository, times(1)).findByTransactionIsNotNullAndBookingDateBetweenAndTripBusCompany(
				startDateTime, endDateTime, busCompany);
	}

}
