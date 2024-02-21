package com.example.QuanLyNhaXe.enumration;

public enum PolicyAction {
	
	CANCEL("Hủy"),
    CHANGE("Đổi"),
    EDIT("Sửa");

    private String label;

    private PolicyAction(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

}
