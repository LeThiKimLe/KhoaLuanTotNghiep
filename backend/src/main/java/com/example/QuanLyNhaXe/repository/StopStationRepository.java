package com.example.QuanLyNhaXe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.StopStation;

public interface StopStationRepository extends JpaRepository<StopStation, Integer>{
	Optional <StopStation> findByIdAndTripIdAndStationType(Integer id, Integer tripId, String stationType);
	List<StopStation> findByTripId(Integer tripId);
	Boolean existsByTripIdAndStationId(Integer tripId,Integer stationId);

}
