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
import com.example.QuanLyNhaXe.dto.BusCompanyDTO;
import com.example.QuanLyNhaXe.dto.CompanyReponse;
import com.example.QuanLyNhaXe.dto.UserDTO;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Admin;
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

//	@Mock
//	private UtilityService utilityService;
//	@Mock
//	private AuthenticationService authenticationService;
//	@Mock
//	private BusCompanyRepository busCompanyRepository;
//	@Mock
//	private ModelMapper modelMapper;
//	@Mock
//	private UserService userService;
//	@Mock
//	private RouteAssignRepository routeAssignRepository;
//	@Mock
//	private RouteRepository routeRepository;
//	@Mock
//	private AdminRepository adminRepository;
//
//	@InjectMocks
//	private BusCompanyService busCompanyService;
//
//	private CreateBusCompany createBusCompany;
//	private LocalDateTime temp;
//	private LocalDate coopDate;
//	private Date date;
//	private SignupStaffDTO signupStaffDTO;
//	private BusCompany busCompany;
//	private Admin admin;
//	private UserDTO userDTO;
//	private BusCompanyDTO busCompanyDTO;
//	private CompanyReponse companyReponse;
//
//	@BeforeEach
//	void setUp() {
//		MockitoAnnotations.openMocks(this);
//
//		busCompany = new BusCompany();
//		createBusCompany = new CreateBusCompany();
//		createBusCompany.setName("Test Name");
//		createBusCompany.setTel("123456789");
//		createBusCompany.setEmail("test@example.com");
//		createBusCompany.setIdCard("123456789");
//		createBusCompany.setAddress("Test Address");
//		createBusCompany.setGender(true);
//		createBusCompany.setBusinessName("Test Business Name");
//		createBusCompany.setBusinessLicense("123456");
//
//		temp = LocalDateTime.now();
//		coopDate = temp.toLocalDate();
//		date = Date.valueOf(coopDate);
//
//		signupStaffDTO = SignupStaffDTO.builder().name(createBusCompany.getName()).tel(createBusCompany.getTel())
//				.email(createBusCompany.getEmail()).idCard(createBusCompany.getIdCard())
//				.address(createBusCompany.getAddress()).gender(createBusCompany.getGender()).beginWorkDate(date)
//				.build();
//
//		String defaultPolicy = "<p><strong>Yêu cầu khi lên xe</strong></p><p><em>--- Đang cập nhật ---</em></p><p><strong>Hành lý xách tay</strong></p><p><em>--- Đang cập nhật ---</em> </p><p><strong>Trẻ em và phụ nữ có thai</strong></p><p><em>--- Đang cập nhật ---</em> </p><p><strong>Động vật cảnh/Thú cưng</strong></p><p><em>--- Đang cập nhật ---</em> </p><p><strong>Xuất hóa đơn GTGT</strong></p><p><em>--- Đang cập nhật ---</em> </p>";
//
//		busCompany = BusCompany.builder().name(createBusCompany.getBusinessName()).coopDay(coopDate)
//				.businessLicense(createBusCompany.getBusinessLicense()).isActive(true).policy(defaultPolicy).build();
//		busCompany.setAdminId(1);
//
//		admin = new Admin();
//		admin.setAdminId(1);
//		// Assuming Admin has a Staff with a User object
//		Staff staff = new Staff();
//		User user = new User();
//		staff.setUser(user);
//		admin.setStaff(staff);
//
//		userDTO = new UserDTO();
//		busCompanyDTO = new BusCompanyDTO();
//
//		companyReponse = CompanyReponse.builder().admin(userDTO).busCompany(busCompanyDTO).build();
//	}
//
//	@Test
//	void testGetAllBusCompanySuccess() {
//		when(busCompanyRepository.findAll()).thenReturn(Arrays.asList(busCompany));
//		when(adminRepository.findById(1)).thenReturn(Optional.of(admin));
//		when(modelMapper.map(admin.getStaff().getUser(), UserDTO.class)).thenReturn(userDTO);
//		when(modelMapper.map(busCompany, BusCompanyDTO.class)).thenReturn(busCompanyDTO);
//
//		List<CompanyReponse> result = (List<CompanyReponse>) busCompanyService.getAllBusCompany();
//
//		assertNotNull(result);
//		assertEquals(1, result.size());
//		assertEquals(companyReponse, result.get(0));
//
//		verify(busCompanyRepository, times(1)).findAll();
//		verify(adminRepository, times(1)).findById(1);
//		verify(modelMapper, times(1)).map(admin.getStaff().getUser(), UserDTO.class);
//		verify(modelMapper, times(1)).map(busCompany, BusCompanyDTO.class);
//	}
//
//	@Test
//	void testGetAllBusCompanyNotFound() {
//		when(busCompanyRepository.findAll()).thenReturn(Arrays.asList());
//
//		NotFoundException thrown = assertThrows(NotFoundException.class, () -> {
//			busCompanyService.getAllBusCompany();
//		});
//
//		assertEquals(Message.COMPANY_NOT_FOUND, thrown.getMessage());
//
//		verify(busCompanyRepository, times(1)).findAll();
//		verify(adminRepository, times(0)).findById(anyInt());
//		verify(modelMapper, times(0)).map(any(), any());
//	}
//
//	@Test
//	void testGetAllBusCompanyUserNotFound() {
//		when(busCompanyRepository.findAll()).thenReturn(Arrays.asList(busCompany));
//		when(adminRepository.findById(1)).thenReturn(Optional.empty());
//
//		NotFoundException thrown = assertThrows(NotFoundException.class, () -> {
//			busCompanyService.getAllBusCompany();
//		});
//
//		assertEquals(Message.USER_NOT_FOUND, thrown.getMessage());
//
//		verify(busCompanyRepository, times(1)).findAll();
//		verify(adminRepository, times(1)).findById(1);
//		verify(modelMapper, times(0)).map(any(), any());
//	}
//	
//	 @Test
//	    void testCreateBusCompanySuccess() {
//	        when(utilityService.convertHCMDateTime()).thenReturn(temp);
//	        when(authenticationService.createNewAdmin(any(SignupStaffDTO.class), any(BusCompany.class))).thenReturn(admin);
//	        when(busCompanyRepository.save(any(BusCompany.class))).thenReturn(busCompany);
//	        when(modelMapper.map(admin.getStaff().getUser(), UserDTO.class)).thenReturn(userDTO);
//	        when(modelMapper.map(busCompany, BusCompanyDTO.class)).thenReturn(busCompanyDTO);
//
//	        CompanyReponse result = (CompanyReponse) busCompanyService.createBusCompany(createBusCompany);
//
//	        assertNotNull(result);
//	        assertEquals(companyReponse, result);
//
//	        verify(utilityService, times(1)).convertHCMDateTime();
//	        verify(authenticationService, times(1)).createNewAdmin(any(SignupStaffDTO.class), any(BusCompany.class));
//	        verify(busCompanyRepository, times(1)).save(busCompany);
//	        verify(modelMapper, times(1)).map(admin.getStaff().getUser(), UserDTO.class);
//	        verify(modelMapper, times(1)).map(busCompany, BusCompanyDTO.class);
//	    }
//
//	    @Test
//	    void testCreateBusCompanyException() {
//	        when(utilityService.convertHCMDateTime()).thenReturn(temp);
//	        when(authenticationService.createNewAdmin(any(SignupStaffDTO.class), any(BusCompany.class))).thenReturn(admin);
//	        doThrow(new RuntimeException("Save failed")).when(busCompanyRepository).save(any(BusCompany.class));
//
//	        RuntimeException thrown = assertThrows(RuntimeException.class, () -> {
//	            busCompanyService.createBusCompany(createBusCompany);
//	        });
//
//	        assertEquals("Save failed", thrown.getMessage());
//
//	        verify(utilityService, times(1)).convertHCMDateTime();
//	        verify(authenticationService, times(1)).createNewAdmin(any(SignupStaffDTO.class), any(BusCompany.class));
//	        verify(busCompanyRepository, times(1)).save(any(BusCompany.class));
//	    }
//	    
//	    @Test
//	    void testEditBusCompanySuccess() {
//	        // Mock input data
//	        EditBusCompany editBusCompany = new EditBusCompany();
//	        editBusCompany.setId(1);
//	        editBusCompany.setBusinessName("Updated Name");
//	        editBusCompany.setBusinessLicense("Updated License");
//	        editBusCompany.setEmail("updated@example.com");
//	        editBusCompany.setIdCard("123456789");
//	        editBusCompany.setName("Updated Admin Name");
//	        editBusCompany.setTel("987654321");
//	        editBusCompany.setAddress("Updated Address");
//
//	        // Mock busCompanyRepository behavior
//	        BusCompany existingBusCompany = new BusCompany();
//	        existingBusCompany.setId(1);
//	        existingBusCompany.setName("Old Name");
//	        existingBusCompany.setBusinessLicense("Old License");
//	        existingBusCompany.setAdminId(1);
//	        when(busCompanyRepository.findById(1)).thenReturn(Optional.of(existingBusCompany));
//
//	        // Mock userService.editAdmin to succeed
//	        doNothing().when(userService).editAdmin(anyInt(), eq("updated@example.com"), eq("123456789"),
//	                eq("Updated Admin Name"), eq("987654321"), eq("Updated Address"));
//
//	        // Mock busCompanyRepository.save
//	        when(busCompanyRepository.save(any(BusCompany.class))).thenReturn(existingBusCompany);
//
//	        // Mock modelMapper behavior
//	        when(modelMapper.map(existingBusCompany, BusCompanyDTO.class)).thenReturn(new BusCompanyDTO());
//
//	        // Call the method and assert the result
//	        BusCompanyDTO result = (BusCompanyDTO) busCompanyService.editBusCompany(editBusCompany);
//	        assertNotNull(result);
//	        assertEquals("Updated Name", result.getName());
//	        assertEquals("Updated License", result.getBusinessLicense());
//	    }
//
//	    @Test
//	    void testEditBusCompanyNotFoundException() {
//	        // Mock input data
//	        EditBusCompany editBusCompany = new EditBusCompany();
//	        editBusCompany.setId(1);
//
//	        // Mock busCompanyRepository behavior
//	        when(busCompanyRepository.findById(1)).thenReturn(Optional.empty());
//
//	        // Call the method and expect NotFoundException
//	        assertThrows(NotFoundException.class, () -> {
//	            busCompanyService.editBusCompany(editBusCompany);
//	        });
//	    }
//
//	    @Test
//	    void testEditBusCompanyRuntimeException() {
//	        // Mock input data
//	        EditBusCompany editBusCompany = new EditBusCompany();
//	        editBusCompany.setId(1);
//
//	        // Mock busCompanyRepository behavior
//	        BusCompany existingBusCompany = new BusCompany();
//	        existingBusCompany.setId(1);
//	        when(busCompanyRepository.findById(1)).thenReturn(Optional.of(existingBusCompany));
//
//	        // Mock userService.editAdmin to throw RuntimeException
//	        doThrow(new RuntimeException("Error editing admin")).when(userService).editAdmin(anyInt(), anyString(), anyString(),
//	                anyString(), anyString(), anyString());
//
//	        // Call the method and expect RuntimeException
//	        assertThrows(RuntimeException.class, () -> {
//	            busCompanyService.editBusCompany(editBusCompany);
//	        });
//	    }
//	    
//	    @Test
//	    void testEditStateCompanySuccess() {
//	        // Mock input data
//	        EditActiveDTO editActiveDTO = new EditActiveDTO();
//	        editActiveDTO.setId(1);
//	        editActiveDTO.setActive(true);
//
//	        // Mock busCompanyRepository behavior
//	        BusCompany existingBusCompany = new BusCompany();
//	        existingBusCompany.setId(1);
//	        existingBusCompany.setActive(false); // Initial active status
//	        when(busCompanyRepository.findById(1)).thenReturn(Optional.of(existingBusCompany));
//
//	        // Call the method
//	        BusCompanyDTO result = (BusCompanyDTO) busCompanyService.eidtStateCompany(editActiveDTO);
//
//	        // Verify save method was called with updated active status
//	        assertTrue(existingBusCompany.isActive()); // Check if active status updated to true
//
//	        // Assert the returned result
//	        assertNotNull(result);
//	        assertEquals(existingBusCompany.isActive(), result.isActive());
//	    }
//
//	    @Test
//	    void testEditStateCompanyNotFoundException() {
//	        // Mock input data
//	        EditActiveDTO editActiveDTO = new EditActiveDTO();
//	        editActiveDTO.setId(1);
//	        editActiveDTO.setActive(true);
//
//	        // Mock busCompanyRepository behavior
//	        when(busCompanyRepository.findById(1)).thenReturn(Optional.empty());
//
//	        // Call the method and expect NotFoundException
//	        assertThrows(NotFoundException.class, () -> {
//	            busCompanyService.eidtStateCompany(editActiveDTO);
//	        });
//	    }
//	
//	
	

}
