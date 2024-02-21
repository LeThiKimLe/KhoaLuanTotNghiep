import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faRoute, faMapLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import bookingThunk from '../../../../feature/booking/booking.service'
import { selectUserBookingHistory } from '../../../../feature/booking/booking.slice'
import { useDispatch } from 'react-redux'
import { addHourToDate, convertToDisplayDate, convertToStamp } from '../../../../utils/unitUtils'
import { TICKET_STATE_DICTIONARY } from '../../../../utils/constants'
import L, { icon } from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import './custom.css'
import iconURL from 'leaflet/dist/images/marker-icon.png';
import iconRetinaURL from 'leaflet/dist/images/marker-icon-2x.png';
import shadowURL from 'leaflet/dist/images/marker-shadow.png';
import startMarker from '../../../../assets/StartMarker.png'
import endMarker from '../../../../assets/EndMarker.png'
import waypointMarker from '../../../../assets/WaypointMarker.png'
import dropMarker from '../../../../assets/DropMarker.png'
import pickMarker from '../../../../assets/PickMarker.png'
import { add, set } from 'date-fns'
import { OptionButton } from '../../../../components/common/button'

var DefaultIcon = L.Icon.extend({
    options: {
        shadowUrl: shadowURL,
        iconSize:     [38, 60],
        shadowSize:   [41, 41],
        iconAnchor:   [19, 60],
        shadowAnchor: [12, 40],
        popupAnchor:  [0, -50]
    }
});

var WaypointIcon = L.Icon.extend({
    options: {
        iconSize:     [38, 38],
        shadowSize:   [41, 41],
        iconAnchor:   [19, 38],
        shadowAnchor: [12, 40],
        popupAnchor:  [0, -50]
    }
});

var StartIcon = L.Icon.extend({
    options: {
        shadowUrl: shadowURL,
        iconSize:     [60, 60],
        shadowSize:   [41, 41],
        iconAnchor:   [16, 60],
        shadowAnchor: [12, 40],
        popupAnchor:  [0, -50]
    }
});

var CenterIcon = L.Icon.extend({
    options: {
        shadowUrl: shadowURL,
        iconSize:     [60, 60],
        shadowSize:   [41, 41],
        iconAnchor:   [30, 60],
        shadowAnchor: [12, 40],
        popupAnchor:  [0, -50]
    }
});


var DropIcon = L.Icon.extend({
    options: {
        shadowUrl: shadowURL,
        iconSize:     [40, 40],
        shadowSize:   [41, 41],
        iconAnchor:   [20, 40],
        shadowAnchor: [12, 40],
        popupAnchor:  [0, -50]
    }
});


const myIcon = new DefaultIcon({iconUrl: iconURL, iconRetinaUrl: iconRetinaURL});
const startIcon = new StartIcon({iconUrl: startMarker, iconRetinaUrl: startMarker});
const endIcon = new CenterIcon({iconUrl: endMarker, iconRetinaUrl: endMarker});
const waypointIcon = new WaypointIcon({iconUrl: waypointMarker, iconRetinaUrl: waypointMarker});
const dropIcon = new DropIcon({iconUrl: dropMarker, iconRetinaUrl: dropMarker});
const pickIcon = new DropIcon({iconUrl: pickMarker, iconRetinaUrl: pickMarker});

const MapBox = ({ closeForm, showState, tripData }) => {
    const map = useRef(null);
    const currentPoint = useRef(null);
    const dropPoint = useRef(null);
    const pickPoint = useRef(null);
    const remainTime = useRef(0)
    const [routeData, setRouteData] = useState(null)
    const currentAddress = useRef('')
    const currentSpeed = useRef(0)

    const calculateTime = (startPoint, endPoint) => {
        var time = -1;
        var start = L.latLng(startPoint.getLatLng().lat, startPoint.getLatLng().lng);
        var end = L.latLng(endPoint.getLatLng().lat, endPoint.getLatLng().lng);
        var router = new L.Routing.osrmv1();
        router.route([
            {latLng: start},
            {latLng: end}
        ], function(err, routes) {
            if (err) {
                console.error(err);
            } else {
                time = routes[0].summary.totalTime/3600;
                // Check if popup contain time infor
                if (time !== remainTime.current) 
                {
                    remainTime.current = time;
                    if (currentPoint.current) {
                        var popup = currentPoint.current.getPopup();
                        // Lấy nội dung hiện tại của popup
                        if (popup)
                        {
                            popup.setContent(getPopupContent());
                        }
                    }
                }
            }
        });
    }

    const preventClose = (e) => {
        e.stopPropagation()
    }

    const getRouteData = async () => {
        if (routeData === null) {
        //Get route location
        const schedule = tripData?.trip?.route?.schedule
        const waypoints = []
        //Split schedule by '->'
        const route = schedule.split(' -> ')
        //Get location of each station
        route.forEach(async (station, index) => {
            const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + station
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        const pointData = {
                            point: L.Routing.waypoint([data[0].lat, data[0].lon], station),
                            type: index === 0 ? 'start' : index === route.length - 1 ? 'end' : 'waypoint'
                        }
                        waypoints.push(pointData)
                    }
                    if (waypoints.length === route.length) {
                        console.log(waypoints)
                        setRouteData(waypoints)
                    }
                })
                .catch(error => console.error(error));
            })
        }
    }
    const addDropPoint = () => {
        if (map.current){
            pickPoint.current = L.marker([tripData.pickStation.station.latitude, tripData.pickStation.station.longitude], {icon: pickIcon})
                            .addTo(map.current).bindPopup("Điểm đón: " + tripData.pickStation.station.name);
            dropPoint.current = L.marker([tripData.dropStation.station.latitude, tripData.dropStation.station.longitude], {icon: dropIcon})
                            .addTo(map.current).bindPopup("Điểm trả: " + tripData.dropStation.station.name);
        }
    }

    const getPopupContent = () => {
        var remain = convertToStamp(remainTime.current);
        var content = '';
        if (currentAddress.current)
            content = "Vị trí của bạn: " + currentAddress.current
        if ( remainTime.current !== 0)
            content += "<br>Còn: " + remain +" nữa đến điểm trả"
        if (currentSpeed.current)
            content += "<br>Tốc độ hiện tại: " + currentSpeed.current + "km/h";
        return content;
    }

    const showMyPosition = () => {
        if (currentPoint.current) {
            map.current.setView(currentPoint.current.getLatLng(), 13);
        }
    }
    
    useEffect(() => {
        if (routeData !== null && map.current) {
            L.Routing.control({
                waypoints: routeData.map((point) => point.point),
                addWaypoints: false,
                routeWhileDragging: true,
                createMarker: function(i, wp, nWps) {
                    if (routeData[i].type !== 'waypoint')
                        return L.marker(wp.latLng, {
                            icon: routeData[i].type === 'start' ? startIcon : routeData[i].type === 'end' ? endIcon : waypointIcon
                        }).bindPopup(wp.name)
                    else
                        return null
                }
            }).addTo(map.current);
        }
    }, [routeData])

    useEffect(() => {
        if (!map.current)
            map.current = L.map('map');
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(map.current);
        // Get route data
        getRouteData()
        // Calculate speed
        addDropPoint()
        let previousPosition = null;
        let previousTime = null;
        function getDistance(position1, position2) {
            const R = 6371e3; // Radius of the Earth in meters
            const lat1 = position1.latitude * Math.PI/180; // Convert degrees to radians
            const lat2 = position2.latitude * Math.PI/180;
            const deltaLat = (position2.latitude-position1.latitude) * Math.PI/180;
            const deltaLon = (position2.longitude-position1.longitude) * Math.PI/180;
        
            const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
                      Math.cos(lat1) * Math.cos(lat2) *
                      Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c; // Distance in meters
        }
        //Update position
        const handlePositionUpdate = (position) => {
            const currentTime = new Date().getTime();
            // calculateSpeed(position, timestamp);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const currentPosition = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
        
            if (previousPosition) {
                const distance = getDistance(previousPosition, currentPosition);
                const time = (currentTime - previousTime) / 1000; // Convert milliseconds to seconds
                const speed = distance / time; // Speed in meters per second
                console.log("Current speed is " + speed + " m/s");
                currentSpeed.current = (speed * 3.6).toFixed(2);
            }
        
            previousPosition = currentPosition;
            previousTime = currentTime;
            
            if (currentPoint.current) {
                currentPoint.current.setLatLng([latitude, longitude]);
            }
            if (currentPoint.current && pickPoint.current) {
                calculateTime(currentPoint.current, pickPoint.current)
            }
            if (currentPoint.current) {
                var popup = currentPoint.current.getPopup();
                // Lấy nội dung hiện tại của popup
                if (popup)
                {
                    popup.setContent(getPopupContent());
                }
            }
        };
        
        if (navigator.geolocation) {
            // Get current position
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                currentPoint.current = L.marker([latitude, longitude], {icon: myIcon}).addTo(map.current);
                // Lấy địa chỉ từ vị trí hiện tại
                var url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitude + '&lon=' + longitude;
                fetch(url)
                  .then(function (response) {
                    return response.json();
                  })
                  .then(function (data) {
                    var address = data.display_name;
                    // Tạo đánh dấu cho vị trí hiện tại và hiển thị địa chỉ
                    currentAddress.current = address;
                    currentPoint.current.bindPopup(getPopupContent()).openPopup();
                    // Đặt tâm bản đồ là vị trí hiện tại
                    map.current.setView([latitude, longitude], 13);
                  })
                  .catch(function (error) {
                    console.log('Lỗi khi lấy địa chỉ:', error);
                    currentPoint.current.bindPopup("Vị trí của bạn").openPopup();
                  });
              });
            navigator.geolocation.watchPosition(handlePositionUpdate);
        } else {
            alert("Trình duyệt của bạn không hỗ trợ định vị.");
        }
    }, []);

    return (
        <div className={styles.mapbox}>
            <div className={styles.container}>
                <div className={styles.mask}></div>
                <div className={styles.content} onClick={preventClose}>
                    <div className={styles.directBtn}>
                        <div>Theo dõi hành trình</div>
                        <div onClick={closeForm}>
                            <FontAwesomeIcon icon={faXmark} color='grey' size={'2x'} />
                        </div>
                    </div>
                    <div id="map" className={styles.mapContain}></div>
                    <div className='d-flex gap-4 align-items-center mt-2'>
                        <i>Chú thích</i>
                        <div className={styles.iconExplain}>
                            <img src={startMarker}></img>
                            <span><i>Điểm khởi hành</i></span>
                        </div>
                        <div className={styles.iconExplain}>
                            <img src={endMarker}></img>
                            <span><i>Điểm kết thúc</i></span>
                        </div>
                        <div className={styles.iconExplain}>
                            <img src={dropMarker}></img>
                            <span><i>Trạm đón - trả</i></span>
                        </div>
                        <div className={styles.iconExplain}>
                            <img src={iconURL}></img>
                            <span><i>Vị trí hiện tại</i></span>
                        </div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <OptionButton text='Về vị trí của tôi' onClick={showMyPosition}></OptionButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TripInfor = () => {

    const dispatch = useDispatch()
    const userHistory = useSelector(selectUserBookingHistory)
    const userTickets = useRef([])
    const [currentTicket, setCurrentTicket] = useState([])
    const [onGoingTrip, setOnGoingTrip] = useState([])
    const [openMap, setOpenMap] = useState(false)
    useEffect(() => {
        dispatch(bookingThunk.getUserHistory())
    }, [])

    useEffect(() => {
        const convertToListTicket = () => {
            const listTicket = []
            if (userHistory.length !== 0) {
                userHistory.forEach((booking) => {
                    const { tickets, ...bookingInfor } = booking
                    tickets.forEach((ticket) => {
                        listTicket.push({
                            ...ticket,
                            bookingInfor: bookingInfor
                        })
                    })
                })
            }
            return listTicket
        }
        userTickets.current = convertToListTicket()
        setCurrentTicket(getRecentTrip())
        setOnGoingTrip(getCurrentTrip())
    }, [userHistory])

    const getDate = (date, time) => {
        const dateTimeString = date + 'T' + time;
        return new Date(Date.parse(dateTimeString));
    }

    const compareByTime = (a, b) => {
        const currentTime = new Date()
        const timeDifferenceA = Math.abs(getDate(a.schedule.departDate, a.schedule.departTime) - currentTime);
        const timeDifferenceB = Math.abs(getDate(b.schedule.departDate, b.schedule.departTime) - currentTime);
        return timeDifferenceA - timeDifferenceB;
    };

    const getStatus = (status) => {
        return TICKET_STATE_DICTIONARY.filter((state) => state.value === status)[0].key
    }

    const getRecentTrip = () => {
        if (userTickets.current.length !== 0) {
            const notDepartList = userTickets.current.filter((ticket) =>
                getDate(ticket.schedule.departDate, ticket.schedule.departTime) > new Date()
                && getStatus(ticket.state) === 'success')
            if (notDepartList.length !== 0) {
                const soon = notDepartList.sort(compareByTime)
                const firstList = [soon[0]]
                soon.slice(1).forEach((ticket) => {
                    if (ticket.bookingInfor.code === soon[0].bookingInfor.code
                        && ticket.schedule.departDate === soon[0].schedule.departDate
                        && ticket.schedule.departTime === soon[0].schedule.departTime)
                        firstList.push(ticket)
                    else {
                        return firstList
                    }
                })
                return firstList
            }
            else
                return []
        }
        else
            return []
    }

    const getCurrentTrip = () => {
        if (userTickets.current.length !== 0) {
            const currentTrips = userTickets.current.filter((ticket) => {
                var departTime = getDate(ticket.schedule.departDate, ticket.schedule.departTime)
                var arriveTime = addHourToDate(departTime, ticket.bookingInfor?.trip?.route?.hours)
                var currentTime = new Date()
                return (departTime <= currentTime && currentTime <= arriveTime && getStatus(ticket.state) === 'success')
            })
            if (currentTrips.length !== 0) {
                const soon = currentTrips.sort(compareByTime)
                const firstList = [soon[0]]
                soon.slice(1).forEach((ticket) => {
                    if (ticket.bookingInfor.code === soon[0].bookingInfor.code
                        && ticket.schedule.departDate === soon[0].schedule.departDate
                        && ticket.schedule.departTime === soon[0].schedule.departTime)
                        firstList.push(ticket)
                    else {
                        return firstList
                    }
                })
                return firstList
            }
            else
                return []
        }
        else
            return []
    }
    return (
        <div>
            {currentTicket.length !== 0 ?
                (
                    <div className={styles.container}>
                        <div className={styles.title}>
                            <FontAwesomeIcon icon={faBell} />
                            Bạn có chuyến xe sắp khởi hành
                        </div>
                        <p className={styles.infor}>
                            <i>Chuyến xe: </i>
                            {
                                currentTicket[0].bookingInfor.trip.turn === true ? (
                                    <b>{currentTicket[0].bookingInfor.trip.startStation.name} -
                                        {currentTicket[0].bookingInfor.trip.endStation.name}
                                    </b>
                                ) : (
                                    <b>{currentTicket[0].bookingInfor.trip.endStation.name} -
                                        {currentTicket[0].bookingInfor.trip.startStation.name}
                                    </b>
                                )
                            }
                            <b></b>
                        </p>
                        <p className={styles.infor}>
                            <i>Thời gian: </i>
                            <b>{`${currentTicket[0].schedule.departTime.slice(0, -3)} - Ngày ${convertToDisplayDate(currentTicket[0].schedule.departDate)}`}</b>
                        </p>
                        <p className={styles.infor}>
                            <i>Điểm đón: </i>
                            <b>{currentTicket[0].bookingInfor.pickStation.station.name}</b>
                        </p>

                        <p className={styles.infor}>
                            <i>Ghế: </i>
                            <b>{currentTicket.map((ticket) => ticket.seat).join()}</b>
                        </p>
                        <i className={styles.infor}>
                            <i><FontAwesomeIcon icon={faMapLocationDot} /></i>
                            <a href="#" className={styles.showSchedule} onClick={() => setOpenMap(true)}>
                                Theo dõi hành trình
                            </a>
                        </i>
                    </div>
                )
                : (
                    null
                )
            }
            {onGoingTrip.length !== 0 && (
                <div className={styles.container}>
                    <div className={styles.title}>
                        <FontAwesomeIcon icon={faBell} />
                        Bạn có chuyến xe đang diễn ra
                    </div>
                    <p className={styles.infor}>
                        <i>Chuyến xe: </i>
                        {
                            onGoingTrip[0].bookingInfor.trip.turn === true ? (
                                <b>{onGoingTrip[0].bookingInfor.trip.startStation.name} -
                                    {onGoingTrip[0].bookingInfor.trip.endStation.name}
                                </b>
                            ) : (
                                <b>{onGoingTrip[0].bookingInfor.trip.endStation.name} -
                                    {onGoingTrip[0].bookingInfor.trip.startStation.name}
                                </b>
                            )
                        }
                        <b></b>
                    </p>
                    <p className={styles.infor}>
                        <i>Thời gian: </i>
                        <b>{`${onGoingTrip[0].schedule.departTime.slice(0, -3)} - Ngày ${convertToDisplayDate(onGoingTrip[0].schedule.departDate)}`}</b>
                    </p>
                    <p className={styles.infor}>
                        <i>Điểm đón: </i>
                        <b>{onGoingTrip[0].bookingInfor.pickStation.station.name}</b>
                    </p>

                    <p className={styles.infor}>
                        <i>Ghế: </i>
                        <b>{onGoingTrip.map((ticket) => ticket.seat).join()}</b>
                    </p>
                    <i className={styles.infor}>
                            <i><FontAwesomeIcon icon={faMapLocationDot} /></i>
                            <a href="#" className={styles.showSchedule} onClick={() => setOpenMap(true)}>
                                Theo dõi hành trình
                            </a>
                    </i>
                </div>
            )}
            {openMap && <MapBox closeForm={() => setOpenMap(false)} showState={openMap} tripData={onGoingTrip[0].bookingInfor} />}
        </div>
    )
}

export default TripInfor