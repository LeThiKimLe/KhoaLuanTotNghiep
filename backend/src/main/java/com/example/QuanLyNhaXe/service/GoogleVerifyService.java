package com.example.QuanLyNhaXe.service;

import java.util.Collections;
import java.util.Optional;

import org.modelmapper.ModelMapper;

import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.dto.AccountDTO;
import com.example.QuanLyNhaXe.dto.TokenDTO;
import com.example.QuanLyNhaXe.dto.UserDTO;
import com.example.QuanLyNhaXe.exception.BadRequestException;

import com.example.QuanLyNhaXe.model.Account;
import com.example.QuanLyNhaXe.repository.AccountRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GoogleVerifyService {
	private final AccountRepository accountRepository;
	private final ModelMapper modelMapper;
	private final JwtService jwtService;

	private final String CLIENT_ID = "764886878937-m1j9glnjhm59c6e59gu41rluj46hpktv.apps.googleusercontent.com";

	public Object verifyToken(String idTokenString) {
		UserDTO userDTO = new UserDTO();
		try {
			NetHttpTransport transport = new NetHttpTransport();
			JacksonFactory jsonFactory = new JacksonFactory();

			GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
					.setAudience(Collections.singletonList(CLIENT_ID)).build();

			GoogleIdToken idToken = verifier.verify(idTokenString);
			if (idToken != null) {
				Payload payload = idToken.getPayload();
				String userId = payload.getSubject();
				String email = payload.getEmail();
				String name = (String) payload.get("name");
				Optional<Account> accountOptional = accountRepository.findByOauthId(userId);
				if (accountOptional.isPresent()) {
					userDTO=modelMapper.map(accountOptional.get().getUser(), UserDTO.class);
					
					String accessToken = jwtService.generateToken(accountOptional.get());
					String refreshToken = jwtService.generateRefreshToken(accountOptional.get());
					accountOptional.get().setRefreshToken(refreshToken);
					accountRepository.save(accountOptional.get());
					return TokenDTO.builder().accessToken(accessToken).refreshToken(refreshToken).user(userDTO).build();
					
				} else {
					AccountDTO account = new AccountDTO();
					account.setOauthId(userId);
					userDTO.setName(name);
					userDTO.setEmail(email);
					userDTO.setAccount(account);
					return userDTO;

				}
                
			} else {

				return new ResponseMessage(Message.INACCURATE_DATA);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new BadRequestException("Lỗi xử lý");
		}
	}
}
