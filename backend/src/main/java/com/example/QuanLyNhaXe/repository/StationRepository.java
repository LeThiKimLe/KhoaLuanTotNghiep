package com.example.QuanLyNhaXe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Station;

public interface StationRepository extends JpaRepository<Station,Integer>{
	
	Boolean existsByName(String name);

}
