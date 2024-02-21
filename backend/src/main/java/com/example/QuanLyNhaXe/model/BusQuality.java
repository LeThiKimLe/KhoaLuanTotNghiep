package com.example.QuanLyNhaXe.model;

import java.sql.Date;


import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bus_quality")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusQuality {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "brake", nullable = false)
    private String brake;

    @Column(name = "lighting", nullable = false)
    private String lighting;

    @Column(name = "tire", nullable = false)
    private String tire;

    @Column(name = "steering", nullable = false)
    private String steering;

    @Column(name = "mirror", nullable = false)
    private String mirror;

    @Column(name = "air_condition", nullable = false)
    private String airCondition;

    @Column(name = "electric", nullable = false)
    private String electric;

    @Column(name = "fuel", nullable = false)
    private String fuel;

    @Column(name = "update_at", nullable = false)
    private Date updatedAt;

    
    @Column(name = "overall_state", nullable = false)
    private String overallState;
    
    @OneToOne(mappedBy = "state")
    private Bus bus;
}