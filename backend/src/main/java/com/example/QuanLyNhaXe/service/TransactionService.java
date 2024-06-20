package com.example.QuanLyNhaXe.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.QuanLyNhaXe.Request.CreatePaymentDTO;
import com.example.QuanLyNhaXe.Request.CreatePaymentReturnTicket;
import com.example.QuanLyNhaXe.dto.BusCompanyDTO;
import com.example.QuanLyNhaXe.dto.CompanyMoneyDTO;
import com.example.QuanLyNhaXe.dto.TicketSaleDTO;
import com.example.QuanLyNhaXe.dto.TransactionDTO;
import com.example.QuanLyNhaXe.enumration.PaymentMethod;
import com.example.QuanLyNhaXe.enumration.TicketState;
import com.example.QuanLyNhaXe.enumration.TransactionType;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Bill;
import com.example.QuanLyNhaXe.model.Booking;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.Ticket;
import com.example.QuanLyNhaXe.model.TicketSale;
import com.example.QuanLyNhaXe.model.Transaction;
import com.example.QuanLyNhaXe.repository.BillRepository;
import com.example.QuanLyNhaXe.repository.BookingRepository;
import com.example.QuanLyNhaXe.repository.TicketRepository;
import com.example.QuanLyNhaXe.repository.TicketSaveRepository;
import com.example.QuanLyNhaXe.repository.TransactionRepository;
import com.example.QuanLyNhaXe.util.Message;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionService {
	private final TransactionRepository transactionRepository;
	private final BookingRepository bookingRepository;
	private final BillRepository billRepository;
	private final TicketRepository ticketRepository;

	private final ModelMapper modelMapper;
	private final UtilityService utilityService;
	private final BusCompanyService busCompanyService;
	private final TicketSaveRepository ticketSaveRepository;
	

	@Transactional
	public TransactionDTO createTransaction(CreatePaymentDTO createPaymentDTO) {
		Integer priceBill = 0;
		List<Booking> bookings = new ArrayList<>();
		String transactionNoString=createPaymentDTO.getTransactionNo();
		if(transactionNoString.isEmpty()) {
			transactionNoString=utilityService.getRandomNumber(8);
			while (transactionRepository.existsByTransactionNo(transactionNoString)) {
				transactionNoString=utilityService.getRandomNumber(8);
			}
		}
		String payString=createPaymentDTO.getTransactionDate();
		LocalDateTime paymentTime=utilityService.convertHCMDateTime();
		if(!payString.isEmpty()) {
			paymentTime=utilityService.convertStringToDateTime(payString);		
		}
		

		Booking booking = bookingRepository.findByCode(createPaymentDTO.getBookingCode())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));

		bookings.add(booking);

		List<Ticket> tickets = booking.getTickets();
		if (!tickets.isEmpty()) {
			for (Ticket ticket : tickets) {
				if (!ticket.getState().equals(TicketState.CANCELED.getLabel())) {
					String billReferCode = utilityService.generateRandomString(7);
					while (billRepository.existsByReferCode(billReferCode)) {
						billReferCode = utilityService.generateRandomString(7);
					}
					Bill bill = Bill.builder().referCode(billReferCode).build();
					priceBill += ticket.getTicketPrice();
					billRepository.save(bill);
					ticket.setBill(bill);

				}
			}

		}

		Transaction transaction = Transaction.builder()
				.paymentTime(paymentTime)
				.bookings(bookings).amount(priceBill).transactionNo(transactionNoString)
				.paymentMethod(createPaymentDTO.getPaymentMethod()).transactionType(TransactionType.PAYMENT.getLabel())
				.build();
		booking.setTransaction(transaction);

		try {

			transactionRepository.save(transaction);
			ticketRepository.saveAll(tickets);
			bookingRepository.save(booking);

		} catch (Exception e) {
			throw new BadRequestException("Đã xảy ra lỗi trong qua trình giao dịch");
		}

		return modelMapper.map(transaction, TransactionDTO.class);

	}

	public Transaction createTransactionForCancelTickets(String paymanetMethod, double amount, String transactionNo) {

		return Transaction.builder().paymentTime(utilityService.convertHCMDateTime()).amount(amount)
				.paymentMethod(paymanetMethod).transactionNo(transactionNo)
				.transactionType(TransactionType.REFUND.getLabel()).build();

	}

	public long calculateRevenueOneMonth(YearMonth yearMonth, BusCompany busCompany) {
		long sum = 0L;
		long sum2 = 0L;
		LocalDate firstDayOfMonth = yearMonth.atDay(1);
		LocalDateTime startDateTime = firstDayOfMonth.atStartOfDay();
		LocalDate lastDayOfMonth = yearMonth.atEndOfMonth();
		LocalDateTime endDateTime = lastDayOfMonth.atTime(LocalTime.MAX);
		List<Transaction> transactions = transactionRepository.findByPaymentTimeBetweenAndTransactionTypeAndBookings_Trip_BusCompany(startDateTime,
				endDateTime, TransactionType.PAYMENT.getLabel(),busCompany);
		List<Transaction> transactions2 = transactionRepository.findByPaymentTimeBetweenAndTransactionTypeAndBookings_Trip_BusCompany(
				startDateTime, endDateTime, TransactionType.REFUND.getLabel(),busCompany);
		if (!transactions.isEmpty()) {
			for (Transaction transaction : transactions) {
				sum += transaction.getAmount();
			}
		}

		if (!transactions2.isEmpty()) {
			for (Transaction transaction2 : transactions2) {
				sum2 += transaction2.getAmount();
			}
		}

		return sum - sum2;

	}

	public long calculateRevenueOneDay(LocalDate date, BusCompany busCompany) {
		long sum = 0L;
		long sum2 = 0L;
		LocalDateTime startDateTime = date.atStartOfDay();
		LocalDateTime endDateTime = date.atTime(LocalTime.MAX);
		List<Transaction> transactions = transactionRepository.findByPaymentTimeBetweenAndTransactionTypeAndBookings_Trip_BusCompany(startDateTime,
				endDateTime, TransactionType.PAYMENT.getLabel(),busCompany);
		List<Transaction> transactions2 = transactionRepository.findByPaymentTimeBetweenAndTransactionTypeAndBookings_Trip_BusCompany(
				startDateTime, endDateTime, TransactionType.REFUND.getLabel(),busCompany);
		if (!transactions.isEmpty()) {
			for (Transaction transaction : transactions) {
				sum += transaction.getAmount();
			}
		}

		if (!transactions2.isEmpty()) {
			for (Transaction transaction2 : transactions2) {
				sum2 += transaction2.getAmount();
			}
		}

		return sum - sum2;

	}

	@Transactional
	public TransactionDTO createReturnTicketTransaction(CreatePaymentReturnTicket createPaymentDTO) {
		Integer priceBill = 0;
		List<Booking> bookings = new ArrayList<>();

		Booking booking = bookingRepository.findByCode(createPaymentDTO.getBookingCode())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));

		Booking booking2 = bookingRepository.findByCode(createPaymentDTO.getBookingCodeReturn())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));

		bookings.add(booking);
		bookings.add(booking2);

		List<Ticket> tickets = new ArrayList<>();
		tickets.addAll(booking.getTickets());
		tickets.addAll(booking2.getTickets());
		if (!tickets.isEmpty()) {
			for (Ticket ticket : tickets) {
				if (!ticket.getState().equals(TicketState.CANCELED.getLabel())) {
					String billReferCode = utilityService.generateRandomString(7);
					while (billRepository.existsByReferCode(billReferCode)) {
						billReferCode = utilityService.generateRandomString(7);
					}
					Bill bill = Bill.builder().referCode(billReferCode).build();
					priceBill += ticket.getTicketPrice();
					billRepository.save(bill);
					ticket.setBill(bill);

				}
			}

		}

		Transaction transaction = Transaction.builder()
				.paymentTime(utilityService.convertStringToDateTime(createPaymentDTO.getTransactionDate()))
				.bookings(bookings).amount(priceBill).transactionNo(createPaymentDTO.getTransactionNo())
				.paymentMethod(createPaymentDTO.getPaymentMethod()).transactionType(TransactionType.PAYMENT.getLabel())
				.build();
		booking.setTransaction(transaction);
		booking2.setTransaction(transaction);

		try {

			transactionRepository.save(transaction);
			ticketRepository.saveAll(tickets);
			bookingRepository.save(booking);
			bookingRepository.save(booking2);

		} catch (Exception e) {
			throw new BadRequestException("Đã xảy ra lỗi trong qua trình giao dịch");
		}

		return modelMapper.map(transaction, TransactionDTO.class);

	}

	

	
	

}
