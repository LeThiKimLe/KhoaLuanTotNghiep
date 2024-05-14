package com.example.QuanLyNhaXe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
		
	List<Review> findByReviewerId(Integer reviewerId);
	
	List<Review> findBySchedule_Trip_BusCompany(BusCompany busCompany);

}
