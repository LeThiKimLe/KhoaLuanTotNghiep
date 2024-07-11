package com.example.QuanLyNhaXe.TestService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import com.example.QuanLyNhaXe.Request.CreateBusCompany;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditBusCompany;
import com.example.QuanLyNhaXe.Request.SignupStaffDTO;
import com.example.QuanLyNhaXe.dto.BookingDTO;
import com.example.QuanLyNhaXe.dto.BusCompanyDTO;
import com.example.QuanLyNhaXe.dto.CompanyReponse;
import com.example.QuanLyNhaXe.dto.UserDTO;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Admin;
import com.example.QuanLyNhaXe.model.Booking;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Staff;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.AdminRepository;
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.RouteAssignRepository;
import com.example.QuanLyNhaXe.repository.RouteRepository;
import com.example.QuanLyNhaXe.service.AuthenticationService;
import com.example.QuanLyNhaXe.service.BusCompanyService;
import com.example.QuanLyNhaXe.service.UserService;
import com.example.QuanLyNhaXe.service.UtilityService;
import com.example.QuanLyNhaXe.util.Message;

import static org.mockito.ArgumentMatchers.eq;

public class BusCompanyTest {

	@Mock
	private UtilityService utilityService;
	@Mock
	private AuthenticationService authenticationService;
	@Mock
	private BusCompanyRepository busCompanyRepository;
	@Mock
	private ModelMapper modelMapper;
	@Mock
	private UserService userService;
	@Mock
	private RouteAssignRepository routeAssignRepository;
	@Mock
	private RouteRepository routeRepository;
	@Mock
	private AdminRepository adminRepository;

	@InjectMocks
	private BusCompanyService busCompanyService;

	private CreateBusCompany createBusCompany;
	private LocalDateTime temp;
	private LocalDate coopDate;
	private Date date;
	private SignupStaffDTO signupStaffDTO;
	private BusCompany busCompany;
	private Admin admin;
	private UserDTO userDTO;
	private BusCompanyDTO busCompanyDTO;
	private CompanyReponse companyReponse;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

		busCompany = new BusCompany();
		createBusCompany = new CreateBusCompany();
		createBusCompany.setName("Test Name");
		createBusCompany.setTel("123456789");
		createBusCompany.setEmail("test@example.com");
		createBusCompany.setIdCard("123456789");
		createBusCompany.setAddress("Test Address");
		createBusCompany.setGender(true);
		createBusCompany.setBusinessName("Test Business Name");
		createBusCompany.setBusinessLicense("123456");

		temp = LocalDateTime.now();
		coopDate = temp.toLocalDate();
		date = Date.valueOf(coopDate);

		signupStaffDTO = SignupStaffDTO.builder().name(createBusCompany.getName()).tel(createBusCompany.getTel())
				.email(createBusCompany.getEmail()).idCard(createBusCompany.getIdCard())
				.address(createBusCompany.getAddress()).gender(createBusCompany.getGender()).beginWorkDate(date)
				.build();

		String defaultPolicy = "<p><strong>Yêu cầu khi lên xe</strong></p><p><em>--- Đang cập nhật ---</em></p><p><strong>Hành lý xách tay</strong></p><p><em>--- Đang cập nhật ---</em> </p><p><strong>Trẻ em và phụ nữ có thai</strong></p><p><em>--- Đang cập nhật ---</em> </p><p><strong>Động vật cảnh/Thú cưng</strong></p><p><em>--- Đang cập nhật ---</em> </p><p><strong>Xuất hóa đơn GTGT</strong></p><p><em>--- Đang cập nhật ---</em> </p>";

		busCompany = BusCompany.builder().name(createBusCompany.getBusinessName()).coopDay(coopDate)
				.businessLicense(createBusCompany.getBusinessLicense()).isActive(true).policy(defaultPolicy).build();
		busCompany.setAdminId(1);

		admin = new Admin();
		admin.setAdminId(1);
		// Assuming Admin has a Staff with a User object
		Staff staff = new Staff();
		User user = new User();
		staff.setUser(user);
		admin.setStaff(staff);

		userDTO = new UserDTO();

		busCompanyDTO = new BusCompanyDTO();
		busCompanyDTO.setName(busCompany.getName());
		busCompanyDTO.setBusinessLicense(busCompany.getName());
		busCompanyDTO.setCoopDay(coopDate);
		busCompanyDTO.setBusinessLicense(busCompany.getBusinessLicense());
		busCompanyDTO.setActive(busCompany.isActive());
		busCompanyDTO.setPolicy(defaultPolicy);
		busCompanyDTO.setAdminId(busCompany.getAdminId());

		companyReponse = CompanyReponse.builder().admin(userDTO).busCompany(busCompanyDTO).build();
	}

	@Test
	void testGetAllBusCompanySuccess() {
		when(busCompanyRepository.findAll()).thenReturn(Arrays.asList(busCompany));
		when(adminRepository.findById(1)).thenReturn(Optional.of(admin));
		when(modelMapper.map(admin.getStaff().getUser(), UserDTO.class)).thenReturn(userDTO);
		when(modelMapper.map(busCompany, BusCompanyDTO.class)).thenReturn(busCompanyDTO);

		List<CompanyReponse> result = (List<CompanyReponse>) busCompanyService.getAllBusCompany();

		assertNotNull(result);
		assertEquals(1, result.size());

		verify(busCompanyRepository, times(1)).findAll();
		verify(adminRepository, times(1)).findById(1);
		verify(modelMapper, times(1)).map(admin.getStaff().getUser(), UserDTO.class);
		verify(modelMapper, times(1)).map(busCompany, BusCompanyDTO.class);
	}

	@Test
	void testGetAllBusCompanyNotFound() {
		when(busCompanyRepository.findAll()).thenReturn(Arrays.asList());

		NotFoundException thrown = assertThrows(NotFoundException.class, () -> {
			busCompanyService.getAllBusCompany();
		});

		assertEquals(Message.COMPANY_NOT_FOUND, thrown.getMessage());

		verify(busCompanyRepository, times(1)).findAll();
		verify(adminRepository, times(0)).findById(anyInt());
		verify(modelMapper, times(0)).map(any(), any());
	}

	@Test
	void testGetAllBusCompanyUserNotFound() {
		when(busCompanyRepository.findAll()).thenReturn(Arrays.asList(busCompany));
		when(adminRepository.findById(1)).thenReturn(Optional.empty());

		NotFoundException thrown = assertThrows(NotFoundException.class, () -> {
			busCompanyService.getAllBusCompany();
		});

		assertEquals(Message.USER_NOT_FOUND, thrown.getMessage());

		verify(busCompanyRepository, times(1)).findAll();
		verify(adminRepository, times(1)).findById(1);
		verify(modelMapper, times(0)).map(any(), any());
	}

	@Test
	void testEditBusCompanySuccess() {
		// Mock input data
		EditBusCompany editBusCompany = new EditBusCompany();
		editBusCompany.setId(1);
		editBusCompany.setBusinessName("Updated Name");
		editBusCompany.setBusinessLicense("Updated License");
		editBusCompany.setEmail("updated@example.com");
		editBusCompany.setIdCard("123456789");
		editBusCompany.setName("Updated Admin Name");
		editBusCompany.setTel("987654321");
		editBusCompany.setAddress("Updated Address");

		BusCompany existingBusCompany = new BusCompany();
		existingBusCompany.setId(1);
		existingBusCompany.setAdminId(1);
		existingBusCompany.setBusinessLicense("Old License");
		existingBusCompany.setName("Old Name");

		BusCompany updatedBusCompany = new BusCompany();
		updatedBusCompany.setId(1);
		updatedBusCompany.setAdminId(1);
		updatedBusCompany.setBusinessLicense("New License");
		updatedBusCompany.setName("New Name");

		BusCompanyDTO expectedDTO = new BusCompanyDTO();
		expectedDTO.setId(1);
		expectedDTO.setAdminId(1);
		expectedDTO.setName("New Name");
		expectedDTO.setBusinessLicense("New License");
		when(busCompanyRepository.findById(1)).thenReturn(Optional.of(existingBusCompany));
		when(busCompanyRepository.save(any(BusCompany.class))).thenReturn(updatedBusCompany);
		when(modelMapper.map(any(BusCompany.class), eq(BusCompanyDTO.class))).thenReturn(expectedDTO);

		BusCompanyDTO actualDTO = (BusCompanyDTO) busCompanyService.editBusCompany(editBusCompany);
		assertNotNull(actualDTO);
		assertEquals(expectedDTO.getId(), actualDTO.getId());
		assertEquals(expectedDTO.getName(), actualDTO.getName());
		assertEquals(expectedDTO.getBusinessLicense(), actualDTO.getBusinessLicense());
		verify(busCompanyRepository, times(1)).save(any(BusCompany.class));

	}

	@Test
	void testEditBusCompanyNotFoundException() {
		// Mock input data
		EditBusCompany editBusCompany = new EditBusCompany();
		editBusCompany.setId(1);

		// Mock busCompanyRepository behavior
		when(busCompanyRepository.findById(1)).thenReturn(Optional.empty());

		// Call the method and expect NotFoundException
		assertThrows(NotFoundException.class, () -> {
			busCompanyService.editBusCompany(editBusCompany);
		});
	}

	@Test
	void testEditStateCompanySuccess() {
		// Mock input data
		EditActiveDTO editActiveDTO = new EditActiveDTO();
		editActiveDTO.setId(1);
		editActiveDTO.setActive(true);

		// Mock busCompanyRepository behavior
		BusCompany existingBusCompany = new BusCompany();
		existingBusCompany.setId(1);
		existingBusCompany.setActive(false); // Initial active status
		when(busCompanyRepository.findById(1)).thenReturn(Optional.of(existingBusCompany));
		when(modelMapper.map(any(BusCompany.class), eq(BusCompanyDTO.class))).thenReturn(busCompanyDTO);

		// Call the method
		BusCompanyDTO result = (BusCompanyDTO) busCompanyService.eidtStateCompany(editActiveDTO);

		// Verify save method was called with updated active status
		assertTrue(existingBusCompany.isActive()); // Check if active status updated to true

		// Assert the returned result
		assertNotNull(result);
		assertEquals(existingBusCompany.isActive(), result.isActive());
	}

	@Test
	void testEditStateCompanyNotFoundException() {
		// Mock input data
		EditActiveDTO editActiveDTO = new EditActiveDTO();
		editActiveDTO.setId(1);
		editActiveDTO.setActive(true);

		// Mock busCompanyRepository behavior
		when(busCompanyRepository.findById(1)).thenReturn(Optional.empty());

		// Call the method and expect NotFoundException
		assertThrows(NotFoundException.class, () -> {
			busCompanyService.eidtStateCompany(editActiveDTO);
		});
	}

	@Test
	void testCreateBusCompanySuccess() {
		when(utilityService.convertHCMDateTime()).thenReturn(temp);
		when(authenticationService.createNewAdmin(any(SignupStaffDTO.class), any(BusCompany.class))).thenReturn(admin);
		when(modelMapper.map(any(User.class), any())).thenReturn(userDTO);
		when(modelMapper.map(any(BusCompany.class), any())).thenReturn(busCompanyDTO);

		CompanyReponse result = (CompanyReponse) busCompanyService.createBusCompany(createBusCompany);

		verify(busCompanyRepository, times(1)).save(any(BusCompany.class));
		assertEquals(userDTO, result.getAdmin());
		assertEquals(busCompanyDTO, result.getBusCompany());
	}

	@Test
	void testCreateBusCompany_ModelMapperThrowsException() {
		when(utilityService.convertHCMDateTime()).thenReturn(temp);
		when(authenticationService.createNewAdmin(any(SignupStaffDTO.class), any(BusCompany.class))).thenReturn(admin);
		when(busCompanyRepository.save(any(BusCompany.class))).thenReturn(busCompany);
		when(modelMapper.map(any(User.class), any())).thenThrow(new RuntimeException("Mapping error"));

		RuntimeException exception = assertThrows(RuntimeException.class, () -> {
			busCompanyService.createBusCompany(createBusCompany);
		});

		assertEquals("Mapping error", exception.getMessage());
	}

	@Test
	void testEditBusCompanyRuntimeException() {

		EditBusCompany editBusCompany = new EditBusCompany();
		editBusCompany.setId(1);

		BusCompany existingBusCompany = new BusCompany();
		existingBusCompany.setId(1);
		when(busCompanyRepository.findById(1)).thenReturn(Optional.of(existingBusCompany));

		doThrow(new RuntimeException()).when(userService).editAdmin(anyInt(), anyString(),
				anyString(), anyString(), anyString(), anyString());
	//	doThrow(new RuntimeException()).when(busCompanyRepository).save(any());
		 //doThrow(new RuntimeException("Error editing bus company")).when(busCompanyService).editBusCompany(any());

		// Assertion
		
		RuntimeException exception = assertThrows(RuntimeException.class, () -> {
			busCompanyService.editBusCompany(editBusCompany);
		});

	//	assertEquals("Error saving bus company", exception.getMessage());

		verify(busCompanyRepository, never()).save(any());
	}
	
//	 @Test
//	    public void testEditBusCompanyRuntimeException1() {
//	        // Giả lập hành vi của busCompanyRepository để trả về một đối tượng BusCompany
//	        BusCompany busCompany = new BusCompany();
//	        busCompany.setId(1);
//	        busCompany.setAdminId(1);
//	        when(busCompanyRepository.findById(anyInt())).thenReturn(Optional.of(busCompany));
//
//	        // Giả lập hành vi ném RuntimeException khi gọi phương thức editAdmin của userService
//	        doThrow(new RuntimeException("Error editing admin")).when(userService).editAdmin(anyInt(), any(), any(), any(), any(), any());
//
//	        // Tạo đối tượng EditBusCompany để truyền vào phương thức kiểm thử
//	        EditBusCompany editBusCompany = new EditBusCompany();
//	        editBusCompany.setId(1);
//	        editBusCompany.setEmail("test@example.com");
//	        editBusCompany.setIdCard("123456789");
//	        editBusCompany.setName("Test Name");
//	        editBusCompany.setTel("1234567890");
//	        editBusCompany.setAddress("123 Test Street");
//
//	        // Kiểm tra hành vi của busCompanyRepository để đảm bảo rằng phương thức save không được gọi
//	        busCompanyService.editBusCompany(editBusCompany);
//	        verify(busCompanyRepository).save(any(BusCompany.class));
//	    }

}
