package com.example.QuanLyNhaXe.util;

import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.service.UserService;
import lombok.RequiredArgsConstructor;

import java.net.URI;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AuthHandshakeInterceptor implements HandshakeInterceptor {
    private final UserService userService;
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        // Xác thực tại đây và lưu trữ thông tin người dùng đã xác thực vào attributes
        URI uri = request.getURI();
        String authToken = "";
        int id = 0;
        List<NameValuePair> params = URLEncodedUtils.parse(uri, Charset.forName("UTF-8"));
        for (NameValuePair param : params) {
            if (param.getName().equals("authorization")) {
                authToken = param.getValue();
            }
            if (param.getName().equals("id")) {
                id = Integer.parseInt(param.getValue());
            }
        }
        try {
            User user = userService.getUserByAuthorizationHeader(authToken);
            if (user != null) {
                Integer roleId = user.getAccount().getRole().getId();
                if (roleId == 1 || roleId ==2 || roleId ==5)
                {
                    attributes.put("userId", user.getId().toString());
                    attributes.put("role", roleId);
                    attributes.put("id", id);
                }
                else{
                    attributes.put("userId", generateSessionId());
                    attributes.put("role", 0);
                    attributes.put("id", id);
                }
                return true;
            }
            else {
                attributes.put("userId", generateSessionId());
                attributes.put("role", 0);
                attributes.put("id", id);
                return true;
            }
        }
        catch (Exception e) {
            if (authToken.equals("null") || authToken.equals("")) {
                attributes.put("userId", generateSessionId());
                attributes.put("role", 0);
                attributes.put("id", id);
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
