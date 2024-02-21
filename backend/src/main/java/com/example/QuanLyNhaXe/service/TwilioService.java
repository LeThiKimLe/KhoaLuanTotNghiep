package com.example.QuanLyNhaXe.service;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service ;

import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import com.twilio.exception.ApiException;


@Service
public class TwilioService {
	@Value("${twilio.accountSid}")
    private String accountSid;

    @Value("${twilio.authToken}")
    private String authToken;

    @Value("${twilio.serviceId}")
    private String serviceId;

    @Value("${twilio.phoneNumber}")
    private String phoneNumber;

    

    public Object sendOtp(String toPhoneNumber) {
    	toPhoneNumber=phoneNumber;
        Twilio.init(accountSid, authToken);

        try {
        	Verification verification = Verification.creator(serviceId, toPhoneNumber, "sms").create();
            return verification.getDateUpdated().withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh"));
        } catch (ApiException e) {
            // Xử lý lỗi gửi yêu cầu xác minh OTP
            throw new RuntimeException("Error sending OTP: " + e.getMessage());
        }
    }

    public boolean verifyOtp(String toPhoneNumber, String otp) {
    	toPhoneNumber=phoneNumber;
        Twilio.init(accountSid, authToken);

        try {
        	VerificationCheck verificationCheck = VerificationCheck.creator(
                    serviceId)
                .setTo(toPhoneNumber)
                .setCode(otp)
                .create();
            return verificationCheck.getStatus().equals("approved");
        } catch (ApiException e) {           
            throw new BadRequestException("Error verifying OTP: " + e.getMessage());
        }
        
    }
}