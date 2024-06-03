package com.example.QuanLyNhaXe.model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.QuanLyNhaXe.service.ReadBaseProperty;
import com.google.api.client.util.Value;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bus_type")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Component
public class BusType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "fee")
    private Integer fee;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "image")
    private String image;

    @OneToOne
    @JoinColumn(name = "seatmap_id", referencedColumnName = "id")
    private SeatMap seatMap;
    
    @OneToMany(mappedBy = "type")
    private List<Bus> buses;
    
    @OneToMany(mappedBy = "busType")
    private List<Trip> trips;
    
    @ManyToOne
	@JoinColumn(name = "company_id", referencedColumnName = "id")
	private BusCompany busCompany;
    
    @Column(name = "is_active")
	private boolean isActive;

    public String getImage() {
        return "http://localhost:5000" + this.image;
    }
}