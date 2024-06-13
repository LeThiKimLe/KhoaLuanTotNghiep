package com.example.QuanLyNhaXe.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer>{
	

	List<Transaction> findByPaymentTimeBetweenAndTransactionType(LocalDateTime startDateTime, LocalDateTime endDateTime, String transactionType);
	Optional<Transaction> findByBookingsCode(String bookingCode);
	
	List<Transaction> findByPaymentTimeBetweenAndTransactionTypeAndPaymentMethodNotAndBookings_Trip_BusCompany(
            LocalDateTime startDate, LocalDateTime endDate, String transactionType,String paymentMethod, BusCompany busCompany);

}
