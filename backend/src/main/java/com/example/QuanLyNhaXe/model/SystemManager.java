package com.example.QuanLyNhaXe.model;

import java.sql.Date;
import java.util.List;

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
@Table(name = "system_manager")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SystemManager {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
	
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

}
