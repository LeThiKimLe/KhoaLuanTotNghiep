package com.example.QuanLyNhaXe.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Staff;

public interface StaffRepository extends JpaRepository<Staff, Integer>{
	Optional<Staff> findByuserId(Integer id);
	Boolean existsByIdCard(String  idCard);
	
	
	
	
}
