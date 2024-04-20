package com.example.QuanLyNhaXe.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.QuanLyNhaXe.model.Trip;



public interface TripRepository extends JpaRepository<Trip, Integer> {

	List<Trip> findByRouteIdAndTurn(Integer routeId, Boolean turn);
	boolean existsByStartStationIdAndEndStationIdAndBusCompanyId(Integer startStation,Integer endStation, Integer companyId);
	Optional<Trip> findByStartStationIdAndEndStationIdAndTurn(Integer startStation,Integer endStation,Boolean turn);
	

}