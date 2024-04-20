package com.example.QuanLyNhaXe.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "system_transaction")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SystemTransaction {
	
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
	
	@OneToOne(mappedBy = "systemTransaction")
	private TicketSave ticketSave;
	
	@OneToOne(mappedBy = "systemTransaction")
	private ServiceFee serviceFee;

}
