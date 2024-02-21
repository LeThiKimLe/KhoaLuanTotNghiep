package com.example.QuanLyNhaXe.dto;



import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDTO {
	
    private String accessToken;
    private String refreshToken; 
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UserDTO user;

}
