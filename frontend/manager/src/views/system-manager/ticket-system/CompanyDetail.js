import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CForm,
    CFormFeedback,
    CFormLabel,
    CCol,
    CRow,
    CFormInput,
    CCardFooter,
    CToaster,
    CButton,
    CTable,
    CTableBody,
    CTableRow,
    CTableDataCell,
    CTableHeaderCell,
    CTableHead,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
    CFormSelect,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CModal,
    CModalBody,
    CModalHeader,
    CTooltip,
    CModalFooter,
    CFormCheck,
    CFormTextarea,
    CButtonGroup,
    CSpinner,
} from '@coreui/react'
import {
    companyActions,
    selectCurCompany,
    selectListCompany,
    selectListCurCompanyReview,
} from 'src/feature/bus-company/busCompany.slice'
import { companyInput } from 'src/utils/constants'
import { useState, useRef } from 'react'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import { CustomToast } from 'src/views/customToast/CustomToast'
import scheduleThunk from 'src/feature/schedule/schedule.service'
import { useEffect } from 'react'
import { selectListFixSchedule } from 'src/feature/schedule/schedule.slice'
import CustomButton from 'src/views/customButton/CustomButton'
import { selectListAssign } from 'src/feature/bus-company/busCompany.slice'
import { selectListOfficialRoute, selectListRoute } from 'src/feature/route/route.slice'
import { getRouteJourney, reverseString } from 'src/utils/tripUtils'
import { CompanyRoute } from './Company'
import { dayInWeek } from 'src/utils/constants'
import { TIME_TABLE, COLOR } from 'src/utils/constants'
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs'
import { convertTimeToInt } from 'src/utils/convertUtils'
import CIcon from '@coreui/icons-react'
import { cilTransfer, cilX } from '@coreui/icons'
import { MONTH_IN_YEAR } from 'src/utils/constants'
import { tripProcess } from 'src/utils/routeUtils'
import { CChart } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import tripThunk from 'src/feature/trip/trip.service'
import routeThunk from 'src/feature/route/route.service'
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css'
import { selectListLocation } from 'src/feature/location/location.slice'
import stationThunk from 'src/feature/station/station.service'
import locationThunk from 'src/feature/location/location.service'
import mapThunk from 'src/feature/map/map.service'
import feeThunk from 'src/feature/fee/fee.service'
import { convertToDisplayDate } from 'src/utils/convertUtils'
import { format, parse } from 'date-fns'
import { DateRange } from 'react-date-range'
import { cilStar } from '@coreui/icons'
import { addDays } from 'src/utils/convertUtils'
import { getTripJourney } from 'src/utils/tripUtils'
const ScheduleWrap = ({ schedule, turn, isEdit = false, removeTrip }) => {
    const getScheduleColor = () => {
        if (turn === true) return 'success'
        else return 'warning'
    }
    const [showClear, setShowClear] = useState(false)
    const handleMouseEnter = () => {
        if (isEdit) setShowClear(true)
    }
    const handleMouseLeave = () => {
        if (isEdit) setShowClear(false)
    }
    const handleRemoteSchedule = () => {
        removeTrip(schedule)
    }
    return (
        <CTable bordered className="mb-1">
            <CTableBody>
                <CTableRow>
                    <CTableDataCell
                        className="text-center p-0"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <CCard color={getScheduleColor()} style={{ borderRadius: '0' }}>
                            <CCardBody className="p-1">
                                <b>{schedule.time.slice(0, -3)}</b>
                                <i>{` `}</i>
                                {showClear && (
                                    <CTooltip content="Xóa" placement="right" color="white">
                                        <CIcon
                                            icon={cilX}
                                            role="button"
                                            onClick={handleRemoteSchedule}
                                        ></CIcon>
                                    </CTooltip>
                                )}
                            </CCardBody>
                        </CCard>
                    </CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>
    )
}

const TableSchedule = ({ listFixScheduleIn, tripGoId, tripBackId }) => {
    const [listFixSchedule, setListFixSchedule] = useState([listFixScheduleIn])
    const dispatch = useDispatch()
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
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
    const [isEdit, setIsEdit] = useState(false)
    const [listRemoveSchd, setListRemoveSchd] = useState([])
    const [listAddSchd, setListAddSchd] = useState([])
    const [openTimeBox, setOpenTimeBox] = useState(false)
    const [isAddGo, setIsAddGo] = useState(true)
    const [curDay, setCurDay] = useState(2)
    const [loading, setLoading] = useState(false)
    const [curTime, setCurTime] = useState('07:00')
    const handleRemoveSchd = (schd) => {
        if (!schd.new) {
            setListRemoveSchd([...listRemoveSchd, schd])
        } else {
            setListAddSchd(listAddSchd.filter((schedule) => schedule.id !== schd.id))
        }
        setListFixSchedule(listFixSchedule.filter((schedule) => schedule.id !== schd.id))
    }
    const handleAddSchd = () => {
        const trip = isAddGo === true ? tripGoId : tripBackId
        if (
            !listFixSchedule.find(
                (schd) =>
                    schd.time.slice(0, -3) === curTime &&
                    schd.dayOfWeek === curDay &&
                    schd.trip.id === trip,
            )
        ) {
            const newSchd = {
                id: listFixSchedule[listFixSchedule.length - 1].id + 1,
                time: curTime + ':00',
                dayOfWeek: curDay,
                trip: { id: isAddGo === true ? tripGoId : tripBackId },
                new: true,
            }
            setListAddSchd([...listAddSchd, newSchd])
            setListFixSchedule([...listFixSchedule, newSchd])
            setOpenTimeBox(false)
        } else {
            addToast(() =>
                CustomToast({ message: 'Đã có chuyến vào thời gian này', type: 'error' }),
            )
        }
    }
    const handleOpenTimeBox = (day, turn) => {
        setOpenTimeBox(true)
        setIsAddGo(turn)
        setCurDay(day)
    }
    const handleSaveInfo = async () => {
        try {
            setLoading(true)
            if (listRemoveSchd.length > 0)
                await dispatch(
                    scheduleThunk.deleteFixedSchedule(listRemoveSchd.map((schd) => schd.id)),
                ).unwrap()
            for (let i = 0; i < listAddSchd.length; i++) {
                await dispatch(
                    scheduleThunk.addFixedSchedule({
                        tripId: listAddSchd[i].trip.id,
                        listTime: [listAddSchd[i].time.slice(0, -3)],
                        listRepeat: [listAddSchd[i].dayOfWeek],
                    }),
                ).unwrap()
            }
            setLoading(false)
            addToast(() => CustomToast({ message: 'Đã cập nhật lịch trình', type: 'success' }))
            setIsEdit(false)
            dispatch(scheduleThunk.getFixSchedule())
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    useEffect(() => {
        if (isEdit == false) {
            setListFixSchedule(listFixScheduleIn)
            setListAddSchd([])
            setListRemoveSchd([])
        }
    }, [isEdit])
    useEffect(() => {
        setListFixSchedule(listFixScheduleIn)
    }, [listFixScheduleIn])
    return (
        <div>
            <i>Bảng lịch trình</i>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            {tripGoId !== 0 && tripBackId !== 0 && (
                <>
                    <CTable stripedColumns bordered>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">Buổi</CTableHeaderCell>
                                {Array.from({ length: 7 }, (_, index) => index).map((dayIndex) => (
                                    <CTableHeaderCell
                                        key={dayIndex}
                                        className="text-center"
                                        scope="col"
                                    >
                                        <b>
                                            <i>{dayInWeek[dayIndex]}</i>
                                        </b>
                                        {isEdit && (
                                            <CDropdown>
                                                <CDropdownToggle
                                                    style={{
                                                        padding: '0 5px',
                                                        backgroundColor: 'transparent',
                                                        border: 0,
                                                        color: 'black',
                                                    }}
                                                ></CDropdownToggle>
                                                <CDropdownMenu>
                                                    <CDropdownItem
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handleOpenTimeBox(dayIndex + 2, true)
                                                        }}
                                                    >
                                                        Thêm chuyến đi
                                                    </CDropdownItem>
                                                    <CDropdownItem
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handleOpenTimeBox(dayIndex + 2, false)
                                                        }}
                                                    >
                                                        Thêm chuyến về
                                                    </CDropdownItem>
                                                </CDropdownMenu>
                                            </CDropdown>
                                        )}
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
                                    {Array.from({ length: 7 }, (_, index) => index).map(
                                        (dayIndex) => (
                                            <CTableDataCell key={dayIndex}>
                                                {filterTime(
                                                    listFixSchedule.filter(
                                                        (schd) => schd.dayOfWeek === dayIndex + 2,
                                                    ),
                                                    key,
                                                ).map((schedule, index) => (
                                                    <ScheduleWrap
                                                        key={index}
                                                        schedule={schedule}
                                                        turn={schedule.trip.id === tripGoId}
                                                        isEdit={isEdit}
                                                        removeTrip={handleRemoveSchd}
                                                    ></ScheduleWrap>
                                                ))}
                                            </CTableDataCell>
                                        ),
                                    )}
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex gap-2 align-items-center">
                            <i>Ghi chú</i>
                            <CCard color="success">
                                <CCardBody className="p-1">Chuyến đi</CCardBody>
                            </CCard>
                            <CCard color="warning">
                                <CCardBody className="p-1">Chuyến về</CCardBody>
                            </CCard>
                        </div>
                        <div className="d-flex justify-content-end gap-2">
                            <CButton
                                variant="outline"
                                onClick={() => setIsEdit(!isEdit)}
                                color="warning"
                            >
                                {!isEdit ? 'Sửa lịch trình' : 'Hủy'}
                            </CButton>
                            {isEdit && (
                                <CustomButton
                                    loading={loading}
                                    variant="outline"
                                    onClick={handleSaveInfo}
                                    text="Lưu"
                                ></CustomButton>
                            )}
                        </div>
                    </div>
                    <CModal
                        alignment="center"
                        visible={openTimeBox}
                        onClose={() => setOpenTimeBox(false)}
                    >
                        <CModalHeader>{`Thêm chuyến chiều ${isAddGo ? 'đi' : 'về'}`}</CModalHeader>
                        <CModalBody className="d-flex justify-content-center">
                            <TimePicker
                                format="HH:mm"
                                onChange={setCurTime}
                                value={curTime}
                                clearIcon={null}
                                disableClock={true}
                                size={260}
                            />
                        </CModalBody>
                        <CModalFooter>
                            <CButton variant="outline" onClick={handleAddSchd}>
                                OK
                            </CButton>
                            <CButton variant="outline" onClick={() => setOpenTimeBox(false)}>
                                Hủy
                            </CButton>
                        </CModalFooter>
                    </CModal>
                </>
            )}
        </div>
    )
}

const AddRouteForm = ({ visible, setVisible, curAssign }) => {
    const listLocationIn = useSelector(selectListLocation)
    const listLocation = useRef(listLocationIn)
    const listRouteIn = useSelector(selectListRoute)
    const listRoute = useRef(listRouteIn)
    const curCompany = useSelector(selectCurCompany)
    const [loading, setLoading] = useState(false)
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const dispatch = useDispatch()
    const [companyRoute, setCompanyRoute] = useState({
        route: null,
        listTimeGo: [
            {
                listTime: [],
                listRepeat: [2, 3, 4, 5, 6, 7, 8],
            },
        ],
        listTimeReturn: [
            {
                listTime: [],
                listRepeat: [2, 3, 4, 5, 6, 7, 8],
            },
        ],
        price: 0,
    })
    const updateCompanyRoute = (index, route, listGo, listReturn, price = 0) => {
        const routeData = {
            route: route,
            listTimeGo: listGo,
            listTimeReturn: listReturn,
            price: price,
        }
        setCompanyRoute(routeData)
    }

    const handleAddLocation = async (name) => {
        let location = null
        await dispatch(locationThunk.getLocations())
            .unwrap()
            .then((res) => {
                location = res.find((location) => location.name === name)
            })
        if (location) {
            return Promise.resolve(location.id)
        } else {
            //add location to list
            return await dispatch(locationThunk.addLocation(name))
                .unwrap()
                .then(async (res) => {
                    //update list location
                    return await dispatch(locationThunk.getLocations())
                        .unwrap()
                        .then((newList) => {
                            listLocation.current = newList
                            return res.id
                        })
                })
                .catch((err) => {
                    throw err
                })
        }
    }
    const handleAddRoute = async (route) => {
        let departureId = -1
        let destinationId = -1
        return await handleAddLocation(route.departure)
            .then(async (res) => {
                departureId = res
                return await handleAddLocation(route.destination)
                    .then(async (res1) => {
                        destinationId = res1
                        if (departureId === -1 || destinationId === -1)
                            return Promise.reject(new Error('Invalid ID'))
                        let routeData = listRoute.current.find(
                            (r) =>
                                (r.departure.id === departureId &&
                                    r.destination.id === destinationId) ||
                                (r.departure.id === destinationId &&
                                    r.destination.id === departureId),
                        )
                        if (routeData) return Promise.resolve(routeData)
                        else {
                            routeData = {
                                departureId: departureId,
                                destinationId: destinationId,
                                parents: 0,
                            }
                            //add route to list
                            return await dispatch(routeThunk.addRoute({ routeData }))
                                .unwrap()
                                .then(async (res) => {
                                    return await dispatch(routeThunk.getRoute())
                                        .unwrap()
                                        .then((listNewRoute) => {
                                            listRoute.current = listNewRoute
                                            return res
                                        })
                                })
                                .catch((err) => {
                                    throw err
                                })
                        }
                    })
                    .catch((err) => {
                        throw err
                    })
            })
            .catch((err) => {
                throw err
            })
    }
    const handleAddStation = async (locationId, station) => {
        const location = listLocation.current.find((location) => location.id === locationId)
        const listStation = location.stations
        const stationF = listStation.find((sta) => sta.name === station)
        if (!stationF) {
            const stationName = 'Bến xe ' + station + ', ' + location.name
            let stationInfo = {
                name: station,
                address: stationName,
                latitude: 0,
                longitude: 0,
            }
            await dispatch(mapThunk.getStationInfo(stationName))
                .unwrap()
                .then(async (res) => {
                    stationInfo = {
                        name: station,
                        address: res.address,
                        latitude: res.latitude,
                        longitude: res.longitude,
                    }
                })
                .catch((err) => {})
            return await dispatch(
                stationThunk.addStation({
                    locationId: location.id,
                    listStation: [stationInfo],
                    companyId: 0,
                }),
            )
                .unwrap()
                .then((res) => {
                    console.log(res)
                    return res[0].id
                })
                .catch((err) => {
                    throw err
                })
        } else return Promise.resolve(stationF.id)
    }
    const handleAssignRoute = async (companyId, listRouteId) => {
        await dispatch(
            companyThunk.assignRouteForCompany({
                listRoute: listRouteId,
                companyId: companyId,
            }),
        )
            .unwrap()
            .then(async (res) => {
                addToast(() =>
                    CustomToast({ message: 'Thêm tuyến xe thành công', type: 'success' }),
                )
            })
            .catch((err) => {
                throw err
            })
    }
    const handleAddTrip = async (
        route,
        startStationId,
        endStationId,
        companyId,
        journey,
        distance,
        routeCode,
    ) => {
        const tripInfor = {
            routeId: route.id,
            startStationId: startStationId,
            endStationId: endStationId,
            schedule: journey,
            price: 0,
            companyId: companyId,
            distance: distance,
            hours: parseFloat((distance / 75).toFixed(1)),
            routeCode: routeCode,
        }
        return await dispatch(tripThunk.addTrip(tripInfor))
            .unwrap()
            .then((res) => {
                return [res.trip.id, res.tripReturn.id]
            })
            .catch((err) => {
                throw err
            })
    }

    const handleAddFixSchedule = async (tripId, listTime, listRepeat) => {
        await dispatch(
            scheduleThunk.addFixedSchedule({
                tripId: tripId,
                listTime: listTime,
                listRepeat: listRepeat,
            }),
        )
            .unwrap()
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                throw err
            })
    }

    const handleAddStopStation = async (listTrip, startStationId, endStationId) => {
        const stationType = ['pick', 'drop']
        const stationId = [startStationId, endStationId]
        for (let i = 0; i < listTrip.length; i++)
            for (let j = 0; j < stationId.length; j++)
                await dispatch(
                    stationThunk.addStopStation({
                        tripId: listTrip[i],
                        stationId: stationId[j],
                        stationType: stationType[Math.abs(i - j)],
                    }),
                )
                    .unwrap()
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => {
                        throw err
                    })
    }
    const handleSaveInfo = async () => {
        const companyId = curCompany.busCompany.id
        let listTrip = []
        let listRouteId = []
        if (companyRoute && companyRoute.route) {
            setLoading(true)
            try {
                await handleAddRoute(companyRoute.route)
                    .then(async (res) => {
                        const route = res
                        if (
                            curAssign.find((r) => r.routeId === route.id) &&
                            listRoute.current.filter(
                                (r) =>
                                    r.id === route.id &&
                                    r.trips.filter(
                                        (tp) => tp.busCompanyId === companyId && tp.active,
                                    ).length > 0,
                            ).length > 0
                        ) {
                            throw new Error('Đã có chuyến xe cùng tuyến tồn tại')
                        }
                        let startStationId = -1
                        let endStationId = -1
                        if (route) {
                            await handleAddStation(
                                route.departure.id,
                                companyRoute.route.departure === route.departure.name
                                    ? companyRoute.route.startStation
                                    : companyRoute.route.endStation,
                            ).then((res) => (startStationId = res))
                            await handleAddStation(
                                route.destination.id,
                                companyRoute.route.destination === route.destination.name
                                    ? companyRoute.route.endStation
                                    : companyRoute.route.startStation,
                            ).then((res) => (endStationId = res))
                            if (startStationId === -1 || endStationId === -1) {
                                throw new Error('Invalid ID')
                            }
                            await handleAddTrip(
                                route,
                                startStationId,
                                endStationId,
                                companyId,
                                companyRoute.route.journey,
                                companyRoute.route.distance,
                                companyRoute.route.id,
                            ).then(async (res) => {
                                listTrip = res
                                if (listTrip.length === 2) {
                                    for (let j = 0; j < companyRoute.listTimeGo.length; j++) {
                                        await handleAddFixSchedule(
                                            listTrip[0],
                                            companyRoute.listTimeGo[j].listTime.map(
                                                (time) => time.time,
                                            ),
                                            companyRoute.listTimeGo[j].listRepeat,
                                        )
                                    }
                                    for (let j = 0; j < companyRoute.listTimeReturn.length; j++) {
                                        await handleAddFixSchedule(
                                            listTrip[1],
                                            companyRoute.listTimeReturn[j].listTime.map(
                                                (time) => time.time,
                                            ),
                                            companyRoute.listTimeReturn[j].listRepeat,
                                        )
                                    }
                                    await handleAddStopStation(
                                        listTrip,
                                        startStationId,
                                        endStationId,
                                    )
                                }
                            })
                            listRouteId.push(route.id)
                            await handleAssignRoute(companyId, listRouteId).then(async () => {
                                setLoading(false)
                                // wait 1s to reload page
                                await dispatch(routeThunk.getRoute()).unwrap()
                                await dispatch(companyThunk.getAssignedRouteForCompany()).unwrap()
                                await dispatch(scheduleThunk.getFixSchedule()).unwrap()
                                setTimeout(() => setVisible(false), 1000)
                            })
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        setLoading(false)
                        addToast(() => CustomToast({ message: err.message || err, type: 'error' }))
                    })
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        } else {
            addToast(() =>
                CustomToast({
                    message:
                        'Một số thông tin chưa hợp lệ. Cần điền đủ thông tin nhà xe và tuyến xe',
                    type: 'error',
                }),
            )
            return
        }
    }
    useEffect(() => {
        if (listLocation.length === 0) dispatch(locationThunk.getLocations())
        if (listRoute.length === 0) dispatch(routeThunk.getRoute())
    }, [])
    useEffect(() => {
        listLocation.current = listLocationIn
        listRoute.current = listRouteIn
    }, [listRouteIn, listLocationIn])
    useEffect(() => {
        if (!visible) {
            setCompanyRoute({
                route: null,
                listTimeGo: [
                    {
                        listTime: [],
                        listRepeat: [2, 3, 4, 5, 6, 7, 8],
                    },
                ],
                listTimeReturn: [
                    {
                        listTime: [],
                        listRepeat: [2, 3, 4, 5, 6, 7, 8],
                    },
                ],
                price: 0,
            })
        }
    }, [visible])
    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                size="lg"
                backdrop="static"
            >
                <CModalHeader>Thêm tuyến xe</CModalHeader>
                <CModalBody>
                    <CompanyRoute
                        id={1}
                        addCompanyRoute={updateCompanyRoute}
                        companyRoute={companyRoute}
                    ></CompanyRoute>
                </CModalBody>
                <CModalFooter>
                    <CustomButton
                        text="Lưu thông tin"
                        onClick={handleSaveInfo}
                        loading={loading}
                    ></CustomButton>
                    <CButton onClick={() => setVisible(false)}>Đóng</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

const RouteInfo = ({ route, fixSchedule }) => {
    const curCompany = useSelector(selectCurCompany)
    const [companyRouteData, setCompanyRouteData] = useState(null)
    const listOfficialRoute = useSelector(selectListOfficialRoute)
    const [officialRoute, setOfficialRoute] = useState(null)
    const [listTrip, setListTrip] = useState([])
    const officialTrip = listTrip.length > 0 ? listTrip.find((tp) => tp.active === true) : null
    const tripGo = officialTrip ? officialTrip.turnGo : null
    const tripBack = officialTrip ? officialTrip.turnBack : null
    const [openComfirmForm, setOpenComfirmForm] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [showOldTrip, setShowOldTrip] = useState(false)
    const [targetTrip, setTargetTrip] = useState(null)
    const updateCompanyData = () => {
        const offRoute = listOfficialRoute.find(
            (r) =>
                ((r.departure === route.departure && r.destination === route.destination) ||
                    (r.departure === route.destination && r.destination === route.departure)) &&
                r.startStation === tripGo.startStation.name &&
                r.endStation === tripGo.endStation.name &&
                (r.journey === officialTrip.schedule ||
                    r.journey === reverseString(officialTrip.schedule)),
        )
        setOfficialRoute(offRoute)
    }
    const handleActive = (active, trip) => {
        if (!active && officialTrip) {
            addToast(() =>
                CustomToast({
                    message: 'Chỉ được mở một chuyến trong cùng tuyến xe',
                    type: 'error',
                }),
            )
            return
        }
        setOpenComfirmForm(true)
        setIsDelete(active)
        setTargetTrip(trip)
    }
    const handleSaveActiveState = () => {
        setLoading(true)
        dispatch(tripThunk.activeTrip({ id: targetTrip.tripGo.id, active: !isDelete }))
            .unwrap()
            .then((res) => {
                dispatch(tripThunk.activeTrip({ id: targetTrip.tripBack.id, active: !isDelete }))
                    .unwrap()
                    .then((res) => {
                        setOpenComfirmForm(false)
                        addToast(() =>
                            CustomToast({ message: 'Thay đổi thành công', type: 'success' }),
                        )
                        setLoading(false)
                        dispatch(routeThunk.getRoute())
                    })
            })
            .catch((err) => {
                setLoading(false)
            })
    }
    useEffect(() => {
        const listTripExtract = tripProcess([route], curCompany?.busCompany?.id)
        setListTrip(listTripExtract)
    }, [route])
    return (
        <div>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <Tabs className="tabStyle">
                <TabList>
                    <Tab>Thông tin tuyến</Tab>
                    <Tab>Lịch trình</Tab>
                </TabList>
                <TabPanel>
                    <CRow className="mb-3 justify-content-center align-items-center">
                        <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                            <b>Tỉnh đi - đến</b>
                        </CFormLabel>
                        <CCol sm="3">
                            <CFormInput readOnly value={route?.departure?.name}></CFormInput>
                        </CCol>
                        <CCol sm="2" className="d-flex justify-content-center align-items-center">
                            <CIcon icon={cilTransfer}></CIcon>
                        </CCol>
                        <CCol sm="3">
                            <CFormInput readOnly value={route?.destination?.name}></CFormInput>
                        </CCol>
                    </CRow>
                    {listTrip.length > 0 && officialTrip && (
                        <>
                            <CRow className="mb-3 justify-content-center align-items-center">
                                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                                    <b>Bến đi - đến</b>
                                </CFormLabel>
                                <CCol sm="3">
                                    <CFormInput
                                        readOnly
                                        value={officialTrip.startStation.name}
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
                                        value={officialTrip.endStation.name}
                                    ></CFormInput>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3 justify-content-center align-items-center">
                                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                                    <b>Lộ trình</b>
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput readOnly value={officialTrip.schedule}></CFormInput>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3 justify-content-center align-items-center">
                                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                                    <b>Tình trạng</b>
                                </CFormLabel>
                                <CCol sm={6}>
                                    <CFormInput
                                        readOnly
                                        value={
                                            officialTrip.active
                                                ? 'Đang khai thác'
                                                : 'Ngừng khai thác'
                                        }
                                    ></CFormInput>
                                </CCol>
                                <CDropdown className="col-sm-2">
                                    <CDropdownToggle color="secondary">Tác vụ</CDropdownToggle>
                                    <CDropdownMenu>
                                        {officialTrip.active ? (
                                            <CDropdownItem
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleActive(true)
                                                }}
                                            >
                                                Ngừng tuyến
                                            </CDropdownItem>
                                        ) : (
                                            <CDropdownItem
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleActive(false, officialTrip)
                                                }}
                                            >
                                                Mở tuyến
                                            </CDropdownItem>
                                        )}
                                        {listTrip.filter((tp) => !tp.active).length > 0 && (
                                            <CDropdownItem
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setShowOldTrip(!showOldTrip)
                                                }}
                                            >
                                                {!showOldTrip
                                                    ? 'Hiện các chuyến đã đóng'
                                                    : 'Ân các chuyến đã đóng'}
                                            </CDropdownItem>
                                        )}
                                    </CDropdownMenu>
                                </CDropdown>
                            </CRow>
                        </>
                    )}
                    {listTrip.length > 0 && (!officialTrip || showOldTrip) && (
                        <>
                            <CRow className="mb-3 justify-content-center align-items-center border-bottom border-1"></CRow>
                            {listTrip
                                .filter((tp) => !tp.active)
                                .map((tp, index) => (
                                    <div key={index}>
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
                                                    value={tp.startStation.name}
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
                                                    value={tp.endStation.name}
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
                                                    value={tp.schedule}
                                                ></CFormInput>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center align-items-center">
                                            <CFormLabel
                                                htmlFor="color"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Tình trạng</b>
                                            </CFormLabel>
                                            <CCol sm={6}>
                                                <CFormInput
                                                    readOnly
                                                    value={
                                                        tp.active
                                                            ? 'Đang khai thác'
                                                            : 'Ngừng khai thác'
                                                    }
                                                ></CFormInput>
                                            </CCol>
                                            <CDropdown className="col-sm-2">
                                                <CDropdownToggle color="secondary">
                                                    Tác vụ
                                                </CDropdownToggle>
                                                <CDropdownMenu>
                                                    {tp.active ? (
                                                        <CDropdownItem
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                handleActive(true)
                                                            }}
                                                        >
                                                            Ngừng tuyến
                                                        </CDropdownItem>
                                                    ) : (
                                                        <CDropdownItem
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                handleActive(false, tp)
                                                            }}
                                                        >
                                                            Mở tuyến
                                                        </CDropdownItem>
                                                    )}
                                                </CDropdownMenu>
                                            </CDropdown>
                                        </CRow>
                                    </div>
                                ))}
                        </>
                    )}
                </TabPanel>
                <TabPanel>
                    <TableSchedule
                        listFixScheduleIn={fixSchedule}
                        tripGoId={tripGo ? tripGo.id : 0}
                        tripBackId={tripBack ? tripBack.id : 0}
                    ></TableSchedule>
                </TabPanel>
            </Tabs>
            <CModal
                backdrop="static"
                visible={openComfirmForm}
                onClose={() => setOpenComfirmForm(false)}
            >
                <CModalHeader>
                    <b>Xác nhận tác vụ</b>
                </CModalHeader>
                <CModalBody>
                    {isDelete
                        ? 'Bạn có chắc chắn muốn ngừng tuyến này?'
                        : 'Bạn có chắc chắn muốn mở tuyến này?'}
                    <div className="d-flex justify-content-end gap-2">
                        <CustomButton
                            text="Xác nhận"
                            loading={loading}
                            onClick={handleSaveActiveState}
                        ></CustomButton>
                        <CustomButton
                            text="Hủy"
                            variant="outline"
                            color="danger"
                            onClick={() => setOpenComfirmForm(false)}
                        ></CustomButton>
                    </div>
                </CModalBody>
            </CModal>
        </div>
    )
}

const FeeInfo = ({ listAssignRouteId }) => {
    const dispatch = useDispatch()
    const listRoute = useSelector(selectListRoute)
    const [listTrip, setListTrip] = useState([])
    const [listCompanyServiceFee, setListCompanyServiceFee] = useState([])
    const curCompany = useSelector(selectCurCompany)
    const startTime = new Date(curCompany.busCompany.coopDay)
    const today = new Date()
    const [chartData, setChartData] = useState({
        labels: [],
        backGroundColor: [],
        data: [],
    })
    const [yearValue, setYearValue] = useState(today.getFullYear())
    const [monthValue, setMonthValue] = useState(today.getMonth())
    const [monthRange, setMonthRange] = useState({
        start: today.getFullYear() == 2023 ? 8 : 0,
        end: today.getMonth(),
    })
    const [listCompanySchedule, setListCompanySchedule] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalMoney, setTotalMoney] = useState(0)
    const getYearRange = () => {
        var year = []
        const startYear = startTime.getFullYear()
        for (let i = startYear; i <= today.getFullYear(); i++) {
            year.push(i)
        }
        return year
    }
    const getMonthRange = (year) => {
        const startMonth = startTime.getMonth()
        const startYear = startTime.getFullYear()
        if (startYear == year) {
            setMonthRange({
                start: startMonth,
                end: today.getFullYear() === year ? today.getMonth() : 11,
            })
        } else {
            setMonthRange({
                start: 0,
                end: today.getFullYear() === year ? today.getMonth() : 11,
            })
        }
    }
    //Generate a random color
    const randomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }

    const getLabelandColor = () => {
        const labels = []
        const data = []
        const backGroundColor = []
        const listData = []
        for (let i = 0; i < listCompanySchedule.length; i++) {
            const item = listData.findIndex(
                (item) => item.trip.id === listCompanySchedule[i].trip.id,
            )
            if (item != -1) {
                listData[item].listSchedule.push(listCompanySchedule[i])
            } else {
                listData.push({
                    trip: listCompanySchedule[i].trip,
                    listSchedule: [listCompanySchedule[i]],
                })
            }
        }
        listData.forEach((item) => {
            labels.push(getTripJourney(item.trip))
            //get random number
            data.push(item.listSchedule.length)
            backGroundColor.push(randomColor())
        })
        setChartData({ labels: labels, data: data, backGroundColor: backGroundColor })
    }

    const getData = () => {
        dispatch(feeThunk.getFee())
            .unwrap()
            .then((res) => {
                setListCompanyServiceFee(
                    res.filter((fee) => fee.company.id === curCompany.busCompany.id),
                )
            })
    }
    const getScheduleData = () => {
        setLoading(true)
        dispatch(
            feeThunk.getCompanySchedule({
                month: monthValue + 1,
                year: yearValue,
            }),
        )
            .unwrap()
            .then((res) => {
                console.log(res)
                setListCompanySchedule(
                    res.find((item) => item.busCompany.id === curCompany.busCompany.id)?.schedules,
                )
                setLoading(false)
                // handleCalTicketSale()
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    const handleCalTicketSale = () => {
        dispatch(
            feeThunk.getTicketSale({
                month: monthValue + 1,
                year: yearValue,
            }),
        )
            .unwrap()
            .then((res) => {
                console.log(res)
                setTotalMoney(
                    res.find((item) => item.busCompany.id === curCompany.busCompany.id)?.ticketSave
                        .ticketSales,
                )
            })
            .catch((err) => {
                setTotalMoney(0)
            })
    }

    const getNextDueDay = (day) => {
        var currentDay = parse(day, 'yyyy-MM-dd', new Date())
        var currentMonth = currentDay.getMonth()
        var nextDate = new Date(currentDay.getTime())
        nextDate.setDate(5)
        nextDate.setMonth(currentMonth + 1)
        return format(nextDate, 'dd/MM/yyyy')
    }

    const getStartDateOfService = (dueDate) => {
        let currentSpan = parse(dueDate, 'yyyy-MM-dd', new Date())
        if (currentSpan.getDate() !== 5) {
            return addDays(currentSpan, 1)
        } else {
            let firstOfMonth = new Date(currentSpan.getFullYear(), currentSpan.getMonth(), 1)
            return firstOfMonth
        }
    }
    const getLastDateOfMonth = (dueDate) => {
        let currentSpan = parse(dueDate, 'yyyy-MM-dd', new Date())
        let lastDate = new Date(currentSpan.getFullYear(), currentSpan.getMonth() + 1, 0)
        return lastDate
    }
    useEffect(() => {
        getMonthRange(yearValue)
    }, [yearValue])

    useEffect(() => {
        const listAssign = listRoute.filter((route) =>
            listAssignRouteId.find((id) => id.routeId === route.id),
        )
        const listTripIn = tripProcess(listAssign)
        setListTrip(listTripIn)
    }, [listAssignRouteId])

    useEffect(() => {
        getScheduleData()
        handleCalTicketSale()
    }, [monthValue, yearValue])

    useEffect(() => {
        getLabelandColor()
    }, [listCompanySchedule])

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <Tabs className="tabStyle">
                <TabList>
                    <Tab>Thống kê doanh số</Tab>
                    <Tab>Phí dịch vụ</Tab>
                </TabList>
                <TabPanel className="px-3">
                    {loading ? (
                        <div className="d-flex justify-content-center">
                            <CSpinner />
                        </div>
                    ) : (
                        <>
                            <CRow className="justify-content-center align-items-center">
                                <CCol>
                                    <b>Số vé bán ra</b>
                                    <div className="small text-medium-emphasis">{`${MONTH_IN_YEAR[monthValue]}
                                 ${yearValue}`}</div>
                                </CCol>
                                <CCol sm={3}>
                                    <CFormSelect
                                        value={yearValue}
                                        onChange={(e) => setYearValue(parseInt(e.target.value))}
                                    >
                                        <option value="-1" disabled>
                                            Chọn năm
                                        </option>
                                        {getYearRange().map((year) => (
                                            <option value={year} key={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </CCol>
                                <CCol sm={3}>
                                    <CFormSelect
                                        value={monthValue}
                                        onChange={(e) => setMonthValue(parseInt(e.target.value))}
                                    >
                                        <option value="-1" disabled>
                                            Chọn tháng
                                        </option>
                                        {MONTH_IN_YEAR.slice(
                                            monthRange.start,
                                            monthRange.end + 1,
                                        ).map((month, index) => (
                                            <option value={monthRange.start + index} key={index}>
                                                {month}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </CCol>
                            </CRow>
                            <CRow className="justify-content-center align-items-center gap-3 mt-3">
                                <CCol md={3}>
                                    <div>
                                        <div className="text-center">
                                            <b
                                                style={{ fontSize: '20px' }}
                                            >{`${listCompanySchedule.length} chuyến`}</b>
                                        </div>
                                        <CChart
                                            type="doughnut"
                                            data={{
                                                labels: chartData.labels,
                                                datasets: [
                                                    {
                                                        backgroundColor: chartData.backGroundColor,
                                                        data: chartData.data,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                plugins: {
                                                    legend: {
                                                        labels: {
                                                            color: getStyle('--cui-body-color'),
                                                            textAlign: 'left',
                                                            usePointStyle: true,
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </CCol>
                                <CCol md={6}>
                                    <CTable bordered>
                                        <CTableHead>
                                            <CTableRow>
                                                <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">
                                                    Tuyến
                                                </CTableHeaderCell>
                                                <CTableHeaderCell
                                                    scope="col"
                                                    align="center"
                                                    className="text-center"
                                                >
                                                    Số chuyến
                                                </CTableHeaderCell>
                                                <CTableHeaderCell
                                                    scope="col"
                                                    align="center"
                                                    className="text-center"
                                                >
                                                    Số vé
                                                </CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            {chartData.labels.map((label, index) => (
                                                <CTableRow key={index}>
                                                    <CTableHeaderCell scope="row">
                                                        {index + 1}
                                                    </CTableHeaderCell>
                                                    <CTableDataCell>{label}</CTableDataCell>
                                                    <CTableDataCell
                                                        align="center"
                                                        className="text-center"
                                                    >
                                                        {chartData.data[index]}
                                                    </CTableDataCell>
                                                    <CTableDataCell
                                                        align="center"
                                                        className="text-center"
                                                    >
                                                        {listCompanySchedule
                                                            .filter(
                                                                (item) =>
                                                                    getTripJourney(item.trip) ===
                                                                    label,
                                                            )
                                                            .reduce(
                                                                (acc, item) =>
                                                                    acc + item.tickets.length,
                                                                0,
                                                            )}
                                                    </CTableDataCell>
                                                </CTableRow>
                                            ))}
                                            <CTableRow>
                                                <CTableHeaderCell scope="row">#1</CTableHeaderCell>
                                                <CTableDataCell colSpan={2}>
                                                    <b>
                                                        <i>Tổng tiền vé</i>
                                                    </b>
                                                </CTableDataCell>
                                                <CTableDataCell
                                                    align="center"
                                                    className="text-center"
                                                >
                                                    <b>{totalMoney.toLocaleString()}</b>
                                                </CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableHeaderCell scope="row">#2</CTableHeaderCell>
                                                <CTableDataCell colSpan={2}>
                                                    <b>
                                                        <i>Phí dịch vụ - 20%</i>
                                                    </b>
                                                </CTableDataCell>
                                                <CTableDataCell
                                                    align="center"
                                                    className="text-center"
                                                >
                                                    <b>
                                                        {((totalMoney * 20) / 200).toLocaleString()}
                                                    </b>
                                                </CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableHeaderCell scope="row">$</CTableHeaderCell>
                                                <CTableDataCell colSpan={2}>
                                                    <div className="d-flex justify-content-between">
                                                        <b style={{ color: 'red' }}>
                                                            <i>Tổng chi</i>
                                                        </b>
                                                        <i style={{ color: 'grey' }}>
                                                            Chưa thanh toán
                                                        </i>
                                                        <i style={{ color: 'green' }}>
                                                            Đã thanh toán
                                                        </i>
                                                    </div>
                                                </CTableDataCell>
                                                <CTableDataCell
                                                    align="center"
                                                    className="text-center"
                                                    active
                                                >
                                                    <b>
                                                        {((totalMoney * 80) / 200).toLocaleString()}
                                                    </b>
                                                </CTableDataCell>
                                            </CTableRow>
                                        </CTableBody>
                                    </CTable>
                                </CCol>
                            </CRow>
                        </>
                    )}
                </TabPanel>
                <TabPanel className="px-3">
                    <CTable striped bordered>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell
                                    scope="col"
                                    rowSpan={2}
                                    className="align-middle text-center"
                                >
                                    STT
                                </CTableHeaderCell>
                                <CTableHeaderCell scope="col" colSpan={2} className="text-center">
                                    Kỳ hạn
                                </CTableHeaderCell>
                                <CTableHeaderCell
                                    scope="col"
                                    rowSpan={2}
                                    className="align-middle text-center"
                                >
                                    Ngày đến hạn
                                </CTableHeaderCell>
                                <CTableHeaderCell
                                    scope="col"
                                    rowSpan={2}
                                    className="align-middle text-center"
                                >
                                    Số tuyến xe
                                </CTableHeaderCell>
                                <CTableHeaderCell
                                    scope="col"
                                    rowSpan={2}
                                    className="align-middle text-center"
                                >
                                    Tổng phí
                                </CTableHeaderCell>
                                <CTableHeaderCell
                                    scope="col"
                                    rowSpan={2}
                                    className="align-middle text-center"
                                >
                                    Trạng thái
                                </CTableHeaderCell>
                                <CTableHeaderCell
                                    scope="col"
                                    rowSpan={2}
                                    className="align-middle text-center"
                                >
                                    Mã giao dịch
                                </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell scope="col" className="text-center">
                                    Ngày bắt đầu
                                </CTableHeaderCell>
                                <CTableHeaderCell scope="col" className="text-center">
                                    Ngày kết thúc
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow>
                                <CTableHeaderCell scope="row" className="text-center">
                                    {1}
                                </CTableHeaderCell>
                                <CTableDataCell className="text-center">
                                    {format(
                                        addDays(new Date(curCompany.busCompany.coopDay), 1),
                                        'dd/MM/yyyy',
                                    )}
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    {format(
                                        new Date(
                                            parse(
                                                curCompany.busCompany.coopDay,
                                                'yyyy-MM-dd',
                                                new Date(),
                                            ).getTime() +
                                                15 * 86400000,
                                        ),
                                        'dd/MM/yyyy',
                                    )}
                                </CTableDataCell>
                                <CTableDataCell>{'---'}</CTableDataCell>
                                <CTableDataCell className="text-center">
                                    {listTrip.length}
                                </CTableDataCell>
                                <CTableDataCell className="text-center">{`Miễn phí`}</CTableDataCell>
                                <CTableDataCell className="text-center">{`---`}</CTableDataCell>
                                <CTableDataCell className="text-center">{'---'}</CTableDataCell>
                            </CTableRow>
                            {listCompanyServiceFee.map((fee, index) => (
                                <CTableRow key={index}>
                                    <CTableHeaderCell scope="row" className="text-center">
                                        {index + 1}
                                    </CTableHeaderCell>
                                    <CTableDataCell className="text-center">
                                        {format(getStartDateOfService(fee.dueDate), 'dd/MM/yyyy')}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        {format(getLastDateOfMonth(fee.dueDate), 'dd/MM/yyyy')}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        {convertToDisplayDate(fee.dueDate)}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        {listTrip.length}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        {fee.fee.toLocaleString()}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        {fee.status}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        {fee.systemTransaction
                                            ? fee.systemTransaction.transactionNo
                                            : '---'}
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </TabPanel>
            </Tabs>
        </div>
    )
}

const Review = ({ review, updateList }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [mouseHover, setMouseHover] = useState(false)
    const handleAction = (state) => {
        setLoading(true)
        dispatch(companyThunk.checkReview({ reviewId: review.id, checked: state }))
            .unwrap()
            .then(() => {
                setLoading(false)
                updateList()
            })
            .catch((err) => console.log(err))
    }
    const handleMouseEnter = () => {
        setMouseHover(true)
    }
    const handleMouseLeave = () => {
        setMouseHover(false)
    }
    return (
        <div
            className={`w-100 p-3 border-bottom border-2 ${mouseHover ? 'bg-light' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div>
                <b>{review.reviewer.name}</b>
                <i style={{ fontSize: '15px' }}>{` Chuyến: ${getRouteJourney(
                    review.scheduleTrip.route,
                )} - Khởi hành: ${review.schedule.departTime.slice(
                    0,
                    -3,
                )} ngày ${convertToDisplayDate(review.schedule.departDate)}`}</i>
                <br></br>
                <div className="d-flex gap-1 align-items-center">
                    <CIcon
                        icon={cilStar}
                        className={review.rate >= 1 ? 'text-warning' : 'text-secondary'}
                    />
                    <CIcon
                        icon={cilStar}
                        className={review.rate >= 2 ? 'text-warning' : 'text-secondary'}
                    />
                    <CIcon
                        icon={cilStar}
                        className={review.rate >= 3 ? 'text-warning' : 'text-secondary'}
                    />
                    <CIcon
                        icon={cilStar}
                        className={review.rate >= 4 ? 'text-warning' : 'text-secondary'}
                    />
                    <CIcon
                        icon={cilStar}
                        className={review.rate === 5 ? 'text-warning' : 'text-secondary'}
                    />
                    <i style={{ fontSize: '15px' }}>{`Gửi ngày ${format(
                        new Date(review.sendDate),
                        'dd/MM/yyyy',
                    )}`}</i>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                    <CFormTextarea
                        readOnly
                        style={{ backgroundColor: 'white', height: '80px' }}
                        value={review.comment}
                    ></CFormTextarea>
                    <div>
                        {review.state !== 'Đã phê duyệt' && (
                            <CustomButton
                                color="success"
                                className="mb-1 w-100"
                                text="Đăng tải"
                                onClick={() => handleAction(true)}
                            ></CustomButton>
                        )}
                        {review.state !== 'Đã hủy' && (
                            <CustomButton
                                variant="outline"
                                color="secondary"
                                className="w-100"
                                text="Ẩn"
                                onClick={() => handleAction(false)}
                            ></CustomButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ReviewSection = () => {
    const listRoute = useSelector(selectListRoute)
    const [currentRoute, setCurrentRoute] = useState(0)
    const listAllReviewIn = useSelector(selectListCurCompanyReview)
    const [listAllReview, setListAllReview] = useState(listAllReviewIn)
    const [listReview, setListReview] = useState(listAllReview)
    const [filterList, setFilterList] = useState(listAllReview)
    const [filter, setFilter] = useState('checked')
    const [filterRate, setFilterRate] = useState('all')
    const curCompany = useSelector(selectCurCompany)
    const companyId = curCompany?.busCompany?.id
    const dispatch = useDispatch()
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date(),
            key: 'selection',
        },
    ])
    const [openDate, setOpenDate] = useState(false)
    const getAverageRating = () => {
        let total = 0
        listAllReview.forEach((review) => {
            total += review.rate
        })
        if (total / listAllReview.length) return (total / listAllReview.length).toFixed(1)
        else return 0
    }
    const rateData = () => {
        const data = [0, 0, 0, 0, 0]
        listAllReviewIn.forEach((review) => {
            data[5 - review.rate]++
        })
        return data
    }
    const updateList = () => {
        dispatch(companyThunk.getReview(companyId))
    }
    useEffect(() => {
        if (listRoute.length === 0) {
            dispatch(routeThunk.getRoute())
        }
    }, [listRoute])
    useEffect(() => {
        if (companyId !== 0) {
            dispatch(companyThunk.getReview(companyId))
        }
    }, [])
    useEffect(() => {
        if (filter === 'all') setListReview(listAllReview)
        else if (filter === 'checked')
            setListReview(listAllReview.filter((review) => review.state === 'Đã phê duyệt'))
        else if (filter === 'unchecked')
            setListReview(listAllReview.filter((review) => review.state === 'Chờ phê duyệt'))
        else if (filter === 'hiden')
            setListReview(listAllReview.filter((review) => review.state === 'Đã hủy'))
    }, [filter, listAllReview])
    useEffect(() => {
        if (filterRate === 'all') setFilterList(listReview)
        else if (filterRate === 'positive')
            setFilterList(listReview.filter((review) => review.rate >= 3))
        else if (filterRate === 'negative')
            setFilterList(listReview.filter((review) => review.rate < 3))
    }, [filterRate, listReview])
    useEffect(() => {
        setListAllReview(
            listAllReviewIn.filter(
                (rv) =>
                    new Date(rv.sendDate).getDate() >= dateRange[0].startDate.getDate() &&
                    new Date(rv.sendDate).getDate() <= dateRange[0].endDate.getDate() &&
                    new Date(rv.sendDate).getMonth() >= dateRange[0].startDate.getMonth() &&
                    new Date(rv.sendDate).getMonth() <= dateRange[0].endDate.getMonth(),
            ),
        )
    }, [dateRange])
    useEffect(() => {
        setListAllReview(listAllReviewIn)
    }, [listAllReviewIn])
    return (
        <div>
            <CRow className="align-items-center my-2">
                <CCol md={2}>
                    <b className="px-3">Thời gian đánh giá</b>
                </CCol>
                <CCol md={4} style={{ position: 'relative' }}>
                    <CFormInput
                        type="text"
                        value={`${format(dateRange[0].startDate, 'dd/MM/yyyy')} - ${format(
                            dateRange[0].endDate,
                            'dd/MM/yyyy',
                        )}`}
                        onClick={() => setOpenDate(!openDate)}
                        readOnly
                        style={{ width: 'fit-content' }}
                    />
                    {openDate && (
                        <div style={{ position: 'absolute', zIndex: 2 }}>
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) => setDateRange([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                                maxDate={new Date()}
                                minDate={
                                    curCompany
                                        ? new Date(curCompany.busCompany.coopDay)
                                        : new Date()
                                }
                            />
                        </div>
                    )}
                </CCol>
            </CRow>
            <CRow>
                <CCol lg={9}>
                    <CCard>
                        <CCardHeader className="d-flex align-items-center justify-content-between">
                            <b>{`Danh sách đánh giá (${filterList.length})`}</b>
                            <div className="d-flex align-items-center gap-2">
                                <CButtonGroup role="group" aria-label="Form option" color="info">
                                    <CFormCheck
                                        type="radio"
                                        button={{ color: 'primary', variant: 'outline' }}
                                        name="btnradio"
                                        id="btnradio1"
                                        autoComplete="off"
                                        label="Tất cả"
                                        checked={filter === 'all'}
                                        onChange={() => setFilter('all')}
                                    />
                                    <CFormCheck
                                        type="radio"
                                        button={{ color: 'primary', variant: 'outline' }}
                                        name="btnradio"
                                        id="btnradio2"
                                        autoComplete="off"
                                        label="Đã duyệt"
                                        checked={filter === 'checked'}
                                        onChange={() => setFilter('checked')}
                                    />
                                    <CFormCheck
                                        type="radio"
                                        button={{ color: 'primary', variant: 'outline' }}
                                        name="btnradio"
                                        id="btnradio3"
                                        autoComplete="off"
                                        label="Chưa duyệt"
                                        checked={filter === 'unchecked'}
                                        onChange={() => setFilter('unchecked')}
                                    />
                                    <CFormCheck
                                        type="radio"
                                        button={{ color: 'primary', variant: 'outline' }}
                                        name="btnradio"
                                        id="btnradio4"
                                        autoComplete="off"
                                        label="Đã ẩn"
                                        checked={filter === 'hiden'}
                                        onChange={() => setFilter('hiden')}
                                    />
                                </CButtonGroup>
                                <CDropdown>
                                    <CDropdownToggle href="#" color="secondary">
                                        Lọc đánh giá
                                    </CDropdownToggle>
                                    <CDropdownMenu>
                                        <CDropdownItem
                                            role="button"
                                            active={filterRate === 'all'}
                                            onClick={() => setFilterRate('all')}
                                        >
                                            Bất kỳ
                                        </CDropdownItem>
                                        <CDropdownItem
                                            role="button"
                                            active={filterRate === 'positive'}
                                            onClick={() => setFilterRate('positive')}
                                        >
                                            Đánh giá tích cực (3-5 sao)
                                        </CDropdownItem>
                                        <CDropdownItem
                                            role="button"
                                            active={filterRate === 'negative'}
                                            onClick={() => setFilterRate('negative')}
                                        >
                                            Đánh giá tiêu cực (1-2 sao)
                                        </CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                            </div>
                        </CCardHeader>
                        <CCardBody style={{ height: '367px', overflow: 'auto' }}>
                            {filterList.map((review) => (
                                <Review
                                    review={review}
                                    updateList={updateList}
                                    key={review.id}
                                ></Review>
                            ))}
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol lg={3}>
                    <CRow className="flex-column">
                        <CCol>
                            <CCard>
                                <CCardHeader>
                                    <b>Tổng số đánh giá</b>
                                </CCardHeader>
                                <CCardBody style={{ textAlign: 'center' }}>
                                    <b style={{ fontSize: '20px' }}>{listAllReviewIn.length}</b>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol>
                            <CCard>
                                <CCardHeader>
                                    <b>Mức độ hài lòng trung bình</b>
                                </CCardHeader>
                                <CCardBody style={{ textAlign: 'center' }}>
                                    <b
                                        style={{ fontSize: '20px' }}
                                    >{`${getAverageRating()} / 5`}</b>
                                    <CChart
                                        type="doughnut"
                                        data={{
                                            labels: ['5 sao', '4 sao', '3 sao', '2 sao', '1 sao'],
                                            datasets: [
                                                {
                                                    backgroundColor: [
                                                        '#41B883',
                                                        '#E46651',
                                                        '#00D8FF',
                                                        '#DD1B16',
                                                        '#FFCE56',
                                                    ],
                                                    data: rateData(),
                                                },
                                            ],
                                        }}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    labels: {
                                                        color: getStyle('--cui-body-color'),
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
        </div>
    )
}

const CompanyDetail = () => {
    const listCompany = useSelector(selectListCompany)
    const curCompany = useSelector(selectCurCompany)
    const [validated, setValidated] = useState(false)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [isUpdate, setIsUpdate] = useState(false)
    const listFixSchedule = useSelector(selectListFixSchedule)
    const listCurFix = listFixSchedule.filter((schedule) => {
        if (schedule.trip && schedule.trip.busCompany)
            return schedule.trip.busCompany.id === curCompany.busCompany.id
        else return false
    })
    const { busCompany, admin } = curCompany ? curCompany : { busCompany: null, admin: null }
    const [openComfirmForm, setOpenComfirmForm] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [companyInfo, setCompanyInfo] = useState({
        firmName: busCompany ? busCompany.name : '',
        representName: admin ? admin.name : '',
        email: admin ? admin.email : '',
        idCard: admin ? admin.staff.idCard : '',
        telephone: admin ? admin.tel : '',
        businessLicense: busCompany ? busCompany.businessLicense : '',
        address: admin ? admin.staff.address : '',
    })
    const listAssign = useSelector(selectListAssign)
    const curAssign = listAssign.filter(
        (assign) => assign.busCompanyId === curCompany.busCompany.id,
    )
    const listRoute = useSelector(selectListRoute)
    const handleChangeCompanyInfo = (e) => {
        setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value })
    }
    const dataForm = useRef(null)
    const [listReview, setListReview] = useState([])
    const handleUpdateInfo = () => {
        if (isUpdate) {
            if (dataForm.current.checkValidity() === true) {
                setValidated(true)
                setLoading(true)
                const companyData = {
                    id: curCompany.busCompany.id,
                    representName: companyInfo.representName,
                    email: companyInfo.email,
                    telephone: companyInfo.telephone,
                    idCard: companyInfo.idCard,
                    address: companyInfo.address,
                    beginWorkDate: curCompany.busCompany.coopDay,
                    firmName: companyInfo.firmName,
                    businessLicense: companyInfo.businessLicense,
                }
                dispatch(companyThunk.editCompanyInfor(companyData))
                    .unwrap()
                    .then((res) => {
                        dispatch(companyActions.setCurCompany(res))
                        setLoading(false)
                        setIsUpdate(false)
                        addToast(() =>
                            CustomToast({
                                message: 'Sửa thông tin thành công',
                                type: 'success',
                            }),
                        )
                    })
                    .catch((err) => {
                        setLoading(false)
                        addToast(() =>
                            CustomToast({
                                message: err.message || err,
                                type: 'error',
                            }),
                        )
                    })
            } else {
                setValidated(true)
            }
        } else {
            setIsUpdate(true)
        }
    }
    const handleCancel = () => {
        setIsUpdate(false)
        setCompanyInfo({
            firmName: busCompany ? busCompany.name : '',
            representName: admin ? admin.name : '',
            email: admin ? admin.email : '',
            idCard: admin ? admin.staff.idCard : '',
            telephone: admin ? admin.tel : '',
            businessLicense: busCompany ? busCompany.businessLicense : '',
            address: admin ? admin.staff.address : '',
        })
    }
    const [openAddRouteForm, setOpenAddRouteForm] = useState(false)
    const handleOpenForm = () => {
        setOpenComfirmForm(true)
        setIsDelete(curCompany.busCompany.active)
    }
    const handleActiveCompany = () => {
        setLoading(true)
        dispatch(
            companyThunk.activeCompany({ companyId: curCompany.busCompany.id, active: !isDelete }),
        )
            .unwrap()
            .then((res) => {
                setOpenComfirmForm(false)
                addToast(() => CustomToast({ message: 'Thay đổi thành công', type: 'success' }))
                setLoading(false)
                dispatch(companyThunk.getCompany())
            })
            .catch((err) => {
                setLoading(false)
            })
    }
    const getListReview = () => {
        if (curCompany) {
            dispatch(companyThunk.getReview(curCompany.busCompany.id))
                .unwrap()
                .then((res) => {
                    setListReview(res)
                })
                .catch((err) => console.log(err))
        }
    }
    useEffect(() => {
        dispatch(scheduleThunk.getFixSchedule())
        dispatch(companyThunk.getAssignedRouteForCompany())
        dispatch(routeThunk.getRoute())
    }, [])
    useEffect(() => {
        if (curCompany) {
            const updateCompany = listCompany.find(
                (company) => company.busCompany.id === curCompany.busCompany.id,
            )
            if (updateCompany) {
                dispatch(companyActions.setCurCompany(updateCompany))
            }
        }
    }, [listCompany])
    useEffect(() => {
        getListReview()
    }, [curCompany])
    return (
        <div>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <CCard className="my-3">
                <CCardHeader style={{ backgroundColor: '#ccc' }}>Thông tin liên hệ</CCardHeader>
                <CCardBody>
                    <CForm className="w-100" noValidate validated={validated} ref={dataForm}>
                        <CRow className="mb-3 justify-content-center align-items-center">
                            <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                                <b>Tên nhà xe</b>
                            </CFormLabel>
                            <CCol sm={8}>
                                <CFormInput
                                    type="text"
                                    id="firmName"
                                    readOnly={!isUpdate}
                                    name={companyInput.firmName.name}
                                    pattern={companyInput.firmName.pattern}
                                    required={companyInput.firmName.required}
                                    value={companyInfo.firmName}
                                    onChange={handleChangeCompanyInfo}
                                />
                                <CFormFeedback invalid>
                                    {companyInput.firmName.errorMessage}
                                </CFormFeedback>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3 justify-content-center align-items-center">
                            <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                                <b>Đại diện</b>
                            </CFormLabel>
                            <CCol sm={3}>
                                <CFormInput
                                    type="text"
                                    id="representName"
                                    readOnly={!isUpdate}
                                    name={companyInput.representName.name}
                                    pattern={companyInput.representName.pattern}
                                    value={companyInfo.representName}
                                    onChange={handleChangeCompanyInfo}
                                />
                                <CFormFeedback invalid>
                                    {companyInput.representName.errorMessage}
                                </CFormFeedback>
                            </CCol>
                            <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                                <b>Số điện thoại</b>
                            </CFormLabel>
                            <CCol sm={3}>
                                <CFormInput
                                    type="text"
                                    id="telephone"
                                    name="telephone"
                                    readOnly={!isUpdate}
                                    required={companyInput.telephone.required}
                                    pattern={companyInput.telephone.pattern}
                                    value={companyInfo.telephone}
                                    onChange={handleChangeCompanyInfo}
                                />
                                <CFormFeedback invalid>
                                    {companyInput.telephone.errorMessage}
                                </CFormFeedback>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3 justify-content-center align-items-center">
                            <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                                <b>CCCD</b>
                            </CFormLabel>
                            <CCol sm={8}>
                                <CFormInput
                                    type="text"
                                    id="idCard"
                                    name="idCard"
                                    readOnly={!isUpdate}
                                    required={companyInput.idCard.required}
                                    pattern={companyInput.idCard.pattern}
                                    value={companyInfo.idCard}
                                    onChange={handleChangeCompanyInfo}
                                />
                                <CFormFeedback invalid>
                                    {companyInput.idCard.errorMessage}
                                </CFormFeedback>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3 justify-content-center align-items-center">
                            <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                                <b>Email</b>
                            </CFormLabel>
                            <CCol sm={8}>
                                <CFormInput
                                    type="text"
                                    id="email"
                                    name="email"
                                    readOnly={!isUpdate}
                                    required={companyInput.email.required}
                                    pattern={companyInput.email.pattern}
                                    value={companyInfo.email}
                                    onChange={handleChangeCompanyInfo}
                                />
                                <CFormFeedback invalid>
                                    {companyInput.email.errorMessage}
                                </CFormFeedback>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3 justify-content-center align-items-center">
                            <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                                <b>Địa chỉ</b>
                            </CFormLabel>
                            <CCol sm={8}>
                                <CFormInput
                                    type="text"
                                    id="address"
                                    name="address"
                                    readOnly={!isUpdate}
                                    required={companyInput.address.required}
                                    pattern={companyInput.address.pattern}
                                    value={companyInfo.address}
                                    onChange={handleChangeCompanyInfo}
                                />
                                <CFormFeedback invalid>
                                    {companyInput.address.errorMessage}
                                </CFormFeedback>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3 justify-content-center align-items-center">
                            <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                                <b>Số giấy phép kinh doanh</b>
                            </CFormLabel>
                            <CCol sm={8}>
                                <CFormInput
                                    type="text"
                                    id="businessLicense"
                                    name="businessLicense"
                                    readOnly={!isUpdate}
                                    required={companyInput.businessLicense.required}
                                    pattern={companyInput.businessLicense.pattern}
                                    value={companyInfo.businessLicense}
                                    onChange={handleChangeCompanyInfo}
                                />
                                <CFormFeedback invalid>
                                    {companyInput.businessLicense.errorMessage}
                                </CFormFeedback>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3 justify-content-center align-items-center">
                            {!curCompany.busCompany.active && (
                                <i style={{ color: 'red' }} className="col-sm-10">
                                    Đã ngừng hợp tác với nhà xe này
                                </i>
                            )}
                        </CRow>
                    </CForm>
                </CCardBody>
                <CCardFooter className="d-flex justify-content-between align-items-center">
                    <div className="col-6 offset-1">
                        <CustomButton
                            color="success"
                            onClick={handleUpdateInfo}
                            text={isUpdate ? 'Lưu' : 'Sửa thông tin'}
                            loading={loading}
                        ></CustomButton>
                        {isUpdate && (
                            <CButton
                                variant="outline"
                                color="danger"
                                onClick={handleCancel}
                                className="mx-2"
                            >
                                Hủy
                            </CButton>
                        )}
                    </div>
                    <div className="col-6 offset-2">
                        <CButton color="danger" variant="outline" onClick={handleOpenForm}>
                            {curCompany.busCompany.active ? 'Ngưng hợp tác' : 'Hợp tác lại'}
                        </CButton>
                    </div>
                </CCardFooter>
            </CCard>
            <CCard className="my-3">
                <CCardHeader style={{ backgroundColor: '#ccc' }}>Thông tin tuyến xe</CCardHeader>
                <CCardBody>
                    {curAssign.length > 0 ? (
                        <CAccordion flush>
                            {curAssign.map((assign, index) => (
                                <CAccordionItem itemKey={index} key={index}>
                                    <CAccordionHeader>{`Tuyến ${index + 1}: ${getRouteJourney(
                                        listRoute?.find((route) => route.id === assign.routeId),
                                    )}`}</CAccordionHeader>
                                    <CAccordionBody>
                                        <RouteInfo
                                            route={listRoute.find(
                                                (route) => route.id === assign.routeId,
                                            )}
                                            fixSchedule={listCurFix.filter((schedule) => {
                                                if (schedule.trip && schedule.trip.route)
                                                    return schedule.trip.route.id === assign.routeId
                                                else return false
                                            })}
                                        ></RouteInfo>
                                    </CAccordionBody>
                                </CAccordionItem>
                            ))}
                        </CAccordion>
                    ) : (
                        <div>Chưa có tuyến xe</div>
                    )}
                    <div className="d-flex justify-content-center">
                        <CButton
                            variant="outline"
                            color="info"
                            className="mt-2"
                            onClick={() => setOpenAddRouteForm(true)}
                        >
                            Thêm tuyến
                        </CButton>
                    </div>
                    <AddRouteForm
                        visible={openAddRouteForm}
                        setVisible={setOpenAddRouteForm}
                        curAssign={curAssign}
                    ></AddRouteForm>
                </CCardBody>
            </CCard>
            <CCard>
                <CCardHeader style={{ backgroundColor: '#ccc' }}>Thông tin dịch vụ</CCardHeader>
                <CCardBody>
                    <FeeInfo listAssignRouteId={curAssign}></FeeInfo>
                </CCardBody>
            </CCard>
            <CCard className="my-3">
                <CCardHeader style={{ backgroundColor: '#ccc' }}>Đánh giá nhà xe</CCardHeader>
                <CCardBody>
                    <ReviewSection></ReviewSection>
                </CCardBody>
            </CCard>
            <CModal visible={openComfirmForm} onClose={() => setOpenComfirmForm(false)}>
                <CModalHeader>
                    <b>Xác nhận tác vụ</b>
                </CModalHeader>
                <CModalBody>
                    {isDelete
                        ? 'Bạn có chắc chắn muốn ngừng hợp tác với nhà xe này?'
                        : 'Bạn có chắc chắn muốn tiếp tục hợp tác với nhà xe này?'}
                    <div className="d-flex justify-content-end gap-2 mt-2">
                        <CustomButton
                            text="Xác nhận"
                            loading={loading}
                            onClick={handleActiveCompany}
                        ></CustomButton>
                        <CustomButton
                            text="Hủy"
                            variant="outline"
                            color="danger"
                            onClick={() => setOpenComfirmForm(false)}
                        ></CustomButton>
                    </div>
                </CModalBody>
            </CModal>
        </div>
    )
}

export default CompanyDetail
