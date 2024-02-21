package com.example.QuanLyNhaXe.model;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "station")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Station {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "name", nullable = false, length = 45)
	private String name;

	@Column(name = "address", nullable = false)
	private String address;

	@Column(precision = 11, scale = 8)
	private BigDecimal longitude;

	@Column(precision = 10, scale = 8)
	private BigDecimal latitude;
	
	@Column(name = "is_active")
    private boolean isActive;

	@ManyToOne
	@JoinColumn(name = "location_id", referencedColumnName = "id")
	private Location location;

	@OneToMany(mappedBy = "startStation")
	private List<Trip> startTrips;

	@OneToMany(mappedBy = "endStation")
	private List<Trip> endTrips;

	@OneToMany(mappedBy = "station")
	private List<StopStation> stopStations;
}