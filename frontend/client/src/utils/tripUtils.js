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
  if (trip.turn === true)
    return trip.startStation.name + "-" + trip.endStation.name;
  else return trip.endStation.name + "-" + trip.startStation.name;
};

export const tripProcess = (listRoute) => {
  const listResult = []
  let temp = -1
  listRoute.forEach((route) => {
      const { trips, ...routeInfo } = route
      const listTrip = []
      trips.forEach((trip) => {
          const { id, turn, ...tripInfo } = trip
          temp = listTrip.findIndex(
              (item) =>
                  item.startStation.id === trip.startStation.id &&
                  item.endStation.id === trip.endStation.id &&
                  item.schedule === trip.schedule,
          )
          if (temp != -1) {
              listTrip[temp] = {
                  ...listTrip[temp],
                  turnBack: trip.id,
              }
              return
          } else {
              listTrip.push({
                  ...tripInfo,
                  turnGo: id,
              })
          }
      })
      listResult.push({
          ...routeInfo,
          listTrip: listTrip,
      })
  })
  console.log(listResult)
  return listResult
}

