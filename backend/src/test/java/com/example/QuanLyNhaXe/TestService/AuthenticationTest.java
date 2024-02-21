package com.example.QuanLyNhaXe.TestService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.QuanLyNhaXe.Request.ChangePasswordDTO;
import com.example.QuanLyNhaXe.Request.LoginDTO;
import com.example.QuanLyNhaXe.Request.SignupDTO;
import com.example.QuanLyNhaXe.Request.SignupDriverDTO;
import com.example.QuanLyNhaXe.Request.SignupStaffDTO;
import com.example.QuanLyNhaXe.dto.TokenDTO;
import com.example.QuanLyNhaXe.dto.UserDTO;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.ConflictException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Account;
import com.example.QuanLyNhaXe.model.Customer;
import com.example.QuanLyNhaXe.model.Driver;
import com.example.QuanLyNhaXe.model.Role;
import com.example.QuanLyNhaXe.model.Staff;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.AccountRepository;
import com.example.QuanLyNhaXe.repository.CustomerRepository;
import com.example.QuanLyNhaXe.repository.DriverRepository;
import com.example.QuanLyNhaXe.repository.StaffRepository;
import com.example.QuanLyNhaXe.repository.UserRepository;
import com.example.QuanLyNhaXe.service.AuthenticationService;
import com.example.QuanLyNhaXe.service.JwtService;
import com.example.QuanLyNhaXe.service.UserService;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

class AuthenticationTest {

	@Mock
	private AuthenticationManager authenticationManager;

	@Mock
	private AccountRepository accountRepository;

	@Mock
	private JwtService jwtService;

	@Mock
	private UserService userService;

	@Mock
	private CustomerRepository customerRepository;

	@Mock
	private PasswordEncoder passwordEncoder;

	@Mock
	private UserRepository userRepository;

	@Mock
	private StaffRepository staffRepository;

	@Mock
	private Account mockedAccount;
	@Mock
	private User mockedUser;
	@Mock
	private Staff mockedStaff;

	@Mock
	private DriverRepository driverRepository;

	@InjectMocks
	private AuthenticationService authenticationService;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testLogin_ValidCredentials_Success() {
		LoginDTO loginDTO = new LoginDTO();
		loginDTO.setUsername("testuser");
		loginDTO.setPassword("testpassword");

		Account account = new Account();
		account.setActive(true);

		UserDTO userDTO = new UserDTO();
		userDTO.setId(1);
		userDTO.setName("Test User");

		TokenDTO expectedTokenDTO = new TokenDTO();
		expectedTokenDTO.setAccessToken("testAccessToken");
		expectedTokenDTO.setRefreshToken("testRefreshToken");
		expectedTokenDTO.setUser(userDTO);

		Authentication authenticationMock = mock(Authentication.class);
		when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
				.thenReturn(authenticationMock);
		when(accountRepository.findByUsername(loginDTO.getUsername())).thenReturn(Optional.of(account));
		when(userService.getUserInfor(account.getId())).thenReturn(userDTO);
		when(jwtService.generateToken(account)).thenReturn(expectedTokenDTO.getAccessToken());
		when(jwtService.generateRefreshToken(account)).thenReturn(expectedTokenDTO.getRefreshToken());

		// Act
		TokenDTO tokenDTO = authenticationService.login(loginDTO);

		// Assert
		assertEquals(expectedTokenDTO.getAccessToken(), tokenDTO.getAccessToken());
		assertEquals(expectedTokenDTO.getRefreshToken(), tokenDTO.getRefreshToken());
		assertEquals(expectedTokenDTO.getUser(), tokenDTO.getUser());

		verify(accountRepository).save(account);

	}

	@Test
	void testLogin_InactiveAccount_ExceptionThrown() {
		// Arrange
		LoginDTO loginDTO = new LoginDTO("inactiveUser", "password");
		Account inactiveAccount = new Account();
		inactiveAccount.setActive(false);

		when(accountRepository.findByUsername(anyString())).thenReturn(Optional.of(inactiveAccount));
		when(authenticationManager.authenticate(any())).thenReturn(null);

		// Act & Assert
		assertThrows(BadRequestException.class, () -> authenticationService.login(loginDTO));
	}

	@Test
	void testLogin_AccountNotFound_ExceptionThrown() {
		// Arrange
		LoginDTO loginDTO = new LoginDTO("nonExistingUser", "password");

		when(accountRepository.findByUsername(anyString())).thenReturn(Optional.empty());

		// Act & Assert
		assertThrows(NotFoundException.class, () -> authenticationService.login(loginDTO));
	}

	@Test
	void testRegisterCustomer_Success() {
		// Arrange
		String img = "img";
		SignupDTO signupDTO = new SignupDTO();

		Role role = new Role();
		role.setId(4);

		Account account = new Account();
		account.setRole(role);
		account.setActive(true);

		User user = new User();
		user.setAccount(account);

		Customer customer = new Customer();
		customer.setImg(img);
		customer.setUser(user);
		when(accountRepository.existsByUsername(signupDTO.getTel())).thenReturn(false);
		when(passwordEncoder.encode(signupDTO.getPassword())).thenReturn("encodedPassword");
		when(accountRepository.save(any(Account.class))).thenReturn(account);

		when(userRepository.save(any(User.class))).thenReturn(user);
		when(customerRepository.save(any(Customer.class))).thenReturn(customer);

		//ResponseMessage responseMessage = authenticationService.registerCustomer(signupDTO);

		// Assert
		//assertEquals(Message.SUCCESS_REGISTER, responseMessage.getMessage());
		verify(accountRepository, times(1)).save(any(Account.class));
		verify(userRepository, times(1)).save(any(User.class));
		verify(customerRepository, times(1)).save(any(Customer.class));
	}

	@Test
	void testRegisterCustomer_AccountAlreadyExists() {
		// Arrange
		SignupDTO signupDTO = new SignupDTO();
		signupDTO.setTel("123456789");
		signupDTO.setPassword("testpassword");
		when(accountRepository.existsByUsername(signupDTO.getTel())).thenReturn(true);
		//assertThrows(ConflictException.class, () -> authenticationService.registerCustomer(signupDTO));
	}

	@Test
	void testCreateStaff_Success() {
		SignupStaffDTO signupStaffDTO = new SignupStaffDTO();
		signupStaffDTO.setEmail("example@gmail.com");
		signupStaffDTO.setTel("123456789");
		when(staffRepository.existsByIdCard(anyString())).thenReturn(false);
		when(accountRepository.save(any())).thenReturn(mockedAccount);
		when(userRepository.save(any())).thenReturn(mockedUser);
		when(staffRepository.save(any())).thenReturn(mockedStaff);

		// Call the method
		ResponseMessage responseMessage = authenticationService.createStaff(signupStaffDTO);

		// Assertions
		assertNotNull(responseMessage);
		assertEquals(Message.SUCCESS_ADD_STAFF, responseMessage.getMessage());
		// Add more assertions based on your implementation
	}

	@Test
	void testCreateStaff_ConflictException() {

		SignupStaffDTO signupStaffDTO = new SignupStaffDTO();
		signupStaffDTO.setEmail("example@gmail.com");
		signupStaffDTO.setTel("123456789");
		signupStaffDTO.setIdCard("123623423435");
		when(staffRepository.existsByIdCard(signupStaffDTO.getIdCard())).thenReturn(true);
		assertThrows(ConflictException.class, () -> authenticationService.createStaff(signupStaffDTO));
	}

	@Test
	void testCreateStaff_DataAccessException() {
		SignupStaffDTO signupStaffDTO = new SignupStaffDTO();
		signupStaffDTO.setEmail("example@gmail.com");
		signupStaffDTO.setTel("123456789");
		when(staffRepository.existsByIdCard(anyString())).thenReturn(false);
		when(accountRepository.save(any())).thenReturn(mockedAccount);
		when(accountRepository.save(any())).thenReturn(mockedAccount);
		doThrow(new DataAccessException(Message.INACCURATE_DATA) {

			private static final long serialVersionUID = -7531618532972041231L;
		}).when(userRepository).save(any());
		ResponseMessage responseMessage = authenticationService.createStaff(signupStaffDTO);
		assertNotNull(responseMessage);
		assertEquals(Message.INACCURATE_DATA, responseMessage.getMessage());
	}

	@Test
	void testCreateDriver() {

		SignupDriverDTO signupDriverDTO = new SignupDriverDTO();
		signupDriverDTO.setEmail("test@example.com");
		signupDriverDTO.setTel("123456789");
		when(driverRepository.existsByIdCard(anyString())).thenReturn(false);
		when(driverRepository.existsByLicenseNumber(anyString())).thenReturn(false);
		Object object = authenticationService.createDriver(signupDriverDTO);
		
		verify(accountRepository, times(1)).save(any(Account.class));
		verify(userRepository, times(1)).save(any(User.class));
		verify(driverRepository, times(1)).save(any(Driver.class));
	}

	@Test
	void testCreateDriverWithExistingIdCard() {
		SignupDriverDTO signupDriverDTO = new SignupDriverDTO();
		signupDriverDTO.setEmail("test@example.com");
		signupDriverDTO.setTel("123456789");
		signupDriverDTO.setIdCard("123456789112");
		when(driverRepository.existsByIdCard(signupDriverDTO.getIdCard())).thenReturn(true);

		assertThrows(ConflictException.class, () -> {
			authenticationService.createDriver(signupDriverDTO);
		});
		verify(driverRepository, never()).save(any(Driver.class));
	}

	@Test
	void testCreateDriverWithExistingLicenseNumber() {
		SignupDriverDTO signupDriverDTO = new SignupDriverDTO();
		signupDriverDTO.setEmail("test@example.com");
		signupDriverDTO.setTel("123456789");
		signupDriverDTO.setLicenseNumber("123-abc");
		when(driverRepository.existsByLicenseNumber(signupDriverDTO.getLicenseNumber())).thenReturn(true);

		assertThrows(ConflictException.class, () -> {
			authenticationService.createDriver(signupDriverDTO);
		});
		verify(driverRepository, never()).save(any(Driver.class));
	}

	@Test
	void testRefreshToken_Success() {
		// Arrange
		HttpServletRequest request = mock(HttpServletRequest.class);
		String authHeader = "Bearer refreshToken";
		Integer userId = 1;
		Date expirationDate = new Date();
		User user = new User();
		Account account = new Account();
		account.setRefreshToken("refreshToken");
		user.setAccount(account);
		TokenDTO tokenDTO = new TokenDTO("accessToken", "newRefreshToken", null);

		when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(authHeader);
		when(jwtService.extractUsername("refreshToken")).thenReturn(String.valueOf(userId));
		when(jwtService.extractExiration("refreshToken")).thenReturn(expirationDate);
		when(userRepository.findById(userId)).thenReturn(Optional.of(user));
		when(jwtService.isTokenValid("refreshToken", account)).thenReturn(true);
		when(jwtService.generateToken(account)).thenReturn("accessToken");
		when(jwtService.generateNewRefreshToken(expirationDate, account)).thenReturn("newRefreshToken");
		when(accountRepository.save(account)).thenReturn(account);

		// Act
		Object result = authenticationService.refreshToken(request);

		// Assert
		assertEquals(tokenDTO, result);
		verify(accountRepository, times(1)).save(account);
	}

	@Test
	void testRefreshToken_ExpiredToken() {
		// Arrange
		HttpServletRequest request = mock(HttpServletRequest.class);
		String authHeader = "Bearer expiredToken";

		when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(authHeader);
		when(jwtService.extractUsername("expiredToken")).thenThrow(ExpiredJwtException.class);

		// Act
		Object result = authenticationService.refreshToken(request);

		// Assert
		assertEquals("Token has expired", result);
	}

	@Test
	void testRefreshToken_InvalidRefreshToken() {
		// Arrange
		HttpServletRequest request = mock(HttpServletRequest.class);
		String authHeader = "Bearer refreshToken";
		Integer userId = 1;
		User user = new User();
		Account account = new Account();
		user.setAccount(account);
		account.setRefreshToken("differentToken");

		when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(authHeader);
		when(jwtService.extractUsername("refreshToken")).thenReturn(String.valueOf(userId));
		when(userRepository.findById(userId)).thenReturn(Optional.of(user));

		// Act & Assert
		assertThrows(BadRequestException.class, () -> {
			authenticationService.refreshToken(request);
		});
	}

	@Test
	void testRefreshToken_InvalidToken() {
		// Arrange
		HttpServletRequest request = mock(HttpServletRequest.class);
		String authHeader = "Bearer refreshToken";
		Integer userId = 1;
		Date expirationDate = new Date();
		User user = new User();
		Account account = new Account();
		user.setAccount(account);
		account.setRefreshToken("refreshToken");

		when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(authHeader);
		when(jwtService.extractUsername("refreshToken")).thenReturn(String.valueOf(userId));
		when(jwtService.extractExiration("refreshToken")).thenReturn(expirationDate);
		when(userRepository.findById(userId)).thenReturn(Optional.of(user));
		when(jwtService.isTokenValid("refreshToken", account)).thenReturn(false);

		// Act & Assert
		assertThrows(BadRequestException.class, () -> {
			authenticationService.refreshToken(request);
		});
	}

	@Test
	void testLogout_ValidRefreshToken() {
		// Arrange
		HttpServletRequest request = mock(HttpServletRequest.class);
		HttpServletResponse response = mock(HttpServletResponse.class);
		String authHeader = "Bearer validToken";
		Integer userId = 1;
		User user = new User();
		Account account = new Account();
		account.setRefreshToken("validRefreshToken");
		user.setAccount(account);

		when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(authHeader);
		when(jwtService.extractUsername("validToken")).thenReturn(String.valueOf(userId));
		when(userRepository.findById(userId)).thenReturn(Optional.of(user));

		// Act
		ResponseMessage result = authenticationService.logout(request, response);

		// Assert
		assertNull(account.getRefreshToken());
		verify(accountRepository, times(1)).save(account);
		verify(request, times(1)).getHeader(HttpHeaders.AUTHORIZATION);
		verify(jwtService, times(1)).extractUsername("validToken");
		verify(userRepository, times(1)).findById(userId);
		assertEquals("Đăng xuất thành công", result.getMessage());
	}

	@Test
	void testLogout_InvalidRefreshToken() {
		// Arrange
		HttpServletRequest request = mock(HttpServletRequest.class);
		HttpServletResponse response = mock(HttpServletResponse.class);
		String authHeader = "Bearer invalidToken";
		Integer userId = 1;
		User user = new User();
		Account account = new Account();
		account.setRefreshToken(null);
		user.setAccount(account);

		when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(authHeader);
		when(jwtService.extractUsername("invalidToken")).thenReturn(String.valueOf(userId));
		when(userRepository.findById(userId)).thenReturn(Optional.of(user));

		// Act & Assert
		assertThrows(NotFoundException.class, () -> {
			authenticationService.logout(request, response);
		});

		verify(accountRepository, never()).save(any(Account.class));
		verify(request, times(1)).getHeader(HttpHeaders.AUTHORIZATION);
		verify(jwtService, times(1)).extractUsername("invalidToken");
		verify(userRepository, times(1)).findById(userId);
		verify(response, never()).setStatus(anyInt());
	}

	@Test
	void testChangePassword_ValidPassword() {
		// Arrange
		String authorization = "Bearer <token>";
		ChangePasswordDTO changePasswordDTO = new ChangePasswordDTO();
		changePasswordDTO.setOldPassword("oldPassword");
		changePasswordDTO.setNewPassword("newPassword");

		User user = new User();
		Account account = new Account();
		account.setPassword(passwordEncoder.encode("oldPassword"));
		user.setAccount(account);

		when(userService.getUserByAuthorizationHeader(authorization)).thenReturn(user);
		when(passwordEncoder.matches(changePasswordDTO.getOldPassword(), account.getPassword())).thenReturn(true);

		// Act
		ResponseMessage response = authenticationService.changePassword(changePasswordDTO, authorization);

		// Assert
		assertEquals("Đổi mật khẩu thành công", response.getMessage());
		verify(accountRepository, times(1)).save(account);
	}

	@Test
	void testChangePassword_EmptyPasswords() {
		User user = new User();
		String authorization = "Bearer <token>";
		ChangePasswordDTO changePasswordDTO = new ChangePasswordDTO();
		changePasswordDTO.setOldPassword("");
		changePasswordDTO.setNewPassword("");

		when(userService.getUserByAuthorizationHeader(authorization)).thenReturn(user);
		BadRequestException exception = assertThrows(BadRequestException.class, () -> {
			authenticationService.changePassword(changePasswordDTO, authorization);
		});
		assertEquals("Mật khẩu không được để trống", exception.getMessage());
	}

	@Test
	void testChangePassword_IncorrectOldPassword() {
		// Arrange
		String authorization = "Bearer <token>";
		ChangePasswordDTO changePasswordDTO = new ChangePasswordDTO();
		changePasswordDTO.setOldPassword("wrongPassword");
		changePasswordDTO.setNewPassword("newPassword");

		User user = new User();
		Account account = new Account();
		account.setPassword(passwordEncoder.encode("correctPassword"));
		user.setAccount(account);

		when(userService.getUserByAuthorizationHeader(authorization)).thenReturn(user);
		when(passwordEncoder.matches(changePasswordDTO.getOldPassword(), account.getPassword())).thenReturn(false);

		// Act and Assert
		assertThrows(NotFoundException.class, () -> {
			authenticationService.changePassword(changePasswordDTO, authorization);
		});
	}

}