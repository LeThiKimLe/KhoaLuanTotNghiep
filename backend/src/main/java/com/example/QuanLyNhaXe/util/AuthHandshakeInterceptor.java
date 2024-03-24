package com.example.QuanLyNhaXe.util;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.service.UserService;
import lombok.RequiredArgsConstructor;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AuthHandshakeInterceptor implements HandshakeInterceptor {
    private final UserService userService;
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        // Xác thực tại đây và lưu trữ thông tin người dùng đã xác thực vào attributes
        String auth = request.getURI().getQuery();
        String authToken = "";
        if (auth != null) {
            authToken = auth.substring(14);
        }
        try {
            User user = userService.getUserByAuthorizationHeader(authToken);
            if (user != null) {
                Integer roleId = user.getAccount().getRole().getId();
                System.out.println(roleId);
                if (roleId == 1 || roleId ==2)
                {
                    attributes.put("userId", user.getId().toString());
                    attributes.put("role", roleId);
                }
                else{
                    attributes.put("userId", generateSessionId());
                    attributes.put("role", 0);
                }
                return true;
            }
            else {
                attributes.put("userId", generateSessionId());
                attributes.put("role", 0);
                return true;
            }
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            if (authToken.equals("null") || authToken.equals("")) {
                attributes.put("userId", generateSessionId());
                attributes.put("role", 0);
                return true;
            }
            else
                return false;
        }
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
        // Nothing to do after handshake
    }

    private String generateSessionId() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }
}
