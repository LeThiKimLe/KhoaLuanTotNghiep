package com.example.QuanLyNhaXe.model;

import java.util.List;

import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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

    @Column(name = "wifi")
	private boolean wifi;

    @Column(name = "water")
	private boolean water;

    @Column(name = "cool_tissue")
	private boolean coolTissue;

    @Column(name = "phone_charge")
	private boolean phoneCharge;

    @Column(name = "blanket")
	private boolean blanket;

    @Column(name = "pillow")
	private boolean pillow;

    @Column(name = "breaking_hammer")
	private boolean breakingHammer;

    @Column(name = "conditioner")
	private boolean conditioner;

    @Column(name = "toilet")
	private boolean toilet;

    @Column(name = "reading_light")
	private boolean readingLight;

    @Column(name = "curtain")
	private boolean curtain;

    @Column(name = "tivi_led")
	private boolean tiviLed;

    public String getImage() {
        return "https://vexe.workon.space" + this.image;
    }
}