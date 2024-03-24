package com.example.QuanLyNhaXe.Request;

import java.util.List;



import lombok.Data;

@Data
public class AssignRoute {
	private List<Integer> routeIds;
	private Integer companyId;

}
