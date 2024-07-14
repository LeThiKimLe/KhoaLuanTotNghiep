package com.example.QuanLyNhaXe.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuanLyNhaXe.Request.CreateBookingDTO;
import com.example.QuanLyNhaXe.Request.PaymentRequest;
import com.example.QuanLyNhaXe.Request.StripeCharge;
import com.example.QuanLyNhaXe.service.StripeService;
import com.example.QuanLyNhaXe.service.VNPayService;
import com.stripe.exception.StripeException;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/payment")
public class PaymentController {
	private final VNPayService vnpayService;
	private final StripeService stripeService;

	@Autowired
	public PaymentController(VNPayService vnpayService, StripeService stripeService) {
		this.vnpayService = vnpayService;
		this.stripeService = stripeService;
	}

	@PostMapping("/refund")
	public ResponseEntity<String> refund(@RequestParam String transactionType, @RequestParam String orderId,
			@RequestParam Integer amount, @RequestParam String transactionDate,@RequestParam String user,@RequestParam String transactionNo,HttpServletRequest request) {
		try {
			String response = vnpayService.refund(transactionType, orderId, amount, transactionDate,user,transactionNo,request);
			return ResponseEntity.ok(response);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/query-payment")
	public String generatePaymentUrl(@RequestParam("orderId") String orderId,
			@RequestParam("transDate") String transDate, HttpServletRequest request) {
		String result = vnpayService.queryDR(orderId, transDate, request);
		return result;
	}

	@PostMapping("/stripe-charge")
	public ResponseEntity<Object> chargeStripe(@RequestBody StripeCharge chargeRequest) {
		return new ResponseEntity<>(stripeService.chargeCard(chargeRequest), HttpStatus.OK);
	}

	@PostMapping("/stripe-create-payment")
	public ResponseEntity<Object> createPayment(@RequestBody StripeCharge chargeRequest) throws StripeException {
		return new ResponseEntity<>(stripeService.createPaymentIntent(chargeRequest), HttpStatus.OK);
	}

//	@GetMapping("/generate-payment-url")
//	public ResponseEntity<Object> pay(HttpServletRequest request, @RequestParam Integer amount) {
//
//		try {
//			// Mã có thể gây ra ngoại lệ UnsupportedEncodingException
//			return new ResponseEntity<>(vnpayService.generatePaymentUrl(request, amount), HttpStatus.OK);
//		} catch (UnsupportedEncodingException e) {
//			// Xử lý lỗi tại đây
//			e.printStackTrace();
//
//			return new ResponseEntity<>("Error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}

}
