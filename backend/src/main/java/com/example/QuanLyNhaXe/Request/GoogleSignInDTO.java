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
public class GoogleSignInDTO {
    @NotEmpty(message = "Cần google token")
    private String googleToken;
}
