package com.example.QuanLyNhaXe.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.QuanLyNhaXe.Request.CreateReview;
import com.example.QuanLyNhaXe.Request.EditActiveDTO;
import com.example.QuanLyNhaXe.dto.ReviewDTO;
import com.example.QuanLyNhaXe.enumration.RequestState;
import com.example.QuanLyNhaXe.exception.NotFoundException;
import com.example.QuanLyNhaXe.model.Review;
import com.example.QuanLyNhaXe.model.Schedule;
import com.example.QuanLyNhaXe.model.Trip;
import com.example.QuanLyNhaXe.model.User;
import com.example.QuanLyNhaXe.repository.ReviewRepository;
import com.example.QuanLyNhaXe.repository.ScheduleRepository;
import com.example.QuanLyNhaXe.util.Message;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
	private final UtilityService utilityService;
	private final ModelMapper modelMapper;
	private final UserService userService;
	private final ReviewRepository reviewRepository;
	private final ScheduleRepository scheduleRepository;

	public Object getAllReview() {
		List<Review> reviews = reviewRepository.findAll();
		if (reviews.isEmpty()) {
			throw new NotFoundException(Message.REVIEW_NOT_FOUND);
		}
		reviews.forEach(review -> {
	        Trip trip = review.getSchedule().getTrip();
	        trip.setSchedules(null);
	        trip.setTripBus(null);
	    });
		return reviews.stream().map(review -> modelMapper.map(review, ReviewDTO.class)).toList();

	}

	public Object createReview(CreateReview createReview, String authentication) {
		User user = userService.getUserByAuthorizationHeader(authentication);
		Schedule schedule = scheduleRepository.findById(createReview.getScheduleId())
				.orElseThrow(() -> new NotFoundException(Message.SCHEDULE_NOT_FOUND));
		Review review = Review.builder().rate(createReview.getRate()).comment(createReview.getComment())
				.sendDate(utilityService.convertHCMDateTime()).schedule(schedule).reviewer(user).state(RequestState.PENDING_APPROVAL.getLabel()).build();
		reviewRepository.save(review);
		Trip trip = review.getSchedule().getTrip();
        trip.setSchedules(null);
        trip.setTripBus(null);
		return modelMapper.map(review, ReviewDTO.class);
	}
	
	public Object editStateReview(EditActiveDTO edit) {

		Review review=reviewRepository.findById(edit.getId())
				.orElseThrow(() -> new NotFoundException(Message.REVIEW_NOT_FOUND));
		
		if(!edit.isActive()) {
			review.setState(RequestState.CANCELED.getLabel());
		}
		review.setState(RequestState.APPROVED.getLabel());
		reviewRepository.save(review);
		Trip trip = review.getSchedule().getTrip();
        trip.setSchedules(null);
        trip.setTripBus(null);
		return modelMapper.map(review, ReviewDTO.class);
	}
	
	public Object getAllApprovedReviews() {
	    List<Review> reviews = reviewRepository.findAll();
	    if (reviews.isEmpty()) {
	        throw new NotFoundException(Message.REVIEW_NOT_FOUND);
	    }
	    
	    List<Review> approvedReviews = reviews.stream()
	        .filter(review -> review.getState().equals(RequestState.APPROVED.getLabel()))
	        .toList();
	    approvedReviews.forEach(review -> {
	        Trip trip = review.getSchedule().getTrip();
	        trip.setSchedules(null);
	        trip.setTripBus(null);
	    });
	    return approvedReviews.stream()
	        .map(review -> modelMapper.map(review, ReviewDTO.class))
	        .toList();
	}
	public Object getMyReview(String authentication) {
		User user = userService.getUserByAuthorizationHeader(authentication);
		List<Review> reviews=reviewRepository.findByReviewerId(user.getId());
		if (reviews.isEmpty()) {
	        throw new NotFoundException(Message.REVIEW_NOT_FOUND);
	    }
		 reviews.forEach(review -> {
		        Trip trip = review.getSchedule().getTrip();
		        trip.setSchedules(null);
		        trip.setTripBus(null);
		    });
		return reviews.stream()				
		        .map(review -> modelMapper.map(review, ReviewDTO.class))
		        .toList();
	}
	

}
