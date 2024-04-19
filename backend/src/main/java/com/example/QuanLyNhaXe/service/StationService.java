package com.example.QuanLyNhaXe.service;

import java.util.ArrayList;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.CreateStopStation;
import com.example.QuanLyNhaXe.Request.CreateTrip;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditStationDTO;
import com.example.QuanLyNhaXe.Request.EditStopStation;
import com.example.QuanLyNhaXe.Request.RequestStationDTO;
import com.example.QuanLyNhaXe.Request.RequestStationDTO.StationOfLocation;
import com.example.QuanLyNhaXe.dto.StationDTO;
import com.example.QuanLyNhaXe.dto.StopStationDTO;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.ConflictException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Location;
import com.example.QuanLyNhaXe.model.Station;
import com.example.QuanLyNhaXe.model.StopStation;
import com.example.QuanLyNhaXe.model.Trip;
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.LocationRepository;
import com.example.QuanLyNhaXe.repository.StationRepository;
import com.example.QuanLyNhaXe.repository.StopStationRepository;
import com.example.QuanLyNhaXe.repository.TripRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StationService {
	private final LocationRepository locationRepository;
	private final StationRepository stationRepository;
	private final StopStationRepository stopStationRepository;
	private final TripService tripService;
	private final  TripRepository tripRepository;
	private final ModelMapper modelMapper;
	private final BusCompanyRepository busCompanyRepository;

	public Object createStation(RequestStationDTO stationDTO) {
		Location location = locationRepository.findById(stationDTO.getLocationId())
				.orElseThrow(() -> new NotFoundException(Message.LOCATION_NOT_FOUND));
		BusCompany busCompany=null;
		if(stationDTO.getCompanyId()!=0) {
			busCompany=busCompanyRepository.findById(stationDTO.getCompanyId())
					.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		}
		
		List<Station> stations = new ArrayList<>();
		for (StationOfLocation station : stationDTO.getStationOfLocations()) {
			if (stationRepository.existsByName(station.getName())) {
				throw new ConflictException(Message.STATION_EXISTS);
			}
			Station createStation = Station.builder().name(station.getName()).address(station.getAddress())
					.latitude(station.getLatitude()).longitude(station.getLongitude()).isActive(true).location(location).busCompany(busCompany)
					.build();
			stations.add(createStation);
		}
		stationRepository.saveAll(stations);
		return stations.stream().map(station -> modelMapper.map(station, StationDTO.class));
		
	}

	public Object editStation(EditStationDTO editStationDTO) {
		Station station = stationRepository.findById(editStationDTO.getId())
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		boolean equalName = stationRepository.existsByName(editStationDTO.getName());
		if (!editStationDTO.getName().equals(station.getName()) && equalName) {
			throw new ConflictException(Message.STATION_EXISTS);
		}
		station.setAddress(editStationDTO.getAddress());
		station.setName(editStationDTO.getName());
		station.setLatitude(editStationDTO.getLatitude());
		station.setLongitude(editStationDTO.getLongitude());
		stationRepository.save(station);
		return new ResponseMessage(Message.UPDATE_SUCCESS);
	}

	public Object editStateStation(EditActiveDTO edit) {

		Station station = stationRepository.findById(edit.getId())
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		if (edit.isActive() && !station.getLocation().isActive()) {
			throw new BadRequestException(Message.BAD_REQUEST);
		}
		if (!edit.isActive()) {
			List<Trip> trips = station.getStartTrips();
			trips.addAll(station.getEndTrips());
			if (!trips.isEmpty()) {
				for (Trip trip : trips) {
					EditActiveDTO eDto = EditActiveDTO.builder().id(trip.getId()).active(false).build();
					tripService.editStateTrip(eDto);
				}
			}
			if (!station.getStopStations().isEmpty()) {
				for (StopStation stopStation : station.getStopStations()) {
					EditActiveDTO editActive = EditActiveDTO.builder().id(stopStation.getId()).active(false).build();
					editStateStopStation(editActive);
				}
			}
		}
		station.setActive(edit.isActive());
		stationRepository.save(station);
		return new ResponseMessage(Message.UPDATE_SUCCESS);
	}

	public Object editStateStopStation(EditActiveDTO edit) {

		StopStation stopStation = stopStationRepository.findById(edit.getId())
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		if (edit.isActive() && (!stopStation.getTrip().isActive() || !stopStation.getStation().isActive())) {
			throw new BadRequestException(Message.BAD_REQUEST);
		}
		stopStation.setActive(edit.isActive());
		stopStationRepository.save(stopStation);
		return new ResponseMessage(Message.UPDATE_SUCCESS);
	}

	public Object createStopStation(CreateStopStation createStopStation) {
		if(!createStopStation.getStationType().equals("pick")&&!createStopStation.getStationType().equals("drop")&&!createStopStation.getStationType().equals("stop")) {
			throw new BadRequestException(Message.BAD_REQUEST);
		}
		if(stopStationRepository.existsByTripIdAndStationId(createStopStation.getTripId(), createStopStation.getStationId())) {
			throw new ConflictException(Message.STOPSTATION_EXISTS);
		}
		Trip trip = tripRepository.findById(createStopStation.getTripId())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));

		Station station = stationRepository.findById(createStopStation.getStationId())
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		StopStation stopStation=StopStation.builder().trip(trip).station(station).arrivalTime(createStopStation.getArrivalTime()).isActive(true).stationType(createStopStation.getStationType()).build();
		stopStationRepository.save(stopStation);
		return modelMapper.map(stopStation, StopStationDTO.class);
	}
	
	public Object updateStopStation(EditStopStation editStopStation) {
		if(!editStopStation.getStationType().equals("pick")&&!editStopStation.getStationType().equals("drop")&&!editStopStation.getStationType().equals("stop")) {
			throw new BadRequestException(Message.BAD_REQUEST);
		}
		if(stopStationRepository.existsByTripIdAndStationId(editStopStation.getTripId(),editStopStation.getStationId())) {
			throw new ConflictException(Message.STOPSTATION_EXISTS);
		}
		StopStation stopStation=stopStationRepository.findById(editStopStation.getStationId())
				.orElseThrow(() -> new NotFoundException(Message.STOPSTATION_NOT_FOUND));
		Trip trip = tripRepository.findById(editStopStation.getTripId())
				.orElseThrow(() -> new NotFoundException(Message.TRIP_NOT_FOUND));

		Station station = stationRepository.findById(editStopStation.getStationId())
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		stopStation.setArrivalTime(editStopStation.getArrivalTime());
		stopStation.setStation(station);
		stopStation.setTrip(trip);
		stopStation.setStationType(editStopStation.getStationType());
		stopStationRepository.save(stopStation);
		return modelMapper.map(stopStation, StopStationDTO.class);
		

				
		
		
	}
}
