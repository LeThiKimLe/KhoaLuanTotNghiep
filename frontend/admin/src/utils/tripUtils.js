import { convertToDisplayDate } from './convertUtils'
const getDeparture = (trip) => {
    if (trip)
        if (trip.tripInfor.turn === 1) return trip.tripInfor.route.departure.name
        else return trip.tripInfor.route.destination.name
}
const getDestination = (trip) => {
    if (trip)
        if (trip.tripInfor.turn === 1) return trip.tripInfor.route.destination.name
        else return trip.tripInfor.route.departure.name
}
export const getTripDeparture = (trip) => {
    if (trip)
        if (trip.turn === 1) return trip.route.departure.name
        else return trip.route.destination.name
}
export const getTripDestination = (trip) => {
    if (trip)
        if (trip.turn === 1) return trip.route.destination.name
        else return trip.route.departure.name
}
export const getStartStation = (trip) => {
    if (trip)
        if (trip.tripInfor.turn === 1) return trip.tripInfor.startStation.name
        else return trip.tripInfor.endStation.name
}
export const getEndStation = (trip) => {
    if (trip)
        if (trip.tripInfor.turn === 1) return trip.tripInfor.endStation.name
        else return trip.tripInfor.startStation.name
}
export const getRouteName = (trip) => {
    return getDeparture(trip) + '-' + getDestination(trip)
}
export const getTripName = (trip) => {
    return getStartStation(trip) + '-' + getEndStation(trip)
}
export const getTripRoute = (trip) => {
    return getTripDeparture(trip) + '-' + getTripDestination(trip)
}

export const getBookingTrip = (booking) => {
    if (booking.trip.turn === 1)
        return booking.trip.startStation.name + '-' + booking.trip.endStation.name
    else return booking.trip.endStation.name + '-' + booking.trip.startStation.name
}

export const getDateAndTimeTicket = (ticket) => {
    return (
        ticket.schedule.departTime.slice(0, -3) +
        '-' +
        convertToDisplayDate(ticket.schedule.departDate)
    )
}

export const getRouteJourney = (route) => {
    return route.departure.name + ' - ' + route.destination.name
}

export const getTripJourney = (trip) => {
    if (trip.turn === true) return trip.startStation.name + '-' + trip.endStation.name
    else return trip.endStation.name + '-' + trip.startStation.name
}

export const tripProcess = (listRoute) => {
    const listTrip = []
    let temp = -1
    listRoute.forEach((route) => {
        const { trips, ...routeInfo } = route
        trips.forEach((trip) => {
            const { id, turn, ...tripInfo } = trip
            temp = listTrip.findIndex(
                (item) =>
                    item.startStation.id === trip.startStation.id &&
                    item.endStation.id === trip.endStation.id &&
                    (item.schedule === trip.schedule ||
                        item.schedule === reverseString(trip.schedule)),
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
                    route: routeInfo,
                })
            }
        })
    })
    return listTrip
}

export const reverseString = (text, separator = '-') => {
    if (text !== '') {
        const splited = text.split(` ${separator} `)
        return splited.reverse().join(` ${separator} `)
    }
    return text
}
