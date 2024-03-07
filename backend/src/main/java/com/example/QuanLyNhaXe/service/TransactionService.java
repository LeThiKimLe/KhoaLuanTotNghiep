package com.example.QuanLyNhaXe.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.yaml.snakeyaml.error.YAMLException;

import com.example.QuanLyNhaXe.Request.CreatePaymentDTO;
import com.example.QuanLyNhaXe.dto.TransactionDTO;
import com.example.QuanLyNhaXe.enumration.TicketState;
import com.example.QuanLyNhaXe.enumration.TransactionType;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Bill;
import com.example.QuanLyNhaXe.model.Booking;
import com.example.QuanLyNhaXe.model.Ticket;
import com.example.QuanLyNhaXe.model.Transaction;
import com.example.QuanLyNhaXe.repository.BillRepository;
import com.example.QuanLyNhaXe.repository.BookingRepository;
import com.example.QuanLyNhaXe.repository.TicketRepository;
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

	@Transactional
	public TransactionDTO createTransaction(CreatePaymentDTO createPaymentDTO) {
		Integer priceBill = 0;

		Booking booking = bookingRepository.findByCode(createPaymentDTO.getBookingCode())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));

		

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

		Transaction transaction = Transaction.builder().paymentTime(utilityService.convertStringToDateTime(createPaymentDTO.getTransactionDate()))
				.booking(booking).amount(priceBill).transactionNo(createPaymentDTO.getTransactionNo()).paymentMethod(createPaymentDTO.getPaymentMethod())
				.transactionType(TransactionType.PAYMENT.getLabel()).build();
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

	public long calculateRevenueOneMonth(YearMonth yearMonth) {
		long sum = 0L;
		long sum2 = 0L;
		LocalDate firstDayOfMonth = yearMonth.atDay(1);
		LocalDateTime startDateTime = firstDayOfMonth.atStartOfDay();
		LocalDate lastDayOfMonth = yearMonth.atEndOfMonth();
		LocalDateTime endDateTime = lastDayOfMonth.atTime(LocalTime.MAX);
		List<Transaction> transactions = transactionRepository.findByPaymentTimeBetweenAndTransactionType(startDateTime,endDateTime,
				TransactionType.PAYMENT.getLabel());
		List<Transaction> transactions2 = transactionRepository.findByPaymentTimeBetweenAndTransactionType(startDateTime,endDateTime,
				TransactionType.REFUND.getLabel());
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
	
	public long calculateRevenueOneDay(LocalDate date) {
		long sum = 0L;
		long sum2 = 0L;
		LocalDateTime startDateTime =  date.atStartOfDay();		
		LocalDateTime endDateTime = date.atTime(LocalTime.MAX);
		List<Transaction> transactions = transactionRepository.findByPaymentTimeBetweenAndTransactionType(startDateTime,endDateTime,
				TransactionType.PAYMENT.getLabel());
		List<Transaction> transactions2 = transactionRepository.findByPaymentTimeBetweenAndTransactionType(startDateTime,endDateTime,
				TransactionType.REFUND.getLabel());
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

}
