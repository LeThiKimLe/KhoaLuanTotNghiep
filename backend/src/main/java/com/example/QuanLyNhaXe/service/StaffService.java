package com.example.QuanLyNhaXe.service;

import java.util.List;

import org.modelmapper.ModelMapper;

import org.springframework.stereotype.Service;


import com.example.QuanLyNhaXe.dto.StaffDTO;
import com.example.QuanLyNhaXe.exception.NotFoundException;

import com.example.QuanLyNhaXe.model.Staff;

import com.example.QuanLyNhaXe.repository.StaffRepository;
import com.example.QuanLyNhaXe.util.Message;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StaffService {
	
	private final StaffRepository staffRepository;
    private final ModelMapper modelMapper;
    
   
    
    public List<StaffDTO> getAllStaffs() {
        List<Staff> staffs = staffRepository.findAll();
        if (staffs.isEmpty()){
            throw new NotFoundException(Message.ROLE_NOT_FOUND);
        }
        return staffs.stream()
        		.map(staff -> modelMapper.map(staff, StaffDTO.class))
                .toList();
    }
    
    public StaffDTO getStaffByUserId (Integer id){
    	Staff staff = staffRepository.findByuserId(id)
    	.orElseThrow(() -> new NotFoundException(Message.STAFF_NOT_FOUND));
    	return modelMapper.map(staff,StaffDTO.class );  	
		
	}
	

}
