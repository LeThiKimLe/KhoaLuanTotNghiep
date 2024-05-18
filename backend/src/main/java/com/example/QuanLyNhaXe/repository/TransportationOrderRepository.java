package com.example.QuanLyNhaXe.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Account;
import com.example.QuanLyNhaXe.model.TransportationOrder;

public interface TransportationOrderRepository extends JpaRepository<TransportationOrder,Integer>{
	
	Optional<TransportationOrder> findByScheduleId(Integer scheduleId);


}
