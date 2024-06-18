import React, { useEffect } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { selectListCompanyRoute } from 'src/feature/route/route.slice'
import { getTripJourney, tripProcess } from 'src/utils/tripUtils'
import { addDays, convertToDataDate, convertToDisplayDate } from 'src/utils/convertUtils'
import format from 'date-fns/format'
import scheduleThunk from 'src/feature/schedule/schedule.service'
import { COLOR } from 'src/utils/constants'
import parse from 'date-fns/parse'
import { addHours } from 'src/utils/convertUtils'
import { searchAction, selectSearchInfor } from 'src/feature/search/search.slice'
import searchThunk from 'src/feature/search/search.service'
import { bookingActions, selectCurrentTrip } from 'src/feature/booking/booking.slice'
import bookingThunk from 'src/feature/booking/booking.service'
import { getDesandDep } from 'src/utils/routeUtils'
import { de } from 'date-fns/locale'
const ScheduleContainer = ({ schedule }) => {
    const dispatch = useDispatch()
    const listRoutes = useSelector(selectListCompanyRoute)
    const curTrip = useSelector(selectCurrentTrip)
    const [selected, setSelected] = useState(false)
    const randomColor = () => {
        return `${COLOR[Math.floor(Math.random() * 134) % (COLOR.length - 1)]}`
    }
    const handleSetPosition = () => {
        const { departure, destination } = getDesandDep(
            listRoutes,
            schedule.tripInfor.route.departure.name,
            schedule.tripInfor.route.destination.name,
        )
        const currentInfor = {
            arrivalDate: format(new Date(), 'dd/MM/yyyy'),
            departDate: format(new Date(schedule.departDate), 'dd/MM/yyyy'),
            departLocation: departure,
            desLocation: destination,
            numberTicket: 0,
            searchRoute: schedule.tripInfor.route,
            oneway: true,
            turn: schedule.tripInfor.turn,
        }
        dispatch(searchAction.setSearch(currentInfor))
        dispatch(searchThunk.getTrips(currentInfor))
            .unwrap()
            .then((res) => {
                const listSchedule = []
                res.forEach((trip) => {
                    const { schedules, ...tripInfor } = trip
                    schedules.forEach((schedule) => {
                        listSchedule.push({
                            ...schedule,
                            tripInfor: tripInfor,
                        })
                    })
                })
                const curTrip = listSchedule.filter((trip) => trip.id === schedule.id)[0]
                dispatch(bookingActions.setCurrentTrip(curTrip))
                dispatch(bookingThunk.getScheduleInfor(curTrip.id))
                    .unwrap()
                    .then(() => {})
                    .catch((error) => {})
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        if (curTrip && curTrip.id === schedule.id) {
            setSelected(true)
        } else {
            setSelected(false)
        }
    }, [curTrip])
    return (
        <CCard
            className={`mb-3 border-top-${randomColor()} border-top-3`}
            role="button"
            onClick={handleSetPosition}
        >
            <CCardHeader className={`${selected ? 'bg-secondary' : ''}`}>
                <small style={{ fontWeight: '500' }}>{getTripJourney(schedule.tripInfor)}</small>
            </CCardHeader>
            <CCardBody className="p-2 text-center">
                <small>{`${schedule.departTime.slice(0, -3)} - ${convertToDisplayDate(
                    schedule.departDate,
                )}`}</small>
                <br></br>
                <small>
                    <i>{schedule.state}</i>
                </small>
            </CCardBody>
        </CCard>
    )
}
const IncomingSchedule = () => {
    const current = new Date()
    const tomorrow = addDays(current, 1)
    const listCompanyRoute = useSelector(selectListCompanyRoute)
    const listTrip = tripProcess(listCompanyRoute)
    const [listIncoming, setListIncoming] = useState([])
    const dispatch = useDispatch()
    //Lấy các chuyến sắp khởi hành trước 4h
    const getIncomingTrip = async () => {
        const listSchedule = []
        let curTrip = null
        for (let k = 0; k < listTrip.length; k++) {
            curTrip = listTrip[k]
            for (let j = 0; j < 2; j++) {
                for (let i = 0; i < 2; i++) {
                    await dispatch(
                        scheduleThunk.getSchedules({
                            routeId: curTrip.route.id,
                            departDate: i === 0 ? current : tomorrow,
                            turn: j === 0 ? true : false,
                        }),
                    )
                        .unwrap()
                        .then((res) => {
                            const filterSchedule = res.filter((schedule) => {
                                const departTime = parse(
                                    schedule.departDate + 'T' + schedule.departTime,
                                    "yyyy-MM-dd'T'HH:mm:ss",
                                    new Date(),
                                )
                                const currentTime = new Date()
                                const arriveTime = addHours(departTime, schedule.tripInfor.hours)
                                return (
                                    (currentTime.getTime() < departTime.getTime() &&
                                        currentTime.getTime() + 24 * 60 * 60 * 1000 >
                                            departTime.getTime()) ||
                                    (departTime.getTime() - currentTime.getTime() <= 0 &&
                                        currentTime.getTime() - arriveTime.getTime() <= 0)
                                )
                            })
                            if (filterSchedule.length > 0) {
                                listSchedule.push(...filterSchedule)
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            }
        }
        //sort schedule base on departDate and departTime nearest to current time
        listSchedule.sort((a, b) => {
            const departTimeA = parse(
                a.departDate + 'T' + a.departTime,
                "yyyy-MM-dd'T'HH:mm:ss",
                new Date(),
            )
            const departTimeB = parse(
                b.departDate + 'T' + b.departTime,
                "yyyy-MM-dd'T'HH:mm:ss",
                new Date(),
            )
            return departTimeA.getTime() - departTimeB.getTime()
        })
        setListIncoming(listSchedule)
    }
    useEffect(() => {
        getIncomingTrip()
    }, [])
    return (
        <CCard>
            <CCardHeader>
                <b>{`Chuyến sắp diễn ra`}</b>
            </CCardHeader>
            <CCardBody style={{ height: '490px', overflow: 'auto' }}>
                {listIncoming.length > 0 ? (
                    listIncoming.map((schedule) => (
                        <ScheduleContainer
                            key={schedule.id}
                            schedule={schedule}
                        ></ScheduleContainer>
                    ))
                ) : (
                    <i>Chưa có chuyến nào</i>
                )}
            </CCardBody>
        </CCard>
    )
}

export default IncomingSchedule
