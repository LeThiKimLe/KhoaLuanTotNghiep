import React, { useEffect, useState, useRef, useCallback } from 'react'
import { CButton, CCardTitle } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import routeThunk from 'src/feature/route/route.service'
import { selectListOfficialRoute } from 'src/feature/route/route.slice'
import {
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CCard,
    CCardBody,
    CCardFooter,
    CFormFeedback,
    CFormInput,
    CFormCheck,
    CRow,
    CForm,
    CCol,
    CCardHeader,
    CFormLabel,
    CFormSelect,
    CModalFooter,
    CButtonGroup,
    CCollapse,
    CTable,
    CTableHead,
    CTableBody,
    CTableHeaderCell,
    CTableDataCell,
    CTableRow,
    CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTransfer, cilX, cilPlus, cilCaretBottom } from '@coreui/icons'
import { getLocationData } from 'src/utils/routeUtils'
import CustomButton from 'src/views/customButton/CustomButton'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import TimePicker from 'react-time-picker'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import { convertTimeToInt } from 'src/utils/convertUtils'
import { dayInWeekSum, dayInWeek } from 'src/utils/constants'
import {
    companyActions,
    selectListRequest,
    selectOpenListRequest,
    selectListCompany,
    selectListAssign,
    selectCurCompany,
} from 'src/feature/bus-company/busCompany.slice'
import { COLOR } from 'src/utils/constants'
import locationThunk from 'src/feature/location/location.service'
import { selectListLocation } from 'src/feature/location/location.slice'
import { selectListRoute } from 'src/feature/route/route.slice'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import tripThunk from 'src/feature/trip/trip.service'
import scheduleThunk from 'src/feature/schedule/schedule.service'
import { CustomToast } from 'src/views/customToast/CustomToast'
import mapThunk from 'src/feature/map/map.service'
import stationThunk from 'src/feature/station/station.service'
import { selectConnection } from 'src/feature/socket/socket.slice'
import { convertToDisplayDate } from 'src/utils/convertUtils'
import { companyInput } from 'src/utils/constants'
import { getRouteJourney, reverseString } from 'src/utils/tripUtils'

const TimeBox = ({ time, removeTime, fix, turn }) => {
    const [showRemove, setShowRemove] = useState(false)
    const handleRemove = () => {
        removeTime(time, turn)
    }
    return (
        <CCard textColor={fix === true ? 'success' : 'warning'} className="border-warning mb-1">
            <CCardBody
                className="p-2 position-relative text-center"
                onMouseEnter={() => setShowRemove(true)}
                onMouseLeave={() => setShowRemove(false)}
            >
                <b>{time}</b>
                <CIcon
                    className="position-absolute top-0 right-0"
                    role="button"
                    icon={cilX}
                    style={{
                        visibility: showRemove && fix === false ? '' : 'hidden',
                        color: 'black',
                    }}
                    onClick={removeTime}
                ></CIcon>
            </CCardBody>
        </CCard>
    )
}

const ScheduleBox = ({
    index,
    listTime,
    listRepeat,
    addTime,
    removeTime,
    changeRepeat,
    turn,
    end,
    addTurn,
    removeTurn,
}) => {
    const [openTimer, setOpenTimer] = useState(false)
    const [curTime, setCurTime] = useState('07:00')
    const [openOption, setOpenOption] = useState(false)
    const getRepeatSum = () => {
        let sumString = ''
        if (listRepeat.length === 7) sumString = 'Mỗi ngày'
        else if (listRepeat.length === 0) sumString = 'Lặp lại'
        else {
            listRepeat.forEach((day) => {
                sumString = sumString + dayInWeekSum[day - 2] + ', '
            })
            sumString = sumString.slice(0, -2)
        }
        return sumString
    }
    const changeRepeatOption = (e) => {
        const value = parseInt(e.target.value)
        if (listRepeat.includes(value)) {
            changeRepeat(
                index,
                listRepeat.filter((day) => day !== value),
                turn,
            )
        } else {
            const newRepeat = [...listRepeat]
            newRepeat.sort((a, b) => (a < b ? -1 : 1))
            newRepeat.push(value)
            changeRepeat(index, newRepeat, turn)
        }
    }
    const handleEveryDay = () => {
        if (listRepeat.length === 7) changeRepeat(index, [], turn)
        else changeRepeat(index, [2, 3, 4, 5, 6, 7, 8], turn)
    }
    return (
        <CRow className="mb-3 justify-content-center">
            <CFormLabel htmlFor="maxSchedule" className="col-sm-2 col-form-label">
                <b>{turn === 1 ? 'Lịch trình lượt đi' : 'Lịch trình lượt về'}</b>
            </CFormLabel>
            <CCol sm={5}>
                <CCard style={{ minHeight: '80px', maxHeight: '150px', overflow: 'auto' }}>
                    <CCardBody>
                        <CRow
                            style={{
                                height: 'fit-content',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            {listTime.map((timer, idx) => (
                                <CCol key={idx} xs="4">
                                    <TimeBox
                                        time={timer.time}
                                        removeTime={() => removeTime(index, timer.time, turn)}
                                        fix={timer.fix}
                                        turn={turn}
                                    ></TimeBox>
                                </CCol>
                            ))}
                            <CCol xs="4">
                                {!openTimer && (
                                    <CButton
                                        variant="outline"
                                        id={turn === 1 ? 'go' : 'return'}
                                        color="info"
                                        onClick={() => setOpenTimer(!openTimer)}
                                    >
                                        <CIcon icon={cilPlus}></CIcon>
                                    </CButton>
                                )}
                                {openTimer && (
                                    <CCard
                                        className="p-1"
                                        style={{
                                            width: '145px',
                                            zIndex: 2,
                                        }}
                                    >
                                        <CCardBody className="d-flex gap-1 align-items-center justify-content-center p-0">
                                            <TimePicker
                                                format="HH:mm"
                                                onChange={setCurTime}
                                                value={curTime}
                                                clearIcon={null}
                                                disableClock={true}
                                            />
                                            <CButton
                                                id={turn === 1 ? 'add-go' : 'add-return'}
                                                letiant="outline"
                                                color="info"
                                                onClick={() => {
                                                    addTime(index, curTime, turn)
                                                    setOpenTimer(false)
                                                }}
                                                style={{ width: 'fit-content', padding: '3px 5px' }}
                                            >
                                                OK
                                            </CButton>
                                        </CCardBody>
                                    </CCard>
                                )}
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol sm={3}>
                <div>
                    <CButton
                        className="w-100 d-flex gap-1 justify-content-between align-items-center"
                        variant="outline"
                        color="info"
                        onClick={() => setOpenOption(!openOption)}
                    >
                        <span>{getRepeatSum()}</span>
                        <CIcon icon={cilCaretBottom} color="info"></CIcon>
                    </CButton>
                    {end && (
                        <span role="button" onClick={() => addTurn(turn)}>
                            <i>+ Thêm </i>
                        </span>
                    )}
                    <span role="button" onClick={() => removeTurn(index, turn)}>
                        <i>{` / - Xóa`}</i>
                    </span>
                    {openOption && (
                        <CCard className="position-absolute top-1">
                            <CCardBody>
                                <CFormCheck
                                    id={0}
                                    label="Mỗi ngày"
                                    checked={listRepeat.length === 7}
                                    onChange={handleEveryDay}
                                ></CFormCheck>
                                {dayInWeek.map((day, index) => (
                                    <CFormCheck
                                        key={index}
                                        id={index + 2}
                                        checked={listRepeat.includes(index + 2)}
                                        value={index + 2}
                                        label={day}
                                        onChange={changeRepeatOption}
                                    ></CFormCheck>
                                ))}
                            </CCardBody>
                        </CCard>
                    )}
                </div>
            </CCol>
        </CRow>
    )
}

export const CompanyRoute = ({ id, addCompanyRoute, companyRoute }) => {
    const listLocation = useRef([])
    const listOfficialRoute = useSelector(selectListOfficialRoute)
    const [listDeparture, setListDeparture] = useState([])
    const [listDestination, setListDestination] = useState([])
    const [listStartStation, setListStartStation] = useState([])
    const [listEndStation, setListEndStation] = useState([])
    const [listJourney, setListJourney] = useState([])
    const [curDeparture, setCurDeparture] = useState(-1)
    const [curDestination, setCurDestination] = useState(-1)
    const [curStartStation, setCurStartStation] = useState(-1)
    const [curEndStation, setCurEndStation] = useState(-1)
    const [error, setError] = useState('')
    const [curJourney, setCurJourney] = useState(-1)
    const [isBackup, setIsBackup] = useState(false)
    const [listTimeGo, setListTimeGo] = useState(
        companyRoute.listTimeGo
            ? companyRoute.listTimeGo
            : [
                  {
                      listTime: [],
                      listRepeat: [2, 3, 4, 5, 6, 7, 8],
                  },
              ],
    )
    const [listTimeReturn, setListTimeReturn] = useState(
        companyRoute.listTimeReturn
            ? companyRoute.listTimeReturn
            : [
                  {
                      listTime: [],
                      listRepeat: [2, 3, 4, 5, 6, 7, 8],
                  },
              ],
    )
    const [curRoute, setCurRoute] = useState(companyRoute.route ? companyRoute.route : null)

    const getNewListDestination = (departure) => {
        const listDestinationNew = []
        listOfficialRoute.forEach((route) => {
            if (
                route.departure === departure &&
                listDestinationNew.findIndex((location) => location.name === route.destination) ===
                    -1
            ) {
                listDestinationNew.push(
                    listLocation.current.find((location) => location.name === route.destination),
                )
            }
            if (
                route.destination === departure &&
                listDestinationNew.findIndex((location) => location.name === route.departure) === -1
            ) {
                listDestinationNew.push(
                    listLocation.current.find((location) => location.name === route.departure),
                )
            }
        })
        return listDestinationNew
    }

    const getListDestination = useCallback(() => {
        if (curDeparture === -1) return []
        const departure = listDeparture[curDeparture]
        return getNewListDestination(departure.name)
    }, [curDeparture])

    const getNewListStation = (departure, destination) => {
        const listAvaiRoute = listOfficialRoute.filter(
            (route) =>
                (route.departure === departure.name && route.destination === destination.name) ||
                (route.departure === destination.name && route.destination === departure.name),
        )
        const listStartStationNew = departure.listStation.filter((station) => {
            if (
                listAvaiRoute.findIndex(
                    (route) => route.startStation === station || route.endStation === station,
                ) !== -1
            )
                return true
            return false
        })
        const listEndStationNew = destination.listStation.filter((station) => {
            if (
                listAvaiRoute.findIndex(
                    (route) => route.startStation === station || route.endStation === station,
                ) !== -1
            )
                return true
            return false
        })
        return { listStartStation: listStartStationNew, listEndStation: listEndStationNew }
    }

    const getNewListEndStation = () => {
        const listAvaiRoute = listOfficialRoute.filter(
            (route) =>
                ((route.departure === listDeparture[curDeparture].name &&
                    route.destination === listDestination[curDestination].name) ||
                    (route.departure === listDestination[curDestination].name &&
                        route.destination === listDeparture[curDeparture].name)) &&
                (route.startStation === listStartStation[curStartStation] ||
                    route.endStation === listStartStation[curStartStation]),
        )
        const listEndStationNew = listDestination[curDestination].listStation.filter((station) => {
            if (
                listAvaiRoute.findIndex(
                    (route) => route.startStation === station || route.endStation === station,
                ) !== -1
            )
                return true
            return false
        })
        return listEndStationNew
    }

    const getListStation = useCallback(() => {
        if (curDeparture === -1 || curDestination === -1)
            return {
                listStartStation: [],
                listEndStation: [],
            }
        const departure = listDeparture[curDeparture]
        const destination = listDestination[curDestination]
        return getNewListStation(departure, destination)
    }, [curDeparture, curDestination])

    const getListAvaiRoute = (dep, des, startSta, endSta) => {
        return listOfficialRoute.filter(
            (route) =>
                (route.departure === dep &&
                    route.destination === des &&
                    route.startStation === startSta &&
                    route.endStation === endSta) ||
                (route.departure === des &&
                    route.destination === dep &&
                    route.startStation === endSta &&
                    route.endStation === startSta),
        )
    }

    const getListJourney = useCallback(() => {
        if (curEndStation === -1) return []
        const listJourneyNew = []
        const listAvaiRoute = getListAvaiRoute(
            listDeparture[curDeparture].name,
            listDestination[curDestination].name,
            listStartStation[curStartStation],
            listEndStation[curEndStation],
        )
        listAvaiRoute.forEach((route) => {
            if (
                route.journey.indexOf(listStartStation[curStartStation]) >
                route.journey.indexOf(listEndStation[curEndStation])
            ) {
                console.log('reverse')
                console.log(route.journey)
                console.log(reverseString(route.journey))
                listJourneyNew.push(reverseString(route.journey))
            } else listJourneyNew.push(route.journey)
        })
        return listJourneyNew
    }, [curEndStation])

    const addTime = (index, time, turn) => {
        if (turn === 1) {
            if (listTimeGo[index].listTime.findIndex((timer) => timer.time === time) !== -1) return
            setListTimeGo((prev) => {
                const newTime = [...prev]
                newTime[index].listTime.push({ time: time, fix: false })
                newTime[index].listTime.sort((a, b) =>
                    convertTimeToInt(a.time) < convertTimeToInt(b.time) ? -1 : 1,
                )
                return newTime
            })
        } else {
            if (listTimeReturn[index].listTime.findIndex((timer) => timer.time === time) !== -1)
                return
            setListTimeReturn((prev) => {
                const newTime = [...prev]
                newTime[index].listTime.push({ time: time, fix: false })
                newTime[index].listTime.sort((a, b) =>
                    convertTimeToInt(a.time) < convertTimeToInt(b.time) ? -1 : 1,
                )
                return newTime
            })
        }
    }

    const removeTime = (index, time, turn) => {
        if (turn === 1) {
            console.log(listTimeGo)
            console.log(index)
            setListTimeGo((prev) => {
                const newTime = [...prev]
                const newList = newTime[index].listTime.filter((timer) => timer.time !== time)
                newTime[index].listTime = newList
                console.log(newTime)
                return newTime
            })
        } else {
            setListTimeReturn((prev) => {
                const newTime = [...prev]
                const newList = newTime[index].listTime.filter((timer) => timer.time !== time)
                newTime[index].listTime = newList
                return newTime
            })
        }
    }

    const changeRepeat = (index, listRepeat, turn) => {
        if (turn === 1) {
            setListTimeGo((prev) => {
                const newTime = [...prev]
                newTime[index].listRepeat = listRepeat
                return newTime
            })
        } else {
            setListTimeReturn((prev) => {
                const newTime = [...prev]
                newTime[index].listRepeat = listRepeat
                return newTime
            })
        }
    }

    const addTurn = (turn) => {
        if (turn === 1) {
            setListTimeGo((prev) => {
                const newTime = [...prev]
                newTime.push({ listTime: [], listRepeat: [] })
                return newTime
            })
        } else {
            setListTimeReturn((prev) => {
                const newTime = [...prev]
                newTime.push({ listTime: [], listRepeat: [] })
                return newTime
            })
        }
    }

    const removeTurn = (index, turn) => {
        if (turn === 1) {
            if (listTimeGo.length === 1) return
            setListTimeGo((prev) => {
                const newTime = [...prev]
                const newList = newTime.filter((timer, i) => i !== index)
                return newList
            })
        } else {
            if (listTimeReturn.length === 1) return
            setListTimeReturn((prev) => {
                const newTime = [...prev]
                const newList = newTime.filter((timer, i) => i !== index)
                return newList
            })
        }
    }

    const findCommonElements = (array1, array2) => {
        var commonElements = []
        for (var i = 0; i < array1.length; i++) {
            if (array2.includes(array1[i])) {
                commonElements.push(array1[i])
            }
        }
        return commonElements
    }

    const checkRepeat = (turn) => {
        let listTimeIn = turn === 1 ? listTimeGo : listTimeReturn
        let commonTime, commonRepeat
        for (let i = 0; i < listTimeIn.length - 1; i++) {
            commonTime = findCommonElements(
                listTimeIn[i].listTime.map((time) => time.time),
                listTimeIn[i + 1].listTime.map((time) => time.time),
            )
            commonRepeat = findCommonElements(
                listTimeIn[i].listRepeat,
                listTimeIn[i + 1].listRepeat,
            )
            if (commonTime.length > 0 && commonRepeat.length > 0) {
                return `Trùng lịch trình lượt ${
                    turn === 1 ? 'Lượt đi' : 'Lượt về'
                } ${commonTime.toString()} vào ${commonRepeat
                    .map((repeat) => dayInWeek[repeat - 2])
                    .toString()}`
            }
        }
        return ''
    }
    const checkEmpty = (turn) => {
        let listTimeIn = turn === 1 ? listTimeGo : listTimeReturn
        for (let i = 0; i < listTimeIn.length; i++) {
            if (listTimeIn[i].listTime.length === 0) {
                return `Lịch trình lượt ${turn === 1 ? 'lượt đi' : 'lượt về'} thứ ${
                    i + 1
                } không được để trống`
            }
            if (listTimeIn[i].listRepeat.length === 0) {
                return `Vui lòng chọn lịch lặp lại cho lịch trình ${
                    turn === 1 ? 'lượt đi' : 'lượt về'
                } thứ ${i + 1}`
            }
        }
        return ''
    }

    const handleBackUp = () => {
        const initDep = listLocation.current.findIndex(
            (location) => location.name === companyRoute.route.departure,
        )
        const listDes = getNewListDestination(listLocation.current[initDep].name)
        const initDes = listDes.findIndex(
            (location) => location.name === companyRoute.route.destination,
        )
        const listSta = getNewListStation(listLocation.current[initDep], listDes[initDes])
        const initStaStation = listSta.listStartStation.findIndex(
            (station) => station === companyRoute.route.startStation,
        )
        const initEndStation = listSta.listEndStation.findIndex(
            (station) => station === companyRoute.route.endStation,
        )
        const listAvaiRoute = getListAvaiRoute(
            listLocation.current[initDep].name,
            listDes[initDes].name,
            listSta.listStartStation[initStaStation],
            listSta.listEndStation[initEndStation],
        ).map((route) => route.journey)
        const initJourney = listAvaiRoute.findIndex(
            (journey) => journey === companyRoute.route.journey,
        )
        setCurDeparture(initDep)
        setListDestination(listDes)
        setCurDestination(initDes)
        setListStartStation(listSta.listStartStation)
        setListEndStation(listSta.listEndStation)
        setCurStartStation(initStaStation)
        setCurEndStation(initEndStation)
        setListJourney(listAvaiRoute)
        setCurJourney(initJourney)
        setTimeout(() => setIsBackup(false), 1000)
    }

    useEffect(() => {
        if (listOfficialRoute.length !== 0) {
            listLocation.current = getLocationData(listOfficialRoute)
            setListDeparture(listLocation.current)
        }
        if (companyRoute.route) {
            setIsBackup(true)
            setTimeout(() => handleBackUp(), 100)
        }
    }, [])

    useEffect(() => {
        const error1 = checkRepeat(1)
        if (error1 !== '') setError(error1)
        else {
            const error2 = checkRepeat(0)
            if (error2 !== '') setError(error2)
            else setError('')
        }
    }, [listTimeGo, listTimeReturn])

    useEffect(() => {
        if (curDeparture !== -1 && isBackup === false) {
            setListDestination(getListDestination())
            setCurDestination(-1)
            setCurStartStation(-1)
            setCurEndStation(-1)
        }
    }, [curDeparture])
    useEffect(() => {
        if (curDestination !== -1 && isBackup === false) {
            const newStation = getListStation()
            setListStartStation(newStation.listStartStation)
            setListEndStation(newStation.listEndStation)
            setCurStartStation(-1)
            setCurEndStation(-1)
        }
    }, [curDestination])
    useEffect(() => {
        if (isBackup === false) {
            setCurJourney(-1)
            setListJourney(getListJourney())
        }
        if (curEndStation != -1 && curStartStation == -1) {
            setCurEndStation(-1)
        }
    }, [curEndStation, curStartStation])
    useEffect(() => {
        if (curStartStation != -1) {
            setCurEndStation(-1)
            setListEndStation(getNewListEndStation())
        }
    }, [curStartStation])
    useEffect(() => {
        if (curJourney !== -1 && isBackup === false) {
            setCurRoute(
                getListAvaiRoute(
                    listDeparture[curDeparture].name,
                    listDestination[curDestination].name,
                    listStartStation[curStartStation],
                    listEndStation[curEndStation],
                ).find((route) => route.journey === listJourney[curJourney]),
            )
        }
    }, [curJourney])
    useEffect(() => {
        if (
            (curDeparture === -1 ||
                curDestination === -1 ||
                curStartStation === -1 ||
                curEndStation === -1 ||
                curJourney === -1) &&
            isBackup === false
        )
            setCurRoute(null)
    }, [curDeparture, curDestination, curStartStation, curEndStation, curJourney])

    useEffect(() => {
        if (
            curRoute &&
            checkEmpty(1) === '' &&
            checkEmpty(0) === '' &&
            error === '' &&
            isBackup === false
        ) {
            addCompanyRoute(id, curRoute, listTimeGo, listTimeReturn)
        }
    }, [curRoute, listTimeGo, listTimeReturn])
    return (
        <>
            <CRow className="mb-3 justify-content-center align-items-center">
                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                    <b>Chọn tuyến xe</b>
                </CFormLabel>
                <CCol sm="3">
                    <CFormSelect
                        value={curDeparture}
                        onChange={(e) => setCurDeparture(parseInt(e.target.value))}
                    >
                        <option value={-1} disabled>
                            Tỉnh đi
                        </option>
                        {listDeparture.map((dep, index) => (
                            <option key={index} value={index}>
                                {dep.name}
                            </option>
                        ))}
                    </CFormSelect>
                </CCol>
                <CCol sm="2" className="d-flex justify-content-center align-items-center">
                    <CIcon icon={cilTransfer}></CIcon>
                </CCol>
                <CCol sm="3">
                    <CFormSelect
                        value={curDestination}
                        onChange={(e) => setCurDestination(parseInt(e.target.value))}
                    >
                        <option value={-1} disabled>
                            Tỉnh đến
                        </option>
                        {listDestination.map((des, index) => (
                            <option key={index} value={index}>
                                {des.name}
                            </option>
                        ))}
                    </CFormSelect>
                </CCol>
            </CRow>

            <CRow className="mb-3 justify-content-center align-items-center">
                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                    <b>Chọn bến xe</b>
                </CFormLabel>
                <CCol sm="3">
                    <CFormSelect
                        value={curStartStation}
                        onChange={(e) => setCurStartStation(parseInt(e.target.value))}
                    >
                        <option value={-1} disabled>
                            Bến đi
                        </option>
                        {listStartStation.map((start, index) => (
                            <option key={index} value={index}>
                                {start}
                            </option>
                        ))}
                    </CFormSelect>
                </CCol>
                <CCol sm="2" className="d-flex justify-content-center align-items-center">
                    <CIcon icon={cilTransfer}></CIcon>
                </CCol>
                <CCol sm="3">
                    <CFormSelect
                        value={curEndStation}
                        onChange={(e) => setCurEndStation(parseInt(e.target.value))}
                    >
                        <option value={-1} disabled>
                            Bến đến
                        </option>
                        {listEndStation.map((end, index) => (
                            <option key={index} value={index}>
                                {end}
                            </option>
                        ))}
                    </CFormSelect>
                </CCol>
            </CRow>
            <CRow className="mb-3 justify-content-center align-items-center">
                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                    <b>Chọn lộ trình</b>
                </CFormLabel>
                <CCol sm={8}>
                    <CFormSelect
                        value={curJourney}
                        onChange={(e) => setCurJourney(parseInt(e.target.value))}
                    >
                        <option value={-1} disabled>
                            Lộ trình di chuyển
                        </option>
                        {listJourney.map((journey, index) => (
                            <option key={index} value={index}>
                                {journey}
                            </option>
                        ))}
                    </CFormSelect>
                </CCol>
            </CRow>
            <CRow className="mb-3 justify-content-center align-items-center">
                <CCol sm={10} className="border-bottom my-2 border-3"></CCol>
            </CRow>
            {listTimeGo.map((time, index) => (
                <ScheduleBox
                    key={index}
                    index={index}
                    listTime={time.listTime}
                    listRepeat={time.listRepeat}
                    changeRepeat={changeRepeat}
                    addTime={addTime}
                    removeTime={removeTime}
                    turn={1}
                    end={index === listTimeGo.length - 1}
                    addTurn={addTurn}
                    removeTurn={removeTurn}
                ></ScheduleBox>
            ))}
            <CRow className="mb-3 justify-content-center align-items-center">
                <CCol sm={10} className="border-bottom my-2 border-3"></CCol>
            </CRow>
            {listTimeReturn.map((time, index) => (
                <ScheduleBox
                    key={index}
                    listTime={time.listTime}
                    index={index}
                    listRepeat={time.listRepeat}
                    changeRepeat={changeRepeat}
                    addTime={addTime}
                    removeTime={removeTime}
                    turn={0}
                    end={index === listTimeReturn.length - 1}
                    addTurn={addTurn}
                    removeTurn={removeTurn}
                ></ScheduleBox>
            ))}
            <CRow className="mb-3 justify-content-center align-items-center">
                <CCol sm={10} className="border-bottom my-2 border-3"></CCol>
                <CCol sm={10}>
                    <i style={{ color: 'red' }}>{error}</i>
                </CCol>
            </CRow>
        </>
    )
}

const OpenForm = ({ visible, setVisible, preInfo }) => {
    const [companyInfo, setCompanyInfo] = useState({
        firmName: preInfo?.businessName,
        representName: preInfo?.name,
        email: preInfo?.email,
        idCard: preInfo.idCard ? preInfo.idCard : '',
        telephone: preInfo?.tel,
        businessLicense: preInfo?.businessLicense,
        address: preInfo.address ? preInfo.address : '',
    })
    const [error, setError] = useState('')
    const [validated, setValidated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(0)
    const listLocationIn = useSelector(selectListLocation)
    const listLocation = useRef(listLocationIn)
    const listRouteIn = useSelector(selectListRoute)
    const listRoute = useRef(listRouteIn)
    const dataForm = useRef(null)
    const listCompany = useSelector(selectListCompany)
    const socketConnect = useSelector(selectConnection)
    const [listCompanyRoute, setListCompanyRoute] = useState([
        {
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
        },
    ])
    const handleChangeCompanyInfo = (e) => {
        setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value })
    }
    const reset = () => {
        setCompanyInfo({
            firmName: '',
            representName: '',
            email: '',
            telephone: '',
            businessLicense: '',
        })
    }
    const updateCompanyRoute = (index, route, listGo, listReturn, price = 0) => {
        const routeData = {
            route: route,
            listTimeGo: listGo,
            listTimeReturn: listReturn,
            price: price,
        }
        setListCompanyRoute((prevRoutes) => {
            const newRoutes = [...prevRoutes]
            newRoutes[index] = routeData
            return newRoutes
        })
    }
    const addRouteTab = () => {
        let newRoutes = []
        if (listCompanyRoute.every((route) => route.route !== null)) {
            setListCompanyRoute((prevRoutes) => {
                newRoutes = [...prevRoutes]
                newRoutes.push({
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
                return newRoutes
            })
            setActiveTab(newRoutes.length)
        } else {
            addToast(() =>
                CustomToast({
                    message: 'Vui lòng hoàn tất các thông tin của tuyến này',
                    type: 'error',
                }),
            )
        }
    }
    const removeRouteTab = (index) => {
        if (listCompanyRoute.length === 1) return
        setListCompanyRoute((prevRoutes) => {
            const newRoutes = prevRoutes.filter((route, i) => i !== index)
            return newRoutes
        })
        setActiveTab(index)
    }
    const handleAddLocation = async (name) => {
        const location = listLocation.current.find((location) => location.name === name)
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
                        .then((listLocal) => {
                            listLocation.current = listLocal
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
                    CustomToast({
                        message: 'Thêm nhà xe và gửi email xác nhận thành công',
                        type: 'success',
                    }),
                )
                // wait 1s to reload page
                await dispatch(companyThunk.noticeCompany(companyId)).unwrap()
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
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
    const handleAddCompany = async () => {
        return await dispatch(companyThunk.getCompany())
            .unwrap()
            .then((res) => {
                const preCompany = res.findIndex(
                    (company) => company?.admin?.email === companyInfo.email,
                )
                if (preCompany !== -1) {
                    return res[preCompany].busCompany.id
                } else return -1
            })
            .then(async (res) => {
                if (res !== -1) {
                    return Promise.resolve(res)
                } else {
                    const companyData = {
                        name: companyInfo.representName,
                        email: companyInfo.email,
                        tel: companyInfo.telephone,
                        gender: true,
                        idCard: companyInfo.idCard,
                        address: companyInfo.address,
                        beginWorkDate: new Date(),
                        businessName: companyInfo.firmName,
                        businessLicense: companyInfo.businessLicense,
                    }
                    return await dispatch(companyThunk.addCompany({ companyInfor: companyData }))
                        .unwrap()
                        .then((res) => {
                            return res?.busCompany?.id
                        })
                        .catch((err) => {
                            setError(err)
                            throw err
                        })
                }
            })
            .catch(async (err) => {
                const companyData = {
                    name: companyInfo.representName,
                    email: companyInfo.email,
                    tel: companyInfo.telephone,
                    gender: true,
                    idCard: companyInfo.idCard,
                    address: companyInfo.address,
                    beginWorkDate: new Date(),
                    businessName: companyInfo.firmName,
                    businessLicense: companyInfo.businessLicense,
                }
                return await dispatch(companyThunk.addCompany({ companyInfor: companyData }))
                    .unwrap()
                    .then((res) => {
                        return res?.busCompany?.id
                    })
                    .catch((err) => {
                        setError(err)
                        throw err
                    })
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
        if (activeTab !== 0) {
            setActiveTab(0)
        }
        setTimeout(async () => {
            if (
                dataForm.current.checkValidity() === true &&
                listCompanyRoute.length > 0 &&
                listCompanyRoute.every((route) => route.route)
            ) {
                setValidated(true)
                setLoading(true)
                let companyId = -1
                await handleAddCompany()
                    .then(async (res) => {
                        companyId = res
                        console.log(companyId)
                        if (companyId != -1) {
                            let route = null
                            let listTrip = []
                            const listRouteId = []
                            for (let i = 0; i < listCompanyRoute.length; i++) {
                                await handleAddRoute(listCompanyRoute[i].route)
                                    .then(async (res) => {
                                        route = res
                                        let startStationId = -1
                                        let endStationId = -1
                                        if (route) {
                                            await handleAddStation(
                                                route.departure.id,
                                                listCompanyRoute[i].route.departure ===
                                                    route.departure.name
                                                    ? listCompanyRoute[i].route.startStation
                                                    : listCompanyRoute[i].route.endStation,
                                            ).then((res) => (startStationId = res))
                                            await handleAddStation(
                                                route.destination.id,
                                                listCompanyRoute[i].route.destination ===
                                                    route.destination.name
                                                    ? listCompanyRoute[i].route.endStation
                                                    : listCompanyRoute[i].route.startStation,
                                            ).then((res) => (endStationId = res))
                                            if (startStationId === -1 || endStationId === -1) {
                                                throw new Error('Invalid ID')
                                            }
                                            await handleAddTrip(
                                                route,
                                                startStationId,
                                                endStationId,
                                                companyId,
                                                listCompanyRoute[i].route.journey,
                                                listCompanyRoute[i].route.distance,
                                                listCompanyRoute[i].route.id,
                                            ).then(async (res) => {
                                                listTrip = res
                                                if (listTrip.length === 2) {
                                                    for (
                                                        let j = 0;
                                                        j < listCompanyRoute[i].listTimeGo.length;
                                                        j++
                                                    ) {
                                                        await handleAddFixSchedule(
                                                            listTrip[0],
                                                            listCompanyRoute[i].listTimeGo[
                                                                j
                                                            ].listTime.map((time) => time.time),
                                                            listCompanyRoute[i].listTimeGo[j]
                                                                .listRepeat,
                                                        )
                                                    }
                                                    for (
                                                        let j = 0;
                                                        j <
                                                        listCompanyRoute[i].listTimeReturn.length;
                                                        j++
                                                    ) {
                                                        await handleAddFixSchedule(
                                                            listTrip[1],
                                                            listCompanyRoute[i].listTimeReturn[
                                                                j
                                                            ].listTime.map((time) => time.time),
                                                            listCompanyRoute[i].listTimeReturn[j]
                                                                .listRepeat,
                                                        )
                                                    }
                                                    handleAddStopStation(
                                                        listTrip,
                                                        startStationId,
                                                        endStationId,
                                                    )
                                                }
                                            })
                                            listRouteId.push(route.id)
                                            if (listRouteId.length === listCompanyRoute.length)
                                                await handleAssignRoute(
                                                    companyId,
                                                    listRouteId,
                                                ).then(() => {
                                                    setLoading(false)
                                                    setTimeout(() => {
                                                        solveCompany(preInfo.tel)
                                                        dispatch(companyThunk.getCompany())
                                                        setVisible(false)
                                                    }, 1000)
                                                })
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        setLoading(false)
                                    })
                            }
                        }
                    })
                    .catch((err) => {
                        addToast(() => CustomToast({ message: err, type: 'error' }))
                        setLoading(false)
                    })
            } else {
                setValidated(true)
                addToast(() =>
                    CustomToast({
                        message:
                            'Một số thông tin chưa hợp lệ. Cần điền đủ thông tin nhà xe và tuyến xe',
                        type: 'error',
                    }),
                )
                return
            }
        }, 500)
    }

    const solveCompany = (companyTel) => {
        const newMessage = {
            type: 'remove',
            tel: companyTel,
        }
        try {
            // Gửi tin nhắn tới máy chủ WebSocket
            if (socketConnect) {
                socketConnect.send(JSON.stringify(newMessage))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(locationThunk.getLocations())
        dispatch(routeThunk.getRoute())
    }, [])
    useEffect(() => {
        listLocation.current = listLocationIn
        listRoute.current = listRouteIn
    }, [listLocationIn, listRouteIn])
    return (
        <>
            <CModal
                alignment="center"
                backdrop="static"
                scrollable
                visible={visible}
                size="lg"
                onClose={() => setVisible(false)}
            >
                <CModalHeader>
                    <CModalTitle>Thêm nhà xe</CModalTitle>
                </CModalHeader>
                <CModalBody className="p-4">
                    <CRow>
                        <CCard className="w-100 p-0">
                            <CCardHeader className="bg-info">
                                <b>Thông tin nhà xe</b>
                            </CCardHeader>
                            <CCardBody>
                                <Tabs
                                    className="tabStyle"
                                    selectedIndex={activeTab}
                                    onSelect={(index) => setActiveTab(index)}
                                >
                                    <TabList>
                                        <Tab>Liên hệ</Tab>
                                        {listCompanyRoute.map((route, index) => (
                                            <Tab key={index}>{`Tuyến xe ${index + 1}`}</Tab>
                                        ))}
                                    </TabList>
                                    <TabPanel>
                                        <CForm
                                            className="w-100"
                                            noValidate
                                            validated={validated}
                                            ref={dataForm}
                                        >
                                            <CRow className="mb-3 justify-content-center align-items-center">
                                                <CFormLabel
                                                    htmlFor="name"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    <b>Tên nhà xe</b>
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        id="firmName"
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
                                                <CFormLabel
                                                    htmlFor="name"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    <b>Đại diện</b>
                                                </CFormLabel>
                                                <CCol sm={3}>
                                                    <CFormInput
                                                        type="text"
                                                        id="representName"
                                                        name={companyInput.representName.name}
                                                        pattern={companyInput.representName.pattern}
                                                        value={companyInfo.representName}
                                                        onChange={handleChangeCompanyInfo}
                                                    />
                                                    <CFormFeedback invalid>
                                                        {companyInput.representName.errorMessage}
                                                    </CFormFeedback>
                                                </CCol>
                                                <CFormLabel
                                                    htmlFor="color"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    <b>Số điện thoại</b>
                                                </CFormLabel>
                                                <CCol sm={3}>
                                                    <CFormInput
                                                        type="text"
                                                        id="telephone"
                                                        name="telephone"
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
                                                <CFormLabel
                                                    htmlFor="color"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    <b>CCCD</b>
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        id="idCard"
                                                        name="idCard"
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
                                                <CFormLabel
                                                    htmlFor="color"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    <b>Email</b>
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        id="email"
                                                        name="email"
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
                                                <CFormLabel
                                                    htmlFor="color"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    <b>Địa chỉ</b>
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        id="address"
                                                        name="address"
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
                                                <CFormLabel
                                                    htmlFor="color"
                                                    className="col-sm-2 col-form-label"
                                                >
                                                    <b>Số giấy phép kinh doanh</b>
                                                </CFormLabel>
                                                <CCol sm={8}>
                                                    <CFormInput
                                                        type="text"
                                                        id="businessLicense"
                                                        name="businessLicense"
                                                        required={
                                                            companyInput.businessLicense.required
                                                        }
                                                        pattern={
                                                            companyInput.businessLicense.pattern
                                                        }
                                                        value={companyInfo.businessLicense}
                                                        onChange={handleChangeCompanyInfo}
                                                    />
                                                    <CFormFeedback invalid>
                                                        {companyInput.businessLicense.errorMessage}
                                                    </CFormFeedback>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </TabPanel>
                                    {listCompanyRoute.map((route, index) => (
                                        <TabPanel key={index}>
                                            <CForm>
                                                <CompanyRoute
                                                    key={index}
                                                    id={index}
                                                    addCompanyRoute={updateCompanyRoute}
                                                    companyRoute={route}
                                                ></CompanyRoute>
                                                <div className="row justify-content-start">
                                                    <CButtonGroup
                                                        role="group"
                                                        aria-label="route"
                                                        className="col-3 offset-1"
                                                    >
                                                        <CButton
                                                            color="success"
                                                            variant="outline"
                                                            onClick={addRouteTab}
                                                        >
                                                            Thêm tuyến
                                                        </CButton>
                                                        {index > 0 && (
                                                            <CButton
                                                                color="danger"
                                                                variant="outline"
                                                                onClick={() =>
                                                                    removeRouteTab(index)
                                                                }
                                                            >
                                                                Xoá tuyến
                                                            </CButton>
                                                        )}
                                                    </CButtonGroup>
                                                </div>
                                            </CForm>
                                        </TabPanel>
                                    ))}
                                </Tabs>
                            </CCardBody>
                            <CCardFooter className="bg-light">
                                {error !== '' ? error : ''}
                            </CCardFooter>
                        </CCard>
                    </CRow>
                </CModalBody>
                <CModalFooter style={{ justifyContent: 'flex-start' }}>
                    <CRow className="w-100 justify-content-between align-items-center">
                        <CCol className="d-flex" sm={10}>
                            <CustomButton
                                text="Lưu thông tin"
                                type="submit"
                                onClick={handleSaveInfo}
                                loading={loading}
                                color="success"
                                style={{ marginRight: '10px' }}
                            ></CustomButton>
                            <CButton
                                variant="outline"
                                style={{ width: '100px' }}
                                color="danger"
                                onClick={reset}
                            >
                                Hủy
                            </CButton>
                        </CCol>
                        <CCol className="d-flex justify-content-end" sm={2}>
                            <CButton
                                color="secondary"
                                onClick={() => setVisible(false)}
                                style={{ width: 'fit-content' }}
                            >
                                Đóng
                            </CButton>
                        </CCol>
                    </CRow>
                </CModalFooter>
            </CModal>
            <CToaster ref={toaster} push={toast} placement="top-end" />
        </>
    )
}

const BusCompany = ({ companyInfo }) => {
    const { busCompany, admin } = companyInfo
    //get random color from list
    const listRoute = useSelector(selectListRoute)
    const listAssign = useSelector(selectListAssign)
    const curAssign = listAssign.filter((assign) => assign.busCompanyId === busCompany.id)
    const [randomColor, setRandomColor] = useState(
        COLOR[Math.floor(Math.random() * (COLOR.length - 1))],
    )
    const dispatch = useDispatch()
    const [isHover, setIsHover] = useState(false)
    const openDetailPage = () => {
        dispatch(companyActions.setCurCompany(companyInfo))
        setTimeout(() => {
            window.location.href = '#/ticket-system/bus-companies/company-detail'
        }, 500)
    }
    const handleHover = () => {
        setIsHover(true)
    }
    const handleLeave = () => {
        setIsHover(false)
    }
    return (
        <CCard
            textColor="dark"
            className={`mb-3 border-top-${randomColor} border-top-3 ${isHover ? 'shadow' : ''}`}
            style={{ maxWidth: '20rem', minHeight: '10rem' }}
            role="button"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={openDetailPage}
        >
            <CCardHeader className={`border-${randomColor}`}>
                <b>{busCompany?.name}</b>
            </CCardHeader>
            <CCardBody>
                <small>Tuyến xe: </small>
                <br></br>
                <div style={{ height: '50px', overflow: 'auto' }}>
                    {curAssign.length > 0 ? (
                        curAssign.map((route, index) => (
                            <div key={index}>
                                <small>
                                    <i>{`${index + 1}. `}</i>
                                    <i>
                                        {listRoute.find((r) => r.id === route.routeId)
                                            ? getRouteJourney(
                                                  listRoute.find((r) => r.id === route.routeId),
                                              )
                                            : 'Không có'}
                                    </i>
                                </small>
                            </div>
                        ))
                    ) : (
                        <small>Chưa có tuyến xe</small>
                    )}
                </div>
                <small>{`SĐT: ${admin?.tel}`}</small>
                <br></br>
                <small>{`Ngày hợp tác: ${convertToDisplayDate(busCompany?.coopDay)}`}</small>
            </CCardBody>
        </CCard>
    )
}

const Company = () => {
    const dispatch = useDispatch()
    const listRoute = useSelector(selectListOfficialRoute)
    const [openAddForm, setOpenAddForm] = useState(false)
    const openListRequest = useSelector(selectOpenListRequest)
    const listRequest = useSelector(selectListRequest)
    const listCompanyIn = useSelector(selectListCompany)
    const [listCompany, setListCompany] = useState(listCompanyIn)
    const [currentRequest, setCurrentRequest] = useState(null)
    const [filter, setFilter] = useState('active')
    const socketConnect = useSelector(selectConnection)
    const solveCompany = (companyTel) => {
        const newMessage = {
            type: 'remove',
            tel: companyTel,
        }
        try {
            // Gửi tin nhắn tới máy chủ WebSocket
            if (socketConnect) {
                socketConnect.send(JSON.stringify(newMessage))
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (listRoute.length === 0)
            dispatch(routeThunk.getOfficialRoute())
                .unwrap()
                .then(() => {})
                .catch(() => {})
        dispatch(companyThunk.getAssignedRouteForCompany())
        dispatch(companyThunk.getCompany())
        dispatch(routeThunk.getRoute())
    }, [])
    useEffect(() => {
        if (filter === 'active') {
            setListCompany(listCompanyIn.filter((company) => company.busCompany.active))
        } else {
            setListCompany(listCompanyIn.filter((company) => !company.busCompany.active))
        }
    }, [filter, listCompanyIn])
    return (
        <div>
            {openAddForm && (
                <OpenForm
                    visible={openAddForm}
                    setVisible={setOpenAddForm}
                    preInfo={currentRequest}
                />
            )}
            <div className="d-flex justify-content-between align-items-center">
                <b>DANH SÁCH CÁC NHÀ XE</b>
                <CButton
                    variant="outline"
                    onClick={() => dispatch(companyActions.setOpenListRequest(!openListRequest))}
                >
                    Danh sách yêu cầu mở bán vé
                </CButton>
            </div>
            <CCollapse
                visible={openListRequest}
                className="p-2 border-bottom"
                style={{ borderBottom: '4px solid' }}
            >
                {listRequest.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <b>Không có yêu cầu mở bán vé nào</b>
                    </div>
                ) : (
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Tên nhà xe</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Chủ nhà xe</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Hành động</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {listRequest.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                    <CTableDataCell>{item.businessName}</CTableDataCell>
                                    <CTableDataCell>{item.name}</CTableDataCell>
                                    <CTableDataCell>{item.tel}</CTableDataCell>
                                    <CTableDataCell>{item.email}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton
                                            variant="outline"
                                            color="success"
                                            onClick={() => {
                                                setCurrentRequest(item)
                                                setOpenAddForm(true)
                                            }}
                                        >
                                            Hoàn tất hồ sơ
                                        </CButton>
                                        <span>{` / `}</span>
                                        <CButton
                                            variant="outline"
                                            color="danger"
                                            onClick={() => solveCompany(item.tel)}
                                        >
                                            Xóa yêu cầu
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                )}
            </CCollapse>
            <CRow>
                <CCol md="2">
                    <CCard
                        role="button"
                        textColor={filter === 'active' ? 'warning' : ''}
                        className="p-1 text-center"
                        onClick={() => setFilter('active')}
                    >
                        Đang hoạt động
                    </CCard>
                </CCol>
                <CCol md="2">
                    <CCard
                        role="button"
                        className="p-1 text-center"
                        textColor={filter === 'inactive' ? 'warning' : ''}
                        onClick={() => setFilter('inactive')}
                    >
                        Đã đóng
                    </CCard>
                </CCol>
            </CRow>
            <div className="my-2">
                <b>{`Số nhà xe: ${listCompany.length}`}</b>
            </div>
            <CRow className="my-3">
                {listCompany.map((company, index) => (
                    <CCol key={index} sm="4">
                        <BusCompany companyInfo={company}></BusCompany>
                    </CCol>
                ))}
            </CRow>
        </div>
    )
}

export default Company
