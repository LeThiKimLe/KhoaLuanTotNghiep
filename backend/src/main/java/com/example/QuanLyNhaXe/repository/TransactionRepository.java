package com.example.QuanLyNhaXe.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer>{
	boolean existsByReferenceId(String referenceId);

	List<Transaction> findByPaymentTimeBetweenAndTransactionType(LocalDateTime startDateTime, LocalDateTime endDateTime, String transactionType);
	

}
