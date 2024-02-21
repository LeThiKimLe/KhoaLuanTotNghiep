package com.example.QuanLyNhaXe.model;

import java.time.LocalDateTime;

import com.example.QuanLyNhaXe.enumration.ReviewState;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "review")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "rate")
    private Integer rate;

    @Column(name = "comment", length = 255)
    private String comment;

    @Column(name = "state", nullable = false)   
    private String state;

    @ManyToOne
    @JoinColumn(name = "schedule_id", referencedColumnName = "id")
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "reviewer_id", referencedColumnName = "id")
    private User reviewer;

    @Column(name = "send_date")
    private LocalDateTime sendDate;
}