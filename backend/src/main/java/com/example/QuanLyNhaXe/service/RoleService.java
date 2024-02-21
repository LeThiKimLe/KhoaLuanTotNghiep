package com.example.QuanLyNhaXe.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.dto.RoleDTO;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Role;
import com.example.QuanLyNhaXe.repository.RoleRepository;
import com.example.QuanLyNhaXe.util.Message;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;
    
   
    
    public List<RoleDTO> getAllRoles() {
        List<Role> roles = roleRepository.findAll();
        if (roles.isEmpty()){
            throw new NotFoundException(Message.ROLE_NOT_FOUND);
        }
        return roles.stream()
        		.map(role -> modelMapper.map(role, RoleDTO.class))
        		.toList();
    }
    
    
}
