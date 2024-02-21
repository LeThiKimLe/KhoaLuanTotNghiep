package com.example.QuanLyNhaXe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Policy;


public interface PolicyRepository extends JpaRepository<Policy, Integer> {
	Optional<List<Policy>> findByActionAndSpecialDayAndMinNumberRequiredLessThanEqualAndNumberRequiredGreaterThanEqualAndTimeRequiredLessThanEqualOrderByTimeRequiredDesc(
			String action, boolean specialDay, Integer minnumberOfTickets, Integer numberOfTickets, float timeRequired);
}
