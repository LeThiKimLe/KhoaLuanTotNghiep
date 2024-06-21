package com.example.QuanLyNhaXe.TestService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.eq;

import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.QuanLyNhaXe.Request.ChangePasswordDTO;
import com.example.QuanLyNhaXe.Request.CreateManager;
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
import com.example.QuanLyNhaXe.model.Admin;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Customer;
import com.example.QuanLyNhaXe.model.Driver;
import com.example.QuanLyNhaXe.model.Role;
import com.example.QuanLyNhaXe.model.Staff;
import com.example.QuanLyNhaXe.model.SystemManager;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.AccountRepository;
import com.example.QuanLyNhaXe.repository.AdminRepository;
import com.example.QuanLyNhaXe.repository.CustomerRepository;
import com.example.QuanLyNhaXe.repository.DriverRepository;
import com.example.QuanLyNhaXe.repository.StaffRepository;
import com.example.QuanLyNhaXe.repository.SystemManagerRepository;
import com.example.QuanLyNhaXe.repository.UserRepository;
import com.example.QuanLyNhaXe.service.AuthenticationService;
import com.example.QuanLyNhaXe.service.JwtService;
import com.example.QuanLyNhaXe.service.UserService;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthenticationTest {

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
	private SystemManagerRepository managerRepository;
	


	@Mock
	private Account mockedAccount;
	@Mock
	private User mockedUser;
	@Mock
	private Staff mockedStaff;
	@Mock
	private Admin mockedAdmin;

	@Mock
	private SystemManager manager;

	@Mock
	private Customer mockedCustomer;

	@Mock
	private BusCompany mockBusCompany;

	@Mock
	private DriverRepository driverRepository;

	@Mock
	private AdminRepository adminRepository;

	@Mock
	private ModelMapper modelMapper;

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
		Role role = new Role();
		role.setId(4);
		Account account = new Account();
		account.setActive(true);
		account.setRole(role);

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

//	@Test
//	void testRegisterCustomer_Success() {
//		// Arrange
//		String img = "img";
//		SignupDTO signupDTO = new SignupDTO();
//
//		Role role = new Role();
//		role.setId(4);
//
//		Account account = new Account();
//		account.setRole(role);
//		account.setActive(true);
//
//		User user = new User();
//		user.setAccount(account);
//
//		Customer customer = new Customer();
//		customer.setImg(img);
//		customer.setUser(user);
//		when(accountRepository.existsByUsername(signupDTO.getTel())).thenReturn(false);
//		when(passwordEncoder.encode(signupDTO.getPassword())).thenReturn("encodedPassword");
//		when(accountRepository.save(any(Account.class))).thenReturn(account);
//
//		when(userRepository.save(any(User.class))).thenReturn(user);
//		when(customerRepository.save(any(Customer.class))).thenReturn(customer);
//
//		// ResponseMessage responseMessage =
//		// authenticationService.registerCustomer(signupDTO);
//
//		// Assert
//		// assertEquals(Message.SUCCESS_REGISTER, responseMessage.getMessage());
//		verify(accountRepository, times(1)).save(any(Account.class));
//		verify(userRepository, times(1)).save(any(User.class));
//		verify(customerRepository, times(1)).save(any(Customer.class));
//	}

	@Test
	void testRegisterCustomer_AccountAlreadyExists() {
		// Arrange
		SignupDTO signupDTO = new SignupDTO();
		signupDTO.setTel("123456789");
		signupDTO.setPassword("testpassword");
		when(accountRepository.existsByUsername(signupDTO.getTel())).thenReturn(true);
		// assertThrows(ConflictException.class, () ->
		// authenticationService.registerCustomer(signupDTO));
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

	@Test
	void testCreateUser_Success() {

		SignupDTO signupDTO = new SignupDTO();
		Integer roleId = 1;
		String userName = "testUser";

		when(accountRepository.existsByUsername(userName)).thenReturn(false);
		when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
		mockedUser = authenticationService.createUser(signupDTO, roleId, userName);

		// Kiểm tra kết quả trả về
		assertNotNull(mockedUser);
		verify(accountRepository).existsByUsername(userName);
		verify(passwordEncoder).encode(signupDTO.getPassword());
	}

	@Test
	void testCreateUser_ConflictException() {
		SignupDTO signupDTO = new SignupDTO();
		Integer roleId = 1;
		String userName = "testUser";
		when(accountRepository.existsByUsername(userName)).thenReturn(true);
		assertThrows(ConflictException.class, () -> authenticationService.createUser(signupDTO, roleId, userName));
	}

	void testRegisterCustomer_Success() {
		// Arrange
		SignupDTO signupDTO = new SignupDTO();
		String authorizationHeader = "Bearer <valid_token>";
		String tel = "<verified_phone_number>";

		// Mock dependencies
		when(jwtService.extractType(anyString())).thenReturn("Verify Token");
		when(jwtService.extractUsername(anyString())).thenReturn(tel);
		when(accountRepository.existsByUsername(anyString())).thenReturn(false);
		when(accountRepository.save(any(Account.class))).thenReturn(mockedAccount);
		when(userRepository.save(any(User.class))).thenReturn(mockedUser);
		when(customerRepository.save(any(Customer.class))).thenReturn(mockedCustomer);

		// Act
		ResponseMessage response = authenticationService.registerCustomer(signupDTO, authorizationHeader);

		// Assert
		assertEquals(Message.SUCCESS_REGISTER, response.getMessage());
	}

	@Test
	void testRegisterCustomer_BadRequestException_AccessDenied() {
		// Arrange
		SignupDTO signupDTO = new SignupDTO();
		String authorizationHeader = null;

		// Act & Assert
		assertThrows(BadRequestException.class, () -> {
			authenticationService.registerCustomer(signupDTO, authorizationHeader);
		});
	}

	@Test
	void testRegisterCustomer_BadRequestException_TokenInvalid() {
		// Arrange
		SignupDTO signupDTO = new SignupDTO();
		String authorizationHeader = "Bearer <invalid_token>";

		// Mock dependencies
		when(jwtService.extractType(anyString())).thenReturn("Invalid Token");

		// Act & Assert
		assertThrows(BadRequestException.class, () -> {
			authenticationService.registerCustomer(signupDTO, authorizationHeader);
		});
	}

	@Test
	void testRegisterCustomer_BadRequestException_UnverifiedPhoneNumber() {
		// Arrange
		SignupDTO signupDTO = new SignupDTO();
		String authorizationHeader = "Bearer <valid_token>";
		String tel = "<unverified_phone_number>";

		// Mock dependencies
		when(jwtService.extractType(anyString())).thenReturn("Verify Token");
		when(jwtService.extractUsername(anyString())).thenReturn("<different_phone_number>");

		// Act & Assert
		assertThrows(BadRequestException.class, () -> {
			authenticationService.registerCustomer(signupDTO, authorizationHeader);
		});
	}

	@Test
	void testRegisterCustomer_ConflictException() {
		// Arrange
		SignupDTO signupDTO = new SignupDTO();
		String authorizationHeader = "Bearer <valid_token>";
		String tel = "<verified_phone_number>";

		// Mock dependencies
		when(jwtService.extractType(anyString())).thenReturn("Verify Token");
		when(jwtService.extractUsername(anyString())).thenReturn(tel);
		when(accountRepository.existsByUsername(anyString())).thenReturn(true);

		// Act & Assert
		assertThrows(BadRequestException.class, () -> {
			authenticationService.registerCustomer(signupDTO, authorizationHeader);
		});
	}

	@Test
	void testRegisterCustomer_NullAuthorizationHeader() {
		SignupDTO signupDTO = new SignupDTO();
		signupDTO.setTel("0123456789");
		String authorizationHeader = null;
		assertThrows(BadRequestException.class, () -> {
			authenticationService.registerCustomer(signupDTO, authorizationHeader);
		});
	}

	@Test
	void testRegisterCustomer_UnverifiedPhoneNumber() {
		// Arrange
		SignupDTO signupDTO = new SignupDTO();
		signupDTO.setTel("unverified-phone-number");
		String authorizationHeader = "Bearer your-jwt-token";
		String tel = "different-phone-number";
		String jwtToken = "your-jwt-token";

		// Mock dependencies
		when(jwtService.extractType(anyString())).thenReturn("Verify Token");
		when(jwtService.extractUsername(jwtToken)).thenReturn(tel); // Số điện thoại khác

		// Act and Assert
		BadRequestException exception = assertThrows(BadRequestException.class, () -> {
			authenticationService.registerCustomer(signupDTO, authorizationHeader);
		});

		assertEquals("Unverified phone number", exception.getMessage());
		verify(jwtService).extractUsername(jwtToken);
	}

	@Test
	void testRegisterCustomer_DataAccessException() {
		// Arrange
		SignupDTO signupDTO = new SignupDTO();
		signupDTO.setTel("unverified-phone-number");
		String authorizationHeader = "Bearer your-jwt-token";
		String tel = "unverified-phone-number"; // Số điện thoại khớp
		String jwtToken = "your-jwt-token";

		// Mock dependencies
		when(jwtService.extractType(anyString())).thenReturn("Verify Token");
		when(jwtService.extractUsername(jwtToken)).thenReturn(tel);
		when(accountRepository.existsByUsername(anyString())).thenReturn(false);
		when(accountRepository.save(any())).thenThrow(new DataAccessException(Message.INACCURATE_DATA) {
		});

		// Act
		ResponseMessage response = authenticationService.registerCustomer(signupDTO, authorizationHeader);

		// Assert
		assertEquals(Message.INACCURATE_DATA, response.getMessage());
		verify(jwtService).extractUsername(jwtToken);
	}

	@Test
	void testCreateStaff_ConflictException() {
		// Arrange
		SignupStaffDTO signupStaffDTO = SignupStaffDTO.builder().name("Test User").email("test@example.com")
				.tel("123456789").gender(true).idCard("ID123").address("123 Test Street")

				.build();
		Integer roleId = 1;
		BusCompany busCompany = new BusCompany();

		// Mock dependencies
		when(userRepository.existsByTel(signupStaffDTO.getTel())).thenReturn(true);
		when(staffRepository.existsByIdCard(signupStaffDTO.getIdCard())).thenReturn(false);

		// Act and Assert
		ConflictException exception = assertThrows(ConflictException.class, () -> {
			authenticationService.createStaff(signupStaffDTO, roleId, busCompany);
		});

		assertEquals("Nhân viên đã tồn tại trong hệ thống", exception.getMessage());
		verify(userRepository).existsByTel(signupStaffDTO.getTel());
		verify(staffRepository).existsByIdCard(signupStaffDTO.getIdCard());
	}

	@Test
	void testCreateStaff_Success() {
		// Arrange
		SignupStaffDTO signupStaffDTO = SignupStaffDTO.builder().name("Test User").email("test@example.com")
				.tel("123456789").gender(true).idCard("ID123").address("123 Test Street")

				.build();
		Integer roleId = 1;
		BusCompany busCompany = new BusCompany();

		// Mock dependencies
		when(userRepository.existsByTel(signupStaffDTO.getTel())).thenReturn(false);
		when(staffRepository.existsByIdCard(signupStaffDTO.getIdCard())).thenReturn(false);
		when(accountRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
		when(userRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
		when(staffRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

		// Act
		Staff staff = authenticationService.createStaff(signupStaffDTO, roleId, busCompany);

		// Assert
		assertNotNull(staff);
		assertEquals(signupStaffDTO.getTel(), staff.getUser().getTel());
		assertEquals(signupStaffDTO.getIdCard(), staff.getIdCard());
		verify(userRepository).existsByTel(signupStaffDTO.getTel());
		verify(staffRepository).existsByIdCard(signupStaffDTO.getIdCard());
		verify(accountRepository).save(any());
		verify(userRepository).save(any());
		verify(staffRepository).save(any());
	}

	@Test
	void testCreateStaff_DataAccessException() {
		// Arrange
		SignupStaffDTO signupStaffDTO = SignupStaffDTO.builder().name("Test User").email("test@example.com")
				.tel("123456789").gender(true).idCard("ID123").address("123 Test Street")

				.build();
		Integer roleId = 1;
		BusCompany busCompany = new BusCompany();

		// Mock dependencies
		when(userRepository.existsByTel(signupStaffDTO.getTel())).thenReturn(false);
		when(staffRepository.existsByIdCard(signupStaffDTO.getIdCard())).thenReturn(false);
		when(accountRepository.save(any())).thenThrow(new DataAccessException(Message.INACCURATE_DATA) {
		});

		// Act
		Staff staff = authenticationService.createStaff(signupStaffDTO, roleId, busCompany);

		// Assert
		assertNotNull(staff);
		assertNull(staff.getIdCard());
		verify(userRepository).existsByTel(signupStaffDTO.getTel());
		verify(staffRepository).existsByIdCard(signupStaffDTO.getIdCard());
		verify(accountRepository).save(any());
	}

	@Test
	void testCreateDriver_ConflictException_ExistingDriver() {
		// Arrange
		SignupDriverDTO signupDriverDTO = SignupDriverDTO.builder().name("Test Driver").email("driver@example.com")
				.tel("123456789").gender(true).idCard("ID123").address("123 Test Street")

				.licenseNumber("LIC123")

				.driverLicense("DL123").build();
		String authentication = "Bearer valid_token";

		// Mock dependencies
		when(userRepository.existsByTel(signupDriverDTO.getTel())).thenReturn(true);
		when(driverRepository.existsByIdCard(signupDriverDTO.getIdCard())).thenReturn(false);
		when(driverRepository.existsByLicenseNumber(signupDriverDTO.getLicenseNumber())).thenReturn(false);

		// Act and Assert
		ConflictException exception = assertThrows(ConflictException.class, () -> {
			authenticationService.createDriver(signupDriverDTO, authentication);
		});

		assertEquals("Tài xế đã tồn tại trong hệ thống", exception.getMessage());
		verify(userRepository).existsByTel(signupDriverDTO.getTel());
		verify(driverRepository).existsByIdCard(signupDriverDTO.getIdCard());
	}

	@Test
	void testCreateDriver_ConflictException_ExistingLicenseNumber() {
		// Arrange
		SignupDriverDTO signupDriverDTO = SignupDriverDTO.builder().name("Test Driver").email("driver@example.com")
				.tel("123456789").gender(true).idCard("ID123").address("123 Test Street")

				.licenseNumber("LIC123")

				.driverLicense("DL123").build();
		String authentication = "Bearer valid_token";

		// Mock dependencies
		when(userRepository.existsByTel(signupDriverDTO.getTel())).thenReturn(false);
		when(driverRepository.existsByIdCard(signupDriverDTO.getIdCard())).thenReturn(false);
		when(driverRepository.existsByLicenseNumber(signupDriverDTO.getLicenseNumber())).thenReturn(true);

		// Act and Assert
		ConflictException exception = assertThrows(ConflictException.class, () -> {
			authenticationService.createDriver(signupDriverDTO, authentication);
		});

		assertEquals("Số bằng lái tồn tại trong hệ thống", exception.getMessage());
		verify(userRepository).existsByTel(signupDriverDTO.getTel());
		verify(driverRepository).existsByIdCard(signupDriverDTO.getIdCard());
		verify(driverRepository).existsByLicenseNumber(signupDriverDTO.getLicenseNumber());
	}

	@Test
	void testCreateDriver_Success() {
		// Arrange
		SignupDriverDTO signupDriverDTO = SignupDriverDTO.builder().name("Test Driver").email("driver@example.com")
				.tel("123456789").gender(true).idCard("ID123").address("123 Test Street")

				.licenseNumber("LIC123")

				.driverLicense("DL123").build();
		String authentication = "Bearer valid_token";
		User adminUser = new User();
		Staff adminStaff = new Staff();
		BusCompany busCompany = new BusCompany();
		adminStaff.setBusCompany(busCompany);
		adminUser.setStaff(adminStaff);

		// Mock dependencies
		when(userRepository.existsByTel(signupDriverDTO.getTel())).thenReturn(false);
		when(driverRepository.existsByIdCard(signupDriverDTO.getIdCard())).thenReturn(false);
		when(driverRepository.existsByLicenseNumber(signupDriverDTO.getLicenseNumber())).thenReturn(false);
		when(userService.getUserByAuthorizationHeader(authentication)).thenReturn(adminUser);
		when(accountRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
		when(userRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
		when(driverRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
		when(modelMapper.map(any(), any())).thenReturn(new UserDTO());

		// Act
		UserDTO userDTO = (UserDTO) authenticationService.createDriver(signupDriverDTO, authentication);

		// Assert
		assertNotNull(userDTO);
		verify(userRepository).existsByTel(signupDriverDTO.getTel());
		verify(driverRepository).existsByIdCard(signupDriverDTO.getIdCard());
		verify(driverRepository).existsByLicenseNumber(signupDriverDTO.getLicenseNumber());
		verify(accountRepository).save(any());
		verify(userRepository).save(any());
		verify(driverRepository).save(any());
	}

	@Test
	void testCreateDriver_DataAccessException() {
		// Arrange
		SignupDriverDTO signupDriverDTO = SignupDriverDTO.builder().name("Test Driver").email("driver@example.com")
				.tel("123456789").gender(true).idCard("ID123").address("123 Test Street")

				.licenseNumber("LIC123")

				.driverLicense("DL123").build();
		String authentication = "Bearer valid_token";
		User adminUser = new User();
		Staff adminStaff = new Staff();
		BusCompany busCompany = new BusCompany();
		adminStaff.setBusCompany(busCompany);
		adminUser.setStaff(adminStaff);

		// Mock dependencies
		when(userRepository.existsByTel(signupDriverDTO.getTel())).thenReturn(false);
		when(driverRepository.existsByIdCard(signupDriverDTO.getIdCard())).thenReturn(false);
		when(driverRepository.existsByLicenseNumber(signupDriverDTO.getLicenseNumber())).thenReturn(false);
		when(userService.getUserByAuthorizationHeader(authentication)).thenReturn(adminUser);
		when(accountRepository.save(any())).thenThrow(new DataAccessException(Message.INACCURATE_DATA) {
		});

		// Act
		ResponseMessage response = (ResponseMessage) authenticationService.createDriver(signupDriverDTO,
				authentication);

		// Assert
		assertNotNull(response);
		assertEquals(Message.INACCURATE_DATA, response.getMessage());
		verify(userRepository).existsByTel(signupDriverDTO.getTel());
		verify(driverRepository).existsByIdCard(signupDriverDTO.getIdCard());
		verify(driverRepository).existsByLicenseNumber(signupDriverDTO.getLicenseNumber());
		verify(accountRepository).save(any());
	}

	@Test
	void testCreateManager_Success() {
		// Arrange
		CreateManager createManager = new CreateManager();
		createManager.setName("Test Manager");
		createManager.setEmail("manager@example.com");
		createManager.setTel("123456789");
		createManager.setGender(true);
		createManager.setIdCard("ID123");
		createManager.setAddress("456 Test Street");

		// Mock dependencies
		when(userRepository.existsByTel(createManager.getTel())).thenReturn(false);
		when(managerRepository.existsByIdCard(createManager.getIdCard())).thenReturn(false);
		when(accountRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
		when(userRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
		when(managerRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

		// Act
		ResponseMessage responseMessage = authenticationService.createManager(createManager);

		// Assert
		assertNotNull(responseMessage);
		assertEquals(Message.SUCCESS_ADD_STAFF, responseMessage.getMessage());
		verify(userRepository).existsByTel(createManager.getTel());
		verify(managerRepository).existsByIdCard(createManager.getIdCard());
		verify(accountRepository).save(any());
		verify(userRepository).save(any());
		verify(managerRepository).save(any());
	}

	@Test
	void testCreateManager_ConflictException() {
		// Arrange
		CreateManager createManager = new CreateManager();
		createManager.setTel("existing_tel");
		createManager.setIdCard("existing_id");

		// Mock dependencies
		when(userRepository.existsByTel("existing_tel")).thenReturn(true);
		when(managerRepository.existsByIdCard("existing_id")).thenReturn(true);

		// Act and Assert
		ConflictException exception = assertThrows(ConflictException.class, () -> {
			authenticationService.createManager(createManager);
		});
		assertEquals("Nhân viên đã tồn tại trong hệ thống", exception.getMessage());
		verify(userRepository).existsByTel("existing_tel");
		verify(managerRepository).existsByIdCard("existing_id");
		verify(accountRepository, never()).save(any());
		verify(userRepository, never()).save(any());
		verify(managerRepository, never()).save(any());
	}

	@Test
	void testCreateManager_DataAccessException() {
		// Arrange
		CreateManager createManager = new CreateManager();

		// Mock dependencies
		when(userRepository.existsByTel(anyString())).thenReturn(false);
		when(managerRepository.existsByIdCard(anyString())).thenReturn(false);
		when(accountRepository.save(any())).thenThrow(mock(DataAccessException.class));

		// Act
		ResponseMessage responseMessage = authenticationService.createManager(createManager);

		// Assert
		assertNotNull(responseMessage);
		assertEquals(Message.INACCURATE_DATA, responseMessage.getMessage());
		verify(userRepository).existsByTel(nullable(String.class));
		verify(managerRepository).existsByIdCard(nullable(String.class));
		verify(accountRepository).save(any());
		verify(userRepository, never()).save(any());
		verify(managerRepository, never()).save(any());
	}

	@Test
	void testCreateNewAdmin_Success() {
		SignupStaffDTO signupStaffDTO = SignupStaffDTO.builder().name("Test User").email("test@example.com")
				.tel("123456789").gender(true).idCard("ID123").address("123 Test Street").build();

		when(authenticationService.createStaff(signupStaffDTO, 1, mockBusCompany)).thenReturn(mockedStaff);
		mockedAdmin.setStaff(mockedStaff);
		when(adminRepository.save(any(Admin.class))).thenReturn(mockedAdmin);

		mockedAdmin = authenticationService.createNewAdmin(signupStaffDTO, mockBusCompany);
		assertNotNull(mockedAdmin); // Đảm bảo không trả về null
		verify(adminRepository, times(1)).save(mockedAdmin);
	}

//	@Test
//	void testCreateNewAdmin_Failure() {
//		SignupStaffDTO signupStaffDTO = mock(SignupStaffDTO.class);
//		
//
//
//		when(authenticationService.createStaff(signupStaffDTO, 1, mockBusCompany))
//				.thenThrow(mock(DataAccessException.class));
//		mockedAdmin = authenticationService.createNewAdmin(signupStaffDTO, mockBusCompany);
//		assertNotNull(mockedAdmin);
//		
//		verify(adminRepository, never()).save(mockedAdmin);
//	}

}
