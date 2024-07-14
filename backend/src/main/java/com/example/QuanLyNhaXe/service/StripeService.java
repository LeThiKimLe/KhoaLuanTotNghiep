package com.example.QuanLyNhaXe.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.QuanLyNhaXe.Request.StripeCharge;
import com.example.QuanLyNhaXe.configuration.PaymentConfig;
import com.example.QuanLyNhaXe.configuration.StripeConfig;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import com.stripe.param.ChargeCreateParams;
import com.stripe.param.PaymentIntentCreateParams;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RestController;
import com.example.QuanLyNhaXe.dto.StripeClientDTO;

@Component
@Service
@RequiredArgsConstructor
public class StripeService {
    @Value("${stripe.currency}")
    private String currency;

    @Value("${base.url}")
    private String baseUrl;

    @Value("${base.adminUrl}")
    private String baseAdminUrl;

    public Object chargeCard(StripeCharge chargeRequest) {
        try {
            ChargeCreateParams createParams = new ChargeCreateParams.Builder()
                    .setAmount(chargeRequest.getAmount())
                    .setCurrency(currency)
                    .setSource(chargeRequest.getToken())
                    .build();

            Charge charge = Charge.create(createParams);
            return charge;
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment failed: " + e.getMessage());
        }
    }

    public String createPaymentIntent(Long amount, String token) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount)
                .setCurrency(currency)
                .putMetadata("order_id", token)
                // In the latest version of the API, specifying the `automatic_payment_methods`
                // parameter is optional because Stripe enables its functionality by default.
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods
                                .builder()
                                .setEnabled(true)
                                .build())
                .build();

        // Create a PaymentIntent with the order amount and currency
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        return paymentIntent.getClientSecret();
    }
}
