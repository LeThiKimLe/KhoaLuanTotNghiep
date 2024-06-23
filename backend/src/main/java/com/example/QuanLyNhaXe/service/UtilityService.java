package com.example.QuanLyNhaXe.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Random;

import org.springframework.stereotype.Service;

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
		return hcmTime.toLocalDateTime();
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

	public  String getRandomNumber(int len) {
		Random rnd = new Random();
		String chars = "0123456789";
		StringBuilder sb = new StringBuilder(len);
		for (int i = 0; i < len; i++) {
			sb.append(chars.charAt(rnd.nextInt(chars.length())));
		}
		return sb.toString();
	}

	public LocalDateTime convertStringToDateTime(String dateString) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		return LocalDateTime.parse(dateString, formatter);
	}

	public String convertDateTimeToString(LocalDateTime dateTime) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		return dateTime.format(formatter);
	}

	public  long countDaysToEndOfMonth(LocalDate date) {
        LocalDate endOfMonth = date.withDayOfMonth(date.lengthOfMonth());
        return ChronoUnit.DAYS.between(date, endOfMonth);
    }
	
	public LocalDate addDays(LocalDate date, int daysToAdd) {
        return date.plusDays(daysToAdd);
    }

}
