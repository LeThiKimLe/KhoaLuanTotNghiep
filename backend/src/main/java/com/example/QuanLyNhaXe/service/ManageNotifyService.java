package com.example.QuanLyNhaXe.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import com.example.QuanLyNhaXe.Request.CreateBusCompany;
import com.example.QuanLyNhaXe.util.SessionMessage;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import lombok.RequiredArgsConstructor;

@Component
@Service
@RequiredArgsConstructor
public class ManageNotifyService implements WebSocketHandler{
    private static final List<WebSocketSession> managerSessions = new ArrayList<>();
    private static final List<CreateBusCompany> listRegister = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        //Send data in listRegister to new session
        Gson gson = new Gson();
        //Convert listRegister to JSON
        String listRegisterJson = gson.toJson(listRegister);
        managerSessions.add(session);
        session.sendMessage(new TextMessage(listRegisterJson));
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        // Loại thông báo đã xử lý ra khỏi hệ thống
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(message.getPayload().toString(), JsonObject.class);
        if (jsonObject.get("type").getAsString().equals("remove")) {
            for (CreateBusCompany createBusCompany : listRegister) {
                if (createBusCompany.getTel().equals(jsonObject.get("tel").getAsString())) {
                    listRegister.remove(createBusCompany);
                    break;
                }
            }
            //Convert listRegister to JSON
            String listRegisterJson = gson.toJson(listRegister);
            for (WebSocketSession webSocketSession : managerSessions) {
                webSocketSession.sendMessage(new TextMessage(listRegisterJson));
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
        managerSessions.remove(session);
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    public void notifyNewRegister(Object notice) throws IOException {
        Gson gson = new Gson();
        String content = gson.toJson(notice);
        //Check if the same notice is already in listRegister
        for (CreateBusCompany createBusCompany : listRegister) {
            if (createBusCompany.getTel().equals(((CreateBusCompany) notice).getTel())) {
                throw new IOException("Thông tin đăng ký đã có trong hệ thống");
            }
        }
        //Check if notice is CreateBusCompany
        if (notice instanceof CreateBusCompany) {
            listRegister.add((CreateBusCompany) notice);
        }
        for (WebSocketSession session : managerSessions) {
            session.sendMessage(new TextMessage(content));
        }
    }
}
