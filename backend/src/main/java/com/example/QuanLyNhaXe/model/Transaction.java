package com.example.QuanLyNhaXe.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "transaction")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "transaction_type", nullable = false)
	private String transactionType;
	
	@Column(name = "transaction_no")
	private String transactionNo;

	@Column(name = "amount", nullable = false)
	private double amount;

	@Column(name = "payment_time", nullable = false)
	private LocalDateTime paymentTime;

	@Column(name = "payment_method")
	private String paymentMethod;

	

	@OneToOne(mappedBy = "transaction")
	private Booking booking;

	@OneToMany(mappedBy = "transaction")
	private List<History> historys;
}