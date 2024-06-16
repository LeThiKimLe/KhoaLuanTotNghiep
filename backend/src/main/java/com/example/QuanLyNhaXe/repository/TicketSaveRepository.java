package com.example.QuanLyNhaXe.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.TicketSale;

public interface TicketSaveRepository extends JpaRepository<TicketSale, Integer> {
	
	boolean existsByFromDateAndToDate(LocalDate fromDate, LocalDate toDate);
	Optional<TicketSale> findByFromDateAndToDateAndBusCompany(LocalDate fromDate, LocalDate toDate,BusCompany busCompany);
	

}
