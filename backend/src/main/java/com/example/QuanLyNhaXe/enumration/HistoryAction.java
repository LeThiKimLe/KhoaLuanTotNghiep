package com.example.QuanLyNhaXe.enumration;

public enum HistoryAction {
    CHANGE("Đổi"),
    CANCEL("Hủy");

    private String label;

    private HistoryAction(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}