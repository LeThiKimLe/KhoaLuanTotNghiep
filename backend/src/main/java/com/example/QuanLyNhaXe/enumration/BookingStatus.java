package com.example.QuanLyNhaXe.enumration;

public enum BookingStatus {
	
	SUCCESS("Thành công"),
    CANCELED("Đã hủy"),
    RESERVE("Giữ chỗ");
	
	
	 private String label;
	

	    private BookingStatus(String label) {
	        this.label = label;
	    }

	    public String getLabel() {
	        return label;
	    }

}
