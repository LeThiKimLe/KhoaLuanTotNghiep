package com.example.QuanLyNhaXe.enumration;

public enum BusOverallState {
    NORMAL("Bình thường"),
    NEEDS_MAINTENANCE("Cần bảo trì");

    private String label;

    private BusOverallState(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
