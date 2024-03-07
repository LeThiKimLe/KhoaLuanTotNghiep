package com.example.QuanLyNhaXe.model;


import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Table(name = "booking")
@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @Column(name = "code", length = 7)
    private String code;
    
    
    @ManyToOne
	@JoinColumn(name = "pick_station", referencedColumnName = "id")
	private StopStation pickStation;

	@ManyToOne
	@JoinColumn(name = "drop_station", referencedColumnName = "id")
	private StopStation dropStation;

    @Column(name = "booking_date", nullable = false)
    private LocalDateTime bookingDate;

    @Column(name = "ticket_number", nullable = false)
    private Integer ticketNumber;

    @Column(name = "is_ticketing", nullable = false)
    private boolean isTicketing;
    
    @Column(name = "name")
	private String name;
    
    @Column(name = "email", length = 45, nullable = false)
	private String email;
    
    @Column(name = "tel", length = 45, nullable = false)
	private String tel;
    
    @Column(name = "status", length = 45, nullable = false)
	private String status;
    
    @Column(name = "order_id", length = 45)
	private String order_id;
    
    

    @ManyToOne
	@JoinColumn(name = "trip_id", referencedColumnName = "id")
	private Trip trip;

    @ManyToOne
    @JoinColumn(name = "booking_user_id", referencedColumnName = "id")
    private User bookingUser;

    @ManyToOne
    @JoinColumn(name = "conduct_staff_id", referencedColumnName = "staff_id")
    private Staff conductStaff;

    @OneToOne
    @JoinColumn(name = "transaction_id", referencedColumnName = "id")
    private Transaction transaction;
    
    @OneToMany(mappedBy = "booking")
    private List<Ticket> tickets;
    
  
}
