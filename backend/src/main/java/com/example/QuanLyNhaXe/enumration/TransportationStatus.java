package com.example.QuanLyNhaXe.enumration;

public enum TransportationStatus {

	DA_NHAN_LENH("Đã nhận lệnh"),
	XUAT_BEN("Xuất bến"),
	DEN_BEN("Đến bến"), 
	DA_TRUYEN_TAI("Đã truyền tải"),
	DA_CAP_LENH("Đã cấp lệnh");
	

	private String label;

	private TransportationStatus(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

}
