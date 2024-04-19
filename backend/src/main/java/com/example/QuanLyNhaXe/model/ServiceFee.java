package com.example.QuanLyNhaXe.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "service_fee")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceFee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "fee", nullable = false)
	private double fee;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "due_date", nullable = false)
	private LocalDate dueDate;
	
	@OneToOne
    @JoinColumn(name = "system_transaction_id", referencedColumnName = "id")
    private SystemTransaction systemTransaction;
	
	
	@ManyToOne
	@JoinColumn(name = "company_id", referencedColumnName = "id")
	private BusCompany busCompany;
	
	

}
