package com.example.QuanLyNhaXe.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Service
@Getter
@Setter
@RequiredArgsConstructor
public class ReadBaseProperty {
    @Value("${base.imageDirectory}")
    private String imageDirectory;

    @Value("${base.serverUrl}")
    private String serverURL;

    @Value("${base.url}")
    private String baseURL;

    @Value("${base.adminUrl}")
    private String adminUrl;

}
