package com.example.QuanLyNhaXe.model;

import java.util.List;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bus_type")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "fee")
    private Integer fee;
    
    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(name = "seatmap_id", referencedColumnName = "id")
    private SeatMap seatMap;
    
    @OneToMany(mappedBy = "type")
    private List<Bus> buses;
    
    @OneToMany(mappedBy = "busType")
    private List<Trip> trips;
}