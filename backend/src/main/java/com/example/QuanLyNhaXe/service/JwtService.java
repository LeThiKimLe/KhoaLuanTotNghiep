package com.example.QuanLyNhaXe.service;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.model.Account;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService  {

    private static final String SECRET_KEY = "973D16B3D36246C4D040CC707D3D6C3B388B2AF57CCD2A27F9BE969F6676D71B";
    private static final String ROLES = "roles";
   

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }



    public String generateToken(Map<String, Object> extraClaims, Account userDetails, Date expirationTime, String tokenType) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(String.valueOf(userDetails.getUser().getId()))
                .claim(ROLES, userDetails.getAuthorities())
                .claim("type", tokenType)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration( expirationTime)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    
    public String generateNewRefreshToken(Date expirationTime,  Account userDetails) {
    	
        String tokenType = "Access Token";
        return generateToken(new HashMap<>(), userDetails, expirationTime, tokenType);
    }


    public String generateToken( Account userDetails) {
        
    	Date expirationTime=new Date(System.currentTimeMillis() + 1000 * 60 * 5);
        String tokenType = "Access Token";
        return generateToken(new HashMap<>(), userDetails, expirationTime, tokenType);
    }

    public String generateRefreshToken(Account userDetails) {
    	Date expirationTime=new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7);
        String tokenType = "Refresh Token";
        return generateToken(new HashMap<>(), userDetails, expirationTime, tokenType);
    }

    public boolean isTokenValid(String token, Account userDetails) {
        String username = extractUsername(token);
        return (username.equals(String.valueOf(userDetails.getUser().getId())) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExiration(token).before(new Date());
    }

    public Date extractExiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
    	
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    public String extractType(String token) {
        return extractClaim(token, claims -> claims.get("type", String.class));
    }
    
    public String generateVerifyToken(Map<String, Object> extraClaims, String phoneNumber, Date expirationTime, String tokenType) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(phoneNumber) 
                .claim(ROLES,Account.getCustomerAuthorities())
                .claim("type", tokenType)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expirationTime)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    public String generateNewVerifyToken(String tel) {
    	Date expirationTime=new Date(System.currentTimeMillis() + 1000 * 60 * 10);
        String tokenType = "Verify Token";
        
        return generateVerifyToken(new HashMap<>(), tel, expirationTime, tokenType);
    }
    
   
   
    


}
