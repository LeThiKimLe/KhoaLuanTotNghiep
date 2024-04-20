package com.example.QuanLyNhaXe.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Booking;


public interface BookingRepository extends JpaRepository<Booking, Integer> {
	Boolean existsByCode(String code);

	Optional<Booking> findByCode(String code);

	Optional<Booking> findByCodeAndTel(String code, String tel);

	Optional<List<Booking>> findByBookingUserId(Integer userBookingId);

	List<Booking> findByTel(String tel);
	
	List<Booking> findByTransactionIsNotNullAndBookingDateBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);
	
	
}
