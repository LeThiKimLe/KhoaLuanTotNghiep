package com.example.QuanLyNhaXe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer>{
	
	long count();

}
