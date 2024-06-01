package com.example.QuanLyNhaXe.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.antlr.v4.runtime.misc.TestRig;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.QuanLyNhaXe.Request.AssignRoute;
import com.example.QuanLyNhaXe.Request.CreateBusCompany;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.Request.EditBusCompany;
import com.example.QuanLyNhaXe.Request.SignupStaffDTO;
import com.example.QuanLyNhaXe.dto.AdminDTO;
import com.example.QuanLyNhaXe.dto.BusCompanyDTO;
import com.example.QuanLyNhaXe.dto.BusDTO;
import com.example.QuanLyNhaXe.dto.CompanyReponse;
import com.example.QuanLyNhaXe.dto.CompanyRouteDTO;
import com.example.QuanLyNhaXe.dto.UserDTO;
import com.example.QuanLyNhaXe.exception.ConflictException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Admin;
import com.example.QuanLyNhaXe.model.Bus;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Route;
import com.example.QuanLyNhaXe.model.RouteAssign;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.AdminRepository;
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.RouteAssignRepository;
import com.example.QuanLyNhaXe.repository.RouteRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;
import lombok.RequiredArgsConstructor;
import com.example.QuanLyNhaXe.model.Admin;;

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
	private final AdminRepository adminRepository;

	public Object getAllBusCompany() {
		List<CompanyReponse> companyReponses=new  ArrayList<>();
		List<BusCompany> busCompanyLists = busCompanyRepository.findAll();
		if (busCompanyLists.isEmpty()) {
			throw new NotFoundException(Message.COMPANY_NOT_FOUND);
		}
		for(BusCompany company:busCompanyLists) {
			Admin admin=adminRepository.findById(company.getAdminId())
					.orElseThrow(() -> new NotFoundException(Message.USER_NOT_FOUND));
			CompanyReponse com =CompanyReponse.builder().admin(modelMapper.map(admin.getStaff().getUser(), UserDTO.class)).busCompany(modelMapper.map(company, BusCompanyDTO.class)).build();
			companyReponses.add(com);
		}
	  return companyReponses;
	}

	@Transactional
	public Object createBusCompany(CreateBusCompany createBusCompany) {

		LocalDateTime temp = utilityService.convertHCMDateTime();
		LocalDate coopDate = temp.toLocalDate();
		Date date = Date.valueOf(coopDate);
		SignupStaffDTO signupStaffDTO = SignupStaffDTO.builder().name(createBusCompany.getName())
				.tel(createBusCompany.getTel()).email(createBusCompany.getEmail()).idCard(createBusCompany.getIdCard())
				.address(createBusCompany.getAddress()).gender(createBusCompany.getGender()).beginWorkDate(date)
				.build();
		BusCompany busCompany = BusCompany.builder().name(createBusCompany.getBusinessName()).coopDay(coopDate)
				.businessLicense(createBusCompany.getBusinessLicense()).isActive(true).build();
		Admin admin = authenticationService.createNewAdmin(signupStaffDTO, busCompany);
		busCompany.setAdminId(admin.getAdminId());
		try {
			busCompanyRepository.save(busCompany);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return CompanyReponse.builder().admin(modelMapper.map(admin.getStaff().getUser(), UserDTO.class)).busCompany(modelMapper.map(busCompany, BusCompanyDTO.class)).build();

	}

	@Transactional
	public Object editBusCompany(EditBusCompany editBusCompany) {
		BusCompany busCompany = busCompanyRepository.findById(editBusCompany.getId())
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		busCompany.setBusinessLicense(editBusCompany.getBusinessLicense());
		busCompany.setName(editBusCompany.getBusinessName());
		Integer id = busCompany.getAdminId();

		try {
			userService.editAdmin(id, editBusCompany.getEmail(), editBusCompany.getIdCard(), editBusCompany.getName(),
					editBusCompany.getTel(), editBusCompany.getAddress());
			busCompanyRepository.save(busCompany);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return modelMapper.map(busCompany, BusCompanyDTO.class);

	}

	@Transactional
	public Object routeAssign(AssignRoute assignRoute) {

		List<RouteAssign> routeAssigns = new ArrayList<>();
		BusCompany busCompany = busCompanyRepository.findById(assignRoute.getCompanyId())
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		for (Integer routeId : assignRoute.getRouteIds()) {
			boolean exists = routeAssignRepository.existsBybusCompanyIdAndRouteId(assignRoute.getCompanyId(), routeId);
			if (exists) {
				throw new ConflictException("Một trong các phân công đã tồn tại trong hệ thống");
			}

			Route route = routeRepository.findById(routeId)
					.orElseThrow(() -> new NotFoundException(Message.ROUTE_NOT_FOUND));
			RouteAssign routeAssign = RouteAssign.builder().busCompany(busCompany).route(route).assignDate(utilityService.convertHCMDateTime()).build();
			routeAssigns.add(routeAssign);
		}

		try {
			routeAssignRepository.saveAll(routeAssigns);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return new ResponseMessage(Message.UPDATE_SUCCESS);

	}

	public Object getRouteAssign(String authentication) {
		User user = userService.getUserByAuthorizationHeader(authentication);

		List<RouteAssign> routeAssigns = routeAssignRepository.findAll();

		if (routeAssigns.isEmpty()) {
			throw new NotFoundException(Message.ROUTEASSIGN_NOT_FOUND);
		}

		if (user.getAccount().getRole().getRoleName().equals("ADMIN")) {
			BusCompany busCompany = busCompanyRepository.findByAdminId(user.getStaff().getAdmin().getAdminId())
					.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));

			return routeAssigns.stream()
					.filter(routeAssign -> routeAssign.getBusCompany().getId().equals(busCompany.getId()))
					.map(routeAssign -> modelMapper.map(routeAssign, CompanyRouteDTO.class)).toList();
		}

		return routeAssigns.stream().map(routeAssign -> modelMapper.map(routeAssign, CompanyRouteDTO.class)).toList();

	}
	
	public Object eidtStateCompany(EditActiveDTO editActiveDTO) {
		BusCompany busCompany=busCompanyRepository.findById(editActiveDTO.getId())
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		busCompany.setActive(editActiveDTO.isActive());
		busCompanyRepository.save(busCompany);
		return modelMapper.map(busCompany, BusCompanyDTO.class);
				
	}
}
