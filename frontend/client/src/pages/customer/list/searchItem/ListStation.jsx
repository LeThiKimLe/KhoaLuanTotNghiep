import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBullseye } from "@fortawesome/free-solid-svg-icons"

export const ListStation = ({trip}) => {
    const departure = trip.tripInfor.turn ? trip.tripInfor.route.departure : trip.tripInfor.route.destination
    const destination = trip.tripInfor.turn ? trip.tripInfor.route.destination : trip.tripInfor.route.departure
    const getStopStation = (direct) => {
        return trip?.tripInfor?.stopStations?.filter((sta) => sta.stationType == direct)
    }

    return (
        <div className="row justify-content-center my-2">
            <div className="col-5 border-end border-2">
                <div className="text-center"><b>{departure.name}</b></div>
                {
                    getStopStation('pick').map((station) => (
                        <div className="d-flex gap-2 align-items-center my-2" key={station.id}>
                            <FontAwesomeIcon icon={faBullseye} color="#84878a" />
                            <i>{station.station.name}</i>
                        </div>
                    ))
                }
            </div>
            <div className="col-5">
                <div className="text-center"><b>{destination.name}</b></div>
                {
                    getStopStation('drop').map((station) => (
                        <div className="d-flex gap-2 align-items-center my-2" key={station.id}>
                            <FontAwesomeIcon icon={faBullseye} color="#84878a" />
                            <i>{station.station.name}</i>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}