package com.example.QuanLyNhaXe.Request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateReview {
	@NotNull(message = "Rate must not be null")
    @Min(value = 1, message = "Rate must be at least 1")
    @Max(value = 5, message = "Rate must be at most 5")
	private Integer rate;
	@NotNull(message = "Rate must not be null")
	@Min(value = 1, message = "Schedule ID must be an integer")
	private Integer scheduleId;
	private String comment;

}
