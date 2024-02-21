package com.example.QuanLyNhaXe.enumration;

public enum BusAvailability {
    AVAILABLE("Sẵn sàng"),
    UNDER_MAINTENANCE("Đang bảo trì"),
    OUT_OF_SERVICE("Ngưng sử dụng");

    private String label;

    private BusAvailability(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}