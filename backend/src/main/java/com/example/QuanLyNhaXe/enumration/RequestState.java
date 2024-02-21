package com.example.QuanLyNhaXe.enumration;

public enum RequestState {
	
	APPROVED("Đã phê duyệt"),
    CANCELED("Đã hủy"),
    PENDING_APPROVAL("Chờ phê duyệt")
   
    ;

    private String label;

    private RequestState(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

}
