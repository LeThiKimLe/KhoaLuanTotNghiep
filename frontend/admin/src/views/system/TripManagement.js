import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { companyActions, selectListAssign } from 'src/feature/bus-company/busCompany.slice'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import { selectListCompanyRoute, selectListRoute } from 'src/feature/route/route.slice'
import routeThunk from 'src/feature/route/route.service'
import { selectCompanyId } from 'src/feature/auth/auth.slice'
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs'
import { getRouteJourney, reverseString } from 'src/utils/tripUtils'
import { CCardBody, CFormSelect } from '@coreui/react'
import busThunk from 'src/feature/bus/bus.service'
import { selectListBusType } from 'src/feature/bus/bus.slice'
import {
    CCard,
    CCardHeader,
    CFormInput,
    CFormLabel,
    CInputGroup,
    CInputGroupText,
    CRow,
    CCol,
    CTableBody,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
    CAccordionHeader,
    CAccordionBody,
    CAccordionItem,
    CAccordion,
    CToaster,
    CButton,
    CCardFooter,
    CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTransfer, cilPlus, cilCircle, cilCheckCircle } from '@coreui/icons'
import { tripProcess } from 'src/utils/tripUtils'
import scheduleThunk from 'src/feature/schedule/schedule.service'
import { selectListFixSchedule } from 'src/feature/schedule/schedule.slice'
import { TIME_TABLE, dayInWeek } from 'src/utils/constants'
import { convertTimeToInt, convertToDisplayTimeStamp, convertToStamp } from 'src/utils/convertUtils'
import { selectListStation } from 'src/feature/station/station.slice'
import stationThunk from 'src/feature/station/station.service'
import locationThunk from 'src/feature/location/location.service'
import { selectListCompanyLocation, selectListLocation } from 'src/feature/location/location.slice'
import { Station } from './StationManagement'
import CustomButton from '../customButton/CustomButton'
import { StopStation } from './RouteManagement'
import { CustomToast } from '../customToast/CustomToast'
import tripThunk from 'src/feature/trip/trip.service'
import { TRIP_STATUS } from 'src/utils/constants'
const ScheduleWrap = ({ schedule, turn }) => {
    const getScheduleColor = () => {
        if (turn === true) return 'success'
        else return 'warning'
    }
    return (
        <CTable bordered className="mb-1">
            <CTableBody>
                <CTableRow>
                    <CTableDataCell className="text-center p-0">
                        <CCard color={getScheduleColor()} style={{ borderRadius: '0' }}>
                            <CCardBody className="p-1">
                                <b>{schedule.time.slice(0, -3)}</b>
                            </CCardBody>
                        </CCard>
                    </CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>
    )
}

const TableSchedule = ({ listFixSchedule, tripGoId }) => {
    const filterTime = (listSchd, time) => {
        //sort list based on time
        listSchd.sort((a, b) => {
            const timeA = convertTimeToInt(a.time.slice(0, -3))
            const timeB = convertTimeToInt(b.time.slice(0, -3))
            if (timeA > timeB) return 1
            if (timeA < timeB) return -1
            return 0
        })
        if (time === 'morning')
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.time.slice(0, -3)) >= 6 &&
                    convertTimeToInt(schd.time.slice(0, -3)) < 12,
            )
        else if (time === 'afternoon')
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.time.slice(0, -3)) >= 12 &&
                    convertTimeToInt(schd.time.slice(0, -3)) < 18,
            )
        else if (time === 'evening')
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.time.slice(0, -3)) >= 18 &&
                    convertTimeToInt(schd.time.slice(0, -3)) < 24,
            )
        else
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.time.slice(0, -3)) >= 0 &&
                    convertTimeToInt(schd.time.slice(0, -3)) < 6,
            )
    }
    return (
        <div>
            <CTable stripedColumns bordered>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Buổi</CTableHeaderCell>
                        {Array.from({ length: 7 }, (_, index) => index).map((dayIndex) => (
                            <CTableHeaderCell key={dayIndex} className="text-center" scope="col">
                                <b>
                                    <i>{dayInWeek[dayIndex]}</i>
                                </b>
                            </CTableHeaderCell>
                        ))}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {Object.keys(TIME_TABLE).map((key) => (
                        <CTableRow color={TIME_TABLE[key].color} key={key}>
                            <CTableHeaderCell scope="row">
                                <i>{TIME_TABLE[key].label}</i>
                                <div>{`(${TIME_TABLE[key].from}h - ${TIME_TABLE[key].to}h)`}</div>
                            </CTableHeaderCell>
                            {Array.from({ length: 7 }, (_, index) => index).map((dayIndex) => (
                                <CTableDataCell key={dayIndex}>
                                    {filterTime(
                                        listFixSchedule.filter(
                                            (schd) => schd.dayOfWeek === dayIndex + 2,
                                        ),
                                        key,
                                    ).map((schedule) => (
                                        <ScheduleWrap
                                            key={schedule.id}
                                            schedule={schedule}
                                            turn={schedule.trip.id === tripGoId}
                                        ></ScheduleWrap>
                                    ))}
                                </CTableDataCell>
                            ))}
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
            <div className="d-flex gap-2 align-items-center">
                <i>Ghi chú</i>
                <CCard color="success">
                    <CCardBody className="p-1">Chuyến đi</CCardBody>
                </CCard>
                <CCard color="warning">
                    <CCardBody className="p-1">Chuyến về</CCardBody>
                </CCard>
            </div>
        </div>
    )
}

const ListStopStation = ({ trip, turn }) => {
    const dispatch = useDispatch()
    const [isAddStop, setIsAddStop] = useState(false)
    const [newStation, setNewStation] = useState(0)
    const listLocation = useSelector(selectListCompanyLocation)
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [loading, setLoading] = useState(false)
    const listStation =
        turn === true
            ? trip?.turnGo.stopStations.filter((sta) => sta.stationType == 'pick')
            : trip?.turnGo.stopStations.filter((sta) => sta.stationType == 'drop')
    const getListAvaiStation = () => {
        const locationId = turn === true ? trip.route.departure.id : trip.route.destination.id
        const location = listLocation.find((loc) => loc.id === locationId)
        return location.stations.filter(
            (sta) => listStation.findIndex((item) => item.id === sta.id) === -1,
        )
    }
    const handleAddStopStation = () => {
        if (newStation !== 0) {
            setLoading(true)
            dispatch(
                stationThunk.addStopStation({
                    tripId: turn === true ? trip.turnGo.id : trip.turnBack.id,
                    stationId: newStation,
                    stationType: 'pick',
                }),
            )
                .unwrap()
                .then(async () => {
                    await dispatch(
                        stationThunk.addStopStation({
                            tripId: turn === true ? trip.turnBack.id : trip.turnGo.id,
                            stationId: newStation,
                            stationType: 'drop',
                        }),
                    )
                        .unwrap()
                        .then(() => {
                            setLoading(false)
                            addToast(() =>
                                CustomToast({
                                    message: 'Đã thêm trạm thành công',
                                    type: 'success',
                                }),
                            )
                            setIsAddStop(false)
                            setTimeout(() => window.location.reload(), 1000)
                        })
                        .catch((error) => {
                            setLoading(false)
                            addToast(() => CustomToast({ message: error, type: 'error' }))
                        })
                })
                .catch((error) => {
                    setLoading(false)
                    addToast(() => CustomToast({ message: error, type: 'error' }))
                })
        }
    }
    return (
        <div>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            {listStation.map((station, index) => (
                <StopStation trip={trip} station={station} key={index}></StopStation>
            ))}
            {!isAddStop && trip.active === true && (
                <CButton
                    id="pick-add"
                    variant="outline"
                    color="dark"
                    onClick={() => setIsAddStop(true)}
                >
                    <CIcon icon={cilPlus}></CIcon>
                    Thêm
                </CButton>
            )}
            {isAddStop && (
                <CCard>
                    <CCardHeader>
                        <b>
                            <i>Chọn trạm</i>
                        </b>
                    </CCardHeader>
                    <CCardBody>
                        <CFormSelect
                            id="pick-select"
                            value={newStation}
                            onChange={(e) => setNewStation(parseInt(e.target.value))}
                        >
                            <option disabled value={0}>
                                Chọn trạm
                            </option>
                            {getListAvaiStation().map((sta) => (
                                <option
                                    key={sta.id}
                                    value={sta.id}
                                >{`${sta.name} - ${sta.address}`}</option>
                            ))}
                        </CFormSelect>
                    </CCardBody>
                    <CCardFooter>
                        <CRow>
                            <CustomButton
                                text="Thêm"
                                loading={loading}
                                onClick={handleAddStopStation}
                                style={{
                                    width: 'fit-content',
                                    marginRight: '10px',
                                }}
                                color="success"
                            ></CustomButton>
                            <CButton
                                variant="outline"
                                color="danger"
                                onClick={() => setIsAddStop(false)}
                                style={{ width: 'fit-content' }}
                            >
                                Hủy
                            </CButton>
                        </CRow>
                    </CCardFooter>
                </CCard>
            )}
        </div>
    )
}

const ListParkStation = ({ trip, turn }) => {
    const dispatch = useDispatch()
    const [isAddStop, setIsAddStop] = useState(false)
    const [newStation, setNewStation] = useState(0)
    const listLocation = useSelector(selectListCompanyLocation)
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [loading, setLoading] = useState(false)
    const listStation =
        turn === true
            ? trip?.turnGo.stopStations.filter((sta) => sta.stationType == 'park-start')
            : trip?.turnGo.stopStations.filter((sta) => sta.stationType == 'park-end')
    const getListAvaiStation = () => {
        const locationId = turn === true ? trip.route.departure.id : trip.route.destination.id
        const location = listLocation.find((loc) => loc.id === locationId)
        return location.stations.filter(
            (sta) => listStation.findIndex((item) => item.id === sta.id) === -1,
        )
    }
    const handleAddStopStation = () => {
        if (newStation !== 0) {
            setLoading(true)
            dispatch(
                stationThunk.addStopStation({
                    tripId: turn === true ? trip.turnGo.id : trip.turnBack.id,
                    stationId: newStation,
                    stationType: 'park-start',
                }),
            )
                .unwrap()
                .then(async () => {
                    await dispatch(
                        stationThunk.addStopStation({
                            tripId: turn === true ? trip.turnBack.id : trip.turnGo.id,
                            stationId: newStation,
                            stationType: 'park-end',
                        }),
                    )
                        .unwrap()
                        .then(() => {
                            setLoading(false)
                            addToast(() =>
                                CustomToast({
                                    message: 'Đã thêm trạm thành công',
                                    type: 'success',
                                }),
                            )
                            setIsAddStop(false)
                            setTimeout(() => window.location.reload(), 1000)
                        })
                        .catch((error) => {
                            setLoading(false)
                            addToast(() => CustomToast({ message: error, type: 'error' }))
                        })
                })
                .catch((error) => {
                    setLoading(false)
                    addToast(() => CustomToast({ message: error, type: 'error' }))
                })
        }
    }
    return (
        <div>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            {listStation.map((station, index) => (
                <StopStation trip={trip} station={station} key={index}></StopStation>
            ))}
            {!isAddStop && trip.active === true && (
                <CButton
                    id="pick-add"
                    variant="outline"
                    color="dark"
                    onClick={() => setIsAddStop(true)}
                >
                    <CIcon icon={cilPlus}></CIcon>
                    Thêm
                </CButton>
            )}
            {isAddStop && (
                <CCard>
                    <CCardHeader>
                        <b>
                            <i>Chọn trạm</i>
                        </b>
                    </CCardHeader>
                    <CCardBody>
                        <CFormSelect
                            id="pick-select"
                            value={newStation}
                            onChange={(e) => setNewStation(parseInt(e.target.value))}
                        >
                            <option disabled value={0}>
                                Chọn trạm
                            </option>
                            {getListAvaiStation().map((sta) => (
                                <option
                                    key={sta.id}
                                    value={sta.id}
                                >{`${sta.name} - ${sta.address}`}</option>
                            ))}
                        </CFormSelect>
                    </CCardBody>
                    <CCardFooter>
                        <CRow>
                            <CustomButton
                                text="Thêm"
                                loading={loading}
                                onClick={handleAddStopStation}
                                style={{
                                    width: 'fit-content',
                                    marginRight: '10px',
                                }}
                                color="success"
                            ></CustomButton>
                            <CButton
                                variant="outline"
                                color="danger"
                                onClick={() => setIsAddStop(false)}
                                style={{ width: 'fit-content' }}
                            >
                                Hủy
                            </CButton>
                        </CRow>
                    </CCardFooter>
                </CCard>
            )}
        </div>
    )
}

const AddRestStation = ({ trip, turn }) => {
    const dispatch = useDispatch()
    const [isAddStop, setIsAddStop] = useState(false)
    const [newStation, setNewStation] = useState(0)
    const listLocation = useSelector(selectListCompanyLocation)
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [loading, setLoading] = useState(false)
    const listStation =
        turn === true
            ? trip?.turnGo.stopStations.filter((sta) => sta.stationType == 'stop')
            : trip?.turnGo.stopStations.filter((sta) => sta.stationType == 'stop')
    const getListAvaiStation = () => {
        const location1 = listLocation.find((loc) => loc.id === trip.route.departure.id)
        const location2 = listLocation.find((loc) => loc.id === trip.route.destination.id)
        const list1 = location1.stations.filter(
            (sta) => listStation.findIndex((item) => item.id === sta.id) === -1,
        )
        const list2 = location2.stations.filter(
            (sta) => listStation.findIndex((item) => item.id === sta.id) === -1,
        )
        return list1.concat(list2)
    }
    const handleAddStopStation = () => {
        if (newStation !== 0) {
            setLoading(true)
            dispatch(
                stationThunk.addStopStation({
                    tripId: turn === true ? trip.turnGo.id : trip.turnBack.id,
                    stationId: newStation,
                    stationType: 'stop',
                }),
            )
                .unwrap()
                .then(async () => {
                    await dispatch(
                        stationThunk.addStopStation({
                            tripId: turn === true ? trip.turnBack.id : trip.turnGo.id,
                            stationId: newStation,
                            stationType: 'stop',
                        }),
                    )
                        .unwrap()
                        .then(() => {
                            setLoading(false)
                            addToast(() =>
                                CustomToast({
                                    message: 'Đã thêm trạm thành công',
                                    type: 'success',
                                }),
                            )
                            setIsAddStop(false)
                            setTimeout(() => window.location.reload(), 1000)
                        })
                        .catch((error) => {
                            setLoading(false)
                            addToast(() => CustomToast({ message: error, type: 'error' }))
                        })
                })
                .catch((error) => {
                    setLoading(false)
                    addToast(() => CustomToast({ message: error, type: 'error' }))
                })
        }
    }
    return (
        <div>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            {listStation.map((station, index) => (
                <StopStation trip={trip} station={station} key={index}></StopStation>
            ))}
            {!isAddStop && trip.active === true && (
                <CButton
                    id="pick-add"
                    variant="outline"
                    color="dark"
                    onClick={() => setIsAddStop(true)}
                >
                    <CIcon icon={cilPlus}></CIcon>
                    Thêm trạm dừng nghỉ
                </CButton>
            )}
            {isAddStop && (
                <CCard>
                    <CCardHeader>
                        <b>
                            <i>Chọn trạm</i>
                        </b>
                    </CCardHeader>
                    <CCardBody>
                        <CFormSelect
                            id="pick-select"
                            value={newStation}
                            onChange={(e) => setNewStation(parseInt(e.target.value))}
                        >
                            <option disabled value={0}>
                                Chọn trạm
                            </option>
                            {getListAvaiStation().map((sta) => (
                                <option
                                    key={sta.id}
                                    value={sta.id}
                                >{`${sta.name} - ${sta.address}`}</option>
                            ))}
                        </CFormSelect>
                    </CCardBody>
                    <CCardFooter>
                        <CRow>
                            <CustomButton
                                text="Thêm"
                                loading={loading}
                                onClick={handleAddStopStation}
                                style={{
                                    width: 'fit-content',
                                    marginRight: '10px',
                                }}
                                color="success"
                            ></CustomButton>
                            <CButton
                                variant="outline"
                                color="danger"
                                onClick={() => setIsAddStop(false)}
                                style={{ width: 'fit-content' }}
                            >
                                Hủy
                            </CButton>
                        </CRow>
                    </CCardFooter>
                </CCard>
            )}
        </div>
    )
}

const Status = ({ data }) => {
    return (
        <CTooltip content={data.description}>
            <div className="d-flex flex-column align-items-center" role="button">
                <CIcon
                    icon={data.achived ? cilCheckCircle : cilCircle}
                    size="xl"
                    style={data.achived ? { color: 'green' } : { color: '#ccc' }}
                ></CIcon>
                <b
                    style={data.achived ? { color: '#000' } : { color: '#8f938f' }}
                >{`${data.label}`}</b>
            </div>
        </CTooltip>
    )
}

const StatusTracker = ({ trip }) => {
    const dispatch = useDispatch()
    const companyId = useSelector(selectCompanyId)
    const [listSchedule, setListSchedule] = useState([])
    const [status, setStatus] = useState(
        TRIP_STATUS.map((status) => {
            return {
                ...status,
                achived: false,
            }
        }),
    )
    useEffect(() => {
        const newStatus = [...status]
        if (trip.active === true) {
            newStatus[0].achived = true
        }
        if (trip.busType) {
            newStatus[1].achived = true
        }
        if (trip.price !== 0) {
            newStatus[2].achived = true
            newStatus[3].achived = true
        }
        if (newStatus.slice(0, newStatus.length - 1).every((status) => status.achived === true))
            newStatus[4].achived = true
        setStatus(newStatus)
    }, [trip])
    useEffect(() => {
        dispatch(scheduleThunk.getSchedules())
    }, [])
    return (
        <div className="d-flex gap-5 align-items-center justify-content-center">
            {status.map((status, index) => (
                <Status data={status} key={index}></Status>
            ))}
        </div>
    )
}

const TripInfo = ({ trip }) => {
    return (
        <div>
            <CRow className="mb-3 justify-content-center align-items-center">
                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                    <b>Tỉnh đi - đến</b>
                </CFormLabel>
                <CCol sm="3">
                    <CFormInput readOnly value={trip.route.departure.name}></CFormInput>
                </CCol>
                <CCol sm="2" className="d-flex justify-content-center align-items-center">
                    <CIcon icon={cilTransfer}></CIcon>
                </CCol>
                <CCol sm="3">
                    <CFormInput readOnly value={trip.route.destination.name}></CFormInput>
                </CCol>
            </CRow>

            <CRow className="mb-3 justify-content-center align-items-center">
                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                    <b>Bến đi - đến</b>
                </CFormLabel>
                <CCol sm="3">
                    <CFormInput readOnly value={trip.startStation.name}></CFormInput>
                </CCol>
                <CCol sm="2" className="d-flex justify-content-center align-items-center">
                    <CIcon icon={cilTransfer}></CIcon>
                </CCol>
                <CCol sm="3">
                    <CFormInput readOnly value={trip.endStation.name}></CFormInput>
                </CCol>
            </CRow>
            <CRow className="mb-3 justify-content-center align-items-center">
                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                    <b>Lộ trình</b>
                </CFormLabel>
                <CCol sm={8}>
                    <CFormInput readOnly value={trip.schedule}></CFormInput>
                </CCol>
            </CRow>
            <CRow className="mb-3 justify-content-center align-items-center">
                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                    <b>Khoảng cách</b>
                </CFormLabel>
                <CCol sm={3}>
                    <CInputGroup>
                        <CFormInput readOnly value={trip?.distance}></CFormInput>
                        <CInputGroupText>km</CInputGroupText>
                    </CInputGroup>
                </CCol>
                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label text-center">
                    <b>Thời gian</b>
                </CFormLabel>
                <CCol sm={3}>
                    <CFormInput readOnly value={convertToStamp(trip?.hours)}></CFormInput>
                </CCol>
            </CRow>
        </div>
    )
}

const TripDetail = ({ trip, finishAdd }) => {
    const listBusType = useSelector(selectListBusType)
    const listCompanyLocation = useSelector(selectListCompanyLocation)
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [busType, setBusType] = useState(trip.busType ? trip.busType.id : 0)
    const [price, setPrice] = useState(trip.price ? trip.price : 0)
    const dispatch = useDispatch()
    const updateTripData = () => {
        if (price != 0 && busType != 0) {
            const tripGoInfor = {
                tripId: trip.turnGo.id,
                price: price,
                schedule: trip.schedule,
                busTypeId: busType,
            }
            const tripBackInfor = {
                tripId: trip.turnBack.id,
                price: price,
                schedule: reverseString(trip.schedule),
                busTypeId: busType,
            }
            dispatch(tripThunk.editTrip(tripGoInfor))
                .unwrap()
                .then(() => {
                    dispatch(tripThunk.editTrip(tripBackInfor))
                        .unwrap()
                        .then(() => {
                            addToast(() =>
                                CustomToast({
                                    message: 'Cập nhật thông tin thành công',
                                    type: 'success',
                                }),
                            )
                            finishAdd()
                        })
                        .catch((error) => {
                            addToast(() => CustomToast({ message: error, type: 'error' }))
                        })
                })
                .catch((error) => {
                    addToast(() => CustomToast({ message: error, type: 'error' }))
                })
        } else {
            addToast(() =>
                CustomToast({ message: 'Hãy chọn loại xe và cập nhật giá vé', type: 'error' }),
            )
        }
    }
    useEffect(() => {
        if (trip) {
            setBusType(trip.busType?.id)
            setPrice(trip.price)
        }
    }, [trip])
    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <CRow>
                <CCol md="5">
                    <CInputGroup className="mb-3 col-6">
                        <CInputGroupText id="bus-type-num" style={{ width: '115px' }}>
                            Loại xe
                        </CInputGroupText>
                        <CFormSelect
                            value={busType}
                            onChange={(e) => setBusType(parseInt(e.target.value))}
                        >
                            <option value="0">
                                {listBusType.length > 0 ? 'Chọn loại xe' : 'Chưa có loại xe'}
                            </option>
                            {listBusType.map((busType) => (
                                <option key={busType.id} value={busType.id}>
                                    {busType.description}
                                </option>
                            ))}
                        </CFormSelect>
                    </CInputGroup>
                </CCol>
                <CCol md="5">
                    <CInputGroup className="mb-3 col-6">
                        <CInputGroupText id="bus-type-num" style={{ width: '115px' }}>
                            Giá vé
                        </CInputGroupText>
                        <CFormInput
                            type="text"
                            id="price"
                            value={price.toLocaleString()}
                            onChange={(e) =>
                                setPrice(
                                    e.target.value !== ''
                                        ? parseFloat(e.target.value.replace(/,/g, ''))
                                        : 0,
                                )
                            }
                            aria-describedby="price"
                        />
                        <CInputGroupText id="money">VND</CInputGroupText>
                    </CInputGroup>
                </CCol>
                <CCol md="2">
                    <CustomButton
                        color="success"
                        variant="outline"
                        text="Cập nhật"
                        style={{ width: '100%' }}
                        onClick={updateTripData}
                    ></CustomButton>
                </CCol>
                <CCol md="12">
                    <b>
                        <i>Thông tin các trạm</i>
                    </b>
                    <CAccordion className="my-2">
                        <CAccordionItem itemKey={1}>
                            <CAccordionHeader>
                                <i>Trạm đón - trả</i>
                            </CAccordionHeader>
                            <CAccordionBody>
                                <CRow className="justify-content-center gap-2">
                                    <CCol md="5" className="border-end border-2">
                                        <b>{trip.route.departure.name}</b>
                                        <div className="mt-3">
                                            <ListStopStation
                                                trip={trip}
                                                turn={true}
                                            ></ListStopStation>
                                        </div>
                                    </CCol>
                                    <CCol md="5">
                                        <b>{trip.route.destination.name}</b>
                                        <div className="mt-3">
                                            <ListStopStation
                                                trip={trip}
                                                turn={false}
                                            ></ListStopStation>
                                        </div>
                                    </CCol>
                                </CRow>
                            </CAccordionBody>
                        </CAccordionItem>
                        <CAccordionItem itemKey={2}>
                            <CAccordionHeader>
                                <i>Trạm dừng nghỉ</i>
                            </CAccordionHeader>
                            <CAccordionBody>
                                <AddRestStation trip={trip} turn={true}></AddRestStation>
                            </CAccordionBody>
                        </CAccordionItem>
                        <CAccordionItem itemKey={2}>
                            <CAccordionHeader>
                                <i>Bãi đỗ</i>
                            </CAccordionHeader>
                            <CAccordionBody>
                                <CRow className="justify-content-center gap-2">
                                    <CCol md="5" className="border-end border-2">
                                        <b>{trip.route.departure.name}</b>
                                        <div className="mt-3">
                                            <ListParkStation
                                                trip={trip}
                                                turn={true}
                                            ></ListParkStation>
                                        </div>
                                    </CCol>
                                    <CCol md="5">
                                        <b>{trip.route.destination.name}</b>
                                        <div className="mt-3">
                                            <ListParkStation
                                                trip={trip}
                                                turn={false}
                                            ></ListParkStation>
                                        </div>
                                    </CCol>
                                </CRow>
                            </CAccordionBody>
                        </CAccordionItem>
                    </CAccordion>
                </CCol>
            </CRow>
        </>
    )
}

const TripManagement = () => {
    const dispatch = useDispatch()
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const companyId = useSelector(selectCompanyId)
    const listFixSchedule = useSelector(selectListFixSchedule)
    const listRouteAssign = useSelector(selectListCompanyRoute)
    const [listTrip, setListTrip] = useState(tripProcess(listRouteAssign, companyId))
    const [activeTab, setActiveTab] = useState(0)
    const getFixSchedule = (trip) => {
        return listFixSchedule.filter(
            (schd) => schd.trip.id === trip.turnGo.id || schd.trip.id === trip.turnBack.id,
        )
    }
    const finishAdd = () => {
        dispatch(companyActions.setUpdate(true))
    }
    useEffect(() => {
        dispatch(busThunk.getBusType())
        dispatch(scheduleThunk.getFixSchedule())
    }, [])
    useEffect(() => {
        setListTrip(tripProcess(listRouteAssign, companyId))
    }, [listRouteAssign])
    return (
        <div>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            {listTrip.length > 0 ? (
                <Tabs
                    className="tabStyle"
                    selectedIndex={activeTab}
                    onSelect={(index) => setActiveTab(index)}
                >
                    <TabList>
                        {listTrip.map((trip, index) => (
                            <Tab key={index}>{getRouteJourney(trip.route)}</Tab>
                        ))}
                    </TabList>
                    {listTrip.map((trip, index) => (
                        <TabPanel key={index}>
                            <CCard className={`mb-3 border-top-success border-top-3`}>
                                <CCardHeader>
                                    <b>Trạng thái tuyến xe</b>
                                </CCardHeader>
                                <CCardBody>
                                    <StatusTracker trip={trip}></StatusTracker>
                                </CCardBody>
                            </CCard>
                            <CCard className={`mb-3 border-top-primary border-top-3`}>
                                <CCardHeader>
                                    <b>Thông tin tuyến xe</b>
                                </CCardHeader>
                                <CCardBody>
                                    <TripInfo trip={trip}></TripInfo>
                                </CCardBody>
                            </CCard>
                            <CCard className="mt-2 mb-3 border-top-warning border-top-3">
                                <CCardHeader>
                                    <b>Thông tin chi tiết</b>
                                </CCardHeader>
                                <CCardBody>
                                    <TripDetail trip={trip} finishAdd={finishAdd}></TripDetail>
                                </CCardBody>
                            </CCard>
                            <CCard className="mt-2 mb-3 border-top-info border-top-3">
                                <CCardHeader>
                                    <b>Lịch trình cố định</b>
                                </CCardHeader>
                                <CCardBody>
                                    <TableSchedule
                                        listFixSchedule={getFixSchedule(trip)}
                                        tripGoId={trip.turnGo.id}
                                    ></TableSchedule>
                                </CCardBody>
                            </CCard>
                        </TabPanel>
                    ))}
                </Tabs>
            ) : (
                <b>Chưa có tuyến xe</b>
            )}
        </div>
    )
}

export default TripManagement
