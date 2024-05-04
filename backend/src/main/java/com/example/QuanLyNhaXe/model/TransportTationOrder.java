package com.example.QuanLyNhaXe.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "transporttation_order")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransportTationOrder {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "create_time")
	private LocalDateTime createTime;

	@Column(name = "update_time")
	private LocalDateTime updateTime;
	
	
	@Column(name = "image")
	private String image;
	
	
	@Column(name = "status")
	private String status;

	@ManyToOne
	@JoinColumn(name = "schedule_id", referencedColumnName = "id")
	private Schedule schedule;
	
	

}
