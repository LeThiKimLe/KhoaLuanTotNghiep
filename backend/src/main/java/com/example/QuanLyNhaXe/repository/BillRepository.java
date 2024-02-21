package com.example.QuanLyNhaXe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Bill;

public interface BillRepository extends JpaRepository<Bill, Integer> {
	boolean existsByReferCode(String referCode);

}
