package com.example.QuanLyNhaXe.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByaccountId(Integer id);

	Boolean existsByEmail(String email);

	Optional<User> findByTel(String tel);

	Boolean existsByTel(String tel);

}
