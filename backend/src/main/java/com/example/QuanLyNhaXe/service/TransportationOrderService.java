package com.example.QuanLyNhaXe.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.EditTransportationOrder;
import com.example.QuanLyNhaXe.Request.TransportationOrderCreate;
import com.example.QuanLyNhaXe.dto.BusTypeDTO;
import com.example.QuanLyNhaXe.dto.TransportationOrderDTO;
import com.example.QuanLyNhaXe.enumration.TransportationStatus;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.BusType;
import com.example.QuanLyNhaXe.model.Schedule;
import com.example.QuanLyNhaXe.model.TransportationOrder;
import com.example.QuanLyNhaXe.repository.ScheduleRepository;
import com.example.QuanLyNhaXe.repository.TransportationOrderRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransportationOrderService {
	private final TransportationOrderRepository transportationOrderRepository;
	private final UtilityService utilityService;
	private final ImagesService imagesService;
	private final ScheduleRepository scheduleRepository;
	private final ModelMapper modelMapper;

	public Object createTransportationOrder(TransportationOrderCreate transportationOrderCreate) throws IOException {
		String code = utilityService.generateRandomString(10);
		LocalDateTime createTime = utilityService.convertHCMDateTime();
		Schedule schedule = scheduleRepository.findById(transportationOrderCreate.getScheduleId())
				.orElseThrow(() -> new NotFoundException(Message.SCHEDULE_NOT_FOUND));
		String status = TransportationStatus.DA_CAP_LENH.getLabel();
		String image = imagesService.saveImage(transportationOrderCreate.getFile());
		TransportationOrder transportationOrder = TransportationOrder.builder().schedule(schedule)
				.createTime(createTime).status(status).code(code).updateTime(null).image(image).build();
		transportationOrderRepository.save(transportationOrder);
		transportationOrder.getSchedule().setTransportationOrder(null);
		return modelMapper.map(transportationOrder, TransportationOrderDTO.class);

	}

	public Object updateTransportationOrder(EditTransportationOrder editTransportationOrder) throws IOException {
		
		TransportationOrder transportationOrder = transportationOrderRepository
				.findById(editTransportationOrder.getId())
				.orElseThrow(() -> new NotFoundException(Message.ORDER_NOT_FOUND));

		LocalDateTime curentTime = utilityService.convertHCMDateTime();
		String status = editTransportationOrder.getStatus();
		
		
		
		if (!status.equals(TransportationStatus.DA_NHAN_LENH.getLabel())
				&& !status.equals(TransportationStatus.XUAT_BEN.getLabel())
				&& !status.equals(TransportationStatus.DEN_BEN.getLabel())
				&& !status.equals(TransportationStatus.DA_HOAN_THANH.getLabel())) {
			throw new BadRequestException("Trạng thái không hợp lệ");

		}
		String image = imagesService.saveImage(editTransportationOrder.getFile());
		if (!image.equals("")) {
			transportationOrder.setImage(image);
		}

		transportationOrder.setUpdateTime(curentTime);
		transportationOrder.setStatus(status);
		transportationOrderRepository.save(transportationOrder);
		transportationOrder.getSchedule().setTransportationOrder(null);
		return modelMapper.map(transportationOrder, TransportationOrderDTO.class);

	}

	public Object deleteTransportationOrder(Integer id) {

		TransportationOrder transportationOrder = transportationOrderRepository.findById(id)
				.orElseThrow(() -> new NotFoundException(Message.ORDER_NOT_FOUND));
		transportationOrderRepository.delete(transportationOrder);
		return new ResponseMessage(Message.SUCCESS);

	}
	
	public Object getAllTransportationOrder() {
		List<TransportationOrder> transportationOrders = transportationOrderRepository.findAll();
		if (transportationOrders.isEmpty()) {
			throw new NotFoundException(Message.ORDER_NOT_FOUND);
		}
		return transportationOrders.stream()
		.peek(transportationOrder -> {
	        transportationOrder.getSchedule().setTransportationOrder(null);
	    })
	    .map(transportationOrder -> modelMapper.map(transportationOrder, TransportationOrderDTO.class))
	    .toList();
	}
	
	public Object getAllTransportationOrderByScheduleId(Integer scheduleId) {
		
		TransportationOrder transportationOrder = transportationOrderRepository.findByScheduleId(scheduleId)
				.orElseThrow(() -> new NotFoundException(Message.ORDER_NOT_FOUND));
		transportationOrder.getSchedule().setTransportationOrder(null);
		return modelMapper.map(transportationOrder, TransportationOrderDTO.class);
	}
	

}
