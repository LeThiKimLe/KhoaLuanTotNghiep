package com.example.QuanLyNhaXe.Request;


import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {
	@NotEmpty(message = "Tên đăng nhập không được để trống") 
    private String username;
	@NotEmpty(message = "Mật khẩu không được để trống")
    private String password;
}
