package com.example.QuanLyNhaXe.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "driver")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driver_id")
    private Integer driverId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "id_card", nullable = false, unique = true, length = 15)
    private String idCard;

    @Column(name = "address", nullable = false, length = 200)
    private String address;
    
    
    @Column(name = "driver_license")
    private String driverLicense;

    @Column(name = "img")
    private String img;

    @Column(name = "begin_work_date")
    private Date beginWorkDate;

    @Column(name = "license_number", nullable = false, unique = true, length = 20)
    private String licenseNumber;

    @Column(name = "issue_date", nullable = false)
    private Date issueDate;
    
    @OneToMany(mappedBy = "driver")
    private List<Schedule> schedules;
    
    
    @OneToMany(mappedBy = "driver")
    private List<Trip_Driver> driverTrip;
    
    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private BusCompany busCompany;
   
}