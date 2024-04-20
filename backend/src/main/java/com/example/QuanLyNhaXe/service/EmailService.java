package com.example.QuanLyNhaXe.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.CreateBusCompany;
import com.example.QuanLyNhaXe.enumration.TicketState;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.model.Booking;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.StopStation;
import com.example.QuanLyNhaXe.model.Ticket;
import com.example.QuanLyNhaXe.model.User;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
	private final JavaMailSender javaMailSender;
	private final UtilityService utilityService;

	@Value("${spring.mail.username}")
	private String emailFrom;

	private void sendEmail(String email, String subject, String content) {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		try {
			helper.setFrom(emailFrom, "Nhà xe Kim Nguyên");
			helper.setTo(email);

			helper.setSubject(subject);
			helper.setText(content, true);

			javaMailSender.send(message);
		} catch (MessagingException | UnsupportedEncodingException  e) {
			throw new BadRequestException("Lỗi khi gửi email");
		}
	}

	public  boolean checkEmail(String email) {
	        Map<String, String> parameters = new HashMap<>();
	        parameters.put("email", email);

	        String requestBody = mapToFormData(parameters);

	        HttpRequest request = null;
	        try {
	            String emailCheckURI = "https://melink.vn/checkmail/checkemail.php";
	            request = HttpRequest.newBuilder()
	                    .uri(new URI(emailCheckURI))
	                    .header("Content-Type", "application/x-www-form-urlencoded")
	                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
	                    .build();
	        } catch (URISyntaxException e) {
	            throw new RuntimeException(e);
	        }

	        HttpClient client = HttpClient.newHttpClient();
	        try {
	            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
	            String responseBody = response.body();
	            return responseBody.equals("<span style='color:green'><b>Valid!</b>");
	        } catch (Exception e) {
	            e.printStackTrace();
	            return false;
	        }
	}

	private static String mapToFormData(Map<String, String> parameters) {
		StringBuilder formData = new StringBuilder();
		for (Map.Entry<String, String> entry : parameters.entrySet()) {
			if (formData.length() > 0) {
				formData.append("&");
			}
			formData.append(entry.getKey());
			formData.append("=");
			formData.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8));
		}
		return formData.toString();
	}

	public void sendCancelTicketEmail(Booking booking) {
		String subject = "Hủy vé thành công";
		String emailContent = "<html><body>" + "<p>Xin Chào, <strong>" + booking.getName() + "</strong></p><br>"
				+ "<p>Nhà xe Kim Nguyên rất trân trọng và hân hạnh được phục vụ bạn!</p><br>"
				+ "<p>Chúng tôi đã nhận và xử lý yêu cầu hủy vé của bạn. Email này xin xác nhận rằng vé của bạn đã được hủy. Nếu vé đã hủy được thanh toán trước đó bạn sẽ được hoàn tiền theo chính sách của chúng tôi . Vui lòng lưu ý rằng quá trình hoàn tiền có thể mất một khoảng thời gian nhất định để được xử lý bởi các cổng thanh toán và ngân hàng của bạn.</p><br>"					
				+ "<p>Xin cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Chúng tôi rất tiếc vì không thể đáp ứng được mong đợi của bạn lần này. Chúc bạn một ngày tốt lành!</p>"
				+"<p>Các vé đã hủy có mã đặt vé: <strong>" + booking.getCode() + "</strong></p>"
				+ "<br><p>Tra cứu mã đặt vé tại đây: https://www.xekimnguyen.id.vn/ticket để biết thêm thông tin chi tiết</p></br>"
				+ "<br>Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi qua email này. Chúng tôi luôn sẵn lòng giúp đỡ!</br>"
				+ "</body></html>";
		
		sendEmail(booking.getEmail(), subject, emailContent);
	}
	public void sendCancelTicketEmailFail(Booking booking) {
		String subject = "Hủy vé không thành công";
		String emailContent = "<html><body>" + "<p>Xin Chào, <strong>" + booking.getName() + "</strong></p><br>"
				+ "<p>Nhà xe Kim Nguyên rất trân trọng và hân hạnh được phục vụ bạn!</p><br>"
				+ "<p>Chúng tôi đã nhận và xử lý yêu cầu hủy vé của bạn. Email này xin xác nhận rằng vé của bạn đã hủy không thành công.</p><br>"					
				+ "<p>Xin cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Chúng tôi rất tiếc vì không thể đáp ứng được mong đợi của bạn lần này. Chúc bạn một ngày tốt lành!</p>"
				+"<p>Các vé đã hủy có mã đặt vé: <strong>" + booking.getCode() + "</strong></p>"
				+ "<br><p>Tra cứu mã đặt vé tại đây: https://www.xekimnguyen.id.vn/ticket để biết thêm thông tin chi tiết</p></br>"
				+ "<br>Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi qua email này. Chúng tôi luôn sẵn lòng giúp đỡ!</br>"
				+ "</body></html>";
		
		sendEmail(booking.getEmail(), subject, emailContent);
	}

	public void sendBookingInformation(Booking booking) {
		String ticketInfo = "";
		if (booking.getTickets() != null) {
			StringBuilder ticketInfoBuilder = new StringBuilder();
			int ticketCount = 1;
	        for (Ticket ticket : booking.getTickets()) {
	            if(!ticket.getState().equals(TicketState.CANCELED.getLabel())) {
	            	ticketInfoBuilder.append("<p><strong>Vé thứ: ").append(ticketCount).append("</strong></p>")
	                .append("<p>Mã vé: ").append(ticket.getId()).append("</p>")
	                .append("<p>Giá vé: ").append(ticket.getTicketPrice()).append("</p>")
	                .append("<p>Số ghế: ").append(ticket.getSeat()).append("</p>")
	                .append("<p>Trạng thái vé: ").append(ticket.getState()).append("</p><br>");

	            ticketCount++;
	            }
	        }

	        ticketInfo = ticketInfoBuilder.toString();
	    }

	    StopStation pickStation = booking.getPickStation();
	    StopStation dropStation = booking.getDropStation();
	    String subject = "Thông tin vé";
	    String emailContent = "<html><body>"
	            + "<p>Xin Chào, <strong>" + booking.getName() + "</strong></p><br>"
	            + "<p><p>Nhà xe Kim Nguyên rất trân trọng và hân hạnh được phục vụ bạn!</p></p><br>"
	            + "<p><strong>*Thông tin đặt vé</strong></p>"
	            + "<p>Mã đặt vé: " + booking.getCode() + "</p>"
	            + "<p>Thời gian: " + booking.getBookingDate() + "</p>"
	            + "<p>Số điện thoại: " + booking.getTel() + "</p>"
	            + "<p>Số lượng vé: " + booking.getTicketNumber() + "</p>"
	            + "<p><strong>*Chi tiết vé:</strong></p>"
	            + ticketInfo
	            + "<p><strong>*Thông tin trạm đón:</strong></p>"
	            + "<p>Thời gian đến: " + pickStation.getArrivalTime() + "</p>"
	            + "<p>Tên trạm: " + pickStation.getStation().getName() + "</p>"
	            + "<p>Địa chỉ: " + pickStation.getStation().getAddress() + "</p>"
	            + "<p><strong>*Thông tin trạm trả:</strong></p>"
	            + "<p>Thời gian đến: " + dropStation.getArrivalTime() + "</p>"
	            + "<p>Tên trạm: " + dropStation.getStation().getName() + "</p>"
	            + "<p>Địa chỉ: " + dropStation.getStation().getAddress() + "</p>"
	            + "<br><p>Tra cứu mã đặt vé tại đây: https://www.xekimnguyen.id.vn/ticket để biết thêm thông tin chi tiết</p><br>"
	            + "<p>Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi qua email này. Chúng tôi luôn sẵn lòng giúp đỡ! </p>"
	          
	            + "</body></html>";
		sendEmail(booking.getEmail(), subject, emailContent);
	}

	public void sendRegisterDataForBusCompany(CreateBusCompany createBusCompany) {
		String subject = "Đăng ký hợp tác bán vé";
		String emailContent = "<html><body>" + "<p>Xin Chào, <strong>" + createBusCompany.getBusinessName() + "</strong></p><br>"
				+ "<p>Cảm ơn bạn đã quan tâm đến dịch vụ bán vé của chúng tôi. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p><br>"
				+ "<p>Thông tin đăng ký của bạn: </p>"
				+ "<p>Tên doanh nghiệp: " + createBusCompany.getBusinessName() + "</p>"
				+ "<p>Địa chỉ: " + createBusCompany.getAddress() + "</p>"
				+ "<p>Số điện thoại: " + createBusCompany.getTel() + "</p>"
				+ "<p>Email: " + createBusCompany.getEmail() + "</p>"
				+ "<p>Mã số thuế: " + createBusCompany.getBusinessLicense() + "</p>"
				+ "</body></html>";
		sendEmail(createBusCompany.getEmail(), subject, emailContent);
	}
	
	public void sendNotification(BusCompany busCompany, User user, double fee) {
		String subject = "Thông tin hợp tác bán vé";
		LocalDate date= utilityService.addDays(busCompany.getCoopDay(), 15);
		String emailContent = "<html><body>" + "<p>Xin Chào, <strong>" + busCompany.getName() + "</strong></p><br>"
				+ "<p>Chúng tôi rất vui mừng thông báo rằng đăng ký của bạn để hợp tác bán vé đã được xử lý thành công."
	            + " Chúng tôi rất đánh giá cao sự quan tâm của bạn trong việc hợp tác với chúng tôi.</p><br>"
	            + "<h3>Thông tin về nhà xe:</h3>"
				+ "<p>Tên doanh nghiệp: " + busCompany.getName() + "</p>"
				+ "<p>Ngày hợp tác: " + busCompany.getCoopDay() + "</p>"
				+ "<p>Mã số thuế: " + busCompany.getBusinessLicense() + "</p>"
				+ "<h3>Thông tin về chủ nhà xe:</h3>"
				+ "<p>Họ và tên: " + user.getName() + "</p>"
	            + "<p>Email: " + user.getEmail() + "</p>"
	            + "<p>Số điện thoại: " + user.getTel() + "</p>"
	            + "<p>Mã định danh: " + user.getStaff().getIdCard() + "</p>"
	            + "<p>Địa chỉ: " + user.getStaff().getAddress()+ "</p>"
	            + "<p>Tên đăng nhập: " + user.getAccount().getUsername() + "</p>"
	            + "<p>Mật khẩu: " + user.getAccount().getPassword() + "</p>"
	            + "<h3>Thông tin về chính sách sử dụng:</h3>"
	            + "<p>Chúng tôi xin thông báo rằng bạn được sử dụng dịch vụ của chúng tôi miễn phí từ ngày hôm nay đến ngày"+date
	            + " Để tiếp tục sử dụng dịch vụ sau thời gian miễn phí, bạn hãy thanh toán phí dịch vụ trước ngày đến hạn</p>"
	             + "<p>Chi Phí để sử dụng dịch vụ cần thanh toán là: "+fee+"</p>"
	            + "<p>Chúng tôi rất mong nhận được sự hợp tác lâu dài từ bạn.</p>"
	            + "<p>Xin chân thành cảm ơn và trân trọng,</p>"
				+ "</body></html>";
		sendEmail(user.getEmail(), subject, emailContent);
		
		
	}

}
