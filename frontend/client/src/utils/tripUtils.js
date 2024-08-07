export const getBookingInfor = (booking) => {
  const { trip, ...bookingInfor } = booking;

  return {
    bookingTrip: {
      ...booking.tickets[0].schedule,
      tripInfor: trip,
    },
    bookingUser: {
      name: booking.name,
      tel: booking.tel,
      email: booking.email,
    },
    bookedSeat: booking.tickets.map((ticket) => ticket.seat),
    pickPoint: booking.pickStation.id,
    dropPoint: booking.dropStation.id,
  };
};

export const getRouteJourney = (route) => {
  return route.departure.name + " - " + route.destination.name;
};

export const getTripJourney = (trip) => {
  return trip.startStation.name + "-" + trip.endStation.name;
};

const reverseString = (str, separator = " - ") => {
  return str.split(separator).reverse().join(separator);
};

export const tripProcess = (listRoute) => {
  const listResult = [];
  let temp = -1;
  listRoute.forEach((route) => {
    const { trips, ...routeInfo } = route;
    const listOut = [];
    trips.forEach((trip) => {
      if (trip.active) {
        const { id, turn, ...tripInfo } = trip;
        temp = listOut.findIndex(
          (item) =>
            (item.startStation.id === trip.endStation.id &&
              item.endStation.id === trip.startStation.id &&
              item.schedule === trip.schedule) ||
            item.schedule === reverseString(trip.schedule),
        );
        if (temp != -1) {
          listOut[temp] = {
            ...listOut[temp],
            turnBack: trip.id,
          };
          return;
        } else {
          listOut.push({
            ...tripInfo,
            turnGo: id,
          });
        }
      }
    });
    listResult.push({
      ...routeInfo,
      listTrip: listOut,
    });
  });
  return listResult;
};
