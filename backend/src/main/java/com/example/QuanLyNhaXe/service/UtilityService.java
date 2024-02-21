package com.example.QuanLyNhaXe.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.model.Booking;
import com.example.QuanLyNhaXe.model.Location;
import com.example.QuanLyNhaXe.model.Schedule;
import com.example.QuanLyNhaXe.model.Station;
import com.example.QuanLyNhaXe.model.Ticket;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UtilityService {
	private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	
	
	public LocalDateTime convertHCMDateTime() {
		LocalDateTime currentTime = LocalDateTime.now();
        ZoneId originalZone = ZoneId.systemDefault();
        ZoneId hcmZone = ZoneId.of("Asia/Ho_Chi_Minh");
        ZonedDateTime hcmTime = currentTime.atZone(originalZone).withZoneSameInstant(hcmZone);
        return  hcmTime.toLocalDateTime();
	}
	
	public String generateRandomString(int length) {
		Random random = new Random();
		StringBuilder sb = new StringBuilder(length);

		for (int i = 0; i < length; i++) {
			int randomIndex = random.nextInt(CHARACTERS.length());
			char randomChar = CHARACTERS.charAt(randomIndex);
			sb.append(randomChar);
		}

		return sb.toString();
	}
	

}
