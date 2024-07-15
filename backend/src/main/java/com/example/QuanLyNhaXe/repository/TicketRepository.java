package com.example.QuanLyNhaXe.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.concurrent.DefaultManagedTaskExecutor;

import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Route;
import com.example.QuanLyNhaXe.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
	Optional<List<Ticket>> findByBookingCode(String bookingCode);

	boolean existsByScheduleIdAndSeatAndStateNot(Integer scheduleId, String name, String action);

	List<Ticket> findByScheduleId(Integer scheduleId);

	Optional<Ticket> findByBillReferCode(String referCode);

	List<Ticket> findByStateAndBookingConductStaffIsNullAndScheduleStateAndScheduleDepartDateBetweenAndSchedule_Trip_BusCompany(
			String state, String scheduleState, LocalDate startDate, LocalDate endDate, BusCompany company);

	List<Ticket> findByStateAndScheduleStateAndScheduleDepartDateBetweenAndSchedule_Trip_BusCompanyAndHistories_TransactionPaymentMethodNot(
			String state, String scheduleState, LocalDate startDate, LocalDate endDate, BusCompany company,
			String method);
	
	Integer countByStateAndBookingConductStaffIsNullAndScheduleStateAndSchedule_Trip_BusCompany(String state, String scheduleState,BusCompany company);
	
	Integer countByStateAndBookingConductStaffIsNullAndScheduleStateAndSchedule_Trip_Route(String state, String scheduleState,Route route);
	
	List<Ticket> findByStateAndBookingConductStaffIsNullAndBookingBookingDateBetweenAndSchedule_Trip_BusCompany(
			String state, LocalDateTime startDate, LocalDateTime endDate, BusCompany company);

	
	

}
