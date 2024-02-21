package com.example.QuanLyNhaXe.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.CreateRouteDTO;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditRouteDTO;
import com.example.QuanLyNhaXe.Request.GetRouteParents;
import com.example.QuanLyNhaXe.dto.RouteDTO;
import com.example.QuanLyNhaXe.dto.RouteFullDTO;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.ConflictException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.BusType;
import com.example.QuanLyNhaXe.model.Location;
import com.example.QuanLyNhaXe.model.Route;
import com.example.QuanLyNhaXe.model.Trip;
import com.example.QuanLyNhaXe.repository.BusTypeRepository;
import com.example.QuanLyNhaXe.repository.LocationRepository;
import com.example.QuanLyNhaXe.repository.RouteRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RouteService {
	private final RouteRepository routeRepository;
	private final ModelMapper modelMapper;
	private final LocationRepository locationRepository;
	private final BusTypeRepository busTypeRepository;
	private final TripService tripService;

	public List<RouteFullDTO> getAllRoutes() {
		List<Route> routes = routeRepository.findAll();
		if (routes.isEmpty()) {
			throw new NotFoundException(Message.ROUTE_NOT_FOUND);
		}
		return routes.stream().map(route -> modelMapper.map(route, RouteFullDTO.class)).toList();
	}

	

	public Object createRoute(CreateRouteDTO createRouteDTO) {
		
		if (routeRepository.existsByDepartureIdAndDestinationId(createRouteDTO.getDepartureId(),
				createRouteDTO.getDestinationId())
				|| routeRepository.existsByDepartureIdAndDestinationId(createRouteDTO.getDestinationId(),
						createRouteDTO.getDepartureId())) {
			throw new ConflictException(Message.ROUTE_EXISTS);

		}
		Location departure = locationRepository.findById(createRouteDTO.getDepartureId())
				.orElseThrow(() -> new NotFoundException(Message.DEP_NOT_FOUND));

		Location destination = locationRepository.findById(createRouteDTO.getDestinationId())
				.orElseThrow(() -> new NotFoundException(Message.DES_NOT_FOUND));

		BusType busType = busTypeRepository.findById(createRouteDTO.getBusType())
				.orElseThrow(() -> new NotFoundException(Message.BUSTYPE_NOT_FOUND));
		
		List<Route> routes=routeRepository.findByDepartureIdOrDestinationId(createRouteDTO.getDepartureId(), createRouteDTO.getDestinationId());
		if (!routes.isEmpty()&&createRouteDTO.getParents()!=null&&createRouteDTO.getParents()!=0) {
			Route routeParent= routeRepository.findById(createRouteDTO.getParents())
					.orElseThrow(() -> new NotFoundException(Message.ROUTE_NOT_FOUND));
			if(!routes.contains(routeParent))
			{
				throw new NotFoundException(Message.BAD_REQUEST);
			}
			
		}
		Route route = Route.builder().departure(departure).destination(destination).parents(createRouteDTO.getParents()).isActive(true)
				.price(createRouteDTO.getPrice()).hours(createRouteDTO.getHours()).schedule(createRouteDTO.getSchedule())
				.distance(createRouteDTO.getDistance()).busType(busType).build();
		routeRepository.save(route);
		return new ResponseMessage(Message.SUCCESS);

	}
	
	public Object getRouteParents(GetRouteParents routeParents) {
		List<Route> routes=routeRepository.findByDepartureIdOrDestinationId(routeParents.getDepartureId(), routeParents.getDestinationId());
		if (routes.isEmpty()) {
			throw new NotFoundException(Message.ROUTE_NOT_FOUND);
		}
		return routes.stream().map(route -> modelMapper.map(route, RouteDTO.class)).toList();
		
	}
	
	public Object editRoute(EditRouteDTO editRouteDTO) {
		
		
		BusType busType = busTypeRepository.findById(editRouteDTO.getBusType())
				.orElseThrow(() -> new NotFoundException(Message.BUSTYPE_NOT_FOUND));
		Route parentRoute=routeRepository.findById(editRouteDTO.getParents())
				.orElseThrow(() -> new NotFoundException(Message.ROUTE_NOT_FOUND));
		Route editRoute = routeRepository.findById(editRouteDTO.getId())
				.orElseThrow(() -> new NotFoundException(Message.ROUTE_NOT_FOUND));
		List<Route> routes=routeRepository.findByDepartureIdOrDestinationId(editRoute.getDeparture().getId(), editRoute.getDestination().getId());
		if (!routes.isEmpty()&&editRouteDTO.getParents()!=null&&editRouteDTO.getParents()!=0) {
			Route routeParent= routeRepository.findById(editRouteDTO.getParents())
					.orElseThrow(() -> new NotFoundException(Message.ROUTE_NOT_FOUND));
			if(!routes.contains(routeParent))
			{
				throw new NotFoundException(Message.BAD_REQUEST);
			}
			
		}
		editRoute.setBusType(busType);
		editRoute.setParents(parentRoute.getId());
		editRoute.setDistance(editRouteDTO.getDistance());
		editRoute.setHours(editRouteDTO.getHours());
		editRoute.setPrice(editRouteDTO.getPrice());
		editRoute.setSchedule(editRouteDTO.getSchedule());
		routeRepository.save(editRoute);
		return new ResponseMessage(Message.UPDATE_SUCCESS);
		
		
	}
	
	
	public Object editStateRoute(EditActiveDTO edit) {
		Route route = routeRepository.findById(edit.getId())
				.orElseThrow(() -> new NotFoundException(Message.ROUTE_NOT_FOUND));
		if(edit.isActive()&&(!route.getDeparture().isActive()||!route.getDestination().isActive())) {	
			throw new BadRequestException(Message.BAD_REQUEST);
		}
		if(!edit.isActive()) {
			List<Trip> trips=route.getTrips();
			if(!trips.isEmpty()) {
				for(Trip trip:trips) {
					EditActiveDTO eDto= EditActiveDTO.builder().id(trip.getId()).active(false).build();
					tripService.editStateTrip(eDto);
				}
			}
		}
		route.setActive(edit.isActive());
		routeRepository.save(route);
		return new ResponseMessage(Message.UPDATE_SUCCESS);
	}

}
