package com.example.QuanLyNhaXe.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.QuanLyNhaXe.Request.CreateBusDTO;
import com.example.QuanLyNhaXe.Request.Excel;
import com.example.QuanLyNhaXe.Request.SignupDriverDTO;
import com.example.QuanLyNhaXe.Request.SignupStaffDTO;
import com.example.QuanLyNhaXe.Request.TripAssignment;
import com.example.QuanLyNhaXe.dto.BusDTO;
import com.example.QuanLyNhaXe.dto.UserDTO;
import com.example.QuanLyNhaXe.enumration.BusOverallState;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.ConflictException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Bus;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.BusType;
import com.example.QuanLyNhaXe.model.Staff;
import com.example.QuanLyNhaXe.model.Trip;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.AccountRepository;
import com.example.QuanLyNhaXe.repository.AdminRepository;
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.BusRepository;
import com.example.QuanLyNhaXe.repository.BusTypeRepository;
import com.example.QuanLyNhaXe.repository.CustomerRepository;
import com.example.QuanLyNhaXe.repository.DriverRepository;
import com.example.QuanLyNhaXe.repository.StaffRepository;
import com.example.QuanLyNhaXe.repository.SystemManagerRepository;
import com.example.QuanLyNhaXe.repository.TripRepository;
import com.example.QuanLyNhaXe.repository.UserRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;
import com.example.QuanLyNhaXe.model.Driver;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExcelService {
	private final UserService userService;
	private final StaffRepository staffRepository;
	private final DriverRepository driverRepository;
	private final TripRepository tripRepository;
	private final TripService tripService;
    private final AuthenticationService authenticationService;
    private final BusRepository busRepository;
    private final BusTypeRepository busTypeRepository;
    private final BusService busService;

    public Object readStaffFromFile(Excel request, String authentication) throws IOException {

		User adminUser = userService.getUserByAuthorizationHeader(authentication);
		BusCompany busCompany = adminUser.getStaff().getBusCompany();
		MultipartFile file = request.getFile();
		// Kiểm tra và xử lý file Excel
		if (file.isEmpty()) {
			throw new NotFoundException(Message.EMPTY_FILE);
		}
		XSSFWorkbook workbook = null;
		File convertedFile = new File(file.getOriginalFilename());
		FileOutputStream fos = new FileOutputStream(convertedFile);
		fos.write(file.getBytes());
		fos.close();
		FileInputStream fileStream = new FileInputStream(convertedFile);
		// Create Workbook instance holding reference to .xlsx file
		workbook = new XSSFWorkbook(fileStream);
		// Get first/desired sheet from the workbook
		XSSFSheet sheet = workbook.getSheetAt(0);
		// Kiểm tra dòng đầu tiên có chứa các cột A, B, C không
		Row headerRow = sheet.getRow(0);
		List<String> expectedHeader = new ArrayList<>();
		expectedHeader.add("Họ Tên");
		expectedHeader.add("Email");
		expectedHeader.add("SĐT");
		expectedHeader.add("Giới tính");
		expectedHeader.add("CCCD");
		expectedHeader.add("Địa chỉ");
		expectedHeader.add("Ngày vào làm");
		if (headerRow == null) {
			throw new BadRequestException(Message.WRONG_FILE_FORMAT);
		}
		for (int i = 0; i < 7; i++) {
			Cell headerCell = headerRow.getCell(i);
			String headerCellValue = getCellStringValue(headerCell);
			if (!expectedHeader.get(i).equals(headerCellValue)) {
				throw new BadRequestException(Message.WRONG_FILE_FORMAT);
			}
		}

		Set<String> emailCol = new HashSet<>();
		Set<String> telCol = new HashSet<>();
		Set<String> idCardCol = new HashSet<>();
		List<List<String>> staffDataList = new ArrayList<>();
		List<Staff> staffs = staffRepository.findAll();
		for (int i = 1; i <= sheet.getLastRowNum(); i++) {
			Row dataRow = sheet.getRow(i);
			// Kiểm tra không có ô trống trong hàng
			if (dataRow == null || isRowEmpty(dataRow)) {
				continue;
				// throw new NotFoundException(Message.EMPTY_DATA);
			}
			List<String> staffData = new ArrayList<>();
			for (int j = 0; j < 7; j++) {
				Cell cell = dataRow.getCell(j);
				staffData.add(getCellStringValue(cell));
			}
			// Kiểm tra các giá trị trùng nhau
			String emailValue = getCellStringValue(dataRow.getCell(1));
			String telValue = getCellStringValue(dataRow.getCell(2));
			String idValue = getCellStringValue(dataRow.getCell(4));

			if (!emailCol.add(emailValue)) {
				throw new ConflictException(Message.DUPLICATE_DATA_ROW);
			}
			if (!telCol.add(telValue)) {
				throw new ConflictException(Message.DUPLICATE_DATA_ROW);
			}
			if (!idCardCol.add(idValue)) {
				throw new ConflictException(Message.DUPLICATE_DATA_ROW);
			}
			if (staffs.stream().anyMatch(staff -> staff.getUser().getTel().equals(telValue))) {
				throw new ConflictException(Message.DATA_EXISTS);
			}
			if (staffs.stream().anyMatch(staff -> staff.getUser().getEmail().equals(emailValue))) {
				throw new ConflictException(Message.DATA_EXISTS);
			}
			if (staffs.stream().anyMatch(staff -> staff.getIdCard().equals(idValue))) {
				throw new ConflictException(Message.DATA_EXISTS);
			}
			staffDataList.add(staffData);
		}
		// Lưu dữ liệu vào database
		for (List<String> staffData : staffDataList) {
			SignupStaffDTO signupStaffDTO = SignupStaffDTO.builder().name(staffData.get(0))
					.email(staffData.get(1)).tel(staffData.get(2))
					.gender(staffData.get(3).equals("Nam") ? true : false)
					.idCard(staffData.get(4)).address(staffData.get(5))
					.beginWorkDate(java.sql.Date.valueOf(staffData.get(6))).build();
			authenticationService.createStaff(signupStaffDTO, 2, busCompany);
		}
		if (workbook != null) {
			workbook.close();
		}

		return new ResponseMessage(Message.SUCCESS_ADD_STAFF);
	}

	private String getCellStringValue(Cell cell) {
		if (cell == null) {
			return "";
		}
		if (cell.getCellType() == CellType.NUMERIC) {
			return String.valueOf((int) cell.getNumericCellValue());
		}
		return cell.getStringCellValue().trim();
	}

	private boolean isRowEmpty(Row row) {
		for (int i = row.getFirstCellNum(); i <= row.getLastCellNum(); i++) {
			Cell cell = row.getCell(i);
			if (cell != null && cell.getCellType() != CellType.BLANK) {
				return false;
			}
		}
		return true;
	}

	public Object downloadSampleFile(String requestFile) throws IOException {
		String fileName = "";
		if (requestFile.equals("staff")) {
			fileName = "NhanVien.xlsx";
		} else if (requestFile.equals("driver")) {
			fileName = "TaiXe.xlsx";
		} else if (requestFile.equals("bus")) {
			fileName = "XeBus.xlsx";
		} else {
			throw new NotFoundException(Message.INVALID_FILE_REQUEST);
		}
		ClassPathResource templateResource = new ClassPathResource(fileName);
		return templateResource;
	}

    public Object readDriverFromFile(Excel request, String authentication) throws IOException {
		User adminUser = userService.getUserByAuthorizationHeader(authentication);
		BusCompany busCompany = adminUser.getStaff().getBusCompany();
		MultipartFile file = request.getFile();
		// Kiểm tra và xử lý file Excel
		if (file.isEmpty()) {
			throw new NotFoundException(Message.EMPTY_FILE);
		}
		XSSFWorkbook workbook = null;
		File convertedFile = new File(file.getOriginalFilename());
		FileOutputStream fos = new FileOutputStream(convertedFile);
		fos.write(file.getBytes());
		fos.close();
		FileInputStream fileStream = new FileInputStream(convertedFile);
		// Create Workbook instance holding reference to .xlsx file
		workbook = new XSSFWorkbook(fileStream);
		// Get first/desired sheet from the workbook
		XSSFSheet sheet = workbook.getSheetAt(0);
		// Kiểm tra dòng đầu tiên có chứa các cột A, B, C không
		Row headerRow = sheet.getRow(0);
		List<String> expectedHeader = new ArrayList<>();
		expectedHeader.add("Họ Tên");
		expectedHeader.add("Email");
		expectedHeader.add("SĐT");
		expectedHeader.add("Giới tính");
		expectedHeader.add("CCCD");
		expectedHeader.add("Địa chỉ");
		expectedHeader.add("Ngày vào làm");
		expectedHeader.add("Hạng GPLX");
		expectedHeader.add("Số bằng lái");
		expectedHeader.add("Ngày cấp");
		expectedHeader.add("Mã tuyến phân công");
		if (headerRow == null) {
			throw new BadRequestException(Message.WRONG_FILE_FORMAT);
		}
		for (int i = 0; i < 11; i++) {
			Cell headerCell = headerRow.getCell(i);
			String headerCellValue = getCellStringValue(headerCell);
			if (!expectedHeader.get(i).equals(headerCellValue)) {
				throw new BadRequestException(Message.WRONG_FILE_FORMAT);
			}
		}

		Set<String> emailCol = new HashSet<>();
		Set<String> telCol = new HashSet<>();
		Set<String> idCardCol = new HashSet<>();
		Set<String> licenseNumberCol = new HashSet<>();
		List<List<String>> driverDataList = new ArrayList<>();
		List<Driver> drivers = driverRepository.findAll();
		for (int i = 1; i <= sheet.getLastRowNum(); i++) {
			Row dataRow = sheet.getRow(i);
			// Kiểm tra không có ô trống trong hàng
			if (dataRow == null || isRowEmpty(dataRow)) {
				throw new NotFoundException(Message.EMPTY_DATA);
			}
			List<String> driverData = new ArrayList<>();
			for (int j = 0; j < 11; j++) {
				Cell cell = dataRow.getCell(j);
				driverData.add(getCellStringValue(cell));
			}
			// Kiểm tra các giá trị trùng nhau
			String emailValue = getCellStringValue(dataRow.getCell(1));
			String telValue = getCellStringValue(dataRow.getCell(2));
			String idValue = getCellStringValue(dataRow.getCell(4));
			String licenseNumberValue = getCellStringValue(dataRow.getCell(8));

			if (!emailCol.add(emailValue)) {
				throw new ConflictException(Message.DUPLICATE_DATA_ROW);
			}
			if (!telCol.add(telValue)) {
				throw new ConflictException(Message.DUPLICATE_DATA_ROW);
			}
			if (!idCardCol.add(idValue)) {
				throw new ConflictException(Message.DUPLICATE_DATA_ROW);
			}
			if (!licenseNumberCol.add(licenseNumberValue)) {
				throw new ConflictException(Message.DUPLICATE_DATA_ROW);
			}
			if (drivers.stream().anyMatch(staff -> staff.getUser().getTel().equals(telValue))) {
				throw new ConflictException(Message.DATA_EXISTS);
			}
			if (drivers.stream().anyMatch(staff -> staff.getUser().getEmail().equals(emailValue))) {
				throw new ConflictException(Message.DATA_EXISTS);
			}
			if (drivers.stream().anyMatch(staff -> staff.getIdCard().equals(idValue))) {
				throw new ConflictException(Message.DATA_EXISTS);
			}
			driverDataList.add(driverData);
		}
		List<Integer> busId = new ArrayList<>();
		// Lưu dữ liệu vào database
		for (List<String> driverData : driverDataList) {
			SignupDriverDTO signupDriverDTO = SignupDriverDTO.builder().name(driverData.get(0))
					.email(driverData.get(1)).tel(driverData.get(2))
					.gender(driverData.get(3).equals("Nam") ? true : false)
					.idCard(driverData.get(4)).address(driverData.get(5))
					.driverLicense(driverData.get(7)).licenseNumber(driverData.get(8))
					.issueDate(java.sql.Date.valueOf(driverData.get(9)))
					.beginWorkDate(java.sql.Date.valueOf(driverData.get(6))).build();
			UserDTO driver = (UserDTO) authenticationService.createDriver(signupDriverDTO, authentication);
			if (driverData.get(10) != null && driverData.get(10) != "") {
				List<Integer> driverId = new ArrayList<>();
				driverId.add(driver.getDriver().getDriverId());
				Trip trip = tripRepository.findFirstByBusCompanyIdAndRouteCode(busCompany.getId(), driverData.get(10))
						.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
				TripAssignment tripAssignment = new TripAssignment();
				tripAssignment.setTripId(trip.getId());
				tripAssignment.setDriverId(driverId);
				tripAssignment.setBusId(busId);
				tripService.tripAssignment(tripAssignment);
			}
		}
		if (workbook != null) {
			workbook.close();
		}

		return new ResponseMessage(Message.SUCCESS_ADD_DRIVER);
	}

    public Object readBusFromFile(Excel request, String authentication) throws IOException {
		User adminUser = userService.getUserByAuthorizationHeader(authentication);
		BusCompany busCompany = adminUser.getStaff().getBusCompany();
		MultipartFile file = request.getFile();
		// Kiểm tra và xử lý file Excel
		if (file.isEmpty()) {
			throw new NotFoundException(Message.EMPTY_FILE);
		}
		XSSFWorkbook workbook = null;
		File convertedFile = new File(file.getOriginalFilename());
		FileOutputStream fos = new FileOutputStream(convertedFile);
		fos.write(file.getBytes());
		fos.close();
		FileInputStream fileStream = new FileInputStream(convertedFile);
		// Create Workbook instance holding reference to .xlsx file
		workbook = new XSSFWorkbook(fileStream);
		// Get first/desired sheet from the workbook
		XSSFSheet sheet = workbook.getSheetAt(0);
		// Kiểm tra dòng đầu tiên có chứa các cột A, B, C không
		Row headerRow = sheet.getRow(0);
		List<String> expectedHeader = new ArrayList<>();

        expectedHeader.add("Biển số xe");
        expectedHeader.add("Năm sản xuất");
        expectedHeader.add("Màu sắc");
        expectedHeader.add("Mã loại xe");
        expectedHeader.add("Mã tuyến phân công");

		if (headerRow == null) {
			throw new BadRequestException(Message.WRONG_FILE_FORMAT);
		}
		for (int i = 0; i < 5; i++) {
			Cell headerCell = headerRow.getCell(i);
			String headerCellValue = getCellStringValue(headerCell);
			if (!expectedHeader.get(i).equals(headerCellValue)) {
				throw new BadRequestException(Message.WRONG_FILE_FORMAT);
			}
		}

		Set<String> licensePlateCol = new HashSet<>();
		List<List<String>> busDataList = new ArrayList<>();
		List<Bus> bus = busRepository.findAll();
		for (int i = 1; i <= sheet.getLastRowNum(); i++) {
			Row dataRow = sheet.getRow(i);
			// Kiểm tra không có ô trống trong hàng
			if (dataRow == null || isRowEmpty(dataRow)) {
				throw new NotFoundException(Message.EMPTY_DATA);
			}
			List<String> busData = new ArrayList<>();
			for (int j = 0; j < 5; j++) {
				Cell cell = dataRow.getCell(j);
				busData.add(getCellStringValue(cell));
			}
			// Kiểm tra các giá trị trùng nhau
			String licensePlate = getCellStringValue(dataRow.getCell(0));

			if (!licensePlateCol.add(licensePlate)) {
				throw new ConflictException(Message.DUPLICATE_DATA_ROW);
			}
			if (bus.stream().anyMatch(bs -> bs.getLicensePlate().equals(licensePlate))) {
				throw new ConflictException(Message.DATA_EXISTS);
			}
			busDataList.add(busData);
		}
		List<Integer> driverId = new ArrayList<>();
		// Lưu dữ liệu vào database
		for (List<String> busData : busDataList) {
            BusType type = busTypeRepository.findFirstByBusCompanyIdAndName(busCompany.getId(), busData.get(3))
                    .orElseThrow(() -> new NotFoundException(Message.BUSTYPE_NOT_FOUND));
			CreateBusDTO createBusDTO = new CreateBusDTO();
            createBusDTO.setLicensePlate(busData.get(0));
            createBusDTO.setManufactureYear(Integer.parseInt(busData.get(1)));
            createBusDTO.setColor(busData.get(2));
            createBusDTO.setTypeId(type.getId());
            createBusDTO.setCompanyId(busCompany.getId());
            BusDTO busReturn = (BusDTO) busService.createBus(createBusDTO);
            
			if (busData.get(4) != null && busData.get(4) != "") {
                List<Integer> busId = new ArrayList<>();
                busId.add(busReturn.getId());
				Trip trip = tripRepository.findFirstByBusCompanyIdAndRouteCode(busCompany.getId(), busData.get(4))
						.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));
				TripAssignment tripAssignment = new TripAssignment();
				tripAssignment.setTripId(trip.getId());
				tripAssignment.setDriverId(driverId);
				tripAssignment.setBusId(busId);
				tripService.tripAssignment(tripAssignment);
			}
		}
		if (workbook != null) {
			workbook.close();
		}

		return new ResponseMessage(Message.UPDATE_SUCCESS);
	}
}
