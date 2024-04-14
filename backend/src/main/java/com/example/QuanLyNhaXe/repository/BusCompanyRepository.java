package com.example.QuanLyNhaXe.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.BusCompany;

public interface BusCompanyRepository extends JpaRepository<BusCompany, Integer>{
	
	Optional<BusCompany> findByAdminId(Integer id);
	
	

}
