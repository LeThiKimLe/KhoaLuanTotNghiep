package com.example.QuanLyNhaXe.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;



import com.example.QuanLyNhaXe.model.Role;

public interface RoleRepository extends JpaRepository <Role, Integer> {
	 Optional<Role> findByroleName(String name);
	 Optional<Role> findById(Integer id);

}
