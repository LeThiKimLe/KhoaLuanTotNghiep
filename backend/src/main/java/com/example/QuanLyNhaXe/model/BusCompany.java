package com.example.QuanLyNhaXe.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bus_company")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusCompany {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "business_license")
	private String businessLicense;


	@Column(name = "admin_id")
	private Integer adminId;

	@Column(name = "coop_day")
	private LocalDate coopDay;

	@Column(name = "is_active")
	private boolean isActive;

	@OneToMany(mappedBy = "busCompany")
	private List<Staff> staffs;

	@OneToMany(mappedBy = "busCompany")
	private List<Trip> trips;

	@OneToMany(mappedBy = "busCompany")
	private List<Bus> buses;

	@OneToMany(mappedBy = "busCompany")
	private List<SpecialDay> specialDays;

	@OneToMany(mappedBy = "busCompany")
	private List<RouteAssign> routeAssigns;

	@OneToMany(mappedBy = "busCompany")
	private List<Station> stations;

	@OneToMany(mappedBy = "busCompany")
	private List<BusType> busTypes;
	
	@OneToMany(mappedBy = "busCompany")
	private List<Driver> drivers;
}
