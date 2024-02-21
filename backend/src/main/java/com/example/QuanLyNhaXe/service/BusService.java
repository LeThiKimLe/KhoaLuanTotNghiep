package com.example.QuanLyNhaXe.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.boot.availability.AvailabilityState;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.CreateBusDTO;
import com.example.QuanLyNhaXe.Request.EditBusDTO;
import com.example.QuanLyNhaXe.dto.BusDTO;
import com.example.QuanLyNhaXe.dto.BusQualityDTO;
import com.example.QuanLyNhaXe.dto.BusTypeDTO;
import com.example.QuanLyNhaXe.enumration.BusAvailability;
import com.example.QuanLyNhaXe.enumration.BusOverallState;
import com.example.QuanLyNhaXe.enumration.BusQualityStatus;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.ConflictException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Bus;
import com.example.QuanLyNhaXe.model.BusQuality;
import com.example.QuanLyNhaXe.model.BusType;
import com.example.QuanLyNhaXe.model.Trip_Bus;
import com.example.QuanLyNhaXe.repository.BusQualityRepository;
import com.example.QuanLyNhaXe.repository.BusRepository;
import com.example.QuanLyNhaXe.repository.BusTypeRepository;
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




	public Object getAllBusType() {
		List<BusType> busTypes = busTypeRepository.findAll();
		if (busTypes.isEmpty()) {
			throw new NotFoundException(Message.BUSTYPE_NOT_FOUND);
		}
		return busTypes.stream().map(busType -> modelMapper.map(busType, BusTypeDTO.class)).toList();
	}

	public Object getAllBus() {
		List<Bus> busLists = busRepository.findAll();
		if (busLists.isEmpty()) {
			throw new NotFoundException(Message.BUSTYPE_NOT_FOUND);
		}
		return busLists.stream().map(busList -> modelMapper.map(busList, BusDTO.class)).toList();
	}

	@Transactional
	public Object createBus(CreateBusDTO createBusDTO) {

		if(busRepository.existsByLicensePlate(createBusDTO.getLicensePlate())) {
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
				.availability(BusAvailability.AVAILABLE.getLabel())
				.manufactureYear(createBusDTO.getManufactureYear()).licensePlate(createBusDTO.getLicensePlate())
				.build();
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

		String avai=editBusDTO.getAvailability();
		if(!avai.equals(BusAvailability.AVAILABLE.getLabel())&&!avai.equals(BusAvailability.OUT_OF_SERVICE.getLabel())&&!avai.equals(BusAvailability.UNDER_MAINTENANCE.getLabel())) {
			throw new BadRequestException(Message.BAD_REQUEST);
		}
		if(busRepository.existsByLicensePlate(editBusDTO.getLicensePlate())) {
			throw new ConflictException("Giấy phép đã tồn tại");
		}
		BusType busType = busTypeRepository.findById(editBusDTO.getTypeId())
				.orElseThrow(() -> new NotFoundException(Message.BUSTYPE_NOT_FOUND));
		Bus bus=busRepository.findById(editBusDTO.getId())
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
		BusQuality busQuality=busQualityRepository.findById(busQualityDTO.getId())
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
		List<Bus> busLists=busRepository.findByBusTripIsNull();
		if(!busLists.isEmpty()) {
			return busLists.stream().map(busList -> modelMapper.map(busList, BusDTO.class)).toList();
		}
		else {
			return new ResponseMessage("Tất cả các xe bus đều đã được phân công");
		}
		
	}
	

}
