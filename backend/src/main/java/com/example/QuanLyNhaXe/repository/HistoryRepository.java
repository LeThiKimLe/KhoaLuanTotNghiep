package com.example.QuanLyNhaXe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.History;

public interface HistoryRepository extends JpaRepository<History, Integer> {
	boolean existsByTicketIdAndAction(Integer ticketId, String action);
	

}
