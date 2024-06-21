package com.example.QuanLyNhaXe.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer>{
	

	List<Transaction> findByPaymentTimeBetweenAndTransactionTypeAndBookings_Trip_BusCompany(LocalDateTime startDateTime, LocalDateTime endDateTime, String transactionType, BusCompany busCompany);
	Optional<Transaction> findByBookingsCode(String bookingCode);
	
	List<Transaction> findByTransactionTypeAndPaymentMethodNotAndBookings_Trip_SchedulesDepartDateBetweenAndBookings_Trip_BusCompany(
             String transactionType,String paymentMethod, LocalDate startDate, LocalDate endDate,BusCompany busCompany);
	
	boolean existsByTransactionNo(String transactionStringNo);

}
