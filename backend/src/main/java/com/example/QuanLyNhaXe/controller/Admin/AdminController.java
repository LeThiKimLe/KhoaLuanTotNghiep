package com.example.QuanLyNhaXe.controller.Admin;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditBusCompany;
import com.example.QuanLyNhaXe.Request.EditCompanyPolicy;
import com.example.QuanLyNhaXe.Request.EditDriverByAdmin;
import com.example.QuanLyNhaXe.Request.EditStaffByAdmin;
import com.example.QuanLyNhaXe.Request.Excel;
import com.example.QuanLyNhaXe.Request.PaymentServiceFee;
import com.example.QuanLyNhaXe.Request.SignupDriverDTO;
import com.example.QuanLyNhaXe.Request.SignupStaffDTO;
import com.example.QuanLyNhaXe.service.AuthenticationService;
import com.example.QuanLyNhaXe.service.BusCompanyService;
import com.example.QuanLyNhaXe.service.ExcelService;
import com.example.QuanLyNhaXe.service.FeeService;
import com.example.QuanLyNhaXe.service.TicketService;
import com.example.QuanLyNhaXe.service.UserService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin Controller")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {
	
	private final AuthenticationService authenticationService;
	private final UserService userService;
	private final FeeService feeService;
	private final BusCompanyService busCompanyService;
	private final ExcelService excelService;
	private final TicketService ticketService;

	@PostMapping("/staffs")
	public ResponseEntity<Object> createStaff(@Valid @RequestBody SignupStaffDTO signupStaffDTO,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(authenticationService.createNewStaff(signupStaffDTO, authorization), HttpStatus.CREATED);
	}

	@PostMapping("/drivers")
	public ResponseEntity<Object> createDriver(@Valid @RequestBody SignupDriverDTO signupDriverDTO,@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(authenticationService.createDriver(signupDriverDTO,authorization), HttpStatus.CREATED);
	}
	
	@GetMapping("/drivers")
	public ResponseEntity<Object> getAllDrivers(@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(userService.getAllDrivers(authorization), HttpStatus.OK);
	}
	
	@GetMapping("/staffs")
	public ResponseEntity<Object> getAllStaffs(@Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(userService.getAllStaffs(authorization), HttpStatus.OK);
	}
	
	@PutMapping("/staffs")
	public ResponseEntity<Object> editStaff( @Valid @ModelAttribute EditStaffByAdmin editStaffByAdmin) throws IOException {
		return new ResponseEntity<>(userService.editStaffByAdmin(editStaffByAdmin), HttpStatus.OK);
	}
	
	@PutMapping("/staffs/upload")
    public ResponseEntity<Object> uploadStaffExcelFile(@ModelAttribute Excel file, @Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) throws IOException {
        return new ResponseEntity<>(excelService.readStaffFromFile(file, authorization), HttpStatus.OK);
    }

	@PutMapping("/drivers")
	public ResponseEntity<Object> editDriver( @Valid @ModelAttribute EditDriverByAdmin editDriverByAdmin) throws IOException {
		return new ResponseEntity<>(userService.editDriverByAdmin(editDriverByAdmin), HttpStatus.OK);
	}
	
	@PutMapping("/drivers/upload")
    public ResponseEntity<Object> uploadDriverExcelFile(@ModelAttribute Excel file, @Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) throws IOException {
        return new ResponseEntity<>(excelService.readDriverFromFile(file, authorization), HttpStatus.OK);
    }

	@PutMapping("/user-active")
	public ResponseEntity<Object> editActiveUser( @RequestBody EditActiveDTO editActiveDTO) {
		return new ResponseEntity<>(userService.editStateAccount(editActiveDTO), HttpStatus.OK);
	}

	
	
	@GetMapping("/drivers/not-distribute")
	public ResponseEntity<Object> getAllDriversNotDistribute() {
		return new ResponseEntity<>(userService.getDriversNotDistribute(), HttpStatus.OK);
	}
	
	@GetMapping("/fee-payment")
	public ResponseEntity<Object> getServiceFeePaymentURL(@RequestParam Integer feeId ,HttpServletRequest httpServletRequest) {
		return new ResponseEntity<>(feeService.paymentServiceFee(feeId, httpServletRequest), HttpStatus.OK);
	}
	
	@PostMapping("/fee-payment")
	public ResponseEntity<Object> gupdatePaymentServiceFee(@RequestBody PaymentServiceFee paymentServiceFee) {
		return new ResponseEntity<>(feeService.updateServiceFee(paymentServiceFee), HttpStatus.OK);
	}
	
	@PutMapping("/policy")
	public ResponseEntity<Object> editBusCompany(@Valid @RequestBody EditCompanyPolicy policy, @Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(busCompanyService.updateCompanyPolicy(policy, authorization), HttpStatus.OK);
	}

	@GetMapping("/money")
	public ResponseEntity<Object> getTicketMoneyForMonth( @RequestParam Integer month,@RequestParam Integer year, @Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return new ResponseEntity<>(ticketService.getMoneyForOneCompany(month, year, authorization), HttpStatus.OK);
	}
	
}
