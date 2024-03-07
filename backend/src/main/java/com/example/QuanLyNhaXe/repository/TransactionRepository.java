package com.example.QuanLyNhaXe.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer>{
	

	List<Transaction> findByPaymentTimeBetweenAndTransactionType(LocalDateTime startDateTime, LocalDateTime endDateTime, String transactionType);
	Optional<Transaction> findByBookingCode(String bookingCode);

}
