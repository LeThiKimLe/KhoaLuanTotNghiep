package com.example.QuanLyNhaXe.enumration;

public enum TransactionType {
    PAYMENT("Thanh toán"),
    REFUND("Hoàn tiền");

    private String label;

    private TransactionType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
