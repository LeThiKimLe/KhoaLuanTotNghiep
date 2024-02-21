package com.example.QuanLyNhaXe.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.dto.LocationDTO;
import com.example.QuanLyNhaXe.dto.LocationFullDTO;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.ConflictException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Location;
import com.example.QuanLyNhaXe.model.Route;
import com.example.QuanLyNhaXe.model.Station;
import com.example.QuanLyNhaXe.repository.LocationRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationService {
	private final ModelMapper modelMapper;
	private final LocationRepository locationRepository;
	private final RouteService routeService;

	public List<LocationFullDTO> getAllLocation() {
		List<Location> locations = locationRepository.findAll();
		if (locations.isEmpty()) {
			throw new NotFoundException(Message.LOCATION_NOT_FOUND);
		}
		return locations.stream().map(location -> {
			suportMap(location);
			return modelMapper.map(location, LocationFullDTO.class);
		}).toList();
	}

	public LocationDTO createLocation(String name) {
		if(locationRepository.existsByName(name)) {
			throw new ConflictException(Message.LOCATION_EXISTS);
		}
			
		Location location = Location.builder().name(name).isActive(true).build();
		locationRepository.save(location);
		return modelMapper.map(location, LocationDTO.class);
	}
	
	
	public Object editLocation(LocationDTO locationDTO) {

		Location location=locationRepository.findById(locationDTO.getId())
				.orElseThrow(() -> new NotFoundException(Message.LOCATION_NOT_FOUND));
		boolean equalName=locationRepository.existsByName(locationDTO.getName());
		if(!locationDTO.getName().equals(location.getName())&&equalName)	{		
				throw new ConflictException(Message.LOCATION_EXISTS);
			
		}
		location.setName(locationDTO.getName());
		locationRepository.save(location);
		return modelMapper.map(location,LocationDTO.class);
	}
	
	public Object editStateLocation(EditActiveDTO edit) {

		Location location=locationRepository.findById(edit.getId())
				.orElseThrow(() -> new NotFoundException(Message.LOCATION_NOT_FOUND));
		
		if(!edit.isActive()) {
			List<Route> combinedRoutes = new ArrayList<>();
			combinedRoutes.addAll(location.getDepartureRoutes());
			combinedRoutes.addAll(location.getDestinationRoutes());
			for(Route route: combinedRoutes) {
				EditActiveDTO editActiveDTO=EditActiveDTO.builder().active(false).id(route.getId()).build();
				routeService.editStateRoute(editActiveDTO);
						
			}
		}
		location.setActive(edit.isActive());
		locationRepository.save(location);		
		return new ResponseMessage(Message.UPDATE_SUCCESS);
	}
	

	void suportMap(Location location) {
		for (Station station : location.getStations()) {
			station.setLocation(null);
		}
	}

}