package com.example.QuanLyNhaXe.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.BusType;
import com.example.QuanLyNhaXe.model.Trip;

public interface BusTypeRepository extends JpaRepository<BusType, Integer> {
    Optional<BusType> findFirstByBusCompanyIdAndName(Integer busCompanyId, String name);

}
