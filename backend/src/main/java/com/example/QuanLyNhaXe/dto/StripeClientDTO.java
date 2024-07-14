package com.example.QuanLyNhaXe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StripeClientDTO {
	private String clientSecret;
	private String returnURL;
}
