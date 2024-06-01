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

export const tripProcess = (listRoute) => {
  console.log(listRoute)
  const listResult = []
  let temp = -1
  listRoute.forEach((route) => {
      const { trips, ...routeInfo } = route
      const listOut = []
      trips.forEach((trip) => {
          const { id, turn, ...tripInfo } = trip
          temp = listOut.findIndex(
              (item) =>
                  item.startStation.id === trip.endStation.id &&
                  item.endStation.id === trip.startStation.id &&
                  item.schedule === trip.schedule,
          )
          if (temp != -1) {
              listOut[temp] = {
                  ...listOut[temp],
                  turnBack: trip.id,
              }
              return
          } else {
              listOut.push({
                  ...tripInfo,
                  turnGo: id,
              })
          }
      })
      listResult.push({
          ...routeInfo,
          listTrip: listOut,
      })
  })
  console.log(listResult)
  return listResult
}

