package com.example.QuanLyNhaXe.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.boot.availability.AvailabilityState;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.CreateBusDTO;
import com.example.QuanLyNhaXe.Request.CreateBusType;
import com.example.QuanLyNhaXe.Request.CreateSeat;
import com.example.QuanLyNhaXe.Request.CreateSeat.SeatInfor;
import com.example.QuanLyNhaXe.Request.CreateSeatMap;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditBusDTO;
import com.example.QuanLyNhaXe.Request.EditBusType;
import com.example.QuanLyNhaXe.Request.EditSeat;
import com.example.QuanLyNhaXe.Request.EditSeatMap;
import com.example.QuanLyNhaXe.dto.BusDTO;
import com.example.QuanLyNhaXe.dto.BusQualityDTO;
import com.example.QuanLyNhaXe.dto.BusTypeDTO;
import com.example.QuanLyNhaXe.dto.SeatDTO;
import com.example.QuanLyNhaXe.dto.SeatMapDTO;
import com.example.QuanLyNhaXe.enumration.BusAvailability;
import com.example.QuanLyNhaXe.enumration.BusOverallState;
import com.example.QuanLyNhaXe.enumration.BusQualityStatus;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.ConflictException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Bus;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.BusQuality;
import com.example.QuanLyNhaXe.model.BusType;
import com.example.QuanLyNhaXe.model.Seat;
import com.example.QuanLyNhaXe.model.SeatMap;
import com.example.QuanLyNhaXe.model.Trip_Bus;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.BusQualityRepository;
import com.example.QuanLyNhaXe.repository.BusRepository;
import com.example.QuanLyNhaXe.repository.BusTypeRepository;
import com.example.QuanLyNhaXe.repository.SeatMapRepository;
import com.example.QuanLyNhaXe.repository.SeatRepository;
import com.example.QuanLyNhaXe.repository.TripBusRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BusService {
	private final BusTypeRepository busTypeRepository;
	private final BusRepository busRepository;
	private final BusQualityRepository busQualityRepository;
	private final ModelMapper modelMapper;
	private final SeatMapRepository seatMapRepository;
	private final UserService userService;
	private final SeatRepository seatRepository;
	private final BusCompanyRepository busCompanyRepository;

	public Object getAllBusType(String authentication) {
		User user = userService.getUserByAuthorizationHeader(authentication);
		List<BusType> busTypes = busTypeRepository.findAll();
		if (busTypes.isEmpty()) {
			throw new NotFoundException(Message.BUSTYPE_NOT_FOUND);
		}
		if (user.getAccount().getRole().getRoleName().equals("ADMIN")) {
			BusCompany busCompany = busCompanyRepository.findByAdminId(user.getStaff().getAdmin().getAdminId())
					.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));

			return busTypes.stream()
					.filter(busType -> busType.getBusCompany().getId()
							.equals(busCompany.getId()))
					.map(busType -> modelMapper.map(busType, BusTypeDTO.class)).toList();
		}
		return busTypes.stream().filter(null).map(busType -> modelMapper.map(busType, BusTypeDTO.class)).toList();
	}

	public Object getAllBus(String authentication) {
		User user = userService.getUserByAuthorizationHeader(authentication);

		List<Bus> busLists = busRepository.findAll();
		if (busLists.isEmpty()) {
			throw new NotFoundException(Message.BUSTYPE_NOT_FOUND);
		}
		if (user.getAccount().getRole().getRoleName().equals("ADMIN")) {
			BusCompany busCompany = busCompanyRepository.findByAdminId(user.getStaff().getAdmin().getAdminId())
					.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));

			return busLists.stream()
					.filter(busList -> busList.getBusCompany().getId()
							.equals(busCompany.getId()))
					.map(busList -> modelMapper.map(busList, BusDTO.class)).toList();
		}
		return busLists.stream()
				.map(busList -> modelMapper.map(busList, BusDTO.class)).toList();
	}

	@Transactional
	public Object createBus(CreateBusDTO createBusDTO) {

		if (busRepository.existsByLicensePlate(createBusDTO.getLicensePlate())) {
			throw new ConflictException("Giấy phép đã tồn tại");
		}
		BusType busType = busTypeRepository.findById(createBusDTO.getTypeId())
				.orElseThrow(() -> new NotFoundException(Message.BUSTYPE_NOT_FOUND));
		String state = BusQualityStatus.GOOD.getLabel();
		LocalDate currentDate = LocalDate.now();
		Date sqlDate = Date.valueOf(currentDate);
		BusQuality busQuality = BusQuality.builder().overallState(BusOverallState.NORMAL.getLabel()).tire(state)
				.updatedAt(sqlDate).steering(state).lighting(state).mirror(state).fuel(state).airCondition(state)
				.brake(state).electric(state).build();
		Bus bus = Bus.builder().color(createBusDTO.getColor()).type(busType).state(busQuality)
				.availability(BusAvailability.AVAILABLE.getLabel()).manufactureYear(createBusDTO.getManufactureYear())
				.licensePlate(createBusDTO.getLicensePlate()).build();
		try {
			busQualityRepository.save(busQuality);
			busRepository.save(bus);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ConflictException(Message.INACCURATE_DATA);

		}
		return modelMapper.map(bus, BusDTO.class);

	}

	public Object editBus(EditBusDTO editBusDTO) {

		String avai = editBusDTO.getAvailability();
		if (!avai.equals(BusAvailability.AVAILABLE.getLabel())
				&& !avai.equals(BusAvailability.OUT_OF_SERVICE.getLabel())
				&& !avai.equals(BusAvailability.UNDER_MAINTENANCE.getLabel())) {
			throw new BadRequestException(Message.BAD_REQUEST);
		}
		if (busRepository.existsByLicensePlate(editBusDTO.getLicensePlate())) {
			throw new ConflictException("Giấy phép đã tồn tại");
		}
		BusType busType = busTypeRepository.findById(editBusDTO.getTypeId())
				.orElseThrow(() -> new NotFoundException(Message.BUSTYPE_NOT_FOUND));
		Bus bus = busRepository.findById(editBusDTO.getId())
				.orElseThrow(() -> new NotFoundException(Message.BUS_NOT_FOUND));
		bus.setColor(editBusDTO.getColor());
		bus.setLicensePlate(editBusDTO.getLicensePlate());
		bus.setManufactureYear(editBusDTO.getManufactureYear());
		bus.setType(busType);
		bus.setAvailability(avai);
		busRepository.save(bus);
		return new ResponseMessage(Message.UPDATE_SUCCESS);

	}

	public Object editBusState(BusQualityDTO busQualityDTO) {
		BusQuality busQuality = busQualityRepository.findById(busQualityDTO.getId())
				.orElseThrow(() -> new NotFoundException(Message.BUSQUALITY_NOT_FOUND));
		LocalDate currentDate = LocalDate.now();
		Date sqlDate = Date.valueOf(currentDate);
		busQuality.setAirCondition(busQualityDTO.getAirCondition());
		busQuality.setBrake(busQualityDTO.getBrake());
		busQuality.setElectric(busQualityDTO.getElectric());
		busQuality.setFuel(busQualityDTO.getFuel());
		busQuality.setLighting(busQualityDTO.getLighting());
		busQuality.setMirror(busQualityDTO.getMirror());
		busQuality.setOverallState(busQualityDTO.getOverallState());
		busQuality.setSteering(busQualityDTO.getSteering());
		busQuality.setTire(busQualityDTO.getTire());
		busQuality.setUpdatedAt(sqlDate);
		busQualityRepository.save(busQuality);
		return new ResponseMessage(Message.UPDATE_SUCCESS);

	}

	public Object getBusesNotDistribute() {
		List<Bus> busLists = busRepository.findByBusTripIsNull();
		if (!busLists.isEmpty()) {
			return busLists.stream().map(busList -> modelMapper.map(busList, BusDTO.class)).toList();
		} else {
			return new ResponseMessage("Tất cả các xe bus đều đã được phân công");
		}

	}

	public Object createBusType(CreateBusType createBusType, String authentication) {
		SeatMap seatMap = seatMapRepository.findById(createBusType.getSeatMapId())
				.orElseThrow(() -> new NotFoundException(Message.SEATMAP_NOT_FOUND));
		User adminUser = userService.getUserByAuthorizationHeader(authentication);
		BusCompany busCompany = adminUser.getStaff().getBusCompany();

		BusType busType = BusType.builder().name(createBusType.getName()).seatMap(seatMap)
				.capacity(createBusType.getCapacity()).fee(createBusType.getFee())
				.description(createBusType.getDescription()).busCompany(busCompany).isActive(true).build();
		try {
			busTypeRepository.save(busType);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ConflictException(Message.INACCURATE_DATA);
		}

		return modelMapper.map(busType, BusTypeDTO.class);
	}

	public Object editBusType(EditBusType editBusType) {
		BusType busType = busTypeRepository.findById(editBusType.getId())
				.orElseThrow(() -> new NotFoundException(Message.BUSTYPE_NOT_FOUND));

		SeatMap seatMap = seatMapRepository.findById(editBusType.getSeatMapId())
				.orElseThrow(() -> new NotFoundException(Message.SEATMAP_NOT_FOUND));
		busType.setCapacity(editBusType.getCapacity());
		busType.setName(editBusType.getName());
		busType.setDescription(editBusType.getDescription());
		busType.setFee(editBusType.getFee());
		busType.setSeatMap(seatMap);
		try {
			busTypeRepository.save(busType);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ConflictException(Message.INACCURATE_DATA);
		}

		return modelMapper.map(busType, BusTypeDTO.class);

	}

	public Object createSeatMap(CreateSeatMap createSeatMap) {
		SeatMap seatMap = SeatMap.builder().floorNo(createSeatMap.getFloorNo()).colNo(createSeatMap.getColNo())
				.rowNo(createSeatMap.getRowNo()).build();
		try {
			seatMapRepository.save(seatMap);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ConflictException(Message.INACCURATE_DATA);
		}

		return modelMapper.map(seatMap, SeatMapDTO.class);

	}

	public Object editSeatMap(EditSeatMap editSeatMap) {
		SeatMap seatMap = seatMapRepository.findById(editSeatMap.getId())
				.orElseThrow(() -> new NotFoundException(Message.SEATMAP_NOT_FOUND));
		seatMap.setColNo(editSeatMap.getColNo());
		seatMap.setFloorNo(editSeatMap.getFloorNo());
		seatMap.setRowNo(editSeatMap.getRowNo());
		try {
			seatMapRepository.save(seatMap);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ConflictException(Message.INACCURATE_DATA);
		}

		return modelMapper.map(seatMap, SeatMapDTO.class);

	}

	public Object editStateBusType(EditActiveDTO edit) {
		BusType busType = busTypeRepository.findById(edit.getId())
				.orElseThrow(() -> new NotFoundException(Message.BUSTYPE_NOT_FOUND));
		busType.setActive(edit.isActive());
		try {
			busTypeRepository.save(busType);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ConflictException(Message.INACCURATE_DATA);
		}

		return modelMapper.map(busType, BusTypeDTO.class);

	}

	public Object createSeat(CreateSeat createSeat) {
		List<Seat> seats = new ArrayList<>();

		SeatMap seatMap = seatMapRepository.findById(createSeat.getSeatMapId())
				.orElseThrow(() -> new NotFoundException(Message.SEATMAP_NOT_FOUND));
		for (SeatInfor seatInfor : createSeat.getSeatInfors()) {
			if (seatRepository.existsByNameAndSeatMapId(seatInfor.getName(), seatMap.getId())) {
				throw new ConflictException("Tên ghế đã tồn tại");
			}
			Seat seat = Seat.builder().name(seatInfor.getName()).col(seatInfor.getColId()).row(seatInfor.getRowId()).floor(seatInfor.getFloorId())
					.seatMap(seatMap).isActive(true).build();
			seats.add(seat);
		}
		try {
			seatRepository.saveAll(seats);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ConflictException(Message.INACCURATE_DATA);
		}

		return modelMapper.map(seatMap, SeatMapDTO.class);

	}

	public Object editStateSeat(EditActiveDTO edit) {
		Seat seat = seatRepository.findById(edit.getId())
				.orElseThrow(() -> new NotFoundException(Message.SEAT_NOT_FOUND));
		seat.setActive(edit.isActive());
		try {
			seatRepository.save(seat);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ConflictException(Message.INACCURATE_DATA);
		}

		return modelMapper.map(seat, SeatDTO.class);

	}

	public Object editSeat(EditSeat editSeat) {
		Seat seat = seatRepository.findById(editSeat.getSeatId())
				.orElseThrow(() -> new NotFoundException(Message.SEAT_NOT_FOUND));
		if (seatRepository.existsByNameAndSeatMapId(editSeat.getName(), seat.getSeatMap().getId()))
			throw new ConflictException("Tên ghế đã tồn tại");
		seat.setCol(editSeat.getColId());
		seat.setRow(editSeat.getRowId());
		seat.setFloor(editSeat.getFloorId());
		seat.setName(editSeat.getName());

		try {
			seatRepository.save(seat);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ConflictException(Message.INACCURATE_DATA);
		}

		return modelMapper.map(seat, SeatDTO.class);

	}

}
