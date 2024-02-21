package com.example.QuanLyNhaXe.model;

import java.util.List;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "seat_map")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatMap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "row_no", nullable = false)
    private Integer rowNo;

    @Column(name = "col_no", nullable = false)
    private Integer colNo;

    @Column(name = "floor_no", nullable = false)
    private Integer floorNo;
    
    @OneToMany(mappedBy = "seatMap")
    private List<Seat> seats;
    
    @OneToOne(mappedBy = "seatMap")
    private BusType busType;
}