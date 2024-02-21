export const getBookingInfor = (booking) => {
    const { trip, ...bookingInfor } = booking

    return {
        bookingTrip: {
            ...booking.tickets[0].schedule,
            tripInfor: trip
        },
        bookingUser: {
            name: booking.name,
            tel: booking.tel,
            email: booking.email
        },
        bookedSeat: booking.tickets.map((ticket)=> ticket.seat),
        pickPoint: booking.pickStation.id,
        dropPoint: booking.dropStation.id
    }
}

export const getRouteJourney = (route) => {
    return route.departure.name + ' - ' + route.destination.name
}

export const getTripJourney = (trip) => {
    if (trip.turn === true) return trip.startStation.name + '-' + trip.endStation.name
    else return trip.endStation.name + '-' + trip.startStation.name
}