package com.example.QuanLyNhaXe.enumration;

public enum ScheduleState {
	
	ROI_BAI_DO("Rời bãi đỗ"),
	DEN_BEN_DI("Đến bến đi"),
	DANG_DI("Đang đi"),
	DEN_TRAM_DON("Đến trạm đón khách"),
	VE_BAI_DO("Về bãi đỗ"),
	DEN_TRAM_DUNG("Đến trạm dừng chân"),
	DEN_BEN_DEN("Đến bến đến");
	
	private String label;

	private ScheduleState(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

}
