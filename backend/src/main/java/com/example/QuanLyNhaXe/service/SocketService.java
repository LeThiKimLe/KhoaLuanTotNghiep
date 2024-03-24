package com.example.QuanLyNhaXe.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;
import com.example.QuanLyNhaXe.util.SessionMessage;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@Component
@Service
@RequiredArgsConstructor
public class SocketService implements WebSocketHandler {
    private static final List<WebSocketSession> guestSessions = new ArrayList<>();
    private static final List<WebSocketSession> staffSessions = new ArrayList<>();
    @Autowired
    private SessionMessage sessionMessageManager = new SessionMessage();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Khi kết nối WebSocket được thiết lập
        Map<String, Object> attributes = session.getAttributes();
        // Truy cập vào các giá trị trong attributes
        Integer role = (Integer) attributes.get("role");
        // Sử dụng các giá trị attributes trong xử lý sau này
        if (role == 0)
            guestSessions.add(session);
        // Khi kết nối WebSocket được thiết lập
        else if (role == 1 || role == 2) {
            staffSessions.add(session);
            // Gửi tin nhắn lưu trữ của khách hàng tới nhân viên
            session.sendMessage(
                    new TextMessage("Backup: " + new Gson().toJson(sessionMessageManager.getSessionMessages())));
        }
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        Gson gson = new Gson();
        String receivedMessage = (String) message.getPayload();
        Map<String, Object> attributes = session.getAttributes();
        // Truy cập vào các giá trị trong attributes
        Integer role = (Integer) attributes.get("role");
        String sessionId = (String) attributes.get("userId");
        // Sử dụng các giá trị attributes trong xử lý sau này
        if (role == 0) {
            // Xử lý tin nhắn từ máy khách
            // Lưu trữ tin nhắn vào WebSocketSessionManager
            sessionMessageManager.addMessage(sessionId, sessionId + ": " + receivedMessage);
            // Gửi tin nhắn lại cho tất cả các máy nhân viên kết nối
            for (WebSocketSession webSocketSession : staffSessions) {
                webSocketSession.sendMessage(new TextMessage(sessionId + ": " + receivedMessage));
            }
        } else if (role == 1 || role == 2) {
            // Xử lý tin nhắn từ máy nhân viên
            // Kiểm tra xem có phải yêu cầu đóng kết nối không
            if (receivedMessage.startsWith("Close: ")) {
                String target = receivedMessage.substring(7);
                WebSocketSession targetSession = guestSessions.stream()
                        .filter(s -> s.getAttributes().get("userId").equals(target)).findFirst().get();
                // Tạo Map chứa dữ liệu được gửi đi
                Map<String, String> data = new HashMap<>();
                data.put("message", "Dạ nếu anh/chị không còn thắc mắc nào. Em xin kết thúc trò chuyện. Chúc anh/chị một ngày tốt lành ạ!");
                data.put("sender", "Assistant");
                String repData = gson.toJson(data);
                targetSession.sendMessage(new TextMessage(repData));
                targetSession.close();
            } else {
                // Gửi tin nhắn cho máy khách và tất cả các máy nhân viên khác
                for (WebSocketSession webSocketSession : staffSessions) {
                    if (webSocketSession != session)
                        webSocketSession.sendMessage(new TextMessage(sessionId + ": " + receivedMessage));
                }
                // Gửi tin nhắn cho máy khách
                try {
                    JsonObject messageData = gson.fromJson(receivedMessage, JsonObject.class);
                    String guestId = messageData.get("rep").getAsString();
                    String content = messageData.get("message").getAsString();
                    String sender = messageData.get("senderInfor").getAsJsonObject().get("sender").getAsString();
                    // Lưu trữ tin nhắn vào WebSocketSessionManager
                    sessionMessageManager.addMessage(guestId, sessionId + ": " + receivedMessage);

                    // Tạo Map chứa dữ liệu được gửi đi
                    Map<String, String> data = new HashMap<>();
                    data.put("message", content);
                    data.put("sender", sender);
                    String repData = gson.toJson(data);
                    WebSocketSession targetSession = guestSessions.stream()
                            .filter(s -> s.getAttributes().get("userId").equals(guestId)).findFirst().get();
                    targetSession.sendMessage(new TextMessage(repData));

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        // Xử lý lỗi khi truyền tin nhắn
        System.out.println("Error: " + exception.getMessage());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        // Khi kết nối WebSocket bị đóng
        Map<String, Object> attributes = session.getAttributes();
        // Truy cập vào các giá trị trong attributes
        Integer role = (Integer) attributes.get("role");
        String sessionId = (String) attributes.get("userId");
        // Xóa tin nhắn khỏi lưu trữ
        // Sử dụng các giá trị attributes trong xử lý sau này
        if (role == 0) {
            sessionMessageManager.removeSession(sessionId);
            guestSessions.remove(session);
        } else if (role == 1 || role == 2)
            staffSessions.remove(session);
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    private String getSessionId(WebSocketSession session) {
        Map<String, Object> attributes = session.getAttributes();
        String sessionId = (String) attributes.get("userId");
        return sessionId;
    }

}
