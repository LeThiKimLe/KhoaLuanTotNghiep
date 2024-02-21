package com.example.QuanLyNhaXe.enumration;

public enum TransactionStatus {
    SUCCESS("Thành công"),
    FAILURE("Thất bại");

    private String label;

    private TransactionStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}