
package com.example.QuanLyNhaXe.service;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CaptchaService {

	public boolean captchaVerification(String captchaResponse) {
		boolean valid = false;
		String secretKey = "6LflWA8pAAAAAIUBLczdexKbyCz6Pn4sP7kv7CvY";
		String url = "https://www.google.com/recaptcha/api/siteverify";
		if (captchaResponse==null||captchaResponse.isEmpty()) {
	        return valid;
		}
		try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
			HttpPost httpPost = new HttpPost(url);
			String secret = "secret=" + secretKey;
			String response = "response=" + captchaResponse;
			String params = secret + "&" + response;

			StringEntity entity = new StringEntity(params, "UTF-8");
			entity.setContentType("application/x-www-form-urlencoded");
			httpPost.setEntity(entity);

			HttpResponse responseExcute = httpClient.execute(httpPost);
			HttpEntity responseEntity = responseExcute.getEntity();

			if (responseEntity != null) {
				String jsonResponse = EntityUtils.toString(responseEntity);

				ObjectMapper objectMapper = new ObjectMapper();
				JsonNode jsonNode = objectMapper.readTree(jsonResponse);

				valid = jsonNode.get("success").asBoolean();

				EntityUtils.consume(responseEntity);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return valid;
	}

}
