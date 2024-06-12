package com.example.QuanLyNhaXe.service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.configuration.PaymentConfig;
import com.example.QuanLyNhaXe.model.Booking;
import com.example.QuanLyNhaXe.model.ServiceFee;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Value;
import jakarta.servlet.http.HttpServletRequest;

@Service

public class VNPayService {
	
	@Value("${base.url}")
    private String baseUrl;

	@Value("${base.adminUrl}")
    private String baseAdminUrl;
	
	public String queryDR(String orderId, String transDate, HttpServletRequest request) {
		try {
			String vnp_RequestId = PaymentConfig.getRandomNumber(8);
			String vnp_Version = "2.1.0";
			String vnp_Command = "querydr";
			String vnp_TmnCode = PaymentConfig.vnp_TmnCode;
			String vnp_TxnRef = orderId;
			String vnp_OrderInfo = "Kiem tra ket qua GD OrderId:" + vnp_TxnRef;
			String vnp_TransDate = transDate;

			Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
			SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
			formatter.setTimeZone(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
			String vnp_CreateDate = formatter.format(cld.getTime());

			String vnp_IpAddr = PaymentConfig.getIpAddress(request);

			JsonObject vnp_Params = new JsonObject();

			vnp_Params.addProperty("vnp_RequestId", vnp_RequestId);
			vnp_Params.addProperty("vnp_Version", vnp_Version);
			vnp_Params.addProperty("vnp_Command", vnp_Command);
			vnp_Params.addProperty("vnp_TmnCode", vnp_TmnCode);
			vnp_Params.addProperty("vnp_TxnRef", vnp_TxnRef);
			vnp_Params.addProperty("vnp_OrderInfo", vnp_OrderInfo);
			vnp_Params.addProperty("vnp_TransactionDate", vnp_TransDate);
			vnp_Params.addProperty("vnp_CreateDate", vnp_CreateDate);
			vnp_Params.addProperty("vnp_IpAddr", vnp_IpAddr);

			String hash_Data = String.join("|", vnp_RequestId, vnp_Version, vnp_Command, vnp_TmnCode, vnp_TxnRef,
					vnp_TransDate, vnp_CreateDate, vnp_IpAddr, vnp_OrderInfo);
			String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.vnp_HashSecret, hash_Data.toString());

			vnp_Params.addProperty("vnp_SecureHash", vnp_SecureHash);

			URL url = new URL(PaymentConfig.vnp_ApiUrl);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("POST");
			con.setRequestProperty("Content-Type", "application/json");
			con.setDoOutput(true);
			DataOutputStream wr = new DataOutputStream(con.getOutputStream());
			wr.writeBytes(vnp_Params.toString());
			wr.flush();
			wr.close();
			int responseCode = con.getResponseCode();
			System.out.println("nSending 'POST' request to URL : " + url);
			System.out.println("Post Data : " + vnp_Params);
			System.out.println("Response Code : " + responseCode);
			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String output;
			StringBuffer response = new StringBuffer();
			while ((output = in.readLine()) != null) {
				response.append(output);
			}
			in.close();
			System.out.println(response.toString());

			return response.toString();
		} catch (Exception e) {
			// Xử lý ngoại lệ nếu có
			e.printStackTrace();
			return null;
		}
	}

	public String generatePaymentUrl(HttpServletRequest req, Integer amountNumber, String order_id, String bookingInfor) throws UnsupportedEncodingException {
		String vnp_Version = "2.1.0";
		String vnp_Command = "pay";
		String orderType = "other";
		long amount = amountNumber * 100;
		String bankCode = req.getParameter("bankCode");

		String vnp_TxnRef = order_id;
		String vnp_IpAddr = PaymentConfig.getIpAddress(req);

		String vnp_TmnCode = PaymentConfig.vnp_TmnCode;

		Map<String, String> vnp_Params = new HashMap<>();
		vnp_Params.put("vnp_Version", vnp_Version);
		vnp_Params.put("vnp_Command", vnp_Command);
		vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
		vnp_Params.put("vnp_Amount", String.valueOf(amount));
		vnp_Params.put("vnp_CurrCode", "VND");

		if (bankCode != null && !bankCode.isEmpty()) {
			vnp_Params.put("vnp_BankCode", bankCode);
		}
		vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
		vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + bookingInfor);
		vnp_Params.put("vnp_OrderType", orderType);

		vnp_Params.put("vnp_Locale", "vn");

		vnp_Params.put("vnp_ReturnUrl", baseUrl + PaymentConfig.vnp_Returnurl + bookingInfor + "/");
		vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
		
		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		formatter.setTimeZone(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
		String vnp_CreateDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

		cld.add(Calendar.MINUTE, 10);
		String vnp_ExpireDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

		List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
		Collections.sort(fieldNames);
		StringBuilder hashData = new StringBuilder();
		StringBuilder query = new StringBuilder();
		Iterator<String> itr = fieldNames.iterator();
		while (itr.hasNext()) {
			String fieldName = itr.next();
			String fieldValue = vnp_Params.get(fieldName);
			if (fieldValue != null && fieldValue.length() > 0) {
				// Build hash data
				hashData.append(fieldName);
				hashData.append('=');
				hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
				// Build query
				query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
				query.append('=');
				query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
				if (itr.hasNext()) {
					query.append('&');
					hashData.append('&');
				}
			}
		}
		String queryUrl = query.toString();
		String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.vnp_HashSecret, hashData.toString());
		queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
		String paymentUrl = PaymentConfig.vnp_Url + "?" + queryUrl;
		
		return paymentUrl;
	}

	public String refund(String transactionType, String orderId, Integer amountNumber, String transactionDate, String user,
			String transactionNo, HttpServletRequest req) throws IOException {
		String vnp_RequestId = PaymentConfig.getRandomNumber(8);
		String vnp_Version = "2.1.0";
		String vnp_Command = "refund";
		String vnp_TmnCode = PaymentConfig.vnp_TmnCode;
		String vnp_TransactionType = transactionType;
		String vnp_TxnRef = orderId;
		long amount = amountNumber * 100;
		String vnp_Amount = String.valueOf(amount);
		String vnp_OrderInfo = "Hoan tien GD OrderId:" + vnp_TxnRef;
		String vnp_TransactionNo = ""; // Assuming value of the parameter "vnp_TransactionNo" does not exist on your
										// system.
		String vnp_TransactionDate = transactionDate;
		String vnp_CreateBy = user;

		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		formatter.setTimeZone(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
		String vnp_CreateDate = formatter.format(cld.getTime());

		String vnp_IpAddr = PaymentConfig.getIpAddress(req);

		JsonObject vnp_Params = new JsonObject();

		vnp_Params.addProperty("vnp_RequestId", vnp_RequestId);
		vnp_Params.addProperty("vnp_Version", vnp_Version);
		vnp_Params.addProperty("vnp_Command", vnp_Command);
		vnp_Params.addProperty("vnp_TmnCode", vnp_TmnCode);
		vnp_Params.addProperty("vnp_TransactionType", vnp_TransactionType);
		vnp_Params.addProperty("vnp_TxnRef", vnp_TxnRef);
		vnp_Params.addProperty("vnp_Amount", vnp_Amount);
		vnp_Params.addProperty("vnp_OrderInfo", vnp_OrderInfo);

		if (vnp_TransactionNo != null && !vnp_TransactionNo.isEmpty()) {
			vnp_Params.addProperty("vnp_TransactionNo", transactionNo);
		}

		vnp_Params.addProperty("vnp_TransactionDate", vnp_TransactionDate);
		vnp_Params.addProperty("vnp_CreateBy", vnp_CreateBy);
		vnp_Params.addProperty("vnp_CreateDate", vnp_CreateDate);
		vnp_Params.addProperty("vnp_IpAddr", vnp_IpAddr);

		String hash_Data = String.join("|", vnp_RequestId, vnp_Version, vnp_Command, vnp_TmnCode, vnp_TransactionType,
				vnp_TxnRef, vnp_Amount, vnp_TransactionNo, vnp_TransactionDate, vnp_CreateBy, vnp_CreateDate,
				vnp_IpAddr, vnp_OrderInfo);

		String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.vnp_HashSecret, hash_Data.toString());

		vnp_Params.addProperty("vnp_SecureHash", vnp_SecureHash);

		URL url = new URL(PaymentConfig.vnp_ApiUrl);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("POST");
		con.setRequestProperty("Content-Type", "application/json");
		con.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.writeBytes(vnp_Params.toString());
		wr.flush();
		wr.close();
		int responseCode = con.getResponseCode();
		System.out.println("nSending 'POST' request to URL : " + url);
		System.out.println("Post Data : " + vnp_Params);
		System.out.println("Response Code : " + responseCode);
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String output;
		StringBuffer response = new StringBuffer();
		while ((output = in.readLine()) != null) {
			response.append(output);
		}
		in.close();
		System.out.println(response.toString());
		 return response.toString();
	}
	
	
	public String generateFeePaymentUrl(HttpServletRequest req, Integer amountNumber, String order_id, ServiceFee serviceFee) throws UnsupportedEncodingException {
		String vnp_Version = "2.1.0";
		String vnp_Command = "pay";
		String orderType = "other";
		long amount = amountNumber * 100;
		String bankCode = req.getParameter("bankCode");

		String vnp_TxnRef = order_id;
		String vnp_IpAddr = PaymentConfig.getIpAddress(req);

		String vnp_TmnCode = PaymentConfig.vnp_TmnCode;

		Map<String, String> vnp_Params = new HashMap<>();
		vnp_Params.put("vnp_Version", vnp_Version);
		vnp_Params.put("vnp_Command", vnp_Command);
		vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
		vnp_Params.put("vnp_Amount", String.valueOf(amount));
		vnp_Params.put("vnp_CurrCode", "VND");

		if (bankCode != null && !bankCode.isEmpty()) {
			vnp_Params.put("vnp_BankCode", bankCode);
		}
		vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
		vnp_Params.put("vnp_OrderInfo", "Thanh toan phi dich vu ky han " + serviceFee.getDueDate() + " code" + serviceFee.getId());
		vnp_Params.put("vnp_OrderType", orderType);

		vnp_Params.put("vnp_Locale", "vn");

		vnp_Params.put("vnp_ReturnUrl", baseAdminUrl + PaymentConfig.vnp_ReturnFeeUrl);
		vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		formatter.setTimeZone(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
		String vnp_CreateDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

		cld.add(Calendar.MINUTE, 10);
		String vnp_ExpireDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

		List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
		Collections.sort(fieldNames);
		StringBuilder hashData = new StringBuilder();
		StringBuilder query = new StringBuilder();
		Iterator<String> itr = fieldNames.iterator();
		while (itr.hasNext()) {
			String fieldName = itr.next();
			String fieldValue = vnp_Params.get(fieldName);
			if (fieldValue != null && fieldValue.length() > 0) {
				// Build hash data
				hashData.append(fieldName);
				hashData.append('=');
				hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
				// Build query
				query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
				query.append('=');
				query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
				if (itr.hasNext()) {
					query.append('&');
					hashData.append('&');
				}
			}
		}
		String queryUrl = query.toString();
		String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.vnp_HashSecret, hashData.toString());
		queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
		String paymentUrl = PaymentConfig.vnp_Url + "?" + queryUrl;
		
		return paymentUrl;
	}


	public String generateBookingPaymentUrlWithTime(HttpServletRequest req, Integer amountNumber, String order_id, String bookingInfor, Date orderTime) throws UnsupportedEncodingException {
		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		formatter.setTimeZone(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
		String vnp_Version = "2.1.0";
		String vnp_Command = "pay";
		String orderType = "other";
		long amount = amountNumber * 100;
		String bankCode = req.getParameter("bankCode");
		String vnp_TxnRef = order_id + formatter.format(cld.getTime());
		String vnp_IpAddr = PaymentConfig.getIpAddress(req);
		String vnp_TmnCode = PaymentConfig.vnp_TmnCode;
		Map<String, String> vnp_Params = new HashMap<>();
		vnp_Params.put("vnp_Version", vnp_Version);
		vnp_Params.put("vnp_Command", vnp_Command);
		vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
		vnp_Params.put("vnp_Amount", String.valueOf(amount));
		vnp_Params.put("vnp_CurrCode", "VND");
		if (bankCode != null && !bankCode.isEmpty()) {
			vnp_Params.put("vnp_BankCode", bankCode);
		}
		vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
		vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + bookingInfor);
		vnp_Params.put("vnp_OrderType", orderType);
		vnp_Params.put("vnp_Locale", "vn");
		vnp_Params.put("vnp_ReturnUrl", baseUrl + PaymentConfig.vnp_Returnurl + bookingInfor + "/");
		vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
		cld.setTime(orderTime);
		String vnp_CreateDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
		cld.add(Calendar.MINUTE, 10);
		String vnp_ExpireDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
		List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
		Collections.sort(fieldNames);
		StringBuilder hashData = new StringBuilder();
		StringBuilder query = new StringBuilder();
		Iterator<String> itr = fieldNames.iterator();
		while (itr.hasNext()) {
			String fieldName = itr.next();
			String fieldValue = vnp_Params.get(fieldName);
			if (fieldValue != null && fieldValue.length() > 0) {
				// Build hash data
				hashData.append(fieldName);
				hashData.append('=');
				hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
				// Build query
				query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
				query.append('=');
				query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
				if (itr.hasNext()) {
					query.append('&');
					hashData.append('&');
				}
			}
		}
		String queryUrl = query.toString();
		String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.vnp_HashSecret, hashData.toString());
		queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
		String paymentUrl = PaymentConfig.vnp_Url + "?" + queryUrl;
		
		return paymentUrl;
	}

}
