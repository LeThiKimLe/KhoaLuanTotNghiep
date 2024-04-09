package com.example.QuanLyNhaXe.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.QuanLyNhaXe.Request.AssignRoute;
import com.example.QuanLyNhaXe.Request.CreateBusCompany;
import com.example.QuanLyNhaXe.Request.EditBusCompany;
import com.example.QuanLyNhaXe.Request.SignupStaffDTO;
import com.example.QuanLyNhaXe.dto.BusCompanyDTO;
import com.example.QuanLyNhaXe.dto.BusDTO;
import com.example.QuanLyNhaXe.dto.CompanyRouteDTO;
import com.example.QuanLyNhaXe.exception.ConflictException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Admin;
import com.example.QuanLyNhaXe.model.Bus;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Route;
import com.example.QuanLyNhaXe.model.RouteAssign;
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.RouteAssignRepository;
import com.example.QuanLyNhaXe.repository.RouteRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BusCompanyService {
	private final UtilityService utilityService;
	private final AuthenticationService authenticationService;
	private final BusCompanyRepository busCompanyRepository;
	private final ModelMapper modelMapper;
	private final UserService userService;
	private final RouteAssignRepository routeAssignRepository;
	private final RouteRepository routeRepository;

	public Object getAllBusCompany() {
		List<BusCompany> busCompanyLists = busCompanyRepository.findAll();
		if (busCompanyLists.isEmpty()) {
			throw new NotFoundException(Message.COMPANY_NOT_FOUND);
		}
		return busCompanyLists.stream().map(busCompanyList -> modelMapper.map(busCompanyList, BusCompanyDTO.class)).toList();
	}

	@Transactional
	public Object createBusCompany(CreateBusCompany createBusCompany) {
		
		LocalDateTime temp=utilityService.convertHCMDateTime();
		LocalDate coopDate = temp.toLocalDate();
		Date date =  Date.valueOf(coopDate);
		SignupStaffDTO signupStaffDTO=SignupStaffDTO.builder().name(createBusCompany.getName()).tel(createBusCompany.getTel()).email(createBusCompany.getEmail()).idCard(createBusCompany.getIdCard()).address(createBusCompany.getAddress()).gender(createBusCompany.getGender()).beginWorkDate(date).build();
		BusCompany busCompany=BusCompany.builder().name(createBusCompany.getBusinessName()).coopDay(coopDate).businessLicense(createBusCompany.getBusinessLicense()).isActive(true).build();
		Admin admin=authenticationService.createNewAdmin(signupStaffDTO,busCompany);
		busCompany.setAdmin(admin);
		try {
			busCompanyRepository.save(busCompany);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return modelMapper.map(busCompany, BusCompanyDTO.class);
		
		
	}
	

	@Transactional
	public Object editBusCompany(EditBusCompany editBusCompany){
		BusCompany busCompany=busCompanyRepository.findById(editBusCompany.getId())
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		busCompany.setBusinessLicense(editBusCompany.getBusinessLicense());
		busCompany.setName(editBusCompany.getBusinessName());
		Integer id=busCompany.getAdmin().getStaff().getStaffId();
		
		try {
			userService.editAdmin(id,editBusCompany.getEmail(),editBusCompany.getIdCard(), editBusCompany.getName(),editBusCompany.getTel(), editBusCompany.getAddress());
			busCompanyRepository.save(busCompany);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return modelMapper.map(busCompany, BusCompanyDTO.class);
	
	}
	
	@Transactional
	public Object routeAssign(AssignRoute assignRoute) {
	
		List<RouteAssign> routeAssigns=new ArrayList<>();
		BusCompany busCompany=busCompanyRepository.findById(assignRoute.getCompanyId())
        		.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		for(Integer routeId:assignRoute.getRouteIds()) {
			boolean exists = routeAssignRepository.existsBybusCompanyIdAndRouteId(assignRoute.getCompanyId(), routeId);
	        if (exists) {
	            throw new ConflictException("Một trong các phân công đã tồn tại trong hệ thống");
	        }
	        
	        Route route=routeRepository.findById(routeId)
	        		.orElseThrow(() -> new NotFoundException(Message.ROUTE_NOT_FOUND));
	        RouteAssign routeAssign=RouteAssign.builder().busCompany(busCompany).route(route).build();
	        routeAssigns.add(routeAssign);
		}
			
	        
		try {
			routeAssignRepository.saveAll(routeAssigns);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return new ResponseMessage(Message.UPDATE_SUCCESS);
		
	}
	 public Object getRouteAssign() {
		 
		 List<RouteAssign> routeAssigns=routeAssignRepository.findAll();
			if (routeAssigns.isEmpty()) {
				throw new NotFoundException(Message.ROUTEASSIGN_NOT_FOUND);
			}
			return routeAssigns.stream().map(routeAssign -> modelMapper.map(routeAssign, CompanyRouteDTO.class)).toList();
		 
		
	}
}
