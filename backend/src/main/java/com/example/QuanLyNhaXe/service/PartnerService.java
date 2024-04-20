package com.example.QuanLyNhaXe.service;

import com.example.QuanLyNhaXe.Request.CreateBusCompany;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import lombok.RequiredArgsConstructor;

import java.io.IOException;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PartnerService {
    private final ManageNotifyService manageNotifyService;
    private final EmailService emailService;

    public Object registerBusCompany(CreateBusCompany createBusCompany) {
		try {
            manageNotifyService.notifyNewRegister(createBusCompany);
            emailService.sendRegisterDataForBusCompany(createBusCompany);
        } catch (Exception e) {
            throw new BadRequestException(Message.EXISTED_COMPANY_INFO);
        }
		return new ResponseMessage(Message.REGISTER_INFO_SENT);
	}
}
