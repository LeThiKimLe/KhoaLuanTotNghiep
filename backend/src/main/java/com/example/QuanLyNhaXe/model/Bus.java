package com.example.QuanLyNhaXe.model;

import java.util.List;

import com.example.QuanLyNhaXe.enumration.BusAvailability;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bus")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "license_plate", nullable = false)
    private String licensePlate;

    @Column(name = "manufacture_year", nullable = false)
    private int manufactureYear;

    @Column(name = "color")
    private String color;

    
    @Column(name = "availability")
    private String availability;

    

    @OneToOne
    @JoinColumn(name = "state_id", referencedColumnName = "id")
    private BusQuality state;
    

    @ManyToOne
    @JoinColumn(name = "type_id", referencedColumnName = "id")
    private BusType type;
    
    @OneToMany(mappedBy = "bus")
    private List<Trip_Bus> busTrip;
    
    
    @OneToMany(mappedBy = "bus")
    private List<Schedule> schedules;
    
    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private BusCompany busCompany;

 
   
}
