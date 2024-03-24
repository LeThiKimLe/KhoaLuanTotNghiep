package com.example.QuanLyNhaXe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.SystemManager;

public interface SystemManagerRepository extends JpaRepository<SystemManager, Integer>{
	
	boolean existsByIdCard(String idCard);

}
