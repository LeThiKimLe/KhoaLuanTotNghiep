package com.example.QuanLyNhaXe.Request;

import com.example.QuanLyNhaXe.model.Staff;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EditActiveDTO {
	private Integer id;
	private boolean active;
}
