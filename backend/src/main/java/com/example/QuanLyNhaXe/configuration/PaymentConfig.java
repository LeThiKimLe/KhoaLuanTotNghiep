package com.example.QuanLyNhaXe.configuration;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class PaymentConfig {

	

		public static String vnp_TmnCode = "UHANIMVU";
		public static  String vnp_Returnurl = "https://vexe.workon.space/payment/";
		public static String vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
		public  static String vnp_HashSecret = "HESYEZSHYLQULKQSJTOAXSWQKAQXCVYX";		
		public static String vnp_ApiUrl = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";


		 public static String md5(String message) {
		        String digest = null;
		        try {
		            MessageDigest md = MessageDigest.getInstance("MD5");
		            byte[] hash = md.digest(message.getBytes("UTF-8"));
		            StringBuilder sb = new StringBuilder(2 * hash.length);
		            for (byte b : hash) {
		                sb.append(String.format("%02x", b & 0xff));
		            }
		            digest = sb.toString();
		        } catch (UnsupportedEncodingException ex) {
		            digest = "";
		        } catch (NoSuchAlgorithmException ex) {
		            digest = "";
		        }
		        return digest;
		    }

		    public static String Sha256(String message) {
		        String digest = null;
		        try {
		            MessageDigest md = MessageDigest.getInstance("SHA-256");
		            byte[] hash = md.digest(message.getBytes("UTF-8"));
		            StringBuilder sb = new StringBuilder(2 * hash.length);
		            for (byte b : hash) {
		                sb.append(String.format("%02x", b & 0xff));
		            }
		            digest = sb.toString();
		        } catch (UnsupportedEncodingException ex) {
		            digest = "";
		        } catch (NoSuchAlgorithmException ex) {
		            digest = "";
		        }
		        return digest;
		    }

		    
		    
		    public static String hmacSHA512(final String key, final String data) {
		        try {

		            if (key == null || data == null) {
		                throw new NullPointerException();
		            }
		            final Mac hmac512 = Mac.getInstance("HmacSHA512");
		            byte[] hmacKeyBytes = key.getBytes();
		            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
		            hmac512.init(secretKey);
		            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
		            byte[] result = hmac512.doFinal(dataBytes);
		            StringBuilder sb = new StringBuilder(2 * result.length);
		            for (byte b : result) {
		                sb.append(String.format("%02x", b & 0xff));
		            }
		            return sb.toString();

		        } catch (Exception ex) {
		            return "";
		        }
		    }
		    
		    public static String getIpAddress(HttpServletRequest request) {
		        String ipAdress;
		        try {
		            ipAdress = request.getHeader("X-FORWARDED-FOR");
		            if (ipAdress == null) {
		                ipAdress = request.getRemoteAddr();
		            }
		        } catch (Exception e) {
		            ipAdress = "Invalid IP:" + e.getMessage();
		        }
		        return ipAdress;
		    }

		    public static String getRandomNumber(int len) {
		        Random rnd = new Random();
		        String chars = "0123456789";
		        StringBuilder sb = new StringBuilder(len);
		        for (int i = 0; i < len; i++) {
		            sb.append(chars.charAt(rnd.nextInt(chars.length())));
		        }
		        return sb.toString();
		    }
		    
		    @Bean
		    public RestTemplate restTemplate() {
		      return new RestTemplate();
		    }

}
