package com.example.QuanLyNhaXe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Trip_Driver;

public interface TripDriverRepository extends JpaRepository<Trip_Driver, Integer> {
	long countByTripIdAndDriverUserAccountIsActive(Integer tripId, boolean isActive);

	Boolean existsByTripIdAndDriverDriverId(Integer tripId, Integer driverId);

	List<Trip_Driver> findByTripId(Integer tripId);

	List<Trip_Driver> findByDriverDriverId(Integer driverId);

	Optional<Trip_Driver> findByDriverDriverIdAndTripId(Integer driverId, Integer tripId);

}
