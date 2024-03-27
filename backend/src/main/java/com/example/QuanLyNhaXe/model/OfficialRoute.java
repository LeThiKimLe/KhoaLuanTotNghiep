package com.example.QuanLyNhaXe.model;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OfficialRoute {
    private String id;
    private String departure;
    private String destination;
    private String startStation;
    private String endStation;
    private String journey;
    private String distance;
}
