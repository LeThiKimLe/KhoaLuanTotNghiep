import styles from './styles.module.css'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, memo, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { addHoursToTime, subtractHoursFromTime } from '../../../../utils/unitUtils';
import { selectCurrentTrip } from '../../../../feature/trip/trip.slice';
import { useSelector } from 'react-redux';
import axios from 'axios'

const PickLocation = ({ pick, listLocation, setLocation, selected, getObject, modifiedTrip }) => {

    const tripCur = useSelector(selectCurrentTrip)

    const trip = modifiedTrip ? modifiedTrip : tripCur

    const [listArrivalTime, setListArrivalTime] = useState(listLocation.map((local) => ({
        id: local.id,
        arrivalTime: pick ? trip.departTime.slice(0, -3) : addHoursToTime(trip.departTime, trip.tripInfor.route.hours)
    })))

    const copyArrival = useRef([...listArrivalTime])

    let count = useRef(0)

    const handleOptionChange = (event) => {
        if (getObject) {
            setLocation(listLocation.filter((location) => location.id == event.target.value)[0])
        }
        else
            setLocation(event.target.value)
    }
    const getTimePick = () => {
        var count = 0
        var updateList = []
        const locationDep = trip.tripInfor.turn === true ? trip.tripInfor.startStation : trip.tripInfor.endStation
        listLocation.forEach((locationDes) => {
            try {
                const url = `https://router.project-osrm.org/route/v1/driving/${encodeURI(
                    locationDep.longitude,
                )},${encodeURI(locationDep.latitude)};${encodeURI(locationDes.station.longitude)},${encodeURI(
                    locationDes.station.latitude,
                )}?overview=false&geometries=geojson`
                axios.get(url).then((response) => {
                    if (response.data.routes && response.data.routes.length > 0) {
                        const { duration } = response.data.routes[0]
                        updateList.push({
                            id: locationDes.id,
                            arrivalTime: addHoursToTime(trip.departTime, duration / 3600)
                        })
                    }
                    else{
                        updateList.push({
                            id: locationDes.id,
                            arrivalTime: trip.departTime.slice(0, -3)
                        }) 
                    }
                    count = count + 1
                    if (count === listLocation.length)
                    {
                        setListArrivalTime(updateList)
                    }
                })
            }
            catch (error) {
                updateList.push({
                    id: locationDes.id,
                    arrivalTime: trip.departTime.slice(0, -3)
                }) 
                count = count + 1
                if (count === listLocation.length)
                {
                    setListArrivalTime(updateList)
                }
            }
        })
    }

    const getTimeDrop = () => {
        const arrivalTime = addHoursToTime(trip.departTime, trip.tripInfor.route.hours)
        var count = 0
        var updateList = []
        const locationDep = trip.tripInfor.turn === true ? trip.tripInfor.endStation : trip.tripInfor.startStation
        listLocation.forEach((locationDes) => {
            try {
                const url = `https://router.project-osrm.org/route/v1/driving/${encodeURI(
                    locationDep.longitude,
                )},${encodeURI(locationDep.latitude)};${encodeURI(locationDes.station.longitude)},${encodeURI(
                    locationDes.station.latitude,
                )}?overview=false&geometries=geojson`
                axios.get(url).then((response) => {
                    if (response.data.routes && response.data.routes.length > 0) {
                        const { duration } = response.data.routes[0]
                        updateList.push({
                                    id: locationDes.id,
                                    arrivalTime: subtractHoursFromTime(arrivalTime, duration / 3600)
                                })
                    }
                    else{
                        updateList.push({
                            id: locationDes.id,
                            arrivalTime: arrivalTime
                        })
                    }
                    count = count + 1
                    if (count === listLocation.length)
                    {
                        setListArrivalTime(updateList)
                    }
                })
            }
            catch (error) {
                updateList.push({
                    id: locationDes.id,
                    arrivalTime: arrivalTime
                })
                count = count + 1
                if (count === listLocation.length)
                {
                    setListArrivalTime(updateList)
                }
            }
        })
    }

    useEffect(() => {
        if (listLocation.length > 0)
        {
            if (pick)
                getTimePick()
            else
                getTimeDrop()
        }
    }, [])
    return (
        <div className={`${styles.pick_container} ${pick ? styles.pick_separate : ''}`}>
            {!getObject && <h3 className={styles.pick_title}>{pick ? "Điểm đón" : "Điểm trả"}</h3>}
            <div className={styles.list_locations}>
                {listLocation.filter((local) => local.active === true).map((location) => (
                    <div key={`${location.id}`} className={styles.pick_location}>
                        <label className={selected == location.id ? `${styles.location_label} ${styles.selected}` : styles.location_label}>
                            <input
                                type="radio"
                                value={location.id}
                                checked={selected == location.id}
                                onChange={handleOptionChange}
                                className={styles.pick_radio}
                            />
                            <span className={styles.location_time}>{listArrivalTime.find((time) => time.id === location.id).arrivalTime}</span>
                            <span>-</span>
                            <span className={styles.location_name}>{location.station.name}</span>
                        </label>
                        <div className={styles.location_addr}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{location.station.address}
                                <a href={`https://www.google.com/maps?q=${location.station.latitude},${location.station.longitude}`} target="_blank">Xem vị trí</a>
                            </span>
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default memo(PickLocation)