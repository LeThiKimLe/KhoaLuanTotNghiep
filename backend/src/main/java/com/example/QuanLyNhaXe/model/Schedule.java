package com.example.QuanLyNhaXe.model;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "schedule")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Schedule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "trip_id", referencedColumnName = "id")
	private Trip trip; 

	@Column(name = "depart_date", nullable = false)
	private Date departDate;

	@Column(name = "depart_time", nullable = false)
	private Time departTime;

	@Column(name = "ticket_price", nullable = false)
	private Integer ticketPrice;

	@Column(name = "finish_time", nullable = false)
	private Time finishTime;

	@Column(name = "availability")
	private Integer availability;

	@Column(name = "note", length = 45)
	private String note;

	@ManyToOne
	@JoinColumn(name = "driver_id", referencedColumnName = "driver_id")
	private Driver driver;
	
	
	@ManyToOne
	@JoinColumn(name = "driver2_id", referencedColumnName = "driver_id")
	private Driver driver2;
	
	@ManyToOne
	@JoinColumn(name = "bus_id", referencedColumnName = "id")
	private Bus bus;

	@ManyToOne
	@JoinColumn(name = "special_day_id", referencedColumnName = "id")
	private SpecialDay specialDay;
	
	@OneToMany(mappedBy = "schedule")
	private List<Ticket> tickets;
	
	@OneToMany(mappedBy = "schedule")
	private List<Review> reviews;
	
	@OneToMany(mappedBy = "schedule")
	private List<TransportationOrder> transportationOrders;
}
