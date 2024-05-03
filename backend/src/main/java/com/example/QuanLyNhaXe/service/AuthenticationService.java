package com.example.QuanLyNhaXe.service;

import java.util.Date;

import org.modelmapper.ModelMapper;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.QuanLyNhaXe.Request.ChangePasswordDTO;
import com.example.QuanLyNhaXe.Request.CreateManager;
import com.example.QuanLyNhaXe.Request.LoginDTO;
import com.example.QuanLyNhaXe.Request.ResetPassword;
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
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.CustomerRepository;
import com.example.QuanLyNhaXe.repository.DriverRepository;
import com.example.QuanLyNhaXe.repository.StaffRepository;
import com.example.QuanLyNhaXe.repository.SystemManagerRepository;
import com.example.QuanLyNhaXe.repository.UserRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final ModelMapper modelMapper;
	private final AuthenticationManager authenticationManager;
	private final AccountRepository accountRepository;
	private final JwtService jwtService;
	private final UserService userService;
	private final AdminRepository adminRepository;
	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;
	private final CustomerRepository customerRepository;
	private final StaffRepository staffRepository;
	private final DriverRepository driverRepository;
	private static final String DEFAULT_TYPE_AUTHENTICATION = "Bearer ";
	private static final String DEFAULT_IMG = "https://bookingupfile.s3.amazonaws.com/Image/1700527483380-anh-chipi-16.jpg";
	private final TwilioService twilioService;
	private final SystemManagerRepository managerRepository;
	private final BusCompanyRepository busCompanyRepository;

	public TokenDTO login(LoginDTO loginDTO) {

		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));
		Account account = accountRepository.findByUsername(loginDTO.getUsername())
				.orElseThrow(() -> new NotFoundException(Message.ACCOUNT_NOT_FOUND));
		if (!account.isActive())
			throw new BadRequestException(Message.ACCOUNT_DISABLED);
		if((account.getRole().getId()==1||account.getRole().getId()==2)&&!account.getUser().getStaff().getBusCompany().isActive())
			throw new BadRequestException(Message.COMPANY_NOT_FOUND);

		UserDTO userDTO = userService.getUserInfor(account.getId());
		String accessToken = jwtService.generateToken(account);
		String refreshToken = jwtService.generateRefreshToken(account);
		account.setRefreshToken(refreshToken);
		accountRepository.save(account);
		return TokenDTO.builder().accessToken(accessToken).refreshToken(refreshToken).user(userDTO).build();
	}

	public User createUser(SignupDTO signupDTO, Integer roleId, String userName) {
		String oauthId;
		boolean checkExist = accountRepository.existsByUsername(userName);
		if (checkExist) {
			throw new ConflictException(Message.EXISTS_ACCOUNT);

		}
		Role role = new Role();
		role.setId(roleId);
		if(!signupDTO.getOauthId().equals("")) {
			oauthId=signupDTO.getOauthId();
		}else {
			oauthId="";
		}
		
		Account account = Account.builder().username(userName).password(passwordEncoder.encode(signupDTO.getPassword()))
				.isActive(true).role(role).oauthId(oauthId).build();
		
		return User.builder().name(signupDTO.getName()).email(signupDTO.getEmail()).tel(signupDTO.getTel())
				.gender(signupDTO.getGender()).account(account).build();

	}

	@Transactional
	public ResponseMessage registerCustomer(SignupDTO signupDTO, String authorizationHeader) {
		if (authorizationHeader == null || authorizationHeader.isEmpty()
				|| !authorizationHeader.startsWith("Bearer ")) {
			throw new BadRequestException("Access denied");
		}
		String JWT = authorizationHeader.substring(7);
		if (!jwtService.extractType(JWT).equals("Verify Token")) {
			throw new BadRequestException("Token Invalid");
		}

		String tel = jwtService.extractUsername(JWT);
		if (!tel.equals(signupDTO.getTel())) {
			throw new BadRequestException("Unverified phone number");
		}
		String userName = signupDTO.getTel();

		User user = createUser(signupDTO, 4, userName);
		Customer customer = Customer.builder().user(user).img(DEFAULT_IMG).build();

		try {
			accountRepository.save(user.getAccount());
			userRepository.save(user);
			customerRepository.save(customer);

		} catch (DataAccessException e) {
			return new ResponseMessage(Message.INACCURATE_DATA);
		}
		return new ResponseMessage(Message.SUCCESS_REGISTER);

	}

	@Transactional
	public Staff createStaff(SignupStaffDTO signupStaffDTO, Integer roleId,BusCompany busCompany) {
		User user = null;
		

		boolean checkExist1 = userRepository.existsByTel(signupStaffDTO.getTel());
		boolean checkExist2 = staffRepository.existsByIdCard(signupStaffDTO.getIdCard());
		if (checkExist2 || checkExist1) {
			throw new ConflictException("Nhân viên đã tồn tại trong hệ thống");
		}
		SignupDTO signupDTO = SignupDTO.builder().email(signupStaffDTO.getEmail()).tel(signupStaffDTO.getTel())
				.name(signupStaffDTO.getName()).gender(signupStaffDTO.getGender()).oauthId("").password("@12345678@").build();
		String userName = signupStaffDTO.getEmail();

		user = createUser(signupDTO, roleId, userName);

		Staff staff = Staff.builder().address(signupStaffDTO.getAddress())
				.beginWorkDate(signupStaffDTO.getBeginWorkDate()).idCard(signupStaffDTO.getIdCard()).img(DEFAULT_IMG)
				.nickname("NV: " + signupStaffDTO.getName()).busCompany(busCompany).user(user).build();
		try {
			accountRepository.save(user.getAccount());
			userRepository.save(user);
			staffRepository.save(staff);

		} catch (DataAccessException e) {
			return new Staff();
		}
		return staff;
	}

	@Transactional
	public Object createDriver(SignupDriverDTO signupDriverDTO, String authentication) {
		boolean checkExist1 = userRepository.existsByTel(signupDriverDTO.getTel());
		boolean checkExistIdCard = driverRepository.existsByIdCard(signupDriverDTO.getIdCard());
		if (checkExistIdCard || checkExist1) {
			throw new ConflictException("Tài xế đã tồn tại trong hệ thống");
		}
		boolean checkExistLicenseNumber = driverRepository.existsByLicenseNumber(signupDriverDTO.getLicenseNumber());
		if (checkExistLicenseNumber) {
			throw new ConflictException("Số bằng lái tồn tại trong hệ thống");
		}
		User adminUser = userService.getUserByAuthorizationHeader(authentication);
		BusCompany busCompany = adminUser.getStaff().getBusCompany();

		SignupDTO signupDTO = SignupDTO.builder().email(signupDriverDTO.getEmail()).tel(signupDriverDTO.getTel())
				.name(signupDriverDTO.getName()).gender(signupDriverDTO.getGender()).oauthId("").password("@123456@").build();
		String userName = signupDriverDTO.getEmail();
		User user = createUser(signupDTO, 3, userName);

		Driver driver = Driver.builder().address(signupDriverDTO.getAddress())
				.beginWorkDate(signupDriverDTO.getBeginWorkDate()).idCard(signupDriverDTO.getIdCard()).img(DEFAULT_IMG)
				.licenseNumber(signupDriverDTO.getLicenseNumber()).issueDate(signupDriverDTO.getIssueDate()).user(user).busCompany(busCompany)
				.build();
		user.setDriver(driver);
		try {
			accountRepository.save(user.getAccount());
			userRepository.save(user);
			driverRepository.save(driver);

		} catch (DataAccessException e) {
			return new ResponseMessage(Message.INACCURATE_DATA);
		}
		return modelMapper.map(driver.getUser(), UserDTO.class);
	}

	public Object refreshToken(HttpServletRequest request) {
		final Integer userId;
		final Date timeExiration;
		String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (authHeader == null || !authHeader.startsWith(DEFAULT_TYPE_AUTHENTICATION)) {
			throw new BadRequestException("No token to refresh");
		}
		String refreshToken = authHeader.substring(7);
		try {
			userId = Integer.valueOf(jwtService.extractUsername(refreshToken));
			timeExiration = jwtService.extractExiration(refreshToken);
		} catch (ExpiredJwtException e) {
			return "Token has expired";
		}
		User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(Message.USER_NOT_FOUND));

		if (!refreshToken.equals(user.getAccount().getRefreshToken()))
			throw new BadRequestException("Invalid token refresh");
		if (jwtService.isTokenValid(refreshToken, user.getAccount())) {
			String accessToken = jwtService.generateToken(user.getAccount());
			String newRefreshToken = jwtService.generateNewRefreshToken(timeExiration, user.getAccount());
			Account account = user.getAccount();
			account.setRefreshToken(newRefreshToken);
			accountRepository.save(account);
			return TokenDTO.builder().accessToken(accessToken).refreshToken(newRefreshToken).build();
		} else {
			throw new BadRequestException("Invalid token refresh");
		}
	}

	public ResponseMessage logout(HttpServletRequest request, HttpServletResponse response) {
		String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (authHeader == null || !authHeader.startsWith(DEFAULT_TYPE_AUTHENTICATION)) {
			throw new BadRequestException(Message.USER_NOT_FOUND);
		}
		String jwt = authHeader.substring(7);
		Integer userId = Integer.valueOf(jwtService.extractUsername(jwt));
		User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(Message.USER_NOT_FOUND));
		Account account = user.getAccount();
		if (account.getRefreshToken() != null) {
			account.setRefreshToken(null);
			accountRepository.save(account);

			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			new SecurityContextLogoutHandler().logout(request, response, authentication);
		} else
			throw new NotFoundException("Không tìm thấy Refresh Token");
		return new ResponseMessage("Đăng xuất thành công");
	}

	public ResponseMessage changePassword(ChangePasswordDTO changePasswordDTO, String authorization) {
		User user = userService.getUserByAuthorizationHeader(authorization);
		Account account = user.getAccount();
		if (changePasswordDTO.getOldPassword() == null || changePasswordDTO.getNewPassword() == null
				|| changePasswordDTO.getOldPassword().isEmpty() || changePasswordDTO.getNewPassword().isEmpty()) {
			throw new BadRequestException("Mật khẩu không được để trống");
		} else {
			if (passwordEncoder.matches(changePasswordDTO.getOldPassword(), account.getPassword())) {
				account.setRefreshToken(null);
				account.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
				accountRepository.save(account);
				return new ResponseMessage("Đổi mật khẩu thành công");
			}
			throw new NotFoundException("Mật khẩu cũ không đúng");
		}

	}

	public Object verifyAccount(ResetPassword resetPassword) {
		if (resetPassword.getTel().isEmpty() || resetPassword.getOtp().isEmpty()) {
			throw new BadRequestException("Vui lòng nhập đủ dữ liệu");
		}

		if (twilioService.verifyOtp(resetPassword.getTel(), resetPassword.getOtp())) {
			String verifyToken = jwtService.generateNewVerifyToken(resetPassword.getTel());

			return "VerifyToken:" + verifyToken;
		}
		throw new BadRequestException("OTP không hợp lệ");

	}

	public Object resetPassword(String password, String authorizationHeader) {
		if (authorizationHeader == null || authorizationHeader.isEmpty()
				|| !authorizationHeader.startsWith("Bearer ")) {
			throw new BadRequestException("Access denied");
		}
		String JWT = authorizationHeader.substring(7);

		if (!jwtService.extractType(JWT).equals("Verify Token")) {
			throw new BadRequestException("Token Invalid");
		}
		String tel = jwtService.extractUsername(JWT);

		User user = userRepository.findByTel(tel).orElseThrow(() -> new NotFoundException(Message.USER_NOT_FOUND));
		Account account = user.getAccount();
		if (password.isEmpty()) {
			throw new BadRequestException("Mật khẩu không được để trống");
		}
		account.setPassword(passwordEncoder.encode(password));
		accountRepository.save(account);
		return new ResponseMessage("Tạo mật khẩu thành công");

	}

	@Transactional
	public ResponseMessage createManager(CreateManager createManager) {

		User user = null;
		boolean checkExist1 = userRepository.existsByTel(createManager.getTel());
		boolean checkExist2 = managerRepository.existsByIdCard(createManager.getIdCard());
		if (checkExist2 || checkExist1) {
			throw new ConflictException("Nhân viên đã tồn tại trong hệ thống");
		}
		SignupDTO signupDTO = SignupDTO.builder().email(createManager.getEmail()).tel(createManager.getTel())
				.name(createManager.getName()).gender(createManager.getGender()).password("@123456789@").build();
		String userName = createManager.getEmail();
		user = createUser(signupDTO, 5, userName);
		SystemManager manager = SystemManager.builder().address(createManager.getAddress())
				.beginWorkDate(createManager.getBeginWorkDate()).idCard(createManager.getIdCard()).img(DEFAULT_IMG)
				.user(user).build();
		try {
			accountRepository.save(user.getAccount());
			userRepository.save(user);
			managerRepository.save(manager);

		} catch (DataAccessException e) {
			return new ResponseMessage(Message.INACCURATE_DATA);
		}
		return new ResponseMessage(Message.SUCCESS_ADD_STAFF);

	}

	@Transactional
	public ResponseMessage createNewStaff(SignupStaffDTO signupStaffDTO, String authentication) {
		User adminUser = userService.getUserByAuthorizationHeader(authentication);
		BusCompany busCompany = adminUser.getStaff().getBusCompany();
		createStaff(signupStaffDTO, 2,busCompany);
		
		return new ResponseMessage(Message.SUCCESS_ADD_STAFF);

	}

	@Transactional
	public Admin createNewAdmin(SignupStaffDTO signupStaffDTO, BusCompany busCompany) {
		try {
			Staff staff = createStaff(signupStaffDTO, 1,busCompany);
			
			Admin admin = Admin.builder().staff(staff).build();
			adminRepository.save(admin);
			return admin;

		} catch (DataAccessException e) {
			return new Admin();
		}
		

	}

}
