package com.example.QuanLyNhaXe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.RouteAssign;

public interface RouteAssignRepository extends JpaRepository<RouteAssign, Integer> {
	Boolean existsBybusCompanyIdAndRouteId(Integer companyId, Integer routeId);

	Integer countBybusCompanyId(Integer id);
	
	List<RouteAssign> findBybusCompanyId(Integer id);

}
