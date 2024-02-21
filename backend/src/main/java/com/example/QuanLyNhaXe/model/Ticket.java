package com.example.QuanLyNhaXe.model;

import java.util.List;

import com.example.QuanLyNhaXe.enumration.TicketState;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ticket")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "seat", nullable = false, length = 45)
    private String seat;
    
    @Column(name = "ticket_price")
    private Integer ticketPrice;

   
    @Column(name = "state", nullable = false)
    private String state;
    
    @OneToOne
    @JoinColumn(name = "bill_id",referencedColumnName = "id")   
    private Bill bill;

    @Column(name = "checked_in", nullable = false)
    private boolean checkedIn;

    @ManyToOne
    @JoinColumn(name = "schedule_id", referencedColumnName = "id")
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "booking_code", referencedColumnName = "code")
    private Booking booking;
    
    @ManyToOne
    @JoinColumn(name = "cancel_request_id", referencedColumnName = "id")
    private CancelRequest cancelRequest;
    
    @OneToMany(mappedBy = "ticket")
    private List<History> histories;
    

    
    
}