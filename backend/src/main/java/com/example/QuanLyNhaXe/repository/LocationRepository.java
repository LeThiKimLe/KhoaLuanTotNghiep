package com.example.QuanLyNhaXe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Location;

public interface LocationRepository extends JpaRepository<Location,Integer>{
	Boolean existsByName(String name);

}
