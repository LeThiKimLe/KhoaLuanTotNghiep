package com.example.QuanLyNhaXe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Driver;

public interface DriverRepository extends JpaRepository<Driver, Integer> {
	Boolean existsByIdCard(String idCard);

	Boolean existsByLicenseNumber(String issueDate);

	List<Driver> findByDriverTripIsNull();

}
