package com.example.QuanLyNhaXe.dto;

import java.util.ArrayList;
import java.util.List;

import com.example.QuanLyNhaXe.enumration.TicketState;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingSeatDTO {
	
	private List<TicketDTO> tickets;
	
	public List<TicketDTO> getTickets() {
        List<TicketDTO> validTickets = new ArrayList<>();
        for (TicketDTO ticket : tickets) {
            if (!TicketState.CANCELED.getLabel().equals(ticket.getState())) {
                validTickets.add(ticket);
            }
        }
        return validTickets;
    }

}
