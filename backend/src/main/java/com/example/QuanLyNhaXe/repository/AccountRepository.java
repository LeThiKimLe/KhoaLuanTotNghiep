package com.example.QuanLyNhaXe.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuanLyNhaXe.model.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
	Optional<Account> findByUsername(String username);

	Boolean existsByUsername(String username);

	Optional<Account> findByOauthId(String oauthId);

}
