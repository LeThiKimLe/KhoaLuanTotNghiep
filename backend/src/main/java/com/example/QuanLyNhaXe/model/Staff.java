package com.example.QuanLyNhaXe.model;

import java.sql.Date;

import java.util.List;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "staff")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staff_id")
    private Integer staffId;
    
    
    @Column(name = "nickname")
    private String nickname;
    
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "id_card",  unique = true, length = 15)
    private String idCard;

    @Column(name = "address",  length = 200)
    private String address;

    @Column(name = "img")
    private String img;

    @Column(name = "begin_work_date")
    private Date beginWorkDate;

    
    
    @OneToOne(mappedBy = "staff")
    private Admin admin;
    
    @OneToMany(mappedBy = "conductStaff")
    private List<Booking> bookings;
    
    @OneToMany(mappedBy = "staff")
    private List<CancelRequest> cancelRequests;
    
    
    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private BusCompany busCompany;

    public String getImg() {
        return "http://localhost:5000" + this.img;
    }
    
}
