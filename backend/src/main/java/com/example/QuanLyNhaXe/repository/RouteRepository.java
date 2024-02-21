package com.example.QuanLyNhaXe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Route;

public interface RouteRepository extends JpaRepository<Route,Integer> {
	
	Boolean existsByDepartureIdAndDestinationId(Integer dep,Integer des);
	List<Route> findByDepartureIdOrDestinationId(Integer dep,Integer des);

}
