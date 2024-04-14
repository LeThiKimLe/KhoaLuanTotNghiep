import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectListAssign } from 'src/feature/bus-company/busCompany.slice'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import { selectListRoute } from 'src/feature/route/route.slice'
import routeThunk from 'src/feature/route/route.service'
import { selectCompanyId } from 'src/feature/auth/auth.slice'
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs'
import { getRouteJourney } from 'src/utils/tripUtils'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTransfer } from '@coreui/icons'
import { tripProcess } from 'src/utils/tripUtils'
import scheduleThunk from 'src/feature/schedule/schedule.service'
import { selectListFixSchedule } from 'src/feature/schedule/schedule.slice'
import { TIME_TABLE, dayInWeek } from 'src/utils/constants'
import { convertTimeToInt } from 'src/utils/convertUtils'
import { selectListStation } from 'src/feature/station/station.slice'
import stationThunk from 'src/feature/station/station.service'
import locationThunk from 'src/feature/location/location.service'
import { selectListLocation } from 'src/feature/location/location.slice'
import { Station } from './StationManagement'
import CustomButton from '../customButton/CustomButton'
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

const TripManagement = () => {
    const dispatch = useDispatch()
    const listRoute = useSelector(selectListRoute)
    const listAllAssign = useSelector(selectListAssign)
    const companyId = useSelector(selectCompanyId)
    const listBusType = useSelector(selectListBusType)
    const listFixSchedule = useSelector(selectListFixSchedule)
    const listLocations = useSelector(selectListLocation)
    const listRouteAssign = listRoute
        .filter((route) => listAllAssign.find((assign) => assign.routeId === route.id))
        .map((route) => {
            return {
                ...route,
                trips: route.trips.filter((trip) => trip.busCompanyId === companyId),
            }
        })
    const listTrip = tripProcess(listRouteAssign)
    const getFixSchedule = (trip) => {
        return listFixSchedule.filter(
            (schd) => schd.tripDd === trip.turnGo || schd.trip.id === trip.turnBack,
        )
    }
    const getStation = (routeId) => {
        return listLocations.find((location) => location.id === routeId)?.stations
    }
    useEffect(() => {
        dispatch(routeThunk.getRoute())
        dispatch(companyThunk.getAssignedRouteForCompany())
        dispatch(busThunk.getBusType())
        dispatch(scheduleThunk.getFixSchedule())
        dispatch(locationThunk.getLocations())
    }, [])
    return (
        <div>
            {listTrip.length > 0 ? (
                <Tabs className="tabStyle">
                    <TabList>
                        {listTrip.map((trip, index) => (
                            <Tab key={index}>{getRouteJourney(trip.route)}</Tab>
                        ))}
                    </TabList>
                    {listTrip.map((trip, index) => (
                        <TabPanel key={index}>
                            <CCard>
                                <CCardHeader>
                                    <b>Thông tin tuyến xe</b>
                                </CCardHeader>
                                <CCardBody>
                                    <CRow className="mb-3 justify-content-center align-items-center">
                                        <CFormLabel
                                            htmlFor="color"
                                            className="col-sm-2 col-form-label"
                                        >
                                            <b>Tỉnh đi - đến</b>
                                        </CFormLabel>
                                        <CCol sm="3">
                                            <CFormInput
                                                readOnly
                                                value={trip.route.departure.name}
                                            ></CFormInput>
                                        </CCol>
                                        <CCol
                                            sm="2"
                                            className="d-flex justify-content-center align-items-center"
                                        >
                                            <CIcon icon={cilTransfer}></CIcon>
                                        </CCol>
                                        <CCol sm="3">
                                            <CFormInput
                                                readOnly
                                                value={trip.route.destination.name}
                                            ></CFormInput>
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3 justify-content-center align-items-center">
                                        <CFormLabel
                                            htmlFor="color"
                                            className="col-sm-2 col-form-label"
                                        >
                                            <b>Bến đi - đến</b>
                                        </CFormLabel>
                                        <CCol sm="3">
                                            <CFormInput
                                                readOnly
                                                value={trip.startStation.name}
                                            ></CFormInput>
                                        </CCol>
                                        <CCol
                                            sm="2"
                                            className="d-flex justify-content-center align-items-center"
                                        >
                                            <CIcon icon={cilTransfer}></CIcon>
                                        </CCol>
                                        <CCol sm="3">
                                            <CFormInput
                                                readOnly
                                                value={trip.endStation.name}
                                            ></CFormInput>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3 justify-content-center align-items-center">
                                        <CFormLabel
                                            htmlFor="color"
                                            className="col-sm-2 col-form-label"
                                        >
                                            <b>Lộ trình</b>
                                        </CFormLabel>
                                        <CCol sm={8}>
                                            <CFormInput
                                                readOnly
                                                value={trip.route.schedule}
                                            ></CFormInput>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                            <CCard className="mt-2">
                                <CCardHeader>
                                    <b>Thông tin chi tiết</b>
                                </CCardHeader>
                                <CCardBody>
                                    <CRow>
                                        <CCol md="6">
                                            <CInputGroup className="mb-3 col-6">
                                                <CInputGroupText
                                                    id="bus-type-num"
                                                    style={{ width: '115px' }}
                                                >
                                                    Loại xe
                                                </CInputGroupText>
                                                <CFormSelect>
                                                    {listBusType.map((busType) => (
                                                        <option key={busType.id} value={busType.id}>
                                                            {busType.description}
                                                        </option>
                                                    ))}
                                                </CFormSelect>
                                            </CInputGroup>
                                        </CCol>
                                        <CCol md="6">
                                            <CInputGroup className="mb-3 col-6">
                                                <CInputGroupText
                                                    id="bus-type-num"
                                                    style={{ width: '115px' }}
                                                >
                                                    Giá vé
                                                </CInputGroupText>
                                                <CFormInput></CFormInput>
                                            </CInputGroup>
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
                                                            <CCol
                                                                md="5"
                                                                className="border-end border-2"
                                                            >
                                                                <b>{trip.route.departure.name}</b>
                                                                <div className="mt-3">
                                                                    {getStation(
                                                                        trip.route.departure.id,
                                                                    )?.map((station, index) => (
                                                                        <Station
                                                                            key={index}
                                                                            locationId={
                                                                                trip.route.departure
                                                                                    .id
                                                                            }
                                                                            station={station}
                                                                            empty={false}
                                                                        ></Station>
                                                                    ))}
                                                                </div>
                                                            </CCol>
                                                            <CCol md="5">
                                                                <b>{trip.route.destination.name}</b>
                                                                <div className="mt-3">
                                                                    {getStation(
                                                                        trip.route.destination.id,
                                                                    )?.map((station, index) => (
                                                                        <Station
                                                                            key={index}
                                                                            locationId={
                                                                                trip.route
                                                                                    .destination.id
                                                                            }
                                                                            station={station}
                                                                            empty={false}
                                                                        ></Station>
                                                                    ))}
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
                                                        <div>Trạm dừng nghỉ</div>
                                                    </CAccordionBody>
                                                </CAccordionItem>
                                            </CAccordion>
                                        </CCol>
                                        <CCol>
                                            <CustomButton text="Lưu thông tin"></CustomButton>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                            <CCard className="mt-2">
                                <CCardHeader>
                                    <b>Lịch trình cố định</b>
                                </CCardHeader>
                                <CCardBody>
                                    <TableSchedule
                                        listFixSchedule={getFixSchedule(trip)}
                                        tripGoId={trip.turnGo}
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
