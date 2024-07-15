package com.example.QuanLyNhaXe.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.QuanLyNhaXe.Request.CancelTicketApproval;
import com.example.QuanLyNhaXe.Request.CancelTicketsDTO;
import com.example.QuanLyNhaXe.Request.ChangeTicketDTO;
import com.example.QuanLyNhaXe.Request.CreatePaymentDTO;
import com.example.QuanLyNhaXe.Request.CreatePaymentReturnTicket;
import com.example.QuanLyNhaXe.Request.EditBookingDTO;
import com.example.QuanLyNhaXe.Request.EditTicketDTO;
import com.example.QuanLyNhaXe.Request.TicketForChangeDTO;
import com.example.QuanLyNhaXe.dto.BusCompanyDTO;
import com.example.QuanLyNhaXe.dto.CancelRequestDTO;
import com.example.QuanLyNhaXe.dto.CompanyMoneyDTO;
import com.example.QuanLyNhaXe.dto.PolicyDTO;
import com.example.QuanLyNhaXe.dto.ReponseCancelTicket;
import com.example.QuanLyNhaXe.dto.RouteDTO;
import com.example.QuanLyNhaXe.dto.TicKetFullDTO;
import com.example.QuanLyNhaXe.dto.TicketCountByCompanyDTO;
import com.example.QuanLyNhaXe.dto.TicketCountByRouteDTO;
import com.example.QuanLyNhaXe.dto.TicketForMonthDTO;
import com.example.QuanLyNhaXe.dto.TicketSaleDTO;
import com.example.QuanLyNhaXe.dto.TransactionDTO;
import com.example.QuanLyNhaXe.enumration.BookingStatus;
import com.example.QuanLyNhaXe.enumration.HistoryAction;
import com.example.QuanLyNhaXe.enumration.PaymentMethod;
import com.example.QuanLyNhaXe.enumration.PolicyAction;
import com.example.QuanLyNhaXe.enumration.RequestState;
import com.example.QuanLyNhaXe.enumration.ScheduleState;
import com.example.QuanLyNhaXe.enumration.TicketState;
import com.example.QuanLyNhaXe.exception.BadRequestException;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Booking;
import com.example.QuanLyNhaXe.model.BusCompany;
import com.example.QuanLyNhaXe.model.CancelRequest;
import com.example.QuanLyNhaXe.model.History;
import com.example.QuanLyNhaXe.model.Policy;
import com.example.QuanLyNhaXe.model.Route;
import com.example.QuanLyNhaXe.model.Schedule;
import com.example.QuanLyNhaXe.model.StopStation;
import com.example.QuanLyNhaXe.model.Ticket;
import com.example.QuanLyNhaXe.model.TicketSale;
import com.example.QuanLyNhaXe.model.Transaction;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.BookingRepository;
import com.example.QuanLyNhaXe.repository.BusCompanyRepository;
import com.example.QuanLyNhaXe.repository.CancelRequestRepository;
import com.example.QuanLyNhaXe.repository.HistoryRepository;
import com.example.QuanLyNhaXe.repository.PolicyRepository;
import com.example.QuanLyNhaXe.repository.RouteRepository;
import com.example.QuanLyNhaXe.repository.ScheduleRepository;
import com.example.QuanLyNhaXe.repository.StopStationRepository;
import com.example.QuanLyNhaXe.repository.TicketRepository;
import com.example.QuanLyNhaXe.repository.TicketSaveRepository;
import com.example.QuanLyNhaXe.repository.TransactionRepository;
import com.example.QuanLyNhaXe.util.Message;
import com.example.QuanLyNhaXe.util.ResponseMessage;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketService {
	private final TicketRepository ticketRepository;
	private final BookingRepository bookingRepository;
	private final TransactionService transactionService;
	private final UtilityService utilityService;
	private final PolicyRepository policyRepository;
	private final UserService userService;
	private final ModelMapper modelMapper;
	private final HistoryRepository historyRepository;
	private final ScheduleRepository scheduleRepository;
	private final EmailService emailService;
	private final TransactionRepository transactionRepository;
	private final StopStationRepository stopStationRepository;
	private final CancelRequestRepository cancelRequestRepository;
	private final VNPayService vnPayService;
	private final BusCompanyService busCompanyService;
	private final TicketSaveRepository ticketSaveRepository;
	private final BusCompanyRepository busCompanyRepository;
	private final RouteRepository routeRepository;

	public Object paymentTicket(CreatePaymentDTO createPaymentDTO) {
		Booking booking = bookingRepository.findByCode(createPaymentDTO.getBookingCode())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
		if (!booking.getStatus().equals(BookingStatus.RESERVE.getLabel())) {
			throw new BadRequestException("Thanh toán không hợp lệ do đã hủy booking");

		}
		String pay = createPaymentDTO.getPaymentMethod();
		if (!pay.equals(PaymentMethod.VNPAY.getLabel()) && !pay.equals(PaymentMethod.STRIPE.getLabel())) {
			throw new BadRequestException("Phương thức thanh toán không được hỗ trợ");
		}

		LocalDateTime currentDateTime = utilityService.convertStringToDateTime(createPaymentDTO.getTransactionDate());
		LocalDateTime bookingDateTime = booking.getBookingDate();
		boolean isExpired = bookingDateTime.plusMinutes(10).isBefore(currentDateTime);
		if (!isExpired) {
			List<Ticket> tickets = booking.getTickets();
			for (Ticket ticket : tickets) {
				if (!ticket.getState().equals(TicketState.CANCELED.getLabel())) {
					ticket.setState(TicketState.PAID.getLabel());
					ticketRepository.save(ticket);
				}
			}
			booking.setStatus(BookingStatus.SUCCESS.getLabel());
			bookingRepository.save(booking);
			if (emailService.checkEmail(booking.getEmail())) {
				emailService.sendBookingInformation(booking);
			}
			return transactionService.createTransaction(createPaymentDTO);

		}
		throw new BadRequestException("Thanh toán không hợp lệ do hết thời gian chờ");
	}

	@Transactional
	public Object sendRequestCancelTicket(CancelTicketsDTO cancelTicketsDTO, String authorization) {
		List<History> histories = new ArrayList<>();
		List<Ticket> tickets = new ArrayList<>();
		List<Ticket> ticketCancels = new ArrayList<>();

		LocalDateTime currentDateTime = utilityService.convertHCMDateTime();
		User user = userService.getUserByAuthorizationHeader(authorization);

		if (cancelTicketsDTO.getNumberTicket() != cancelTicketsDTO.getTicketIdList().size()) {
			throw new BadRequestException("Yêu cầu không hợp lệ rồi");
		}
		Booking booking = bookingRepository.findByCode(cancelTicketsDTO.getBookingCode())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));

		for (Integer id : cancelTicketsDTO.getTicketIdList()) {
			Ticket ticket = ticketRepository.findById(id)
					.orElseThrow(() -> new NotFoundException(Message.TICKET_NOT_FOUND));
			if (!booking.getTickets().contains(ticket)) {
				throw new BadRequestException("Yêu cầu không hợp lệ do vé không thuộc mã đặt vé");
			}
			if (TicketState.PENDING_CANCEL.getLabel().equals(ticket.getState())
					|| TicketState.CANCELED.getLabel().equals(ticket.getState())) {
				throw new BadRequestException("Một hoặc nhiều vé đã chọn có trạng thái hủy hoặc chờ hủy");
			}
			if (historyRepository.existsByTicketIdAndAction(ticket.getId(), HistoryAction.CHANGE.getLabel())) {
				throw new BadRequestException("Một hoặc nhiều vé đã chọn đã đổi vé không được phép hủy");
			}

			tickets.add(ticket);
		}
		String state = tickets.get(0).getState();
		if (state.equals(TicketState.PAID.getLabel())) {
			Object reponseCancelTicket = getPolicyForCancelTicket(cancelTicketsDTO, authorization);
			if (reponseCancelTicket instanceof ReponseCancelTicket response) {
				CancelRequest cancelRequest = CancelRequest.builder()
						.policy(modelMapper.map(response.getPolicy(), Policy.class)).requestTime(currentDateTime)
						.state(RequestState.PENDING_APPROVAL.getLabel()).build();
				cancelRequestRepository.save(cancelRequest);
				for (Ticket ticket : tickets) {
					ticket.setState(TicketState.PENDING_CANCEL.getLabel());
					ticket.setCancelRequest(cancelRequest);
					ticketCancels.add(ticket);
				}
			}

		} else {
			for (Ticket ticket : tickets) {
				ticket.setState(TicketState.CANCELED.getLabel());
				ticketCancels.add(ticket);
				History history = createHistory(user, null, ticket, null, HistoryAction.CANCEL.getLabel());
				histories.add(history);
			}
			Schedule schedule = tickets.get(0).getSchedule();
			schedule.setAvailability(schedule.getAvailability() + tickets.size());
			ticketRepository.saveAll(ticketCancels);
			historyRepository.saveAll(histories);
			scheduleRepository.save(schedule);
			if (emailService.checkEmail(booking.getEmail())) {
				emailService.sendCancelTicketEmail(booking);
			}
			return new ResponseMessage("Hủy vé thành công");

		}

		return new ResponseMessage("Gửi yêu cầu hủy vé thành công");
	}

	@Transactional
	public Object cancelTicketForStaff(CancelTicketApproval cancelTicketApproval, String authorization,
			HttpServletRequest httpServletRequest) {

		List<History> histories = new ArrayList<>();
		Integer ticketPrice = 0;
		User user = userService.getUserByAuthorizationHeader(authorization);
		CancelRequest cancelRequest = cancelRequestRepository.findById(cancelTicketApproval.getCancelRequestId())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
		List<Ticket> tickets = cancelRequest.getTickets();
		Booking booking = tickets.get(0).getBooking();
		Boolean approvalState = cancelTicketApproval.getApproved();
		if (!approvalState) {
			cancelRequest.setState(RequestState.CANCELED.getLabel());
			cancelRequestRepository.save(cancelRequest);
			for (Ticket ticket : tickets) {
				ticket.setState(TicketState.PAID.getLabel());
				ticketRepository.save(ticket);
			}
			if (emailService.checkEmail(booking.getEmail())) {
				emailService.sendCancelTicketEmailFail(booking);
			}
			return new ResponseMessage("Hủy bỏ yêu cầu hủy vé thành công");

		} else {

			for (Ticket ticket : tickets) {
				ticketPrice += ticket.getTicketPrice();
			}
			ticketPrice = Math.round(ticketPrice * cancelRequest.getPolicy().getRefundRate());

			Schedule schedule = tickets.get(0).getSchedule();
			schedule.setAvailability(schedule.getAvailability() + tickets.size());
			String paymentMethod = tickets.get(0).getBooking().getTransaction().getPaymentMethod();
			Transaction transaction = transactionService.createTransactionForCancelTickets(paymentMethod, ticketPrice,
					null);
			try {
				transactionRepository.save(transaction);
				for (Ticket ticket : tickets) {
					ticket.setState(TicketState.CANCELED.getLabel());
					History history = createHistory(user, transaction, ticket, cancelRequest.getPolicy(),
							HistoryAction.CANCEL.getLabel());
					histories.add(history);

				}
				Transaction transactionPayment = booking.getTransaction();
				String orderId = booking.getOrder_id();
				String transactionDate = utilityService.convertDateTimeToString(transactionPayment.getPaymentTime());
				vnPayService.refund("03", orderId, ticketPrice, transactionDate, "xeKimNguyen",
						transactionPayment.getTransactionNo(), httpServletRequest);
				cancelRequest.setState(RequestState.APPROVED.getLabel());
				cancelRequestRepository.save(cancelRequest);
				historyRepository.saveAll(histories);
				ticketRepository.saveAll(tickets);
				scheduleRepository.save(schedule);

			} catch (Exception e) {
				e.printStackTrace();
				throw new BadRequestException("Lỗi xảy ra trong quá trình xử lý");
			}

			if (emailService.checkEmail(booking.getEmail())) {
				emailService.sendCancelTicketEmail(booking);
			}
			return new ResponseMessage("Hủy vé thành công");

		}

	}

	public Object getPolicyForCancelTicket(CancelTicketsDTO cancelTicketsDTO, String authorization) {

		boolean specialDay = false;
		double ticketPrice = 0;
		Transaction transaction = null;
		userService.getUserByAuthorizationHeader(authorization);
		List<Ticket> tickets = new ArrayList<>();

		if (cancelTicketsDTO.getNumberTicket() != cancelTicketsDTO.getTicketIdList().size()) {
			throw new BadRequestException("Yêu cầu không hợp lệ rồi");
		}
		Booking booking = bookingRepository.findByCode(cancelTicketsDTO.getBookingCode())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));

		for (Integer id : cancelTicketsDTO.getTicketIdList()) {
			Ticket ticket = ticketRepository.findById(id)
					.orElseThrow(() -> new NotFoundException(Message.TICKET_NOT_FOUND));
			if (!booking.getTickets().contains(ticket)) {
				throw new BadRequestException("Yêu cầu không hợp lệ do vé không thuộc mã đặt vé");
			}

			if (TicketState.PENDING_CANCEL.getLabel().equals(ticket.getState())
					|| TicketState.CANCELED.getLabel().equals(ticket.getState())) {
				throw new BadRequestException("Một hoặc nhiều vé đã chọn có trạng thái hủy hoặc chờ hủy");
			}
			if (!TicketState.PAID.getLabel().equals(ticket.getState())) {
				return new ResponseMessage("Các vé muốn hủy chưa thanh toán, Có thể hủy ngay");
			}
			if (historyRepository.existsByTicketIdAndAction(ticket.getId(), HistoryAction.CHANGE.getLabel())) {
				throw new BadRequestException("Một hoặc nhiều vé đã chọn đã đổi vé không được phép hủy");
			}

			ticketPrice += ticket.getTicketPrice();
			tickets.add(ticket);
			if (ticket.getSchedule().getSpecialDay() != null)
				specialDay = true;
		}

		Schedule schedule = tickets.get(0).getSchedule();
		LocalDate departDate = schedule.getDepartDate().toLocalDate();
		LocalTime deparTime = schedule.getDepartTime().toLocalTime();
		LocalDateTime departureTime = LocalDateTime.of(departDate, deparTime);
		float spanTime = calculateHoursBeforeDeparture(departureTime);
		List<Policy> policies = policyRepository
				.findByActionAndSpecialDayAndMinNumberRequiredLessThanEqualAndNumberRequiredGreaterThanEqualAndTimeRequiredLessThanEqualOrderByTimeRequiredDesc(
						PolicyAction.CANCEL.getLabel(), specialDay, cancelTicketsDTO.getNumberTicket(),
						cancelTicketsDTO.getNumberTicket(), spanTime)
				.orElseThrow(() -> new NotFoundException("Bạn không thỏa điều kiện hủy vé"));
		if (policies.isEmpty()) {
			throw new NotFoundException("Không thỏa điều kiện hủy vé");
		}
		Policy policyForCancel = policies.get(0);
		ticketPrice = Math.round(ticketPrice * policyForCancel.getRefundRate());

		transaction = transactionService.createTransactionForCancelTickets(booking.getTransaction().getPaymentMethod(),
				ticketPrice, null);

		return ReponseCancelTicket.builder().policy(modelMapper.map(policyForCancel, PolicyDTO.class))
				.transaction(modelMapper.map(transaction, TransactionDTO.class)).build();

	}

	@Transactional
	public Object changeTicket(ChangeTicketDTO changeTicketDTO, String authorization) {
		boolean specialDay = false;
		List<History> histories = new ArrayList<>();
		User user = userService.getUserByAuthorizationHeader(authorization);
		Schedule newSchedule = scheduleRepository.findById(changeTicketDTO.getNewScheduleId())
				.orElseThrow(() -> new NotFoundException(Message.SCHEDULE_NOT_FOUND));
		List<Ticket> tickets = new ArrayList<>();

		if (changeTicketDTO.getNumberTicket() != changeTicketDTO.getTickets().size()) {
			throw new BadRequestException("Yêu cầu không hợp lệ do truyền dữ liệu không thích hợp");
		}
		Booking booking = bookingRepository.findByCode(changeTicketDTO.getBookingCode())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
		for (TicketForChangeDTO ticketForChange : changeTicketDTO.getTickets()) {
			Ticket ticket = ticketRepository.findById(ticketForChange.getTicketId())
					.orElseThrow(() -> new NotFoundException(Message.TICKET_NOT_FOUND));
			if (!booking.getTickets().contains(ticket)) {
				throw new BadRequestException("Yêu cầu không hợp lệ ");
			}
			if (historyRepository.existsByTicketIdAndAction(ticket.getId(), HistoryAction.CHANGE.getLabel())) {
				throw new BadRequestException("Một hoặc nhiều vé đã chọn đã đổi vé ít nhất 1 lần");
			}
			if (ticket.getState().equals(TicketState.CANCELED.getLabel())) {
				throw new BadRequestException("Yêu cầu không hợp lệ do vé đã hủy");
			}
			if (ticketRepository.existsByScheduleIdAndSeatAndStateNot(newSchedule.getId(),
					ticketForChange.getNewSeatName(), TicketState.CANCELED.getLabel())) {
				throw new BadRequestException("Một hoặc nhiều vé đã chọn đã có người đặt rồi!!! Vui lòng chọn vé khác");
			}

			ticket.setSeat(ticketForChange.getNewSeatName());
			ticket.setSchedule(newSchedule);
			tickets.add(ticket);
			if (ticket.getSchedule().getSpecialDay() != null) {
				specialDay = true;
			}

		}
		newSchedule.setAvailability(newSchedule.getAvailability() + tickets.size());
		Schedule schedule = tickets.get(0).getSchedule();
		schedule.setAvailability(schedule.getAvailability() - tickets.size());
		LocalDate departDate = schedule.getDepartDate().toLocalDate();
		LocalTime deparTime = schedule.getDepartTime().toLocalTime();
		LocalDateTime departureTime = LocalDateTime.of(departDate, deparTime);
		float spanTime = calculateHoursBeforeDeparture(departureTime);
		List<Policy> policies = policyRepository
				.findByActionAndSpecialDayAndMinNumberRequiredLessThanEqualAndNumberRequiredGreaterThanEqualAndTimeRequiredLessThanEqualOrderByTimeRequiredDesc(
						PolicyAction.CHANGE.getLabel(), specialDay, changeTicketDTO.getNumberTicket(),
						changeTicketDTO.getNumberTicket(), spanTime)
				.orElseThrow(() -> new NotFoundException("Bạn không thỏa điều kiện đổi vé"));
		if (policies.isEmpty()) {
			throw new NotFoundException("Không thỏa điều kiện đổi vé");
		}
		Policy policyForCancel = policies.get(0);

		for (Ticket ticket : tickets) {
			History history = createHistory(user, null, ticket, policyForCancel, HistoryAction.CHANGE.getLabel());

			histories.add(history);

		}
		booking.setTicketing(false);
		try {
			bookingRepository.save(booking);
			historyRepository.saveAll(histories);
			ticketRepository.saveAll(tickets);
			scheduleRepository.save(schedule);
			scheduleRepository.save(newSchedule);

		} catch (Exception e) {
			e.printStackTrace();
			throw new BadRequestException("Lỗi xảy ra trong quá trình xử lý");

		}
		if (emailService.checkEmail(booking.getEmail())) {
			booking.setTickets(tickets);
			emailService.sendBookingInformation(booking);
		}
		return new ResponseMessage("Đổi vé thành công");
	}

	public float calculateHoursBeforeDeparture(LocalDateTime departureTime) {
		LocalDateTime currentTime = utilityService.convertHCMDateTime();
		long totalSeconds = ChronoUnit.SECONDS.between(currentTime, departureTime);

		long hours = totalSeconds / 3600;
		long minutes = (totalSeconds % 3600) / 60;
		long seconds = totalSeconds % 60;

		return hours + (minutes / 60.0f) + (seconds / 3600.0f);
	}

	public History createHistory(User user, Transaction transaction, Ticket ticket, Policy policy, String action) {
		LocalDateTime currentDateTime = utilityService.convertHCMDateTime();
		return History.builder().user(user).transaction(transaction).ticket(ticket).policy(policy)
				.timestamp(currentDateTime).action(action).build();
	}

	public Object editTicket(EditTicketDTO editTicketDTO, String authorization) {
		userService.getUserByAuthorizationHeader(authorization);
		StopStation newPickStation = stopStationRepository.findById(editTicketDTO.getPickStationId())
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		StopStation newDropStation = stopStationRepository.findById(editTicketDTO.getDropStationId())
				.orElseThrow(() -> new NotFoundException(Message.STATION_NOT_FOUND));
		Booking booking = bookingRepository.findByCode(editTicketDTO.getBookingCode())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
		List<Ticket> tickets = booking.getTickets();
		Schedule schedule = tickets.get(0).getSchedule();
		LocalDate departDate = schedule.getDepartDate().toLocalDate();
		LocalTime deparTime = schedule.getDepartTime().toLocalTime();
		LocalDateTime departureTime = LocalDateTime.of(departDate, deparTime);
		float spanTime = calculateHoursBeforeDeparture(departureTime);
		List<Policy> policies = policyRepository
				.findByActionAndSpecialDayAndMinNumberRequiredLessThanEqualAndNumberRequiredGreaterThanEqualAndTimeRequiredLessThanEqualOrderByTimeRequiredDesc(
						PolicyAction.EDIT.getLabel(), true, 0, 0, spanTime)
				.orElseThrow(() -> new NotFoundException("Bạn không thỏa điều kiện sửa vé"));
		if (policies.isEmpty()) {
			throw new NotFoundException("Không thỏa điều kiện sửa vé");
		}
		booking.setPickStation(newPickStation);
		booking.setDropStation(newDropStation);
		bookingRepository.save(booking);
		if (emailService.checkEmail(booking.getEmail())) {
			emailService.sendBookingInformation(booking);
		}
		return new ResponseMessage(Message.UPDATE_SUCCESS);
	}

	public List<CancelRequestDTO> getAllCancelRequest() {
		List<CancelRequest> cancelRequests = cancelRequestRepository.findAll();
		if (cancelRequests.isEmpty()) {
			throw new NotFoundException(Message.ROLE_NOT_FOUND);
		}
		return cancelRequests.stream().map(cancelRequest -> {
			supportMapTicket(cancelRequest.getTickets());
			return modelMapper.map(cancelRequest, CancelRequestDTO.class);
		}).toList();
	}

	@Transactional
	public Object cancelTicket(CancelTicketsDTO cancelTicketsDTO, String authorization,
			HttpServletRequest httpServletRequest) {

		Transaction transaction = null;

		Policy policy = null;
		User user = userService.getUserByAuthorizationHeader(authorization);
		List<Ticket> tickets = new ArrayList<>();
		List<History> histories = new ArrayList<>();
		String pay = cancelTicketsDTO.getPaymentMethod();
		if (!pay.equals(PaymentMethod.VNPAY.getLabel()) && !pay.equals(PaymentMethod.CASH.getLabel())) {
			throw new BadRequestException("Phương thức thanh toán không được hỗ trợ");
		}
		if (cancelTicketsDTO.getNumberTicket() != cancelTicketsDTO.getTicketIdList().size()) {
			throw new BadRequestException("Yêu cầu không hợp lệ rồi");
		}

		for (Integer id : cancelTicketsDTO.getTicketIdList()) {
			Ticket ticket = ticketRepository.findById(id)
					.orElseThrow(() -> new NotFoundException(Message.TICKET_NOT_FOUND));
			if (TicketState.PENDING_CANCEL.getLabel().equals(ticket.getState())
					|| TicketState.CANCELED.getLabel().equals(ticket.getState())) {
				throw new BadRequestException("Một hoặc nhiều vé đã chọn có trạng thái hủy hoặc chờ hủy");
			}
			if (historyRepository.existsByTicketIdAndAction(ticket.getId(), HistoryAction.CHANGE.getLabel())) {
				throw new BadRequestException("Một hoặc nhiều vé đã chọn đã đổi vé không được phép hủy");
			}
			tickets.add(ticket);

		}
		try {
			String state = tickets.get(0).getState();
			if (state.equals(TicketState.PAID.getLabel())) {

				Object reponseCancelTicket = getPolicyForCancelTicket(cancelTicketsDTO, authorization);
				if (reponseCancelTicket instanceof ReponseCancelTicket response) {
					transaction = transactionService.createTransactionForCancelTickets(pay,
							response.getTransaction().getAmount(), null);
					transactionRepository.save(transaction);
					policy = modelMapper.map(response.getPolicy(), Policy.class);
					Transaction transactionPayment = transactionRepository
							.findByBookingsCode(cancelTicketsDTO.getBookingCode())
							.orElseThrow(() -> new NotFoundException("Không tìm thấy giao dịch đã thanh toán"));
					String orderId = transactionPayment.getBookings().get(0).getOrder_id();
					String transactionDate = utilityService
							.convertDateTimeToString(transactionPayment.getPaymentTime());
					vnPayService.refund("03", orderId, (int) response.getTransaction().getAmount(), transactionDate,
							"xeKimNguyen", transactionPayment.getTransactionNo(), httpServletRequest);
				}
			}
			for (Ticket ticket : tickets) {
				ticket.setState(TicketState.CANCELED.getLabel());
				History history = createHistory(user, transaction, ticket, policy, HistoryAction.CANCEL.getLabel());
				histories.add(history);
			}
			Schedule schedule = tickets.get(0).getSchedule();
			schedule.setAvailability(schedule.getAvailability() + tickets.size());
			historyRepository.saveAll(histories);
			ticketRepository.saveAll(tickets);
			scheduleRepository.save(schedule);

		} catch (Exception e) {
			e.printStackTrace();
			throw new BadRequestException("Lỗi xảy ra trong quá trình xử lý");
		}

		return new ResponseMessage("Hủy vé thành công");

	}

	public Object getListTicketByScheduleId(Integer scheduleId) {
		List<Ticket> tickets = ticketRepository.findByScheduleId(scheduleId);
		if (tickets.isEmpty()) {
			throw new NotFoundException(Message.TICKET_NOT_FOUND);
		}
		return tickets.stream().map(ticket -> {
			ticket.getBooking().setTickets(null);
			return modelMapper.map(ticket, TicKetFullDTO.class);
		}).toList();
	}
	@Transactional
	public Object paymentTicketForStaff(CreatePaymentDTO createPaymentDTO) {
		Booking booking = bookingRepository.findByCode(createPaymentDTO.getBookingCode())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
		if (!booking.getStatus().equals(BookingStatus.RESERVE.getLabel())) {
			throw new BadRequestException("Thanh toán không hợp lệ");

		}
		String pay = createPaymentDTO.getPaymentMethod();
		if (!pay.equals(PaymentMethod.VNPAY.getLabel()) && !pay.equals(PaymentMethod.MOMO.getLabel())
				&& !pay.equals(PaymentMethod.BANKING.getLabel()) && !pay.equals(PaymentMethod.CASH.getLabel())) {
			throw new BadRequestException("Phương thức thanh toán không được hỗ trợ");
		}

		List<Ticket> tickets = booking.getTickets();
		for (Ticket ticket : tickets) {
			if (!ticket.getState().equals(TicketState.CANCELED.getLabel())) {
				ticket.setState(TicketState.PAID.getLabel());
				ticketRepository.save(ticket);
			}
		}
		booking.setStatus(BookingStatus.SUCCESS.getLabel());
		bookingRepository.save(booking);
		if (emailService.checkEmail(booking.getEmail())) {
			emailService.sendBookingInformation(booking);
		}
		return transactionService.createTransaction(createPaymentDTO);

	}

	public Object editBookingForStaff(EditBookingDTO editBookingDTO, String authorization) {
		Booking booking = bookingRepository.findByCode(editBookingDTO.getBookingCode())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
		EditTicketDTO editTicketDTO = EditTicketDTO.builder().bookingCode(editBookingDTO.getBookingCode())
				.dropStationId(editBookingDTO.getDropStationId()).pickStationId(editBookingDTO.getPickStationId())
				.build();
		Object object = editTicket(editTicketDTO, authorization);
		if (object instanceof ResponseMessage responseMessage
				&& responseMessage.getMessage().equals(Message.UPDATE_SUCCESS)) {
			booking.setName(editBookingDTO.getName());
			booking.setTel(editBookingDTO.getTel());
			bookingRepository.save(booking);
		}
		return new ResponseMessage(Message.UPDATE_SUCCESS);

	}

	public void supportMapTicket(List<Ticket> tickets) {
		for (Ticket ticket : tickets) {
			ticket.getBooking().setTickets(null);
		}

	}

	public Object checkIn(Integer ticketId) {
		Ticket ticket = ticketRepository.findById(ticketId)
				.orElseThrow(() -> new NotFoundException(Message.TICKET_NOT_FOUND));
		if (!ticket.getState().equals(TicketState.PAID.getLabel()))
			throw new BadRequestException("Vé này chưa thanh toán");
		if (ticket.isCheckedIn()) {
			throw new BadRequestException("Vé này đã Check In rồi");
		}
		ticket.setCheckedIn(true);
		ticketRepository.save(ticket);
		return new ResponseMessage(Message.SUCCESS);

	}

	public Object searchTicketBill(String referCode) {
		if (referCode.isEmpty()) {
			throw new BadRequestException(Message.BAD_REQUEST);
		}
		Ticket ticket = ticketRepository.findByBillReferCode(referCode)
				.orElseThrow(() -> new NotFoundException(Message.BILL_NOT_FOUND));
		ticket.getBooking().setTickets(null);
		return modelMapper.map(ticket, TicKetFullDTO.class);

	}

	@Transactional
	public Object paymentReturnTicket(CreatePaymentReturnTicket createPaymentDTO) {
		Booking booking = bookingRepository.findByCode(createPaymentDTO.getBookingCode())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
		Booking booking2 = bookingRepository.findByCode(createPaymentDTO.getBookingCodeReturn())
				.orElseThrow(() -> new NotFoundException(Message.BOOKING_NOT_FOUND));
		if (!booking.getStatus().equals(BookingStatus.RESERVE.getLabel())) {
			throw new BadRequestException("Thanh toán không hợp lệ do đã hủy booking");
		}
		String pay = createPaymentDTO.getPaymentMethod();
		if (!pay.equals(PaymentMethod.VNPAY.getLabel()) && !pay.equals(PaymentMethod.STRIPE.getLabel())) {
			throw new BadRequestException("Phương thức thanh toán không được hỗ trợ");
		}

		LocalDateTime currentDateTime = utilityService.convertStringToDateTime(createPaymentDTO.getTransactionDate());
		LocalDateTime bookingDateTime = booking.getBookingDate();
		boolean isExpired = bookingDateTime.plusMinutes(10).isBefore(currentDateTime);
		if (!isExpired) {
			List<Ticket> tickets = new ArrayList<>(booking.getTickets());
			tickets.addAll(booking2.getTickets());
			for (Ticket ticket : tickets) {
				if (!ticket.getState().equals(TicketState.CANCELED.getLabel())) {
					ticket.setState(TicketState.PAID.getLabel());
					ticketRepository.save(ticket);
				}
			}
			booking.setStatus(BookingStatus.SUCCESS.getLabel());
			bookingRepository.save(booking);
			booking2.setStatus(BookingStatus.SUCCESS.getLabel());
			bookingRepository.save(booking2);
			if (emailService.checkEmail(booking.getEmail())) {
				emailService.sendBookingInformation(booking);
				emailService.sendBookingInformation(booking2);
			}
			return transactionService.createReturnTicketTransaction(createPaymentDTO);

		}
		throw new BadRequestException("Thanh toán không hợp lệ do hết thời gian chờ");
	}

	public long getMoneyForOneCompany(YearMonth yearMonth, BusCompany busCompany) {
		long sum = 0L;

		LocalDate startDate = yearMonth.atDay(1);
		LocalDate endDate = yearMonth.atEndOfMonth();

		List<Ticket> tickets = ticketRepository
				.findByStateAndBookingConductStaffIsNullAndScheduleStateAndScheduleDepartDateBetweenAndSchedule_Trip_BusCompany(
						TicketState.PAID.getLabel(), ScheduleState.HOAN_THANH.getLabel(), startDate, endDate,
						busCompany);
		if (!tickets.isEmpty()) {
			for (Ticket ticket : tickets) {
				sum += ticket.getTicketPrice();
			}
		}
		return sum;

	}

	public long getMoneyRefundForOneCompany(YearMonth yearMonth, BusCompany busCompany) {
		long sum = 0L;

		LocalDate startDate = yearMonth.atDay(1);
		LocalDate endDate = yearMonth.atEndOfMonth();

		List<Ticket> tickets = ticketRepository
				.findByStateAndScheduleStateAndScheduleDepartDateBetweenAndSchedule_Trip_BusCompanyAndHistories_TransactionPaymentMethodNot(
						TicketState.PAID.getLabel(), ScheduleState.HOAN_THANH.getLabel(), startDate, endDate,
						busCompany, PaymentMethod.CASH.getLabel());
		if (!tickets.isEmpty()) {
			for (Ticket ticket : tickets) {
				List<History> histories=ticket.getHistories();
				for(History history: histories) {
					if(history.getAction().equals(HistoryAction.CANCEL.getLabel())) {
						sum+=history.getTransaction().getAmount();
					}
				}
				
			}
		}
		return sum;

	}

	public Object getMoneyForAllCompany(int month, int year) {

		YearMonth yearMonth = YearMonth.of(year, month);
		LocalDate startDate = yearMonth.atDay(1);
		LocalDate endDate = yearMonth.atEndOfMonth();
		if (yearMonth.getYear() == LocalDate.now().getYear()
				&& yearMonth.getMonth().getValue() >= LocalDate.now().getMonthValue()) {
			throw new BadRequestException(Message.BAD_REQUEST);

		}

		List<CompanyMoneyDTO> companyMoneyDTOs = new ArrayList<>();
		List<BusCompany> busCompanies = busCompanyService.getAllBusModelCompanys();
		for (BusCompany busCompany : busCompanies) {
			long money = 0L;
			money = getMoneyForOneCompany(yearMonth, busCompany);
			long refundMoney = 0L;
			refundMoney = getMoneyRefundForOneCompany(yearMonth, busCompany);
			TicketSale ticketSale = ticketSaveRepository
					.findByFromDateAndToDateAndBusCompany(startDate, endDate, busCompany).orElse(null);

			if (ticketSale == null) {
				long total = money - refundMoney;
				ticketSale = TicketSale.builder().fromDate(startDate).toDate(endDate).ticketSales(total)
						.profit(80 * total / 100).busCompany(busCompany).build();
				ticketSale = ticketSaveRepository.save(ticketSale);
			}

			CompanyMoneyDTO companyMoneyDTO = CompanyMoneyDTO.builder()
					.busCompany(modelMapper.map(busCompany, BusCompanyDTO.class))
					.ticketSave(modelMapper.map(ticketSale, TicketSaleDTO.class)).build();
			companyMoneyDTOs.add(companyMoneyDTO);

		}
		return companyMoneyDTOs;
	}

	public Object getMoneyForOneCompany(int month, int year, String authentication) {
		User user = userService.getUserByAuthorizationHeader(authentication);
		BusCompany busCompany = busCompanyRepository.findByAdminId(user.getStaff().getAdmin().getAdminId())
				.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
		YearMonth yearMonth = YearMonth.of(year, month);
		LocalDate startDate = yearMonth.atDay(1);
		LocalDate endDate = yearMonth.atEndOfMonth();
		if (yearMonth.getYear() == LocalDate.now().getYear()
				&& yearMonth.getMonth().getValue() >= LocalDate.now().getMonthValue()) {
			throw new BadRequestException(Message.BAD_REQUEST);

		}
		TicketSale ticketSale = ticketSaveRepository
				.findByFromDateAndToDateAndBusCompany(startDate, endDate, busCompany).orElse(null);
		if (ticketSale == null) {
			throw new NotFoundException("Không có dữ liệu");
		}
		return modelMapper.map(ticketSale, TicketSaleDTO.class);
	}

	public List<TicKetFullDTO> getTicketforMonthAndCompany(YearMonth yearMonth, BusCompany busCompany) {

		
		List<TicKetFullDTO> ticKetFullDTOs = new ArrayList<>();

		
		LocalDate startDate = yearMonth.atDay(1);
		LocalDate endDate = yearMonth.atEndOfMonth();
		if (yearMonth.getYear() == LocalDate.now().getYear()
				&& yearMonth.getMonth().getValue() == LocalDate.now().getMonthValue()) {

			 endDate = utilityService.convertHCMDateTime().toLocalDate();
		}
		LocalDateTime startDateTime = LocalDateTime.of(startDate, LocalTime.of(0, 0));
		LocalDateTime endDateTime = LocalDateTime.of(endDate, LocalTime.of(23, 59));

		// List<Ticket> tickets = ticketRepository
		// 		.findByStateAndBookingConductStaffIsNullAndScheduleStateAndScheduleDepartDateBetweenAndSchedule_Trip_BusCompany(
		// 				TicketState.PAID.getLabel(), ScheduleState.HOAN_THANH.getLabel(), startDate, endDate,
		// 				busCompany);
	
		List<Ticket> tickets = ticketRepository
				.findByStateAndBookingConductStaffIsNullAndBookingBookingDateBetweenAndSchedule_Trip_BusCompany(
						TicketState.PAID.getLabel(), startDateTime, endDateTime,
						busCompany);
		
		if (tickets.isEmpty()) {

			return ticKetFullDTOs;

		}
		return tickets.stream().map(ticket -> {
			ticket.getBooking().setTickets(null);
			return modelMapper.map(ticket, TicKetFullDTO.class);
		}).toList();
	}

	public Object getTicketForMonth(int month, int year, String authentication) {
		YearMonth yearMonth = YearMonth.of(year, month);
		

		User user = userService.getUserByAuthorizationHeader(authentication);
		if (user.getAccount().getRole().getRoleName().equals("ADMIN")) {
			BusCompany busCompany = busCompanyRepository.findByAdminId(user.getStaff().getAdmin().getAdminId())
					.orElseThrow(() -> new NotFoundException(Message.COMPANY_NOT_FOUND));
			List<TicKetFullDTO> tickets = getTicketforMonthAndCompany(yearMonth, busCompany);
			return TicketForMonthDTO.builder()
					.busCompany(modelMapper.map(busCompany, BusCompanyDTO.class)).ticKets(tickets).build();
			
		}
		List<TicketForMonthDTO> ticketForMonthDTOs = new ArrayList<>();
		List<BusCompany> busCompanies = busCompanyService.getAllBusModelCompanys();
		for (BusCompany item : busCompanies) {
			List<TicKetFullDTO> ticketsForOne = getTicketforMonthAndCompany(yearMonth, item);
			TicketForMonthDTO ticketForMonthDTO = TicketForMonthDTO.builder()
					.busCompany(modelMapper.map(item, BusCompanyDTO.class)).ticKets(ticketsForOne).build();
			ticketForMonthDTOs.add(ticketForMonthDTO);

		}
		return ticketForMonthDTOs;

	}
	
	public Object countTicketOnlineByCompany() {
		List<BusCompany> listCompany = busCompanyRepository.findAll();
		List<TicketCountByCompanyDTO> ticketCountDTOs = new ArrayList<>();
		Integer ticketCount = 0;
		for (BusCompany busCompany : listCompany) {
			ticketCount = ticketRepository
					.countByStateAndBookingConductStaffIsNullAndScheduleStateAndSchedule_Trip_BusCompany(
							TicketState.PAID.getLabel(), ScheduleState.HOAN_THANH.getLabel(), busCompany);
			TicketCountByCompanyDTO ticketCountDTO = TicketCountByCompanyDTO.builder().busCompany(modelMapper.map(busCompany, BusCompanyDTO.class))
					.count(ticketCount).build();
			ticketCountDTOs.add(ticketCountDTO);
		}
		return ticketCountDTOs;
	}
	public Object countTicketOnlineByRoute() {
		List<Route> listRoute = routeRepository.findAll();
		List<TicketCountByRouteDTO> ticketCountDTOs = new ArrayList<>();
		Integer ticketCount = 0;
		for (Route route : listRoute) {
			ticketCount = ticketRepository
					.countByStateAndBookingConductStaffIsNullAndScheduleStateAndSchedule_Trip_Route(
							TicketState.PAID.getLabel(), ScheduleState.HOAN_THANH.getLabel(), route);
			TicketCountByRouteDTO ticketCountDTO = TicketCountByRouteDTO.builder().route(modelMapper.map(route, RouteDTO.class))
					.count(ticketCount).build();
			ticketCountDTOs.add(ticketCountDTO);
		}
		return ticketCountDTOs;
	}
	

}