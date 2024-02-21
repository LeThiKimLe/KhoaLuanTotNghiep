package com.example.QuanLyNhaXe.configuration;



import io.jsonwebtoken.ExpiredJwtException;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Account;

import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.UserRepository;

import com.example.QuanLyNhaXe.service.JwtService;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;
import com.example.QuanLyNhaXe.util.Utility;

import java.io.IOException;


@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserRepository userRepository;
        @Override
    protected void doFilterInternal(
            @Nonnull HttpServletRequest request,
            @Nonnull HttpServletResponse response,
            @Nonnull FilterChain filterChain
    ) throws ServletException, IOException {
        
        final String authHeader = request.getHeader("Authorization");
        final String JWT;
        final String userId;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        JWT = authHeader.substring(7);
        
        try {
        	 
            userId = jwtService.extractUsername(JWT);
            if(jwtService.extractType(JWT).equals("Verify Token")) {              	
             	filterChain.doFilter(request, response);
             	return;
             }
          
        } catch (ExpiredJwtException e) {
            ResponseMessage responseMessage = new ResponseMessage("Token has expired");
            Utility.responseObject(response, responseMessage);
            return;
        }

        if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null ) {
			User userDetails=userRepository.findById(Integer.valueOf(userId))
					.orElseThrow(() -> new NotFoundException(Message.USER_NOT_FOUND));
            Account account= userDetails.getAccount();
            if (jwtService.isTokenValid(JWT, account)) {
            	
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        account, null, account.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }


}
