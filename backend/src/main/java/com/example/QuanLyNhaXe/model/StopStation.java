package com.example.QuanLyNhaXe.model;

import java.util.List;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "stop_station")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StopStation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "trip_id", referencedColumnName = "id")
	private Trip trip;
	
	@Column(name = "arrival_time")
	private float arrivalTime;

	@ManyToOne
	@JoinColumn(name = "station_id", referencedColumnName = "id")
	private Station station;

	@Column(name = "station_type")
	private String stationType;
	
	@Column(name = "is_active")
    private boolean isActive;

	

	@OneToMany(mappedBy = "pickStation")
	private List<Booking> pickBookings;

	@OneToMany(mappedBy = "dropStation")
	private List<Booking> dropBookings;

}