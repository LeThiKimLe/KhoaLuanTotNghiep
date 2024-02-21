package com.example.QuanLyNhaXe.model;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import jakarta.persistence.*;

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

	@Column(name = "amount", nullable = false)
	private double amount;

	@Column(name = "payment_time", nullable = false)
	private LocalDateTime paymentTime;

	@Column(name = "payment_method")
	private String paymentMethod;

	@Column(name = "reference_id", nullable = false, length = 20)
	private String referenceId;

	@OneToOne(mappedBy = "transaction")
	private Booking booking;

	@OneToMany(mappedBy = "transaction")
	private List<History> historys;
}