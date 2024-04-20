package com.example.QuanLyNhaXe.model;

import java.util.List;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "route")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Route {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;



	@ManyToOne
	@JoinColumn(name = "departure", referencedColumnName = "id")
	private Location departure;

	@ManyToOne
	@JoinColumn(name = "destination", referencedColumnName = "id")
	private Location destination;


	@Column(name = "parents")
	private Integer parents;

	

	@Column(name = "is_active")
	private boolean isActive;

	@Column(name = "route_code")
	private String routeCode;

	@OneToMany(mappedBy = "route")
	private List<Trip> trips;

	@OneToMany(mappedBy = "route")
	private List<RouteAssign> routeAssigns;

}