package com.example.QuanLyNhaXe.enumration;

public enum PaymentMethod {
    MOMO("Momo"),
    VNPAY("VNPay"),
    BANKING("Banking"),
    CASH("Cash"),
    STRIPE("Stripe");

    private String label;

    private PaymentMethod(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
