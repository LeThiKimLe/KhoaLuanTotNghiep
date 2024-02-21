package com.example.QuanLyNhaXe.TestService;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import com.example.QuanLyNhaXe.Request.CreateBookingDTO;
import com.example.QuanLyNhaXe.dto.BookingSimpleDTO;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.model.Account;
import com.example.QuanLyNhaXe.model.Booking;
import com.example.QuanLyNhaXe.model.Role;
import com.example.QuanLyNhaXe.model.Schedule;
import com.example.QuanLyNhaXe.model.Staff;
import com.example.QuanLyNhaXe.model.StopStation;
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
	User user;
	
	@Mock
	Staff staff;

	@Mock
	Trip trip;
	
	@Mock
	Account account;

	@Mock
	Schedule schedule;

	@Mock
	StopStation pickStation;

	@Mock
	StopStation dropStation;

	@InjectMocks
	private BookingService bookingService;
	
	

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

//	@Test
//	void testBooking_Success() {
//
//		// Arrange
//		CreateBookingDTO createBookingDTO = new CreateBookingDTO();
//		String authorization = "Bearer <token>";
//		account.setRole(new Role(2,"STAFF"));
//		user.setStaff(staff);
//		user.setAccount(account);
//		when(userService.getUserByAuthorizationHeader(authorization)).thenReturn(user);
//		staff=user.getStaff();
//		
//		when(tripRepository.findById(anyInt())).thenReturn(Optional.of(trip));
//		when(scheduleRepository.findById(anyInt())).thenReturn(Optional.of(schedule));
//		when(stopStationRepository.findByIdAndTripIdAndStationType(anyInt(), anyInt(), anyString()))
//	    .thenReturn(Optional.of(pickStation))
//	    .thenReturn(Optional.of(dropStation));
//		when(utilityService.generateRandomString(anyInt())).thenReturn("ABC123");
//		when(schedule.getTicketPrice()).thenReturn(100);
//		when(schedule.getSpecialDay()).thenReturn(null);
//		when(utilityService.convertHCMDateTime()).thenReturn(LocalDateTime.now());
//
//		// Act
//		Object result = bookingService.booking(createBookingDTO, authorization);
//
//		// Assert
//		assertNotNull(result);
//		assertTrue(result instanceof BookingSimpleDTO);
//		verify(bookingRepository, times(1)).save(any(Booking.class));
//		verify(ticketRepository, times(1)).saveAll(anyList());
//		verify(emailService, times(1)).sendBookingInformation(any(Booking.class));
//	}
//
//	@Test
//	void testBooking_InvalidTicketNumber() {
//		// Arrange
//		CreateBookingDTO createBookingDTO = new CreateBookingDTO();
//		createBookingDTO.setSeatName(Arrays.asList("A1", "A2"));
//		createBookingDTO.setTicketNumber(3);
//		String authorization = "Bearer <token>";
//
//		User user = new User();
//		user.setAccount(new Account());
//		user.getAccount().setRole(new Role());
//		user.getAccount().getRole().setId(4);
//
//		Trip trip = new Trip();
//		Schedule schedule = new Schedule();
//
//		when(userService.getUserByAuthorizationHeader(authorization)).thenReturn(user);
//		when(tripRepository.findById(anyInt())).thenReturn(Optional.of(trip));
//		when(scheduleRepository.findById(anyInt())).thenReturn(Optional.of(schedule));
//
//		// Act and Assert
//		assertThrows(BadRequestException.class, () -> {
//			bookingService.booking(createBookingDTO, authorization);
//		});
//		verify(bookingRepository, never()).save(any(Booking.class));
//		verify(ticketRepository, never()).saveAll(anyList());
//		verify(emailService, never()).sendBookingInformation(any(Booking.class));
//	}

}
