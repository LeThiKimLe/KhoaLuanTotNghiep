package com.example.QuanLyNhaXe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Seat;

public interface SeatRepository extends JpaRepository<Seat, Integer> {

	List<Seat> findBySeatMapId(Integer seatMapId);

	boolean existsByNameAndSeatMapId(String name, Integer id);

}
