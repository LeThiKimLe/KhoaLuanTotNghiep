const listDeparture = []
const listDestination = []

export const createListRoutes = (routeData) => {
    routeData.forEach((route) => {
        addRoute(route, 'forward')
        addRoute(route, 'backward')
    })
    return {
        listDeparture: listDeparture,
        listDestination: listDestination,
    }
}

const addRoute = (route, round) => {
    const roundkey = round === 'forward' ? 1 : 0

    const cusRoute =
        roundkey === 1
            ? route
            : {
                  ...route,
                  departure: route.destination,
                  destination: route.departure,
              }

    const addKeyPair = () => {
        const key = listDeparture.length
        listDeparture.push({
            key: key,
            location: cusRoute.departure,
        })
        listDestination.push({
            key: key,
            location: [
                {
                    destination: cusRoute.destination,
                    routeId: cusRoute.id,
                    round: roundkey,
                },
            ],
        })
    }

    if (listDeparture.length !== 0) {
        const findKey = listDeparture.filter(
            (depart) => depart.location.id === cusRoute.departure.id,
        )[0]
        if (findKey) {
            const key = findKey.key
            const mapDesIndex = listDestination.indexOf(
                listDestination.filter((des) => des.key === key)[0],
            )
            {
                if (
                    !listDestination[mapDesIndex].location
                        .map((local) => local.destination.id)
                        .includes(cusRoute.destination.id)
                ) {
                    listDestination[mapDesIndex].location.push({
                        destination: cusRoute.destination,
                        routeId: cusRoute.id,
                        round: roundkey,
                    })
                }
            }
        } else {
            addKeyPair()
        }
    } else {
        addKeyPair()
    }
}

export const getDesandDep = (listRoute, depName, desName) => {
    const { listDeparture, listDestination } = createListRoutes(listRoute)
    const depOptions = listDeparture.map((dep) => {
        return { value: dep.key, label: dep.location.name }
    })
    const departure = depOptions.filter((option) => option.label === depName)[0]
    const desOptions = departure
        ? listDestination
              .filter((des) => des.key === departure.value)[0]
              .location.map((des) => {
                  return {
                      value: { id: des.routeId, turn: des.round },
                      label: des.destination.name,
                  }
              })
        : []
    const destination = desOptions.filter((option) => option.label === desName)[0]
    return { departure, destination }
}

export const getLocationData = (listOfficialRroute) => {
    const listLocation = []
    let tempDep = -1
    let tempDes = -1
    listOfficialRroute.forEach((route) => {
        tempDes = listLocation.findIndex((location) => location.name === route.departure)
        if (tempDes === -1) {
            listLocation.push({
                name: route.departure,
                listStation: [route.startStation],
            })
        } else {
            if (listLocation[tempDes].listStation.includes(route.startStation) === false)
                listLocation[tempDes].listStation.push(route.startStation)
        }
        tempDep = listLocation.findIndex((location) => location.name === route.destination)
        if (tempDep === -1) {
            listLocation.push({
                name: route.destination,
                listStation: [route.endStation],
            })
        } else {
            if (listLocation[tempDep].listStation.includes(route.endStation) === false)
                listLocation[tempDep].listStation.push(route.endStation)
        }
    })
    return listLocation
}

export const reverseString = (text, separator = '-') => {
    if (text !== '') {
        const splited = text.split(` ${separator} `)
        return splited.reverse().join(` ${separator} `)
    }
    return text
}

export const tripProcess = (listRoute, companyId = -1) => {
    if (listRoute && listRoute.every((route) => route)) {
        const listTrip = []
        let temp = -1
        listRoute.forEach((route) => {
            const { trips, ...routeInfo } = route
            trips.forEach((trip) => {
                if (companyId == -1 || (trip?.busCompanyId == companyId && companyId != -1)) {
                    const { id, turn, stopStations, ...tripInfo } = trip
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
                            turnBack: {
                                id: id,
                                stopStations: stopStations,
                            },
                        }
                        return
                    } else {
                        listTrip.push({
                            ...tripInfo,
                            turnGo: {
                                id: id,
                                stopStations: stopStations,
                            },
                            route: routeInfo,
                        })
                    }
                }
            })
        })
        return listTrip
    } else return []
}
