package com.example.QuanLyNhaXe.configuration;

import java.util.logging.SocketHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.example.QuanLyNhaXe.service.ManageNotifyService;
import com.example.QuanLyNhaXe.service.ChatService;
import com.example.QuanLyNhaXe.util.AuthHandshakeInterceptor;

@Configuration
@EnableWebSocket
public class SocketConfig implements WebSocketConfigurer{
    
    @Autowired
    private AuthHandshakeInterceptor authHandshakeInterceptor;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new ChatService(), "/socket").addInterceptors(authHandshakeInterceptor).setAllowedOrigins("*");
        registry.addHandler(new ManageNotifyService(), "/notice").setAllowedOrigins("*");
    }
}
