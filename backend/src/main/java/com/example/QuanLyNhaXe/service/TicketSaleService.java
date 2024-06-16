package com.example.QuanLyNhaXe.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.TicketSale;
import com.example.QuanLyNhaXe.repository.TicketSaveRepository;
import com.example.QuanLyNhaXe.util.Message;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketSaleService {

	private ModelMapper modelMapper;
	private TicketSaveRepository ticketSaveRepository;

	public TicketSale getModelTicketSave(Integer ticketSaveId) {

		return ticketSaveRepository.findById(ticketSaveId)
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));

	}

}
