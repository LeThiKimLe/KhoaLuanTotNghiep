package com.example.QuanLyNhaXe.repository;

import java.sql.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.SpecialDay;

public interface SpecialDayRepository extends JpaRepository<SpecialDay, Integer> {
	Boolean existsByDate(Date date);
	Optional<SpecialDay> findByDate(Date date);

}
