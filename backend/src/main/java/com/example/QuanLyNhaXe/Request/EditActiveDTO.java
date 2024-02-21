package com.example.QuanLyNhaXe.Request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EditActiveDTO {
	private Integer id;
	private boolean active;
}
