package com.example.QuanLyNhaXe.model;

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
@Table(name = "route_assign")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteAssign {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private BusCompany busCompany;

    @ManyToOne
    @JoinColumn(name = "route_id",referencedColumnName = "id")
    private Route route;

}
