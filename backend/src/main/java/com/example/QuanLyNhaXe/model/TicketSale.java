package com.example.QuanLyNhaXe.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ticket_sale")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketSale {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "from_date", nullable = false)
	private Date fromDate;

	@Column(name = "to_date", nullable = false)
	private Date toDate;
	
	@Column(name = "ticket_sales", nullable = false)
	private double ticketSales;
	
	
	@Column(name = "profit", nullable = false)
	private double profit;
	
	@OneToOne
    @JoinColumn(name = "system_transaction_id", referencedColumnName = "id")
    private SystemTransaction systemTransaction;

}
