package com.example.QuanLyNhaXe.enumration;

public enum ReviewState {
    APPROVED("Duyệt"),
    PENDING("Chờ duyệt"),
    HIDDEN("Ẩn");

    private String label;

    private ReviewState(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
