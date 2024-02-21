package com.example.QuanLyNhaXe.model;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "seat")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name", nullable = false, length = 45)
    private String name;

    @Column(name = "row_id", nullable = false)
    private Integer row;

    @Column(name = "col_id", nullable = false)
    private Integer col;

    @Column(name = "floor_id", nullable = false)
    private Integer floor;

    @ManyToOne
    @JoinColumn(name = "seatmap_id", referencedColumnName = "id")
    private SeatMap seatMap;
}