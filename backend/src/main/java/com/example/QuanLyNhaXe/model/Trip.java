package com.example.QuanLyNhaXe.model;

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
@Table(name = "trip")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trip {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "turn")
	private boolean turn;

	@Column(name = "price")
	private Integer price;

	@Column(name = "is_active")
	private boolean isActive;

	@ManyToOne
	@JoinColumn(name = "start_station", referencedColumnName = "id")
	private Station startStation;

	@ManyToOne
	@JoinColumn(name = "end_station", referencedColumnName = "id")
	private Station endStation;

	@ManyToOne
	@JoinColumn(name = "bus_type_id", referencedColumnName = "id")
	private BusType busType;

	@ManyToOne
	@JoinColumn(name = "route_id", referencedColumnName = "id")
	private Route route;

	@OneToMany(mappedBy = "trip")
	private List<Schedule> schedules;

	@OneToMany(mappedBy = "trip")
	private List<Booking> bookings;

	@OneToMany(mappedBy = "trip")
	private List<StopStation> stopStations;

	@OneToMany(mappedBy = "trip")
	private List<Trip_Driver> tripDriver;

	@OneToMany(mappedBy = "trip")
	private List<Trip_Bus> tripBus;

	@ManyToOne
	@JoinColumn(name = "company_id", referencedColumnName = "id")
	private BusCompany busCompany;

	@OneToMany(mappedBy = "trip")
	private List<FixSchedule> fixSchedules;

}