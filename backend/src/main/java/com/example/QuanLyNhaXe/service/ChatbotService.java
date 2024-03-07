package com.example.QuanLyNhaXe.service;
import py4j.GatewayServer;

import com.example.QuanLyNhaXe.Request.ChatDTO;
import com.example.QuanLyNhaXe.interfaces.Chatbot;

public class ChatbotService {
    public String getBotAnswer(ChatDTO chatDTO) {
        GatewayServer.turnLoggingOff();
        GatewayServer server = new GatewayServer();
        server.start();
        Chatbot hello = (Chatbot) server.getPythonServerEntryPoint(new Class[] { Chatbot.class });
        String answer = "";
        try {
            answer = hello.query(chatDTO.getQuestion());
        } catch (Exception e) {
            e.printStackTrace();
        }
        server.shutdown();
        return answer;
    }
}
