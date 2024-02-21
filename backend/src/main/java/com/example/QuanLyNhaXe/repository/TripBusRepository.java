package com.example.QuanLyNhaXe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Trip_Bus;

public interface TripBusRepository extends JpaRepository<Trip_Bus, Integer> {
	long countByTripIdAndBusAvailability(Integer tripId, String availability);

	Boolean existsByTripIdAndBusId(Integer tripId, Integer busId);

	List<Trip_Bus> findByTripId(Integer tripId);

	List<Trip_Bus> findByBusId(Integer busId);

	Optional<Trip_Bus> findByBusIdAndTripId(Integer busId, Integer tripId);

}
