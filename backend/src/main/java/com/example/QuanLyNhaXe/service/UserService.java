package com.example.QuanLyNhaXe.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.QuanLyNhaXe.Request.EditAccountDTO;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditDriverByAdmin;
import com.example.QuanLyNhaXe.Request.EditStaffByAdmin;
import com.example.QuanLyNhaXe.dto.UserDTO;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Account;
import com.example.QuanLyNhaXe.model.Admin;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Customer;
import com.example.QuanLyNhaXe.model.Driver;
import com.example.QuanLyNhaXe.model.Staff;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.AccountRepository;
import com.example.QuanLyNhaXe.repository.AdminRepository;
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.CustomerRepository;
import com.example.QuanLyNhaXe.repository.DriverRepository;
import com.example.QuanLyNhaXe.repository.StaffRepository;
import com.example.QuanLyNhaXe.repository.UserRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final ModelMapper modelMapper;
	private final UserRepository userRepository;
	private final StaffRepository staffRepository;
	private final DriverRepository driverRepository;
	private final CustomerRepository customerRepository;
	private final AccountRepository accountRepository;
	private final S3Service s3Service;
	private final AdminRepository adminRepository;
	private final BusCompanyRepository busCompanyRepository;

	private final JwtService jwtService;

	public UserDTO getUserInfor(Integer accountId) {
		User user = userRepository.findByaccountId(accountId)
				.orElseThrow(() -> new NotFoundException(Message.USER_NOT_FOUND));
		return modelMapper.map(user, UserDTO.class);
	}

	public User getUserByAuthorizationHeader(String authorizationHeader) {
		if (authorizationHeader == null || authorizationHeader.isEmpty()
				|| !authorizationHeader.startsWith("Bearer ")) {
			throw new BadRequestException("Access denied");
		}
		String jwt = authorizationHeader.substring(7);
		Integer userId = Integer.valueOf(jwtService.extractUsername(jwt));
		User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(Message.USER_NOT_FOUND));
		if (!user.getAccount().isActive()) {
			throw new BadRequestException(Message.ACCOUNT_DISABLED);
		}
		return user;
	}

	public UserDTO updateInfor(String authorization, EditAccountDTO editAccountDTO) {

		User user = getUserByAuthorizationHeader(authorization);
		Integer roleId = user.getAccount().getRole().getId();

		String image = s3Service.uploadFile(editAccountDTO.getFile());
		switch (roleId) {
		case 1, 2:
			user.setTel(editAccountDTO.getTel());
			user.setGender(editAccountDTO.getGender());
			userRepository.save(user);
			Staff staff = user.getStaff();
			staff.setAddress(editAccountDTO.getAddress());
			if (!image.equals(""))
				staff.setImg(image);
			staffRepository.save(staff);
			return modelMapper.map(user, UserDTO.class);

		case 3:
			user.setTel(editAccountDTO.getTel());
			user.setGender(editAccountDTO.getGender());
			userRepository.save(user);
			Driver driver = user.getDriver();
			driver.setAddress(editAccountDTO.getAddress());
			if (!image.equals(""))
				driver.setImg(image);
			driverRepository.save(driver);
			return modelMapper.map(user, UserDTO.class);
		case 4:
			user.setName(editAccountDTO.getName());
			user.setEmail(editAccountDTO.getEmail());
			user.setGender(editAccountDTO.getGender());
			userRepository.save(user);
			Customer customer = user.getCustomer();
			if (!image.equals(""))
				customer.setImg(image);
			customerRepository.save(customer);
			return modelMapper.map(user, UserDTO.class);
		default:
			String message = "Unauthorized role";
			throw new BadRequestException(message);
		}

	}

	public Object editDriverByAdmin(EditDriverByAdmin editDriver) {
		Driver driver = driverRepository.findById(editDriver.getDriverId())
				.orElseThrow(() -> new NotFoundException(Message.DRIVER_NOT_FOUND));
		User user = driver.getUser();
		Account account = user.getAccount();
		String image = s3Service.uploadFile(editDriver.getFile());
		account.setUsername(editDriver.getEmail());
		user.setEmail(editDriver.getEmail());
		user.setName(editDriver.getName());
		user.setGender(editDriver.getGender());
		user.setTel(editDriver.getTel());
		driver.setAddress(editDriver.getAddress());
		driver.setBeginWorkDate(editDriver.getBeginWorkDate());
		driver.setLicenseNumber(editDriver.getLicenseNumber());
		driver.setIssueDate(editDriver.getIssueDate());
		driver.setIdCard(editDriver.getIdCard());
		user.setAccount(account);
		user.setDriver(driver);
		if (!image.equals(""))
			driver.setImg(image);
		try {
			accountRepository.save(account);
			userRepository.save(user);
			driverRepository.save(driver);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BadRequestException(Message.INACCURATE_DATA);
		}
		return modelMapper.map(user, UserDTO.class);

	}

	public UserDTO searchByTel(String tel) {
		User user = userRepository.findByTel(tel).orElseThrow(() -> new NotFoundException(Message.USER_NOT_FOUND));
		user.setAccount(null);
		user.setCustomer(null);
		user.setStaff(null);
		user.setDriver(null);
		return modelMapper.map(user, UserDTO.class);
	}

	public Object getAllStaffs(String authorizationHeader) {
		User user=getUserByAuthorizationHeader(authorizationHeader);
		
		List<Staff> staffs = staffRepository.findAll();
		if (staffs.isEmpty()) {
			throw new NotFoundException(Message.STAFF_NOT_FOUND);
		}
		BusCompany busCompany = busCompanyRepository.findByAdminId(user.getStaff().getAdmin().getAdminId())
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		return staffs.stream().filter(staff -> staff.getBusCompany().getId().equals(busCompany.getId()))
				.map(staff -> modelMapper.map(staff.getUser(), UserDTO.class)).toList();

	}

	public Object getAllDrivers(String authorizationHeader) {
		List<Driver> drivers = driverRepository.findAll();
		User user=getUserByAuthorizationHeader(authorizationHeader);
		if (drivers.isEmpty()) {
			throw new NotFoundException(Message.DRIVER_NOT_FOUND);
		}
		BusCompany busCompany = busCompanyRepository.findByAdminId(user.getStaff().getAdmin().getAdminId())
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		return drivers.stream()
				.filter(driver-> driver.getBusCompany().getId().equals(busCompany.getId()))
				.map(driver -> modelMapper.map(driver.getUser(), UserDTO.class)).toList();
	}
	
	public Object getAllAdmins() {
		List<Admin> admins = adminRepository.findAll();
		if (admins.isEmpty()) {
			throw new NotFoundException(Message.DRIVER_NOT_FOUND);
		}
		return admins.stream().map(admin -> modelMapper.map(admin.getStaff().getUser(), UserDTO.class)).toList();
	}

	@Transactional
	public Object editStaffByAdmin(EditStaffByAdmin editStaff) {
		Staff staff = staffRepository.findById(editStaff.getStaffId())
				.orElseThrow(() -> new NotFoundException(Message.STAFF_NOT_FOUND));
		User user = staff.getUser();
		Account account = user.getAccount();
		String image = s3Service.uploadFile(editStaff.getFile());
		account.setUsername(editStaff.getEmail());
		user.setEmail(editStaff.getEmail());
		user.setName(editStaff.getName());
		user.setGender(editStaff.getGender());
		user.setTel(editStaff.getTel());
		staff.setAddress(editStaff.getAddress());
		staff.setBeginWorkDate(editStaff.getBeginWorkDate());
		staff.setNickname("NV: " + editStaff.getName());
		staff.setIdCard(editStaff.getIdCard());
		user.setAccount(account);
		user.setStaff(staff);
		if (!image.equals(""))
			staff.setImg(image);
		try {
			accountRepository.save(account);
			userRepository.save(user);
			staffRepository.save(staff);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BadRequestException(Message.INACCURATE_DATA);
		}
		return modelMapper.map(user, UserDTO.class);

	}

	public Object editStateAccount(EditActiveDTO editActiveDTO) {
		User user = userRepository.findById(editActiveDTO.getId())
				.orElseThrow(() -> new NotFoundException(Message.USER_NOT_FOUND));
		Account account = user.getAccount();
		if ((account.isActive() && editActiveDTO.isActive()) || (!account.isActive() && !editActiveDTO.isActive())) {
			throw new BadRequestException(Message.BAD_REQUEST);
		}
		account.setActive(editActiveDTO.isActive());
		accountRepository.save(account);
		return new ResponseMessage(Message.UPDATE_SUCCESS);

	}
	
	public Object getDriversNotDistribute() {
		List<Driver> drivers=driverRepository.findByDriverTripIsNull();
		if(!drivers.isEmpty()) {
			return drivers.stream().map(driver -> modelMapper.map(driver.getUser(), UserDTO.class)).toList();
		}
		else {
			return new ResponseMessage("Tất cả các tài xế đều được phân công");
		}
		
	}
	public Object editAdmin(Integer id,String email, String idCard, String name, String tel, String address) {
		
		Staff staff = staffRepository.findById(id)
				.orElseThrow(() -> new NotFoundException(Message.STAFF_NOT_FOUND));
		User user = staff.getUser();
		Account account = user.getAccount();
		
		account.setUsername(email);
		user.setEmail(email);
		user.setName(name);
		
		user.setTel(tel);
		staff.setAddress(address);
		
		staff.setNickname("NV: " + name);
		staff.setIdCard(idCard);
		user.setAccount(account);
		user.setStaff(staff);
		
		try {
			accountRepository.save(account);
			userRepository.save(user);
			staffRepository.save(staff);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BadRequestException(Message.INACCURATE_DATA);
		}
		return user;
		
	}

}
