package com.example.QuanLyNhaXe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
	Optional<List<Ticket>> findByBookingCode(String bookingCode);
	boolean existsByScheduleIdAndSeatAndStateNot(Integer scheduleId, String name,String action);
	List<Ticket> findByScheduleId(Integer scheduleId);
	Optional<Ticket> findByBillReferCode(String referCode);

}
