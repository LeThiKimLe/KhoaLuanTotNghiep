package com.example.QuanLyNhaXe.service;
import java.time.ZoneId;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service ;

import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.ConflictException;
import com.example.QuanLyNhaXe.repository.AccountRepository;
import com.example.QuanLyNhaXe.repository.AdminRepository;
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.CustomerRepository;
import com.example.QuanLyNhaXe.repository.DriverRepository;
import com.example.QuanLyNhaXe.repository.StaffRepository;
import com.example.QuanLyNhaXe.repository.SystemManagerRepository;
import com.example.QuanLyNhaXe.repository.UserRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;

import lombok.RequiredArgsConstructor;

import com.twilio.exception.ApiException;


@Service
@RequiredArgsConstructor
public class TwilioService {
	@Value("${twilio.accountSid}")
    private String accountSid;

    @Value("${twilio.authToken}")
    private String authToken;

    @Value("${twilio.serviceId}")
    private String serviceId;

    @Value("${twilio.phoneNumber}")
    private String phoneNumber;
    
    private final AccountRepository accountRepository;

    

    public Object sendOtp(String toPhoneNumber) {
    	
        Twilio.init(accountSid, authToken);

        try {
        	Verification verification = Verification.creator(serviceId, toPhoneNumber, "sms").create();
            return verification.getDateUpdated().withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh"));
        } catch (ApiException e) {
            // Xử lý lỗi gửi yêu cầu xác minh OTP
            throw new BadRequestException("Error sending OTP: " + e.getMessage());
        }
    }
    
    

    public boolean verifyOtp(String toPhoneNumber, String otp) {
    	
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
    
 public Object sendOtpForSignup(String toPhoneNumber) {
	 boolean checkExist = accountRepository.existsByUsername(toPhoneNumber);
		if (checkExist) {
			throw new ConflictException(Message.EXISTS_ACCOUNT);

		}
        Twilio.init(accountSid, authToken);

        try {
        	Verification verification = Verification.creator(serviceId, toPhoneNumber, "sms").create();
            return verification.getDateUpdated().withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh"));
        } catch (ApiException e) {
            // Xử lý lỗi gửi yêu cầu xác minh OTP
            throw new BadRequestException("Error sending OTP: " + e.getMessage());
        }
    }
}