package com.example.QuanLyNhaXe.repository;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
	List<Schedule> findByTripIdAndDepartDateAndAvailabilityGreaterThanEqualAndDepartTimeAfter(Integer tripId,
			Date departDate, Integer availability, Time departTime);

	List<Schedule> findByDriverDriverId(Integer driverId);

	List<Schedule> findByBusId(Integer busId);

	List<Schedule> findByDepartDateBetweenAndTrip_BusCompany(LocalDate startDate, LocalDate endDate, BusCompany busCompany);
	
	 List<Schedule> findByDepartDateAndTrip_BusCompany(Date departDate, BusCompany busCompany);
}
