package com.example.QuanLyNhaXe.model;

import java.util.List;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name", nullable = false, length = 45)
    private String name;

    @Column(name = "email", length = 45)
    private String email;

    @Column(name = "tel", nullable = false, unique = true, length = 12)
    private String tel;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    @Column(name = "gender")
    private Boolean gender;
    
    @OneToOne(mappedBy = "user")
    private Staff staff;
    
    @OneToOne(mappedBy = "user")
    private Customer customer;
    
    @OneToOne(mappedBy = "user")
    private Driver driver;
    
    @OneToMany(mappedBy = "bookingUser")
    private List<Booking> bookings;
    
    @OneToMany(mappedBy = "reviewer")
    private List<Review> reviews;
    
    @OneToMany(mappedBy = "user")
    private List<History>historys;
    
    @OneToOne(mappedBy = "user")
    private SystemManager  systemManager;
    
}