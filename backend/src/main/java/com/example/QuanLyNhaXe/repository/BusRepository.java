package com.example.QuanLyNhaXe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.QuanLyNhaXe.model.Bus;
import com.example.QuanLyNhaXe.model.Trip_Bus;

public interface BusRepository  extends JpaRepository<Bus, Integer>{
	
	Boolean existsByLicensePlate(String licensePlate);
	
	 List<Bus> findByBusTripIsNull();

}
