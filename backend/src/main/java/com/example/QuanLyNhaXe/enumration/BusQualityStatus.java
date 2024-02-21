package com.example.QuanLyNhaXe.enumration;

public enum BusQualityStatus {
	GOOD("Tốt"),
	NOT_MEETING_REQUIREMENTS("Không đạt yêu cầu"),
	MAINTENANCE_REQUIRED("Cần bảo trì");
 
	 private String label;
	

		private BusQualityStatus(String label) {
			this.label = label;
		}

		public String getLabel() {
			return label;
		}

}
