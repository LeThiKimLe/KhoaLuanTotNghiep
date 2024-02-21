package com.example.QuanLyNhaXe.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.QuanLyNhaXe.model.Trip;



public interface TripRepository extends JpaRepository<Trip, Integer> {

	List<Trip> findByRouteIdAndTurn(Integer routeId, Boolean turn);
	boolean existsByStartStationIdAndEndStationId(Integer startStation,Integer endStation);
	Optional<Trip> findByStartStationIdAndEndStationIdAndTurn(Integer startStation,Integer endStation,Boolean turn);
	

}