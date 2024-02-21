package com.example.QuanLyNhaXe.model;

import java.util.List;

import com.example.QuanLyNhaXe.enumration.HistoryAction;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "policy")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Policy {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "action", nullable = false)
	private String action;

	@Column(name = "time_required", nullable = false)
	private float timeRequired;

	@Column(name = "number_required", nullable = false)
	private Integer numberRequired;
	
	
	@Column(name = "min_number_required", nullable = false)
	private Integer minNumberRequired;

	@Column(name = "refund_rate", nullable = false)
	private float refundRate;

	@Column(name = "for_special_day", nullable = false)
	private boolean specialDay;

	@Column(name = "description", nullable = false)
	private String description;

	@OneToMany(mappedBy = "policy")
	private List<History> histories;
}
