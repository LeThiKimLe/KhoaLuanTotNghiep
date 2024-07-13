import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import {
    CButton,
    CCardBody,
    CCardTitle,
    CFormCheck,
    CFormSelect,
    CSpinner,
    CTableHead,
    CTableHeaderCell,
    CTooltip,
} from '@coreui/react'
import { getRouteJourney, getTripJourney } from 'src/utils/tripUtils'
import {
    CFormInput,
    CCol,
    CRow,
    CCard,
    CModal,
    CModalHeader,
    CModalBody,
    CModalTitle,
    CCardHeader,
    CForm,
    CFormLabel,
    CCardFooter,
    CModalFooter,
    CTable,
    CTableRow,
    CTableBody,
    CTableDataCell,
    CToaster,
    CInputGroup,
    CInputGroupText,
} from '@coreui/react'
import { startOfWeek, endOfWeek, format, add, sub } from 'date-fns'
import scheduleThunk from 'src/feature/schedule/schedule.service'
import {
    selectCurrentRoute,
    selectCurrentTrip,
    selectCurrentReverse,
    selectCurrentScheduleGo,
    selectCurrentScheduleReturn,
    selectListFixSchedule,
    selectCurrentWeekScheduleGo,
    selectCurrentWeekScheduleReturn,
} from 'src/feature/schedule/schedule.slice'
import { DateRange } from 'react-date-range'
import TimePicker from 'react-time-picker'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilArrowRight, cilPlus, cilX } from '@coreui/icons'
import CustomButton from '../customButton/CustomButton'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import {
    addHoursToTime,
    convertTimeToInt,
    convertToDisplayDate,
    convertToStampSplit,
    subStractDays,
} from 'src/utils/convertUtils'
import { CustomToast } from '../customToast/CustomToast'
import { selectCurrentListBus, selectCurrentListDriver } from 'src/feature/schedule/schedule.slice'
import staffThunk from 'src/feature/staff/staff.service'
import busThunk from 'src/feature/bus/bus.service'
import { addDays } from 'src/utils/convertUtils'
import { TIME_TABLE, dayInWeek } from 'src/utils/constants'
import parse from 'date-fns/parse'
import { shortenName } from 'src/utils/convertUtils'
import { check } from 'prettier'
import { selectServiceDueDate } from 'src/feature/fee/fee.slice'
import specialThunk from 'src/feature/special-day/specialDay.service'
import { selectCompanyId } from 'src/feature/auth/auth.slice'
import { selectListSpecial } from 'src/feature/special-day/specialDay.slice'
const TimeBox = ({ time, removeTime, fix }) => {
    const [showRemove, setShowRemove] = useState(false)
    const handleRemove = () => {
        removeTime(time)
    }
    return (
        <CCard
            textColor={fix ? 'success' : 'warning'}
            className={`${fix ? 'border-success' : 'border-warning'} mb-1`}
        >
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
                    onClick={handleRemove}
                ></CIcon>
            </CCardBody>
        </CCard>
    )
}

const ScheduleBox = ({ listTime, addTime, removeTime, turn }) => {
    const [openTimer, setOpenTimer] = useState(false)
    const [curTime, setCurTime] = useState('07:00')
    return (
        <CRow className="mb-3 justify-content-center">
            <CFormLabel htmlFor="maxSchedule" className="col-sm-2 col-form-label">
                <b>{turn === 1 ? 'Lịch trình lượt đi' : 'Lịch trình lượt về'}</b>
            </CFormLabel>
            <CCol sm={5}>
                <CCard style={{ height: '100px', overflow: 'auto' }}>
                    <CCardBody>
                        {listTime.length > 0 && (
                            <CRow
                                style={{
                                    height: 'fit-content',
                                    width: '100%',
                                }}
                            >
                                {listTime.map((timer, index) => (
                                    <CCol key={index} xs="4">
                                        <TimeBox
                                            time={timer.time}
                                            removeTime={removeTime}
                                            fix={timer.fix}
                                        ></TimeBox>
                                    </CCol>
                                ))}
                            </CRow>
                        )}
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol sm={3}>
                <CButton
                    id={turn === 1 ? 'go' : 'return'}
                    color="info"
                    onClick={() => setOpenTimer(!openTimer)}
                >
                    <CIcon icon={cilPlus}></CIcon>
                    Thêm giờ
                </CButton>
                {openTimer && (
                    <CCard
                        className="mt-1"
                        style={{
                            width: '145px',
                            zIndex: 2,
                            position: 'absolute',
                        }}
                    >
                        <CCardBody className="d-flex gap-1 align-items-center px-1 py-1">
                            <TimePicker
                                format="HH:mm"
                                onChange={setCurTime}
                                value={curTime}
                                clearIcon={null}
                                clockIcon={null}
                                disableClock={true}
                            />
                            <CButton
                                id={turn === 1 ? 'add-go' : 'add-return'}
                                letiant="outline"
                                color="info"
                                onClick={() => addTime(curTime)}
                                style={{
                                    width: 'fit-content',
                                }}
                            >
                                OK
                            </CButton>
                        </CCardBody>
                    </CCard>
                )}
            </CCol>
        </CRow>
    )
}

const ScheduleSummary = ({ curRoute, curTrip, listGo, listReturn }) => {
    const [listSchedule, setListSchedule] = useState([])
    useEffect(() => {
        const sumTrip = []
        listGo.forEach((item) => {
            sumTrip.push({
                departTime: item.time,
                arrivalTime: addHoursToTime(item.time, curTrip.hours),
                turn: 1,
            })
        })
        listReturn.forEach((item) => {
            sumTrip.push({
                departTime: item.time,
                arrivalTime: addHoursToTime(item.time, curTrip.hours),
                turn: 0,
            })
        })
        sumTrip.sort((a, b) => convertTimeToInt(a.departTime) - convertTimeToInt(b.departTime))
        setListSchedule(sumTrip)
    }, [listGo.length, listReturn.length])
    return (
        <>
            <i>{`Trạm A: ${curTrip.startStation.name}`}</i>
            <br></br>
            <i>{`Trạm B: ${curTrip.endStation.name}`}</i>
            <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell className="text-center" scope="col">
                            Khởi hành
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center" scope="col">
                            Kết thúc
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center" scope="col">
                            Trạm đi
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center" scope="col">
                            Trạm đến
                        </CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {listSchedule.map((schedule, index) => (
                        <CTableRow key={index}>
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell className="text-center">
                                {schedule.departTime}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                {schedule.arrivalTime}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                {schedule.turn === 1 ? 'A' : 'B'}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                {schedule.turn === 1 ? 'B' : 'A'}
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </>
    )
}

const AddScheduleForm = ({
    visible,
    setVisible,
    currentDay,
    tripInfor,
    finishAdd,
    listPreTimeGo,
    listPreTimeReturn,
    fixSchedule,
}) => {
    const curTrip = useSelector(selectCurrentTrip)
    const curRoute = useSelector(selectCurrentRoute)
    const [openDateRange, setOpenDateRange] = useState(false)
    const [listTimeGo, setListTimeGo] = useState(
        listPreTimeGo.length > 0
            ? listPreTimeGo.map((time) => ({ time: time, fix: true }))
            : fixSchedule
                  .filter((schd) => schd.trip.id === curTrip?.turnGo.id)
                  .map((schd) => ({ time: schd.time.slice(0, -3), fix: false })),
    )
    const [listTimeReturn, setListTimeReturn] = useState(
        listPreTimeReturn.length > 0
            ? listPreTimeReturn.map((time) => ({ time: time, fix: true }))
            : fixSchedule
                  .filter((schd) => schd.trip.id === curTrip?.turnBack.id)
                  .map((schd) => ({ time: schd.time.slice(0, -3), fix: false })),
    )
    const [note, setNote] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const requestCount = useRef(0)
    const dueTime = useSelector(selectServiceDueDate)
    const [dateRange, setDateRange] = useState([
        {
            startDate: currentDay,
            endDate: currentDay,
            key: 'selection',
        },
    ])
    const companyId = useSelector(selectCompanyId)
    const listSpecial = useSelector(selectListSpecial)
    const currentDayFee = listSpecial.find(
        (item) =>
            item.busCompany.id === companyId &&
            convertToDisplayDate(item.date) === format(currentDay, 'dd/MM/yyyy'),
    )
    const addTimeGo = (newTime) => {
        if (!listTimeGo.find((timer) => timer.time === newTime)) {
            setListTimeGo([
                ...listTimeGo,
                {
                    time: newTime,
                    fix: false,
                },
            ])
            setError('')
        } else {
            setError('Đã có chuyến đi vào giờ này rồi')
        }
    }
    const addTimeGo2 = (newTime) => {
        if (!listTimeGo.find((timer) => timer.time === newTime)) {
            if (listTimeGo.length < tripInfor.maxSchedule) {
                if (validAvaiBusDriver(newTime)) {
                    setListTimeGo([
                        ...listTimeGo,
                        {
                            time: newTime,
                            fix: false,
                        },
                    ])
                    setError('')
                } else setError('Không thể thêm lịch vì không còn tài nguyên bus và tài xế')
            } else {
                setError('Chỉ chọn đủ số chuyến tối đa')
            }
        } else {
            setError('Đã có chuyến đi vào giờ này rồi')
        }
    }
    const removeTimeGo = (delTime) => {
        const listNew = listTimeGo.filter((timer) => timer.time !== delTime)
        setListTimeGo(listNew)
        setError('')
    }
    const addTimeReturn = (newTime) => {
        if (!listTimeReturn.find((timer) => timer.time === newTime)) {
            setListTimeReturn([
                ...listTimeReturn,
                {
                    time: newTime,
                    fix: false,
                },
            ])
        } else {
            setError('Đã có chuyến về vào giờ này rồi')
        }
    }

    const addTimeReturn2 = (newTime) => {
        if (!listTimeReturn.find((timer) => timer.time === newTime)) {
            if (listTimeReturn.length < tripInfor.maxSchedule) {
                if (validAvaiBusDriver(newTime)) {
                    setListTimeReturn([
                        ...listTimeReturn,
                        {
                            time: newTime,
                            fix: false,
                        },
                    ])
                    setError('')
                } else {
                    setError('Không thể thêm lịch vì không còn tài nguyên bus và tài xế')
                }
            } else {
                setError('Chỉ chọn đủ số chuyến tối đa')
            }
        } else {
            setError('Đã có chuyến về vào giờ này rồi')
        }
    }
    const removeTimeReturn = (delTime) => {
        const listNew = listTimeReturn.filter((timer) => timer.time !== delTime)
        setListTimeReturn(listNew)
        setError('')
    }
    //Kiểm tra xem nếu thêm lịch vào thì cùng 1 lúc có bao nhiêu xe / tài xế đang cùng hoạt động (ko lớn hơn số cho phép)
    const validAvaiBusDriver = (time) => {
        let count = 0
        listTimeGo.forEach((tme) => {
            if (Math.abs(convertTimeToInt(time) - convertTimeToInt(tme.time)) <= curRoute.hours + 1)
                count = count + 1
        })
        listTimeReturn.forEach((tme) => {
            if (Math.abs(convertTimeToInt(time) - convertTimeToInt(tme.time)) <= curRoute.hours + 1)
                count = count + 1
        })
        if (count <= tripInfor.busCount && count <= tripInfor.driverCount) return true
        else return false
    }
    const checkTime = () => {
        if (dueTime < dateRange[0].endDate) {
            addToast(() =>
                CustomToast({
                    message: `Không thể thêm lịch quá hạn dịch vụ - Ngày ${format(
                        dueTime,
                        'dd/MM/yyyy',
                    )}`,
                    type: 'error',
                }),
            )
            return false
        }
        return true
    }
    const handleSchedule = () => {
        if ((listTimeGo.length > 0 || listTimeReturn > 0) && checkTime()) {
            requestCount.current = 0
            let maxCount = 0
            const scheduleGoInfor = {
                tripId: curTrip.turnGo.id,
                dateSchedule: currentDay,
                repeat: Math.floor(
                    (dateRange[0].endDate.getTime() - dateRange[0].startDate.getTime()) / 86400000,
                ),
                note: note,
                times: listTimeGo
                    .filter((timer) => timer.fix === false)
                    .map((timer) => timer.time + ':00'),
            }
            const scheduleReturnInfor = {
                tripId: curTrip.turnBack.id,
                dateSchedule: currentDay,
                repeat: Math.floor(
                    (dateRange[0].endDate.getTime() - dateRange[0].startDate.getTime()) / 86400000,
                ),
                note: note,
                times: listTimeReturn
                    .filter((timer) => timer.fix === false)
                    .map((timer) => timer.time + ':00'),
            }
            if (scheduleGoInfor.times.length !== 0) {
                setLoading(true)
                maxCount = maxCount + 1
            }
            if (scheduleReturnInfor.times.length !== 0) {
                setLoading(true)
                maxCount = maxCount + 1
            }
            if (scheduleGoInfor.times.length !== 0)
                dispatch(scheduleThunk.handleSchedule(scheduleGoInfor))
                    .unwrap()
                    .then(() => {
                        requestCount.current = requestCount.current + 1
                        if (requestCount.current === maxCount) {
                            finishAdd()
                            addToast(() =>
                                CustomToast({
                                    message: 'Đã thêm lịch thành công',
                                    type: 'success',
                                }),
                            )
                            setVisible(false)
                            setLoading(false)
                        }
                    })
                    .catch((error) => {
                        setError(error)
                        setLoading(false)
                    })
            if (scheduleReturnInfor.times.length !== 0)
                dispatch(scheduleThunk.handleSchedule(scheduleReturnInfor))
                    .unwrap()
                    .then(() => {
                        requestCount.current = requestCount.current + 1
                        if (requestCount.current === maxCount) {
                            finishAdd()
                            addToast(() =>
                                CustomToast({
                                    message: 'Đã thêm lịch thành công',
                                    type: 'success',
                                }),
                            )
                            setVisible(false)
                            setLoading(false)
                        }
                    })
                    .catch((error) => {
                        setError(error)
                        setLoading(false)
                    })
        } else {
            if (listTimeGo.length === 0 && listTimeReturn.length === 0)
                setError('Vui lòng chọn thời gian')
        }
    }
    const reset = () => {
        setListTimeGo(
            listPreTimeGo.length > 0
                ? listPreTimeGo.map((time) => ({ time: time, fix: true }))
                : [],
        )
        setListTimeReturn(
            listPreTimeReturn.length > 0
                ? listPreTimeReturn.map((time) => ({ time: time, fix: true }))
                : [],
        )
        setDateRange([
            {
                startDate: currentDay,
                endDate: currentDay,
                key: 'selection',
            },
        ])
        setNote('')
    }
    const getSpecialDayFee = () => {}
    useEffect(() => {
        if (error !== '') addToast(() => CustomToast({ message: error, type: 'error' }))
    }, [error])
    useEffect(() => {
        setListTimeGo(listPreTimeGo.map((time) => ({ time: time, fix: true })))
    }, [listPreTimeGo.length])
    useEffect(() => {
        setListTimeReturn(listPreTimeReturn.map((time) => ({ time: time, fix: true })))
    }, [listPreTimeReturn.length])
    useEffect(() => {
        setDateRange([
            {
                startDate: currentDay,
                endDate: currentDay,
                key: 'selection',
            },
        ])
    }, [currentDay])
    useEffect(() => {
        setListTimeGo(
            listPreTimeGo.length > 0
                ? listPreTimeGo.map((time) => ({ time: time, fix: true }))
                : fixSchedule
                      .filter((schd) => schd.trip.id === curTrip?.turnGo.id)
                      .map((schd) => ({ time: schd.time.slice(0, -3), fix: false })),
        )

        setListTimeReturn(
            listPreTimeReturn.length > 0
                ? listPreTimeReturn.map((time) => ({ time: time, fix: true }))
                : fixSchedule
                      .filter((schd) => schd.trip.id === curTrip?.turnBack.id)
                      .map((schd) => ({ time: schd.time.slice(0, -3), fix: false })),
        )
    }, [curTrip, fixSchedule, listPreTimeReturn, listPreTimeGo])
    useEffect(() => {
        dispatch(specialThunk.getSpecials())
            .unwrap()
            .then(() => {})
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <CModal
                alignment="center"
                backdrop="static"
                scrollable
                visible={visible}
                size="lg"
                onClose={() => setVisible(false)}
            >
                <CModalHeader>
                    <CModalTitle>Thêm chuyến xe</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCard className="p-0">
                            <CCardHeader className="bg-info">
                                <b>Thông tin lập lịch</b>
                            </CCardHeader>
                            {curRoute && curTrip && (
                                <CCardBody>
                                    <CForm className="w-100">
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="date"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Ngày lập lịch</b>
                                            </CFormLabel>
                                            <CCol sm={8}>
                                                <CFormInput
                                                    type="text"
                                                    id="date"
                                                    defaultValue={format(currentDay, 'dd/MM/yyyy')}
                                                    disabled
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="trip"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Tuyến xe</b>
                                            </CFormLabel>
                                            <CCol sm={8}>
                                                <CFormInput
                                                    type="text"
                                                    id="trip"
                                                    disabled
                                                    defaultValue={getTripJourney(curTrip)}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="trip"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Lặp lại lịch</b>
                                            </CFormLabel>
                                            <CCol sm={8}>
                                                <CFormInput
                                                    type="text"
                                                    id="time-span"
                                                    readOnly
                                                    value={`${format(
                                                        dateRange[0].startDate,
                                                        'dd/MM/yyyy',
                                                    )} - ${format(
                                                        dateRange[0].endDate,
                                                        'dd/MM/yyyy',
                                                    )}`}
                                                    role="button"
                                                    onClick={() => setOpenDateRange(!openDateRange)}
                                                />
                                                {openDateRange && (
                                                    <div
                                                        style={{ position: 'absolute', zIndex: 2 }}
                                                    >
                                                        <DateRange
                                                            editableDateInputs={true}
                                                            onChange={(item) =>
                                                                setDateRange([item.selection])
                                                            }
                                                            moveRangeOnFirstSelection={false}
                                                            ranges={dateRange}
                                                            minDate={currentDay}
                                                            maxDate={
                                                                new Date(
                                                                    new Date(currentDay).setMonth(
                                                                        currentDay.getMonth() + 2,
                                                                    ),
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="note"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Ghi chú</b>
                                            </CFormLabel>
                                            <CCol sm={8}>
                                                <CFormInput
                                                    type="text"
                                                    id="note"
                                                    value={note}
                                                    onChange={(e) => setNote(e.target.value)}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="note"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Giá vé</b>
                                            </CFormLabel>
                                            <CCol sm="8">
                                                <CInputGroup>
                                                    <CTooltip content="Giá tiền cố định tuyến">
                                                        <CFormInput
                                                            value={curTrip.price.toLocaleString()}
                                                            readOnly
                                                        ></CFormInput>
                                                    </CTooltip>
                                                    <CTooltip content="Phụ phí loại xe">
                                                        <CFormInput
                                                            value={curTrip.busType.fee.toLocaleString()}
                                                            readOnly
                                                        ></CFormInput>
                                                    </CTooltip>
                                                    <CTooltip content="Phụ phí lễ">
                                                        <CFormInput
                                                            value={
                                                                currentDayFee
                                                                    ? currentDayFee.fee.toLocaleString()
                                                                    : 0
                                                            }
                                                            readOnly
                                                        ></CFormInput>
                                                    </CTooltip>
                                                    <CTooltip content="Tổng cộng">
                                                        <CFormInput
                                                            value={(
                                                                curTrip.price +
                                                                curTrip.busType.fee +
                                                                (currentDayFee
                                                                    ? currentDayFee.fee
                                                                    : 0)
                                                            ).toLocaleString()}
                                                            readOnly
                                                        ></CFormInput>
                                                    </CTooltip>
                                                </CInputGroup>
                                            </CCol>
                                        </CRow>
                                        <div className="w-100 border-top mb-3"></div>
                                        <ScheduleBox
                                            listTime={listTimeGo}
                                            addTime={addTimeGo}
                                            removeTime={removeTimeGo}
                                            turn={1}
                                        ></ScheduleBox>
                                        <ScheduleBox
                                            listTime={listTimeReturn}
                                            addTime={addTimeReturn}
                                            removeTime={removeTimeReturn}
                                            turn={0}
                                        ></ScheduleBox>
                                        <CRow className="mb-3 justify-content-center">
                                            <CCol
                                                sm="10"
                                                className="d-flex gap-2 align-items-center offset-4"
                                            >
                                                <i>* Chú thích</i>
                                                <CCard
                                                    className="border-success col-sm-2 p-0 text-center"
                                                    textColor="success"
                                                >
                                                    <CCardBody className="p-1">
                                                        <small>Chuyến đã có</small>
                                                    </CCardBody>
                                                </CCard>
                                                <CCard
                                                    className="border-warning col-sm-2 p-0 text-center"
                                                    textColor="warning"
                                                >
                                                    <CCardBody className="p-1">
                                                        <small>Chuyến mới</small>
                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                        </CRow>
                                        {/* <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="maxSchedule"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Số chuyến tối đa mỗi lượt</b>
                                            </CFormLabel>
                                            <CCol sm={5}>
                                                <CFormInput
                                                    type="text"
                                                    id="maxSchedule"
                                                    readOnly
                                                    defaultValue={tripInfor.maxSchedule}
                                                />
                                            </CCol>
                                            <CCol sm="3"></CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="maxSchedule"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Số xe hiện có</b>
                                            </CFormLabel>
                                            <CCol sm={2}>
                                                <CFormInput
                                                    type="text"
                                                    id="maxSchedule"
                                                    readOnly
                                                    defaultValue={tripInfor.busCount}
                                                />
                                            </CCol>
                                            <CFormLabel
                                                htmlFor="maxSchedule"
                                                className="col-sm-3 col-form-label"
                                            >
                                                <b>Số tài xế tuyến hiện có</b>
                                            </CFormLabel>
                                            <CCol sm={3}>
                                                <CFormInput
                                                    type="text"
                                                    id="maxSchedule"
                                                    readOnly
                                                    defaultValue={tripInfor.driverCount}
                                                />
                                            </CCol>
                                        </CRow> */}
                                        <div className="w-100 border-top mb-3"></div>
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="maxSchedule"
                                                className="col-sm-3 col-form-label"
                                            >
                                                <b>Tổng hợp lịch trình</b>
                                            </CFormLabel>
                                            <CCol sm={10}>
                                                <ScheduleSummary
                                                    curRoute={curRoute}
                                                    curTrip={curTrip}
                                                    listGo={listTimeGo}
                                                    listReturn={listTimeReturn}
                                                ></ScheduleSummary>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            )}
                            <CCardFooter className="bg-light text-danger">
                                <CRow className="justify-content-center align-items-center">
                                    <CustomButton
                                        className="col-sm-2"
                                        text="Lưu"
                                        type="submit"
                                        loading={loading}
                                        color="success"
                                        style={{ width: '100px', marginRight: '10px' }}
                                        onClick={handleSchedule}
                                    ></CustomButton>
                                    <CButton
                                        className="col-sm-2"
                                        letiant="outline"
                                        style={{ width: '100px' }}
                                        color="danger"
                                        onClick={reset}
                                    >
                                        Hủy
                                    </CButton>
                                    <div className="col-sm-6">{error !== '' ? error : ''}</div>
                                </CRow>
                            </CCardFooter>
                        </CCard>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton
                        color="secondary"
                        onClick={() => setVisible(false)}
                        style={{ width: 'fit-content' }}
                    >
                        Đóng
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

const AssignScheduleBox = ({ curRoute, curTrip, listGo, listReturn, finishUpdate, currentDay }) => {
    const [listSchedule, setListSchedule] = useState([])
    const listDriver = useSelector(selectCurrentListDriver)
    const listBus = useSelector(selectCurrentListBus)
    const [listUpdate, setListUpdate] = useState(null)
    const [listDriverSchedule, setListDriverSchedule] = useState([])
    const [listBusSchedule, setListBusSchedule] = useState([])
    const [loading, setLoading] = useState(false)
    const [autoSchdMode, setAutoSchdMode] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    //Xử lý sự kiện chọn bus
    const handleAssignBus = (scheduleId, busId) => {
        const item = listUpdate ? listUpdate[scheduleId] : null
        const schdDriver = listSchedule.find((schd) => schd.id === scheduleId).driver
        const schdDriver2 = listSchedule.find((schd) => schd.id === scheduleId).driver2
        setListUpdate({
            ...listUpdate,
            [scheduleId]: {
                driverId: item ? item.driverId : schdDriver ? schdDriver.id : 0,
                driverId2: item ? item.driverId2 : schdDriver2 ? schdDriver2.id : 0,
                busId: busId,
            },
        })
    }
    //Xử lý sự kiện chọn tài xế 1
    const handleAssignDriver = (scheduleId, driverId) => {
        const item = listUpdate ? listUpdate[scheduleId] : null
        const schdBus = listSchedule.find((schd) => schd.id === scheduleId).bus
        const schdDriver2 = listSchedule.find((schd) => schd.id === scheduleId).driver2
        setListUpdate({
            ...listUpdate,
            [scheduleId]: {
                driverId: driverId,
                driverId2: item ? item.driverId2 : schdDriver2 ? schdDriver2.id : 0,
                busId: item ? item.busId : schdBus ? schdBus.id : 0,
            },
        })
    }

    //Xử lý sự kiện chọn tài xế 2
    const handleAssignDriver2 = (scheduleId, driverId) => {
        const item = listUpdate ? listUpdate[scheduleId] : null
        const schdBus = listSchedule.find((schd) => schd.id === scheduleId).bus
        const schdDriver = listSchedule.find((schd) => schd.id === scheduleId).driver
        setListUpdate({
            ...listUpdate,
            [scheduleId]: {
                driverId2: driverId,
                driverId: item ? item.driverId : schdDriver ? schdDriver.id : 0,
                busId: item ? item.busId : schdBus ? schdBus.id : 0,
            },
        })
    }

    //CÁC HÀM XỬ LÝ PHÂN CÔNG THỦ CÔNG CỦA ADMIN
    //Lấy lịch trình của từng người / từng bus do admin phân công, xem từng lịch trình có phù hợp không
    const verifyItemSchedule = () => {
        if (!listUpdate) return false
        const listDriverAssign = JSON.parse(JSON.stringify(listDriverSchedule))
        const listBusAssign = JSON.parse(JSON.stringify(listBusSchedule))
        const assignList = Object.entries(listUpdate)
        let index = -1
        let schedule = null
        assignList.forEach(([key, value]) => {
            //Cập nhật schedule mới cho lịch của driver
            index = listDriverAssign.findIndex((item) => item.id == value.driverId)
            if (index !== -1) {
                schedule = listSchedule.find((schd) => schd.id == key)
                if (schedule && !listDriverAssign[index].schedules.find((schd) => schd.id == key))
                    listDriverAssign[index].schedules.push(schedule)
            }
            //Cập nhật schedule mới cho lịch của driver 2
            index = listDriverAssign.findIndex((item) => item.id == value.driverId2)
            if (index !== -1) {
                schedule = listSchedule.find((schd) => schd.id == key)
                if (schedule && !listDriverAssign[index].schedules.find((schd) => schd.id == key))
                    listDriverAssign[index].schedules.push(schedule)
            }
            //Cập nhật schedule mới cho lịch của bus
            index = listBusAssign.findIndex((item) => item.id == value.busId)
            if (index !== -1) {
                schedule = listSchedule.find((schd) => schd.id == key)
                if (schedule) listBusAssign[index].schedules.push(schedule)
            }
        })
        for (let i = 0; i < listDriverAssign.length; i++) {
            if (validateAssignedItem(listDriverAssign[i]) === false) {
                return 'Lịch trình của tài xế có xung đột'
            }
        }
        for (let i = 0; i < listBusAssign.length; i++) {
            if (validateAssignedItem(listBusAssign[i], 'bus') === false)
                return 'Lịch trình của bus có xung đột'
        }
        return 'success'
    }

    const validSchedule = (listSchd, previous) => {
        const newSchd = [...listSchd]
        let valid = true
        newSchd.sort((a, b) => convertTimeToInt(a.departTime) - convertTimeToInt(b.departTime))
        if (newSchd.length > 0 && previous) if (previous.turn === newSchd[0].turn) return false
        // Kiểm tra từng cặp vehicle trip có hợp lệ ko
        for (let i = 0; i < newSchd.length - 1; i++) {
            if (
                !(
                    convertTimeToInt(newSchd[i + 1].departTime) >=
                        convertTimeToInt(newSchd[i].arrivalTime) + 1 &&
                    newSchd[i + 1].turn !== newSchd[i].turn
                )
            ) {
                valid = false
                break
            }
        }
        return valid
    }

    // Xác minh phân công cho mỗi driver - tài xế là đúng chưa
    const validateAssignedItem = (listAssignSchedule, type = 'driver') => {
        if (validSchedule(listAssignSchedule.schedules, listAssignSchedule.previous)) {
            return true
        } else {
            return false
        }
    }

    //Thực hiện assign
    const handleAssignment = () => {
        let checkState = 'success'
        if (autoSchdMode === false) {
            checkState = verifyItemSchedule()
        }
        if (checkState === 'success') {
            const listRequest = Object.entries(listUpdate)
            let scheduleInfor = null
            if (listRequest.length > 0) {
                setLoading(true)
                listRequest.forEach(async (req, index) => {
                    scheduleInfor = {
                        id: req[0],
                        bus: req[1].busId,
                        driver: req[1].driverId,
                        driver2: req[1].driverId2,
                        note: listSchedule.find((schd) => schd.id == req[0]).note,
                    }
                    await dispatch(scheduleThunk.updateSchedule(scheduleInfor))
                        .unwrap()
                        .then(() => {
                            if (index === listRequest.length - 1) {
                                setLoading(false)
                                finishUpdate()
                            }
                        })
                        .catch(() => {
                            if (index === listRequest.length - 1) {
                                setLoading(false)
                            }
                        })
                })
            }
            setError('')
        } else {
            setError(checkState)
        }
    }

    //Các hàm lấy giá trị schedule của mỗi bus - driver
    const getDriverValue = (schedule) => {
        if (schedule.driver !== 0) return schedule.driver
        else if (listUpdate && listUpdate[schedule.id]) return listUpdate[schedule.id].driverId
        else return 0
    }
    const getBusValue = (schedule) => {
        if (schedule.bus !== 0) return schedule.bus
        else if (listUpdate && listUpdate[schedule.id]) return listUpdate[schedule.id].busId
        else return 0
    }
    const scanDriver = () => {
        let listDriverSchd = []
        let schedules = []
        let count = 0
        listDriver.forEach(async (driver, index) => {
            //Tìm chuyến cuối của ngày hôm qua
            try {
                const response = await Promise.all([
                    dispatch(staffThunk.getDriverSchedules(driver.driver.driverId)),
                    dispatch(staffThunk.getDriverTrip(driver.driver.driverId)),
                ])
                const res = response[0].payload
                const trip = response[1].payload
                schedules = listSchedule.filter(
                    (schd) =>
                        schd.driver === driver.driver.driverId ||
                        schd.driver2 === driver.driver.driverId,
                )
                const yesterday = new Date(currentDay)
                const result = res.filter(
                    (schd) =>
                        schd.departDate ===
                        format(yesterday.setDate(currentDay.getDate() - 1), 'yyyy-MM-dd'),
                )
                result.sort(
                    (a, b) => convertTimeToInt(b.departTime) - convertTimeToInt(a.departTime),
                )
                if (result.length > 0) {
                    const turnGo = trip.find((tp) => tp.turn === true)
                    if (turnGo)
                        listDriverSchd.push({
                            id: driver.driver.driverId,
                            schedules: schedules,
                            previous: {
                                schedule: result[0],
                                turn: turnGo.schedules.find((sch) => sch.id === result[0].id)
                                    ? true
                                    : false,
                            },
                        })
                } else {
                    listDriverSchd.push({
                        id: driver.driver.driverId,
                        schedules: schedules,
                        previous: null,
                    })
                }
                count = count + 1
                if (count === listDriver.length) setListDriverSchedule(listDriverSchd)
            } catch (error) {
                schedules = listSchedule.filter(
                    (schd) =>
                        schd.driver === driver.driver.driverId ||
                        schd.driver2 === driver.driver.driverId,
                )
                listDriverSchd.push({
                    id: driver.driver.driverId,
                    schedules: schedules,
                    previous: null,
                })
                count = count + 1
                if (count === listDriver.length) setListDriverSchedule(listDriverSchd)
            }
        })
    }

    const scanBus = () => {
        let listBusSchd = []
        let schedules = []
        let count = 0
        listBus.forEach(async (bus) => {
            try {
                const response = await Promise.all([
                    dispatch(busThunk.getSchedules(bus.id)),
                    dispatch(busThunk.getTrips(bus.id)),
                ])
                const res = response[0]
                const trip = response[1]
                schedules = listSchedule.filter((schd) => schd.bus === bus.id)
                const yesterday = new Date(currentDay)
                const result = res.filter(
                    (schd) =>
                        schd.departDate ===
                        format(yesterday.setDate(currentDay.getDate() - 1), 'yyyy-MM-dd'),
                )
                result.sort(
                    (a, b) => convertTimeToInt(b.departTime) - convertTimeToInt(a.departTime),
                )
                if (result.length > 0) {
                    const turnGo = trip.find((tp) => tp.turn === true)
                    if (turnGo)
                        listBusSchd.push({
                            id: bus.id,
                            schedules: schedules,
                            previous: {
                                schedule: result[0],
                                turn: turnGo.schedules.find((sch) => sch.id === result[0].id)
                                    ? true
                                    : false,
                            },
                        })
                } else {
                    listBusSchd.push({
                        id: bus.id,
                        schedules: schedules,
                        previous: null,
                    })
                }
                count = count + 1
                if (count === listBus.length) {
                    setListBusSchedule(listBusSchd)
                }
            } catch {
                schedules = listSchedule.filter((schd) => schd.bus === bus.id)
                listBusSchd.push({
                    id: bus.id,
                    schedules: schedules,
                    previous: null,
                })
                count = count + 1
                if (count === listBus.length) {
                    setListBusSchedule(listBusSchd)
                }
            }
        })
    }

    //CÁC HÀM XỬ LÝ CHO AUTO SCHEDULING
    //Xem tổng lịch trình có hợp lý chưa, không có trip nào chồng giờ nhau
    const validVehicleSchedule = (listDepartTime, schedule, prevTrip) => {
        const newSchd = [...listDepartTime]
        let valid = true
        if (newSchd.length > 0) {
            if (
                (prevTrip.overflow !== 0 &&
                    convertTimeToInt(schedule.departTime) - prevTrip.overflow >= 1) ||
                prevTrip.overflow === 0
            ) {
                newSchd.push(schedule)
                valid = true
                newSchd.sort(
                    (a, b) => convertTimeToInt(a.departTime) - convertTimeToInt(b.departTime),
                )
                // Kiểm tra từng cặp vehicle trip có hợp lệ ko
                for (let i = 0; i < newSchd.length - 1; i++) {
                    if (
                        !(
                            convertTimeToInt(newSchd[i + 1].departTime) >=
                                convertTimeToInt(newSchd[i].arrivalTime) + 1 &&
                            newSchd[i + 1].turn !== newSchd[i].turn
                        )
                    ) {
                        valid = false
                        break
                    }
                }
            } else {
                valid = false
            }
        } else {
            if (prevTrip.turn !== true && prevTrip.turn !== false) valid = true
            else if (schedule.turn !== prevTrip.turn) valid = true
            else valid = false
        }
        if (valid === true) {
        }
        return valid
    }

    //Xem có bị lố giờ qua ngày hôm sau ko, trả về số giờ lố và ko lố
    const getOverflowTime = (schd) => {
        const currentTime = new Date()
        const time = convertToStampSplit(curRoute.hours)
        const arrivalTime = new Date(
            new Date(format(currentTime, 'yyyy-MM-dd') + 'T' + schd.departTime),
        )
        arrivalTime.setHours(arrivalTime.getHours() + time.hours)
        arrivalTime.setMinutes(arrivalTime.getMinutes() + time.minutes)
        let over = 0
        if (arrivalTime.getDate() !== currentTime.getDate()) {
            over = convertTimeToInt(arrivalTime.getHours() + ':' + arrivalTime.getMinutes())
            return {
                remain: curRoute.hours - over,
                overflow: over,
            }
        }
        return {
            remain: 0,
            overflow: 0,
        }
    }

    //Xem nếu thêm schd mới thì lịch của driver có đúng không
    const verifyDriverSchedule = (driverSchedule, schd) => {
        let previousTrip = {
            overflow: 0,
        }
        let remainEndTime = 0
        // Xem chuyến trễ nhất hôm qua có lố giờ qua hôm nay không
        if (driverSchedule.previous) {
            previousTrip = {
                overflow: getOverflowTime(driverSchedule.previous.schedule).overflow,
                turn: driverSchedule.previous.turn,
            }
        }
        //Xem chuyến trễ nhất hôm nay có lố giờ qua ngày mai ko (nếu có thì ko thêm đc nữa)
        if (driverSchedule.schedules.length > 0) {
            remainEndTime = getOverflowTime(
                driverSchedule.schedules[driverSchedule.schedules.length - 1],
            ).remain
            if (remainEndTime !== 0) return false
        }
        // Xem chuyến được thêm có thể lố giờ qua ngày mai ko
        let remainEndTimeNew = getOverflowTime(schd).remain
        if (remainEndTimeNew !== 0) {
            if (
                driverSchedule.schedules.length * (curRoute.hours + 1) + remainEndTimeNew <=
                    10 - previousTrip.overflow &&
                validVehicleSchedule(driverSchedule.schedules, schd, previousTrip)
            )
                return true
            return false
        } else {
            if (
                (driverSchedule.schedules.length + 1) * (curRoute.hours + 1) <=
                    10 - previousTrip.overflow &&
                validVehicleSchedule(driverSchedule.schedules, schd, previousTrip)
            )
                return true
            return false
        }
    }

    //Xem nếu thêm schd mới thì lịch của bus có đúng không
    const verifyBusSchedule = (busSchedule, schd) => {
        let previousTrip = {
            overflow: 0,
        }
        let remainEndTime = 0
        // Xem chuyến trễ nhất hôm qua có lố giờ qua hôm nay không
        if (busSchedule.previous) {
            previousTrip = {
                overflow: getOverflowTime(busSchedule.previous.schedule).overflow,
                turn: busSchedule.previous.turn,
            }
        }
        //Xem chuyến trễ nhất hôm nay có lố giờ qua ngày mai ko
        if (busSchedule.schedules.length > 0) {
            remainEndTime = getOverflowTime(
                busSchedule.schedules[busSchedule.schedules.length - 1],
            ).remain
            if (remainEndTime !== 0) return false
        }
        //Xem chuyến định thêm có lố giờ ko
        let remainEndTimeNew = getOverflowTime(schd).remain
        if (remainEndTimeNew !== 0) {
            if (
                busSchedule.schedules.length * (curRoute.hours + 1) + remainEndTimeNew <=
                    24 - previousTrip.overflow &&
                validVehicleSchedule(busSchedule.schedules, schd, previousTrip)
            )
                return true
            return false
        } else {
            if (
                (busSchedule.schedules.length + 1) * (curRoute.hours + 1) <=
                    24 - previousTrip.overflow &&
                validVehicleSchedule(busSchedule.schedules, schd, previousTrip)
            )
                return true
            return false
        }
    }

    //Hàm thực hiện scheduling
    const autoScheduling = () => {
        let autoSchd = null
        let listDriverScheduleIn = JSON.parse(JSON.stringify(listDriverSchedule))
        let listBusScheduleIn = JSON.parse(JSON.stringify(listBusSchedule))
        listSchedule.forEach((schd) => {
            if (schd.allowChange) {
                for (let i = 0; i < listDriverScheduleIn.length; i++) {
                    if (verifyDriverSchedule(listDriverScheduleIn[i], schd)) {
                        autoSchd = {
                            ...autoSchd,
                            [schd.id]: {
                                driverId: listDriverScheduleIn[i].id,
                                busId: autoSchd && autoSchd[schd.id] ? autoSchd[schd.id].busId : 0,
                            },
                        }
                        listDriverScheduleIn[i].schedules.push(schd)
                        break
                    }
                }
                for (let i = 0; i < listBusScheduleIn.length; i++) {
                    if (verifyBusSchedule(listBusScheduleIn[i], schd)) {
                        autoSchd = {
                            ...autoSchd,
                            [schd.id]: {
                                driverId:
                                    autoSchd && autoSchd[schd.id] ? autoSchd[schd.id].driverId : 0,
                                busId: listBusScheduleIn[i].id,
                            },
                        }
                        listBusScheduleIn[i].schedules.push(schd)
                        break
                    }
                }
            }
        })
        setListUpdate(autoSchd)
    }

    useEffect(() => {
        const sumTrip = []
        listGo.forEach((item) => {
            sumTrip.push({
                id: item.id,
                departTime: item.departTime.slice(0, -3),
                arrivalTime: addHoursToTime(item.departTime, curRoute.hours),
                turn: true,
                driver: item.driverUser ? item.driverUser.driver.driverId : 0,
                bus: item.bus ? item.bus.id : 0,
                note: item.note,
                allowChange: !item.driverUser || !item.bus,
            })
        })
        listReturn.forEach((item) => {
            sumTrip.push({
                id: item.id,
                departTime: item.departTime.slice(0, -3),
                arrivalTime: addHoursToTime(item.departTime, curRoute.hours),
                turn: false,
                driver: item.driverUser ? item.driverUser.driver.driverId : 0,
                bus: item.bus ? item.bus.id : 0,
                note: item.note,
                allowChange: !item.driverUser || !item.bus,
            })
        })
        sumTrip.sort((a, b) => convertTimeToInt(a.departTime) - convertTimeToInt(b.departTime))
        setListSchedule(sumTrip)
    }, [listGo.length, listReturn.length])
    useEffect(() => {
        if (listSchedule.length > 0) {
            scanBus()
            scanDriver()
        }
    }, [listSchedule.length])
    useEffect(() => {
        if (autoSchdMode === true) {
            autoScheduling()
        }
    }, [autoSchdMode])
    return (
        <>
            <b>{`Trạm A: ${curTrip.startStation.name} `}</b>
            <span>{` || `}</span>
            <b>{` Trạm B: ${curTrip.endStation.name}`}</b>
            <CFormCheck
                id="auto"
                label="Phân công tự động"
                className="mt-3"
                checked={autoSchdMode}
                onChange={() => setAutoSchdMode(!autoSchdMode)}
            />
            <br></br>
            <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell className="text-center" scope="col">
                            Khởi hành
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center" scope="col">
                            Kết thúc
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center" scope="col">
                            Trạm đi
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center" scope="col">
                            Trạm đến
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center" scope="col">
                            Tài xế
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center" scope="col">
                            Bus
                        </CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {listSchedule.map((schedule, index) => (
                        <CTableRow key={index}>
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell className="text-center">
                                {schedule.departTime}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                {schedule.arrivalTime}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                {schedule.turn === true ? 'A' : 'B'}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                {schedule.turn === true ? 'B' : 'A'}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                <CFormSelect
                                    value={getDriverValue(schedule)}
                                    disabled={autoSchdMode || schedule.driver !== 0}
                                    onChange={(e) =>
                                        handleAssignDriver(schedule.id, parseInt(e.target.value))
                                    }
                                >
                                    <option value="0">Chọn driver</option>
                                    {listDriver.map((driver, index) => (
                                        <option key={index} value={driver.driver.driverId}>
                                            {driver.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                <CFormSelect
                                    value={getBusValue(schedule)}
                                    disabled={autoSchdMode || schedule.bus !== 0}
                                    onChange={(e) =>
                                        handleAssignBus(schedule.id, parseInt(e.target.value))
                                    }
                                >
                                    <option value="0">Chọn bus</option>
                                    {listBus.map((bus, index) => (
                                        <option key={index} value={bus.id}>
                                            {bus.licensePlate}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
            <CustomButton
                loading={loading}
                text="Lưu thông tin"
                onClick={() => handleAssignment()}
                style={{ marginRight: '10px' }}
            ></CustomButton>
            <span>{`   `}</span>
            <i style={{ color: 'red' }}>{`${error}`}</i>
        </>
    )
}

// const AssignScheduleBox2 = ({ curRoute, curTrip, listScheduleIn, finishUpdate, currentDay }) => {
//     const [listSchedule, setListSchedule] = useState([])
//     const listDriver = useSelector(selectCurrentListDriver)
//     const listBus = useSelector(selectCurrentListBus)
//     const [listUpdate, setListUpdate] = useState(null)
//     const [listDriverSchedule, setListDriverSchedule] = useState([])
//     const [listBusSchedule, setListBusSchedule] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [autoSchdMode, setAutoSchdMode] = useState(false)
//     const [error, setError] = useState('')
//     const dispatch = useDispatch()

//     //Xử lý sự kiện chọn bus
//     const handleAssignBus = (scheduleId, busId) => {
//         const item = listUpdate ? listUpdate[scheduleId] : null
//         const schdDriver = listSchedule.find((schd) => schd.id === scheduleId).driver
//         const schdDriver2 = listSchedule.find((schd) => schd.id === scheduleId).driver2
//         setListUpdate({
//             ...listUpdate,
//             [scheduleId]: {
//                 driverId: item ? item.driverId : schdDriver ? schdDriver.id : 0,
//                 driverId2: item ? item.driverId2 : schdDriver2 ? schdDriver2.id : 0,
//                 busId: busId,
//             },
//         })
//     }
//     //Xử lý sự kiện chọn tài xế 1
//     const handleAssignDriver = (scheduleId, driverId) => {
//         const item = listUpdate ? listUpdate[scheduleId] : null
//         const schdBus = listSchedule.find((schd) => schd.id === scheduleId).bus
//         const schdDriver2 = listSchedule.find((schd) => schd.id === scheduleId).driver2
//         setListUpdate({
//             ...listUpdate,
//             [scheduleId]: {
//                 driverId: driverId,
//                 driverId2: item ? item.driverId2 : schdDriver2 ? schdDriver2.id : 0,
//                 busId: item ? item.busId : schdBus ? schdBus.id : 0,
//             },
//         })
//     }

//     //Xử lý sự kiện chọn tài xế 2
//     const handleAssignDriver2 = (scheduleId, driverId) => {
//         const item = listUpdate ? listUpdate[scheduleId] : null
//         const schdBus = listSchedule.find((schd) => schd.id === scheduleId).bus
//         const schdDriver = listSchedule.find((schd) => schd.id === scheduleId).driver
//         setListUpdate({
//             ...listUpdate,
//             [scheduleId]: {
//                 driverId2: driverId,
//                 driverId: item ? item.driverId : schdDriver ? schdDriver.id : 0,
//                 busId: item ? item.busId : schdBus ? schdBus.id : 0,
//             },
//         })
//     }

//     //CÁC HÀM XỬ LÝ PHÂN CÔNG THỦ CÔNG CỦA ADMIN
//     //Lấy lịch trình của từng người / từng bus do admin phân công, xem từng lịch trình có phù hợp không
//     const verifyItemSchedule = () => {
//         if (!listUpdate) return false
//         const listDriverAssign = JSON.parse(JSON.stringify(listDriverSchedule))
//         const listBusAssign = JSON.parse(JSON.stringify(listBusSchedule))
//         const assignList = Object.entries(listUpdate)
//         let index = -1
//         let schedule = null
//         assignList.forEach(([key, value]) => {
//             //Cập nhật schedule mới cho lịch của driver
//             index = listDriverAssign.findIndex((item) => item.id == value.driverId)
//             if (index !== -1) {
//                 schedule = listSchedule.find((schd) => schd.id == key)
//                 if (schedule && !listDriverAssign[index].schedules.find((schd) => schd.id == key))
//                     listDriverAssign[index].schedules.push(schedule)
//             }
//             //Cập nhật schedule mới cho lịch của bus
//             index = listBusAssign.findIndex((item) => item.id == value.busId)
//             if (index !== -1) {
//                 schedule = listSchedule.find((schd) => schd.id == key)
//                 if (schedule) listBusAssign[index].schedules.push(schedule)
//             }
//         })
//         for (let i = 0; i < listDriverAssign.length; i++) {
//             if (validateAssignedItem(listDriverAssign[i]) === false)
//                 return 'Lịch trình của tài xế có xung đột'
//         }
//         for (let i = 0; i < listBusAssign.length; i++) {
//             if (validateAssignedItem(listBusAssign[i], 'bus') === false)
//                 return 'Lịch trình của bus có xung đột'
//         }
//         return 'success'
//     }

//     const validSchedule = (listSchd, previous) => {
//         const newSchd = [...listSchd]
//         let valid = true
//         newSchd.sort((a, b) => convertTimeToInt(a.departTime) - convertTimeToInt(b.departTime))
//         if (newSchd.length > 0 && previous) if (previous.turn === newSchd[0].turn) return false
//         // Kiểm tra từng cặp vehicle trip có hợp lệ ko vì giãn cách mỗi chuyến ít nhất là 1 tiếng (đối với 1 bus hoặc 1 driver)
//         for (let i = 0; i < newSchd.length - 1; i++) {
//             if (
//                 !(
//                     convertTimeToInt(newSchd[i + 1].departTime) >=
//                         convertTimeToInt(newSchd[i].arrivalTime) + 1 &&
//                     newSchd[i + 1].turn !== newSchd[i].turn
//                 )
//             ) {
//                 valid = false
//                 break
//             }
//         }
//         return valid
//     }

//     // Xác minh phân công cho mỗi driver - tài xế là đúng chưa
//     const validateAssignedItem = (listAssignSchedule, type = 'driver') => {
//         let previousTrip = {
//             overflow: 0,
//         }
//         let remainEndTime = 0
//         // Xem chuyến trễ nhất hôm qua có lố giờ qua hôm nay không
//         if (listAssignSchedule.previous) {
//             previousTrip = {
//                 overflow: getOverflowTime(listAssignSchedule.previous.schedule).overflow,
//                 turn: listAssignSchedule.previous.turn,
//             }
//         }
//         //Xem chuyến trễ nhất hôm nay có lố giờ qua ngày mai ko (chỉ tính phần giờ của hôm nay)
//         if (listAssignSchedule.schedules.length > 0) {
//             remainEndTime = getOverflowTime(
//                 listAssignSchedule.schedules[listAssignSchedule.schedules.length - 1],
//             ).remain
//         }
//         const limitTime = type === 'driver' ? 10 : 24
//         //Kiểm tra có thỏa mãn ràng buộc thời gian không
//         if (remainEndTime === 0) {
//             if (
//                 listAssignSchedule.schedules.length * (curRoute.hours + 1) <=
//                     limitTime - previousTrip.overflow &&
//                 validSchedule(listAssignSchedule.schedules, listAssignSchedule.previous)
//             ) {
//                 return true
//             } else {
//                 return false
//             }
//         } else {
//             if (
//                 (listAssignSchedule.schedules.length - 1) * (curRoute.hours + 1) + remainEndTime <=
//                     limitTime - previousTrip.overflow &&
//                 validSchedule(listAssignSchedule.schedules, listAssignSchedule.previous)
//             ) {
//                 return true
//             } else return false
//         }
//     }

//     //Thực hiện assign
//     const handleAssignment = () => {
//         let checkState = 'success'
//         if (autoSchdMode === false) {
//             checkState = verifyItemSchedule()
//         }
//         if (checkState === 'success') {
//             // console.log('Lưu thông tin')
//             const listRequest = Object.entries(listUpdate)
//             let scheduleInfor = null
//             if (listRequest.length > 0) {
//                 setLoading(true)
//                 listRequest.forEach((req, index) => {
//                     scheduleInfor = {
//                         id: req[0],
//                         bus: req[1].busId,
//                         driver: req[1].driverId,
//                         note: listSchedule.find((schd) => schd.id == req[0]).note,
//                     }
//                     dispatch(scheduleThunk.updateSchedule(scheduleInfor))
//                         .unwrap()
//                         .then(() => {
//                             setLoading(false)
//                             if (index === listRequest.length - 1) finishUpdate()
//                         })
//                         .catch(() => {
//                             setLoading(false)
//                         })
//                 })
//             }
//             setError('')
//         } else {
//             setError(checkState)
//         }
//     }

//     //Các hàm lấy giá trị schedule của mỗi bus - driver
//     const getDriverValue = (schedule) => {
//         if (schedule.driver !== 0) return schedule.driver
//         else if (listUpdate && listUpdate[schedule.id]) return listUpdate[schedule.id].driverId
//         else return 0
//     }
//     const getDriver2Value = (schedule) => {
//         if (schedule.driver2 !== 0) return schedule.driver2
//         else if (listUpdate && listUpdate[schedule.id]) return listUpdate[schedule.id].driverId2
//         else return 0
//     }
//     const getBusValue = (schedule) => {
//         if (schedule.bus !== 0) return schedule.bus
//         else if (listUpdate && listUpdate[schedule.id]) return listUpdate[schedule.id].busId
//         else return 0
//     }
//     const scanDriver = () => {
//         let listDriverSchd = []
//         let schedules = []
//         let count = 0
//         listDriver.forEach(async (driver, index) => {
//             //Tìm chuyến cuối của ngày hôm qua
//             try {
//                 const response = await Promise.all([
//                     dispatch(staffThunk.getDriverSchedules(driver.driver.driverId)),
//                     dispatch(staffThunk.getDriverTrip(driver.driver.driverId)),
//                 ])
//                 const res = response[0].payload
//                 const trip = response[1].payload
//                 schedules = listSchedule.filter((schd) => schd.driver === driver.driver.driverId)
//                 const yesterday = new Date(currentDay)
//                 const result = res.filter(
//                     (schd) =>
//                         schd.departDate ===
//                         format(yesterday.setDate(currentDay.getDate() - 1), 'yyyy-MM-dd'),
//                 )
//                 result.sort(
//                     (a, b) => convertTimeToInt(b.departTime) - convertTimeToInt(a.departTime),
//                 )
//                 if (result.length > 0) {
//                     const turnGo = trip.find((tp) => tp.turn === true)
//                     if (turnGo)
//                         listDriverSchd.push({
//                             id: driver.driver.driverId,
//                             schedules: schedules,
//                             previous: {
//                                 schedule: result[0],
//                                 turn: turnGo.schedules.find((sch) => sch.id === result[0].id)
//                                     ? true
//                                     : false,
//                             },
//                         })
//                 } else {
//                     listDriverSchd.push({
//                         id: driver.driver.driverId,
//                         schedules: schedules,
//                         previous: null,
//                     })
//                 }
//                 count = count + 1
//                 if (count === listDriver.length) setListDriverSchedule(listDriverSchd)
//             } catch (error) {
//                 schedules = listSchedule.filter((schd) => schd.driver === driver.driver.driverId)
//                 listDriverSchd.push({
//                     id: driver.driver.driverId,
//                     schedules: schedules,
//                     previous: null,
//                 })
//                 count = count + 1
//                 if (count === listDriver.length) setListDriverSchedule(listDriverSchd)
//             }
//         })
//     }
//     const scanBus = () => {
//         let listBusSchd = []
//         let schedules = []
//         let count = 0
//         listBus.forEach(async (bus) => {
//             try {
//                 const response = await Promise.all([
//                     dispatch(busThunk.getSchedules(bus.id)),
//                     dispatch(busThunk.getTrips(bus.id)),
//                 ])
//                 const res = response[0]
//                 const trip = response[1]
//                 schedules = listSchedule.filter((schd) => schd.bus === bus.id)
//                 const yesterday = new Date(currentDay)
//                 const result = res.filter(
//                     (schd) =>
//                         schd.departDate ===
//                         format(yesterday.setDate(currentDay.getDate() - 1), 'yyyy-MM-dd'),
//                 )
//                 result.sort(
//                     (a, b) => convertTimeToInt(b.departTime) - convertTimeToInt(a.departTime),
//                 )
//                 if (result.length > 0) {
//                     const turnGo = trip.find((tp) => tp.turn === true)
//                     if (turnGo)
//                         listBusSchd.push({
//                             id: bus.id,
//                             schedules: schedules,
//                             previous: {
//                                 schedule: result[0],
//                                 turn: turnGo.schedules.find((sch) => sch.id === result[0].id)
//                                     ? true
//                                     : false,
//                             },
//                         })
//                 } else {
//                     listBusSchd.push({
//                         id: bus.id,
//                         schedules: schedules,
//                         previous: null,
//                     })
//                 }
//                 count = count + 1
//                 if (count === listBus.length) {
//                     setListBusSchedule(listBusSchd)
//                 }
//             } catch {
//                 schedules = listSchedule.filter((schd) => schd.bus === bus.id)
//                 listBusSchd.push({
//                     id: bus.id,
//                     schedules: schedules,
//                     previous: null,
//                 })
//                 count = count + 1
//                 if (count === listBus.length) {
//                     setListBusSchedule(listBusSchd)
//                 }
//             }
//         })
//     }

//     // //CÁC HÀM XỬ LÝ CHO AUTO SCHEDULING
//     // //Xem tổng lịch trình có hợp lý chưa, không có trip nào chồng giờ nhau
//     // const validVehicleSchedule = (listDepartTime, schedule, prevTrip) => {
//     //     const newSchd = [...listDepartTime]
//     //     let valid = true
//     //     if (newSchd.length > 0) {
//     //         if (
//     //             (prevTrip.overflow !== 0 &&
//     //                 convertTimeToInt(schedule.departTime) - prevTrip.overflow >= 1) ||
//     //             prevTrip.overflow === 0
//     //         ) {
//     //             newSchd.push(schedule)
//     //             valid = true
//     //             newSchd.sort(
//     //                 (a, b) => convertTimeToInt(a.departTime) - convertTimeToInt(b.departTime),
//     //             )
//     //             // Kiểm tra từng cặp vehicle trip có hợp lệ ko
//     //             for (let i = 0; i < newSchd.length - 1; i++) {
//     //                 if (
//     //                     !(
//     //                         convertTimeToInt(newSchd[i + 1].departTime) >=
//     //                             convertTimeToInt(newSchd[i].arrivalTime) + 1 &&
//     //                         newSchd[i + 1].turn !== newSchd[i].turn
//     //                     )
//     //                 ) {
//     //                     valid = false
//     //                     break
//     //                 }
//     //             }
//     //         } else {
//     //             valid = false
//     //         }
//     //     } else {
//     //         if (prevTrip.turn !== true && prevTrip.turn !== false) valid = true
//     //         else if (schedule.turn !== prevTrip.turn) valid = true
//     //         else valid = false
//     //     }
//     //     if (valid === true) {
//     //         console.log(schedule)
//     //         console.log(prevTrip)
//     //     }
//     //     return valid
//     // }

//     // //Xem có bị lố giờ qua ngày hôm sau ko, trả về số giờ lố và ko lố
//     // const getOverflowTime = (schd) => {
//     //     const currentTime = new Date()
//     //     const time = convertToStampSplit(curRoute.hours)
//     //     const arrivalTime = new Date(
//     //         new Date(format(currentTime, 'yyyy-MM-dd') + 'T' + schd.departTime),
//     //     )
//     //     arrivalTime.setHours(arrivalTime.getHours() + time.hours)
//     //     arrivalTime.setMinutes(arrivalTime.getMinutes() + time.minutes)
//     //     let over = 0
//     //     if (arrivalTime.getDate() !== currentTime.getDate()) {
//     //         over = convertTimeToInt(arrivalTime.getHours() + ':' + arrivalTime.getMinutes())
//     //         return {
//     //             remain: curRoute.hours - over,
//     //             overflow: over,
//     //         }
//     //     }
//     //     return {
//     //         remain: 0,
//     //         overflow: 0,
//     //     }
//     // }

//     // //Xem nếu thêm schd mới thì lịch của driver có đúng không
//     // const verifyDriverSchedule = (driverSchedule, schd) => {
//     //     let previousTrip = {
//     //         overflow: 0,
//     //     }
//     //     let remainEndTime = 0
//     //     // Xem chuyến trễ nhất hôm qua có lố giờ qua hôm nay không
//     //     if (driverSchedule.previous) {
//     //         previousTrip = {
//     //             overflow: getOverflowTime(driverSchedule.previous.schedule).overflow,
//     //             turn: driverSchedule.previous.turn,
//     //         }
//     //     }
//     //     //Xem chuyến trễ nhất hôm nay có lố giờ qua ngày mai ko (nếu có thì ko thêm đc nữa)
//     //     if (driverSchedule.schedules.length > 0) {
//     //         remainEndTime = getOverflowTime(
//     //             driverSchedule.schedules[driverSchedule.schedules.length - 1],
//     //         ).remain
//     //         if (remainEndTime !== 0) return false
//     //     }
//     //     // Xem chuyến được thêm có thể lố giờ qua ngày mai ko
//     //     let remainEndTimeNew = getOverflowTime(schd).remain
//     //     if (remainEndTimeNew !== 0) {
//     //         if (
//     //             driverSchedule.schedules.length * (curRoute.hours + 1) + remainEndTimeNew <=
//     //                 10 - previousTrip.overflow &&
//     //             validVehicleSchedule(driverSchedule.schedules, schd, previousTrip)
//     //         )
//     //             return true
//     //         return false
//     //     } else {
//     //         if (
//     //             (driverSchedule.schedules.length + 1) * (curRoute.hours + 1) <=
//     //                 10 - previousTrip.overflow &&
//     //             validVehicleSchedule(driverSchedule.schedules, schd, previousTrip)
//     //         )
//     //             return true
//     //         return false
//     //     }
//     // }

//     // //Xem nếu thêm schd mới thì lịch của bus có đúng không
//     // const verifyBusSchedule = (busSchedule, schd) => {
//     //     let previousTrip = {
//     //         overflow: 0,
//     //     }
//     //     let remainEndTime = 0
//     //     // Xem chuyến trễ nhất hôm qua có lố giờ qua hôm nay không
//     //     if (busSchedule.previous) {
//     //         previousTrip = {
//     //             overflow: getOverflowTime(busSchedule.previous.schedule).overflow,
//     //             turn: busSchedule.previous.turn,
//     //         }
//     //     }
//     //     //Xem chuyến trễ nhất hôm nay có lố giờ qua ngày mai ko
//     //     if (busSchedule.schedules.length > 0) {
//     //         remainEndTime = getOverflowTime(
//     //             busSchedule.schedules[busSchedule.schedules.length - 1],
//     //         ).remain
//     //         if (remainEndTime !== 0) return false
//     //     }
//     //     //Xem chuyến định thêm có lố giờ ko
//     //     let remainEndTimeNew = getOverflowTime(schd).remain
//     //     if (remainEndTimeNew !== 0) {
//     //         if (
//     //             busSchedule.schedules.length * (curRoute.hours + 1) + remainEndTimeNew <=
//     //                 24 - previousTrip.overflow &&
//     //             validVehicleSchedule(busSchedule.schedules, schd, previousTrip)
//     //         )
//     //             return true
//     //         return false
//     //     } else {
//     //         if (
//     //             (busSchedule.schedules.length + 1) * (curRoute.hours + 1) <=
//     //                 24 - previousTrip.overflow &&
//     //             validVehicleSchedule(busSchedule.schedules, schd, previousTrip)
//     //         )
//     //             return true
//     //         return false
//     //     }
//     // }

//     // //Hàm thực hiện scheduling
//     // const autoScheduling = () => {
//     //     let autoSchd = null
//     //     let listDriverScheduleIn = JSON.parse(JSON.stringify(listDriverSchedule))
//     //     let listBusScheduleIn = JSON.parse(JSON.stringify(listBusSchedule))
//     //     listSchedule.forEach((schd) => {
//     //         if (schd.allowChange) {
//     //             for (let i = 0; i < listDriverScheduleIn.length; i++) {
//     //                 if (verifyDriverSchedule(listDriverScheduleIn[i], schd)) {
//     //                     autoSchd = {
//     //                         ...autoSchd,
//     //                         [schd.id]: {
//     //                             driverId: listDriverScheduleIn[i].id,
//     //                             busId: autoSchd && autoSchd[schd.id] ? autoSchd[schd.id].busId : 0,
//     //                         },
//     //                     }
//     //                     listDriverScheduleIn[i].schedules.push(schd)
//     //                     break
//     //                 }
//     //             }
//     //             for (let i = 0; i < listBusScheduleIn.length; i++) {
//     //                 if (verifyBusSchedule(listBusScheduleIn[i], schd)) {
//     //                     autoSchd = {
//     //                         ...autoSchd,
//     //                         [schd.id]: {
//     //                             driverId:
//     //                                 autoSchd && autoSchd[schd.id] ? autoSchd[schd.id].driverId : 0,
//     //                             busId: listBusScheduleIn[i].id,
//     //                         },
//     //                     }
//     //                     listBusScheduleIn[i].schedules.push(schd)
//     //                     break
//     //                 }
//     //             }
//     //         }
//     //     })
//     //     setListUpdate(autoSchd)
//     // }

//     useEffect(() => {
//         if (listSchedule.length > 0) {
//             const sumTrip = []
//             listScheduleIn.forEach((item) => {
//                 sumTrip.push({
//                     id: item.id,
//                     departTime: item.departTime.slice(0, -3),
//                     arrivalTime: addHoursToTime(item.departTime, item.tripInfor.hours),
//                     turn: item.tripInfor.turn,
//                     driver: item.driverUser ? item.driverUser.driver.driverId : 0,
//                     driver2: item.driverUser ? item.driverUser.driver.driverId : 0,
//                     bus: item.bus ? item.bus.id : 0,
//                     note: item.note,
//                     allowChange: !item.driverUser || !item.bus,
//                 })
//             })
//             sumTrip.sort((a, b) => convertTimeToInt(a.departTime) - convertTimeToInt(b.departTime))
//             setListSchedule(sumTrip)
//         }
//     }, [listScheduleIn])
//     useEffect(() => {
//         if (listSchedule.length > 0) {
//             scanBus()
//             scanDriver()
//         }
//     }, [listSchedule.length])
//     useEffect(() => {
//         if (autoSchdMode === true) {
//             autoScheduling()
//         }
//     }, [autoSchdMode])
//     return (
//         <>
//             <b>{`Trạm A: ${curTrip.startStation.name} `}</b>
//             <span>{` || `}</span>
//             <b>{` Trạm B: ${curTrip.endStation.name}`}</b>
//             <CFormCheck
//                 id="auto"
//                 label="Phân công tự động"
//                 className="mt-3"
//                 checked={autoSchdMode}
//                 onChange={() => setAutoSchdMode(!autoSchdMode)}
//             />
//             <br></br>
//             <CTable>
//                 <CTableHead>
//                     <CTableRow>
//                         <CTableHeaderCell scope="col">#</CTableHeaderCell>
//                         <CTableHeaderCell className="text-center" scope="col">
//                             Khởi hành
//                         </CTableHeaderCell>
//                         <CTableHeaderCell className="text-center" scope="col">
//                             Kết thúc
//                         </CTableHeaderCell>
//                         <CTableHeaderCell className="text-center" scope="col">
//                             Trạm đi
//                         </CTableHeaderCell>
//                         <CTableHeaderCell className="text-center" scope="col">
//                             Trạm đến
//                         </CTableHeaderCell>
//                         <CTableHeaderCell className="text-center" scope="col">
//                             Tài xế
//                         </CTableHeaderCell>
//                         <CTableHeaderCell className="text-center" scope="col">
//                             Bus
//                         </CTableHeaderCell>
//                     </CTableRow>
//                 </CTableHead>
//                 <CTableBody>
//                     {listSchedule.map((schedule, index) => (
//                         <CTableRow key={index}>
//                             <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
//                             <CTableDataCell className="text-center">
//                                 {schedule.departTime}
//                             </CTableDataCell>
//                             <CTableDataCell className="text-center">
//                                 {schedule.arrivalTime}
//                             </CTableDataCell>
//                             <CTableDataCell className="text-center">
//                                 {schedule.turn === true ? 'A' : 'B'}
//                             </CTableDataCell>
//                             <CTableDataCell className="text-center">
//                                 {schedule.turn === true ? 'B' : 'A'}
//                             </CTableDataCell>
//                             <CTableDataCell className="text-center">
//                                 <CFormSelect
//                                     value={getDriverValue(schedule)}
//                                     disabled={autoSchdMode || schedule.driver !== 0}
//                                     onChange={(e) =>
//                                         handleAssignDriver(schedule.id, parseInt(e.target.value))
//                                     }
//                                 >
//                                     <option value="0">Chọn driver</option>
//                                     {listDriver.map((driver, index) => (
//                                         <option key={index} value={driver.driver.driverId}>
//                                             {driver.name}
//                                         </option>
//                                     ))}
//                                 </CFormSelect>
//                             </CTableDataCell>
//                             <CTableDataCell className="text-center">
//                                 <CFormSelect
//                                     value={getBusValue(schedule)}
//                                     disabled={autoSchdMode || schedule.bus !== 0}
//                                     onChange={(e) =>
//                                         handleAssignBus(schedule.id, parseInt(e.target.value))
//                                     }
//                                 >
//                                     <option value="0">Chọn bus</option>
//                                     {listBus.map((bus, index) => (
//                                         <option key={index} value={bus.id}>
//                                             {bus.licensePlate}
//                                         </option>
//                                     ))}
//                                 </CFormSelect>
//                             </CTableDataCell>
//                         </CTableRow>
//                     ))}
//                 </CTableBody>
//             </CTable>
//             <CustomButton
//                 loading={loading}
//                 text="Lưu thông tin"
//                 onClick={() => handleAssignment()}
//                 style={{ marginRight: '10px' }}
//             ></CustomButton>
//             <span>{`   `}</span>
//             <i style={{ color: 'red' }}>{`${error}`}</i>
//         </>
//     )
// }

const ScheduleWrap = ({ schedule, handleSetInfo, listUpdate, listError }) => {
    const listDriver = useSelector(selectCurrentListDriver)
    const listBus = useSelector(selectCurrentListBus)
    const [openDataBox, setOpenDataBox] = useState(false)
    const arrivalTime = addHoursToTime(schedule.departTime, schedule.tripInfor.hours)
    const updatedData = listUpdate ? listUpdate[schedule.id] : null
    //Các hàm lấy giá trị schedule của mỗi bus - driver
    const getDriverValue = () => {
        if (listUpdate && listUpdate[schedule.id]) return listUpdate[schedule.id].driverId
        else if (schedule.driverUser) return schedule.driverUser.driver.driverId
        else return 0
    }
    const getDriver2Value = () => {
        if (listUpdate && listUpdate[schedule.id]) return listUpdate[schedule.id].driverId2
        else if (schedule.driverUser2) return schedule.driverUser2.driver.driverId
        else return 0
    }
    const getBusValue = () => {
        if (listUpdate && listUpdate[schedule.id]) return listUpdate[schedule.id].busId
        else if (schedule.bus) return schedule.bus.id
        else return 0
    }
    const [driver, setDriver] = useState(getDriverValue())
    const [driver2, setDriver2] = useState(getDriver2Value())
    const [bus, setBus] = useState(getBusValue())
    const getScheduleColor = () => {
        if (schedule.tripInfor.turn === true) return 'success'
        else return 'warning'
    }
    const handleSaveInfo = () => {
        handleSetInfo(schedule.id, driver, driver2, bus)
        setOpenDataBox(false)
    }
    const handleCancel = () => {
        setDriver(getDriverValue())
        setDriver2(getDriver2Value())
        setBus(getBusValue())
        setOpenDataBox(false)
    }
    useEffect(() => {
        setDriver(getDriverValue())
        setDriver2(getDriver2Value())
        setBus(getBusValue())
    }, [listUpdate, schedule])
    return (
        <>
            <CTable bordered className="mb-1">
                <CTableBody>
                    <CTableRow>
                        <CTableDataCell
                            className="text-center p-0"
                            role="button"
                            onClick={() => setOpenDataBox(true)}
                        >
                            <CCard color={getScheduleColor()} style={{ borderRadius: '0' }}>
                                <CCardBody className="d-flex flex-column justify-content-center p-1 align-items-center">
                                    <b>{`${schedule.departTime.slice(0, -3)} - ${arrivalTime}`}</b>
                                    <div className="border-top" style={{ textAlign: 'left' }}>
                                        {updatedData && updatedData.driverId != 0 ? (
                                            <div>
                                                <i>Tài 1: </i>
                                                <b>
                                                    {shortenName(
                                                        listDriver.find(
                                                            (drv) =>
                                                                drv.driver.driverId ===
                                                                updatedData.driverId,
                                                        ).name,
                                                    )}
                                                </b>
                                            </div>
                                        ) : schedule.driverUser ? (
                                            <div>
                                                <i>Tài 1: </i>
                                                <b>{shortenName(schedule.driverUser.name)}</b>
                                            </div>
                                        ) : null}
                                        {updatedData && updatedData.driverId2 != 0 ? (
                                            <div>
                                                <i>Tài 2: </i>
                                                <b>
                                                    {shortenName(
                                                        listDriver.find(
                                                            (drv) =>
                                                                drv.driver.driverId ===
                                                                updatedData.driverId2,
                                                        ).name,
                                                    )}
                                                </b>
                                            </div>
                                        ) : schedule.driverUser2 ? (
                                            <div>
                                                <i>Tài 2: </i>
                                                <b>{shortenName(schedule.driverUser2.name)}</b>
                                            </div>
                                        ) : null}
                                        {updatedData && updatedData.busId != 0 ? (
                                            <div>
                                                <i>Xe: </i>
                                                <b>
                                                    {
                                                        listBus.find(
                                                            (bs) => bs.id === updatedData.busId,
                                                        ).licensePlate
                                                    }
                                                </b>
                                            </div>
                                        ) : schedule.bus ? (
                                            <div>
                                                <i>Bus: </i>
                                                <b>{schedule.bus.licensePlate}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                </CCardBody>
                                {listError.find((item) => item.id === schedule.id) && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            width: '0',
                                            height: '0',
                                            borderLeft: '10px solid transparent',
                                            borderTop: '10px solid transparent',
                                            borderRight: '10px solid red',
                                            borderBottom: '10px solid red',
                                        }}
                                    ></div>
                                )}
                            </CCard>
                        </CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
            <CModal alignment="center" visible={openDataBox} onClose={() => setOpenDataBox(false)}>
                <CModalHeader>{`Chọn phân công`}</CModalHeader>
                <CModalBody className="d-flex justify-content-center">
                    <CForm className="col-sm-10">
                        <CInputGroup className="mb-2">
                            <CInputGroupText className="col-sm-3">Tài xế 1</CInputGroupText>
                            <CFormSelect
                                value={driver.toString()}
                                onChange={(e) => setDriver(parseInt(e.target.value))}
                            >
                                <option value="0" disabled>
                                    Chọn tài xế
                                </option>
                                {listDriver.map((drv, index) => (
                                    <option key={index} value={drv.driver.driverId}>
                                        {drv.name}
                                    </option>
                                ))}
                            </CFormSelect>
                        </CInputGroup>
                        <CInputGroup className="mb-2">
                            <CInputGroupText className="col-sm-3">Tài xế 2</CInputGroupText>
                            <CFormSelect
                                value={driver2}
                                onChange={(e) => setDriver2(parseInt(e.target.value))}
                            >
                                <option value="0">Chọn tài xế</option>
                                {listDriver.map((drv, index) => (
                                    <option key={index} value={drv.driver.driverId}>
                                        {drv.name}
                                    </option>
                                ))}
                            </CFormSelect>
                        </CInputGroup>
                        <CInputGroup className="mb-2">
                            <CInputGroupText className="col-sm-3">Xe</CInputGroupText>
                            <CFormSelect
                                value={bus}
                                onChange={(e) => setBus(parseInt(e.target.value))}
                            >
                                <option value="0">Chọn xe</option>
                                {listBus.map((bs, index) => (
                                    <option key={index} value={bs.id}>
                                        {bs.licensePlate}
                                    </option>
                                ))}
                            </CFormSelect>
                        </CInputGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton variant="outline" onClick={handleSaveInfo}>
                        Chọn
                    </CButton>
                    <CButton variant="outline" onClick={handleCancel}>
                        Hủy
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

const TableSchedule = ({ listScheduleIn, startDate, finishUpdate }) => {
    const curRoute = useSelector(selectCurrentRoute)
    const listDriver = useSelector(selectCurrentListDriver)
    const listBus = useSelector(selectCurrentListBus)
    const [listSchedule, setListSchedule] = useState(listScheduleIn)
    const [listProcessSchedule, setListProcessSchedule] = useState([])
    const [listUpdate, setListUpdate] = useState(null)
    const [listDriverSchedule, setListDriverSchedule] = useState([])
    const [listBusSchedule, setListBusSchedule] = useState([])
    const curTrip = useSelector(selectCurrentTrip)
    const dispatch = useDispatch()
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [listError, setListError] = useState([])
    const [auto, setAuto] = useState(false)
    const [driverNumber, setDriverNumber] = useState(1)
    const [listRepeat, setListRepeat] = useState([])
    const filterTime = (listSchdIn, time) => {
        //sort list based on time
        const listSchd = []
        listSchdIn.forEach((schdCom) => {
            listSchd.push(...schdCom.schedules)
        })
        listSchd.sort((a, b) => {
            const timeA = convertTimeToInt(a.departTime.slice(0, -3))
            const timeB = convertTimeToInt(b.departTime.slice(0, -3))
            if (timeA > timeB) return 1
            if (timeA < timeB) return -1
            return 0
        })
        if (time === 'morning')
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.departTime.slice(0, -3)) >= 6 &&
                    convertTimeToInt(schd.departTime.slice(0, -3)) < 12,
            )
        else if (time === 'afternoon')
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.departTime.slice(0, -3)) >= 12 &&
                    convertTimeToInt(schd.departTime.slice(0, -3)) < 18,
            )
        else if (time === 'evening')
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.departTime.slice(0, -3)) >= 18 &&
                    convertTimeToInt(schd.departTime.slice(0, -3)) < 24,
            )
        else
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.departTime.slice(0, -3)) >= 0 &&
                    convertTimeToInt(schd.departTime.slice(0, -3)) < 6,
            )
    }
    const [loading, setLoading] = useState(false)
    const handleUpdateListAssign = (scheduleId, driverId, driverId2, busId) => {
        if (listUpdate)
            setListUpdate({
                ...listUpdate,
                [scheduleId]: {
                    driverId: driverId,
                    driverId2: driverId2,
                    busId: busId,
                },
            })
        else
            setListUpdate({
                [scheduleId]: {
                    driverId: driverId,
                    driverId2: driverId2,
                    busId: busId,
                },
            })
    }
    const isPreviousSchedule = (schd) => {
        const schdDate = parse(schd.departDate, 'yyyy-MM-dd', new Date())
        return schdDate.getTime() < startDate.getTime()
    }
    //sort lại lịch trình
    const sortTime = (a, b) => {
        return (
            parse(a.departDate + 'T' + a.departTime, "yyyy-MM-dd'T'HH:mm", new Date()).getTime() -
            parse(b.departDate + 'T' + b.departTime, "yyyy-MM-dd'T'HH:mm", new Date()).getTime()
        )
    }
    //sort lại lịch trình
    const sortTime2 = (a, b) => {
        return (
            parse(
                a.departDate + 'T' + a.departTime,
                "yyyy-MM-dd'T'HH:mm:ss",
                new Date(),
            ).getTime() -
            parse(b.departDate + 'T' + b.departTime, "yyyy-MM-dd'T'HH:mm:ss", new Date()).getTime()
        )
    }
    //Lấy lịch trình các tài xế
    const scanDriver = () => {
        let listDriverSchd = []
        let schedules = []
        let count = 0
        listDriver.forEach(async (driver, index) => {
            //Tìm chuyến cuối của ngày tuần trước
            try {
                const response = await Promise.all([
                    dispatch(staffThunk.getDriverSchedules(driver.driver.driverId)),
                    dispatch(staffThunk.getDriverTrip(driver.driver.driverId)),
                ])
                const res = response[0].payload
                const trip = response[1].payload
                schedules = listProcessSchedule.filter(
                    (schd) =>
                        schd.driver === driver.driver.driverId ||
                        schd.driver2 === driver.driver.driverId,
                )
                const result = res.filter((schd) => isPreviousSchedule(schd))
                result.sort((a, b) => sortTime2(b, a))
                if (result.length > 0) {
                    const turnGo = trip.find((tp) => tp.turn === true)
                    if (turnGo)
                        listDriverSchd.push({
                            id: driver.driver.driverId,
                            schedules: schedules,
                            previous: {
                                schedule: result[0],
                                turn: turnGo.schedules.find((sch) => sch.id === result[0].id)
                                    ? true
                                    : false,
                            },
                        })
                } else {
                    listDriverSchd.push({
                        id: driver.driver.driverId,
                        schedules: schedules,
                        previous: null,
                    })
                }
                count = count + 1
                if (count === listDriver.length) setListDriverSchedule(listDriverSchd)
            } catch (error) {
                schedules = listProcessSchedule.filter(
                    (schd) =>
                        schd.driver === driver.driver.driverId ||
                        schd.driver2 === driver.driver.driverId,
                )
                listDriverSchd.push({
                    id: driver.driver.driverId,
                    schedules: schedules,
                    previous: null,
                })
                count = count + 1
                if (count === listDriver.length) {
                    setListDriverSchedule(listDriverSchd)
                }
            }
        })
    }
    //Lấy lịch trình các xe
    const scanBus = () => {
        let listBusSchd = []
        let schedules = []
        let count = 0
        listBus.forEach(async (bus) => {
            try {
                const response = await Promise.all([
                    dispatch(busThunk.getSchedules(bus.id)),
                    dispatch(busThunk.getTrips(bus.id)),
                ])
                const res = response[0]
                const trip = response[1]
                schedules = listProcessSchedule.filter((schd) => schd.bus === bus.id)
                const result = res.filter((schd) => isPreviousSchedule(schd))
                result.sort((a, b) => sortTime2(b, a) < 0)
                if (result.length > 0) {
                    const turnGo = trip.find((tp) => tp.turn === true)
                    if (turnGo)
                        listBusSchd.push({
                            id: bus.id,
                            schedules: schedules,
                            previous: {
                                schedule: result[0],
                                turn: turnGo.schedules.find((sch) => sch.id === result[0].id)
                                    ? true
                                    : false,
                            },
                        })
                } else {
                    listBusSchd.push({
                        id: bus.id,
                        schedules: schedules,
                        previous: null,
                    })
                }
                count = count + 1
                if (count === listBus.length) {
                    setListBusSchedule(listBusSchd)
                }
            } catch {
                schedules = listProcessSchedule.filter((schd) => schd.bus === bus.id)
                listBusSchd.push({
                    id: bus.id,
                    schedules: schedules,
                    previous: null,
                })
                count = count + 1
                if (count === listBus.length) {
                    setListBusSchedule(listBusSchd)
                }
            }
        })
    }
    //Kiểm tra lịch trình có hợp lệ không về thời gian
    const validSchedule = (listSchd, previous) => {
        const newSchd = [...listSchd]
        let valid = true
        newSchd.sort((a, b) => sortTime(a, b))
        setListError([])
        if (newSchd.length > 0 && previous)
            if (previous.turn === newSchd[0].turn) {
                if (!auto) setListError([newSchd[0], previous.schedule])
                return false
            }
        // Kiểm tra từng cặp vehicle trip có hợp lệ ko vì giãn cách mỗi chuyến ít nhất là 1 tiếng (đối với 1 bus hoặc 1 driver)
        for (let i = 0; i < newSchd.length - 1; i++) {
            if (
                !(
                    (newSchd[i + 1].departDate === newSchd[i].departDate &&
                        convertTimeToInt(newSchd[i + 1].departTime) >=
                            convertTimeToInt(newSchd[i].arrivalTime) + 1 &&
                        newSchd[i + 1].turn !== newSchd[i].turn) ||
                    (newSchd[i + 1].departDate !== newSchd[i].departDate &&
                        newSchd[i + 1].turn !== newSchd[i].turn)
                )
            ) {
                valid = false
                if (!auto) setListError([newSchd[i + 1], newSchd[i]])
                break
            }
        }
        return valid
    }
    // Xác minh phân công cho mỗi driver - tài xế là đúng chưa
    const validateAssignedItem = (listAssignSchedule) => {
        if (validSchedule(listAssignSchedule.schedules, listAssignSchedule.previous)) {
            return true
        } else {
            return false
        }
    }
    //Kiểm tra xem khi thay đổi theo phân công mới thì có xung đột không
    const verifyItemSchedule = () => {
        if (!listUpdate) return false
        const listDriverAssign = JSON.parse(JSON.stringify(listDriverSchedule))
        const listBusAssign = JSON.parse(JSON.stringify(listBusSchedule))
        const assignList = Object.entries(listUpdate)
        let index = -1,
            alterIndex = -1,
            schedule = null,
            temp = null,
            oldDriver = [],
            oldBus = -1
        assignList.forEach(([key, value]) => {
            //Remove old assignment (if any)
            oldDriver = listDriverAssign.filter((item) =>
                item.schedules.find((schd) => schd.id == key),
            )
            oldBus = listBusAssign.findIndex((item) =>
                item.schedules.find((schd) => schd.id == key),
            )
            if (oldDriver.length > 0) {
                oldDriver.forEach((item) => {
                    alterIndex = listDriverAssign.findIndex((ite) => ite.id == item.id)
                    listDriverAssign[alterIndex].schedules = listDriverAssign[
                        alterIndex
                    ].schedules.filter((schd) => schd.id != key)
                })
            }
            if (oldBus !== -1) {
                listBusAssign[oldBus].schedules = listBusAssign[oldBus].schedules.filter(
                    (schd) => schd.id != key,
                )
            }
        })
        //Append new assignment
        assignList.forEach(([key, value]) => {
            //Cập nhật schedule mới cho lịch của driver, index là chỉ số thông tin của driver của assign
            index = listDriverAssign.findIndex((item) => item.id == value.driverId)
            if (index !== -1) {
                schedule = listProcessSchedule.find((schd) => schd.id == key)
                //Kiểm tra đã từng phân công, h sửa hay là đang phân công mới
                temp = listDriverAssign[index].schedules.find((schd) => schd.id == key)
                if (schedule && !temp) listDriverAssign[index].schedules.push(schedule)
            }
            //Cập nhật schedule mới cho lịch của driver 2
            index = listDriverAssign.findIndex((item) => item.id == value.driverId2)
            if (index !== -1) {
                schedule = listProcessSchedule.find((schd) => schd.id == key)
                if (schedule && !listDriverAssign[index].schedules.find((schd) => schd.id == key))
                    listDriverAssign[index].schedules.push(schedule)
            }
            //Cập nhật schedule mới cho lịch của bus
            index = listBusAssign.findIndex((item) => item.id == value.busId)
            if (index !== -1) {
                schedule = listProcessSchedule.find((schd) => schd.id == key)
                if (schedule) listBusAssign[index].schedules.push(schedule)
            }
        })
        for (let i = 0; i < listDriverAssign.length; i++) {
            if (validateAssignedItem(listDriverAssign[i]) === false) {
                return 'Lịch trình của tài xế có xung đột'
            }
        }
        for (let i = 0; i < listBusAssign.length; i++) {
            if (validateAssignedItem(listBusAssign[i]) === false) {
                return 'Lịch trình của xe có xung đột'
            }
        }
        setListError([])
        return 'success'
    }
    //Thực hiện assign
    const handleAssignment = () => {
        let checkState = verifyItemSchedule()
        if (checkState === 'success') {
            const listRequest = Object.entries(listUpdate)
            let scheduleInfor = null
            if (listRequest.length > 0) {
                setLoading(true)
                listRequest.forEach(async (req, index) => {
                    scheduleInfor = {
                        id: req[0],
                        bus: req[1].busId,
                        driver: req[1].driverId,
                        driver2: req[1].driverId2,
                        note: listProcessSchedule.find((schd) => schd.id == req[0]).note,
                    }
                    await dispatch(scheduleThunk.updateSchedule(scheduleInfor))
                        .unwrap()
                        .then(() => {
                            if (index === listRequest.length - 1) {
                                setLoading(false)
                                setListUpdate(null)
                                finishUpdate()
                            }
                        })
                        .catch(() => {
                            if (index === listRequest.length - 1) {
                                setLoading(false)
                            }
                        })
                })
                addToast(() =>
                    CustomToast({
                        message: 'Đã lưu thông tin',
                        type: 'success',
                    }),
                )
            } else {
                addToast(() =>
                    CustomToast({
                        message: 'Không có thông tin nào thay đổi',
                        type: 'warning',
                    }),
                )
            }
        } else {
            addToast(() =>
                CustomToast({
                    message: checkState,
                    type: 'error',
                }),
            )
        }
    }
    const handleCheck = () => {
        let checkState = verifyItemSchedule()
        if (checkState === 'success') {
            addToast(() =>
                CustomToast({
                    message: 'Lịch trình hợp lệ',
                    type: 'success',
                }),
            )
        } else {
            addToast(() =>
                CustomToast({
                    message: checkState,
                    type: 'error',
                }),
            )
        }
    }
    //Kiểm tra xem khi thay đổi theo phân công mới thì có xung đột không
    const checkAsssignment = (newAssign, listPreDriverSchedule, listPreBusSchedule) => {
        if (!newAssign)
            return {
                result: false,
                listDriverAssign: listPreDriverSchedule,
                listBusAssign: listPreBusSchedule,
            }
        const listDriverAssign = JSON.parse(JSON.stringify(listPreDriverSchedule))
        const listBusAssign = JSON.parse(JSON.stringify(listPreBusSchedule))
        let index = -1,
            schedule = null,
            temp = null
        //Append new assignment
        const { key, value } = newAssign
        //Cập nhật schedule mới cho lịch của driver, index là chỉ số thông tin của driver của assign
        index = listDriverAssign.findIndex((item) => item.id == value.driverId)
        if (index !== -1) {
            schedule = listProcessSchedule.find((schd) => schd.id == key)
            temp = listDriverAssign[index].schedules.find((schd) => schd.id == key)
            if (schedule && !temp) listDriverAssign[index].schedules.push(schedule)
        }
        //Cập nhật schedule mới cho lịch của driver 2
        index = listDriverAssign.findIndex((item) => item.id == value.driverId2)
        if (index !== -1) {
            schedule = listProcessSchedule.find((schd) => schd.id == key)
            if (schedule && !listDriverAssign[index].schedules.find((schd) => schd.id == key))
                listDriverAssign[index].schedules.push(schedule)
        }
        //Cập nhật schedule mới cho lịch của bus
        index = listBusAssign.findIndex((item) => item.id == value.busId)
        if (index !== -1) {
            schedule = listProcessSchedule.find((schd) => schd.id == key)
            if (schedule) listBusAssign[index].schedules.push(schedule)
        }
        for (let i = 0; i < listDriverAssign.length; i++) {
            if (validateAssignedItem(listDriverAssign[i]) === false) {
                return {
                    result: false,
                    listDriverAssign: listDriverAssign,
                    listBusAssign: listBusAssign,
                }
            }
        }
        for (let i = 0; i < listBusAssign.length; i++) {
            if (validateAssignedItem(listBusAssign[i]) === false) {
                return {
                    result: false,
                    listDriverAssign: listDriverAssign,
                    listBusAssign: listBusAssign,
                }
            }
        }
        return {
            result: true,
            listDriverAssign: listDriverAssign,
            listBusAssign: listBusAssign,
        }
    }

    //Thực hiện phân công tự động
    const autoScheduling = () => {
        let listUnAssignSchedule = listProcessSchedule
            .filter((schd) => schd.driver == 0 && schd.driver2 == 0 && schd.bus == 0)
            .sort((a, b) => sortTime(a, b))
        let listFinalAssign = null
        let listUpdateAssign = null
        let maximumAssign = 0
        let finish = false
        const findAssignment = (
            index,
            schedule,
            listAssign,
            listPreDriverAssign,
            listPreBusAssign,
            driverAssign = 1,
        ) => {
            if (!finish) {
                let newAssign = null
                let listNewAssign = { ...listAssign }
                let listDriverIn = [...listDriver].sort((a, b) => {
                    let indexA = listPreDriverAssign.findIndex(
                        (item) => item.id == a.driver.driverId,
                    )
                    let indexB = listPreDriverAssign.findIndex(
                        (item) => item.id == b.driver.driverId,
                    )
                    return (
                        listPreDriverAssign[indexA]?.schedules.length -
                        listPreDriverAssign[indexB]?.schedules.length
                    )
                })
                let listBusIn = [...listBus].sort((a, b) => {
                    let indexA = listPreBusAssign.findIndex((item) => item.id == a.id)
                    let indexB = listPreBusAssign.findIndex((item) => item.id == b.id)
                    return (
                        listPreBusAssign[indexA]?.schedules.length -
                        listPreBusAssign[indexB]?.schedules.length
                    )
                })
                if (driverAssign == 1) {
                    //Phân công 1 tài xế
                    for (let i = 0; i < listDriverIn.length; i++) {
                        for (let j = 0; j < listBusIn.length; j++) {
                            newAssign = {
                                key: schedule.id,
                                value: {
                                    driverId: listDriverIn[i].driver.driverId,
                                    driverId2: 0,
                                    busId: listBusIn[j].id,
                                },
                            }
                            const checkResult = checkAsssignment(
                                newAssign,
                                listPreDriverAssign,
                                listPreBusAssign,
                            )
                            if (checkResult.result == true) {
                                listNewAssign = {
                                    ...listNewAssign,
                                    [newAssign.key]: {
                                        driverId: newAssign.value.driverId,
                                        driverId2: newAssign.value.driverId2,
                                        busId: newAssign.value.busId,
                                    },
                                }
                                if (Object.entries(listNewAssign).length > maximumAssign) {
                                    listFinalAssign = { ...listNewAssign }
                                    maximumAssign = Object.entries(listNewAssign).length
                                }
                                if (index === listUnAssignSchedule.length - 1) {
                                    finish = true
                                    return true
                                } else {
                                    //Phân công tiếp
                                    //Cập nhật listPreDriverAssign, listPreBusAssign
                                    if (
                                        findAssignment(
                                            index + 1,
                                            listUnAssignSchedule[index + 1],
                                            listNewAssign,
                                            checkResult.listDriverAssign,
                                            checkResult.listBusAssign,
                                            driverAssign,
                                        )
                                    )
                                        return true
                                    else {
                                        //Remove new assign
                                        delete listNewAssign[newAssign.key]
                                    }
                                }
                            }
                        }
                    }
                    return false
                } else {
                    //Phân công 2 tài xế
                    for (let k = 0; k < listDriverIn.length; k++) {
                        const listDriverIn2 = listDriverIn.filter(
                            (drv) => drv.driver.driverId != listDriverIn[k].driver.driverId,
                        )
                        for (let i = 0; i < listDriverIn2.length; i++) {
                            for (let j = 0; j < listBusIn.length; j++) {
                                newAssign = {
                                    key: schedule.id,
                                    value: {
                                        driverId: listDriverIn[k].driver.driverId,
                                        driverId2: listDriverIn2[i].driver.driverId,
                                        busId: listBusIn[j].id,
                                    },
                                }
                                const checkResult = checkAsssignment(
                                    newAssign,
                                    listPreDriverAssign,
                                    listPreBusAssign,
                                )
                                if (checkResult.result == true) {
                                    listNewAssign = {
                                        ...listNewAssign,
                                        [newAssign.key]: {
                                            driverId: newAssign.value.driverId,
                                            driverId2: newAssign.value.driverId2,
                                            busId: newAssign.value.busId,
                                        },
                                    }
                                    if (Object.entries(listNewAssign).length > maximumAssign) {
                                        listFinalAssign = { ...listNewAssign }
                                        maximumAssign = Object.entries(listNewAssign).length
                                    }
                                    if (index === listUnAssignSchedule.length - 1) {
                                        finish = true
                                        return true
                                    } else {
                                        //Phân công tiếp
                                        //Cập nhật listPreDriverAssign, listPreBusAssign
                                        if (
                                            findAssignment(
                                                index + 1,
                                                listUnAssignSchedule[index + 1],
                                                listNewAssign,
                                                checkResult.listDriverAssign,
                                                checkResult.listBusAssign,
                                                driverAssign,
                                            )
                                        )
                                            return true
                                        else {
                                            //Remove new assign
                                            delete listNewAssign[newAssign.key]
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return false
                }
            }
            return true
        }
        if (listUnAssignSchedule.length === 0) {
            addToast(() =>
                CustomToast({
                    message: 'Không có lịch trình nào chưa được phân công trong tuần này',
                    type: 'warning',
                }),
            )
            return
        } else {
            findAssignment(
                0,
                listUnAssignSchedule[0],
                listUpdateAssign,
                listDriverSchedule,
                listBusSchedule,
                driverNumber,
            )
            if (finish) {
                addToast(() =>
                    CustomToast({
                        message: 'Đã phân công thành công',
                        type: 'success',
                    }),
                )
            } else {
                addToast(() =>
                    CustomToast({
                        message: 'Không thể phân công hết vì thiếu tài xế hoặc xe',
                        type: 'error',
                    }),
                )
            }
            setListUpdate(listFinalAssign)
        }
    }

    //Lặp lại lịch tuần trước
    const repeatSchedule = async (day) => {
        const lastWeekDay = subStractDays(day, 7)
        let listLastWeekSchedule = []
        let listNewUpdate = null
        let filterSchedule = []
        //Get last week schedule
        for (let j = 0; j < 2; j++) {
            await dispatch(
                scheduleThunk.getSchedules({
                    routeId: curRoute.id,
                    departDate: lastWeekDay,
                    turn: j === 0 ? true : false,
                }),
            )
                .unwrap()
                .then((res) => {
                    filterSchedule = res.filter(
                        (schedule) =>
                            schedule.tripInfor.id === curTrip.turnGo.id ||
                            schedule.tripInfor.id === curTrip.turnBack.id,
                    )
                    //push each item in filterSchedule to listLastWeekSchedule
                    filterSchedule.forEach((item) => {
                        listLastWeekSchedule.push(item)
                    })
                })
                .catch((error) => {})
        }
        //Compare with current day and update
        listProcessSchedule
            .filter((schd) => schd.departDate === format(day, 'yyyy-MM-dd'))
            .forEach((schd) => {
                const target = listLastWeekSchedule.find(
                    (item) =>
                        item.departTime.slice(0, -3) === schd.departTime &&
                        item.tripInfor.turn === schd.turn,
                )
                if (target) {
                    listNewUpdate = {
                        ...listNewUpdate,
                        [schd.id]: {
                            driverId: target.driverUser ? target.driverUser.driver.driverId : 0,
                            driverId2: target.driverUser2 ? target.driverUser2.driver.driverId : 0,
                            busId: target.bus ? target.bus.id : 0,
                        },
                    }
                }
            })
        setListUpdate({
            ...listUpdate,
            ...listNewUpdate,
        })
        addToast(() => {
            CustomToast({
                message: 'Đã lặp lại lịch trình ngày này tuần trước',
                type: 'success',
            })
        })
    }
    useEffect(() => {
        setListSchedule(listScheduleIn)
    }, [listScheduleIn])
    useEffect(() => {
        const listProcess = []
        listScheduleIn.forEach((item) => {
            listProcess.push(...item.schedules)
        })
        if (listProcess.length > 0) {
            const sumTrip = []
            listProcess.forEach((item) => {
                sumTrip.push({
                    id: item.id,
                    departDate: item.departDate,
                    departTime: item.departTime.slice(0, -3),
                    arrivalTime: addHoursToTime(item.departTime, item.tripInfor.hours),
                    turn: item.tripInfor.turn,
                    driver: item.driverUser ? item.driverUser.driver.driverId : 0,
                    driver2: item.driverUser2 ? item.driverUser2.driver.driverId : 0,
                    bus: item.bus ? item.bus.id : 0,
                    note: item.note,
                    allowChange: !item.driverUser || !item.bus,
                })
            })
            sumTrip.sort((a, b) => convertTimeToInt(a.departTime) - convertTimeToInt(b.departTime))
            setListProcessSchedule(sumTrip)
        }
    }, [listScheduleIn])
    useEffect(() => {
        if (listProcessSchedule.length > 0) {
            scanBus()
            scanDriver()
        }
    }, [listProcessSchedule])
    useEffect(() => {
        if (driverNumber != 0 && auto) autoScheduling()
    }, [driverNumber, auto])
    useEffect(() => {
        setAuto(false)
    }, [startDate])
    useEffect(() => {
        dispatch(
            scheduleThunk.getTripBusDriver({
                tripId: curTrip.turnGo.id,
            }),
        )
            .unwrap()
            .then((res) => {})
            .catch((error) => {
                addToast(() =>
                    CustomToast({
                        message: 'Thông tin tài xế và xe chưa đầy đủ',
                        type: 'error',
                    }),
                )
            })
    }, [])
    return (
        <div>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <CTooltip content={'Tự động tạo phân công cho các chuyến chưa được phân công'}>
                <CFormCheck
                    inline
                    checked={auto}
                    onChange={() => setAuto(!auto)}
                    label="Phân công tự động"
                    className="mb-2"
                ></CFormCheck>
            </CTooltip>
            {auto && (
                <>
                    <CFormCheck
                        inline
                        type="radio"
                        name="driverNumber"
                        id="no1"
                        label="1 tài xế / chuyến"
                        value="1"
                        checked={driverNumber === 1}
                        onClick={() => setDriverNumber(1)}
                    />
                    <CFormCheck
                        inline
                        type="radio"
                        name="driverNumber"
                        id="no2"
                        label="2 tài xế / chuyến"
                        value="2"
                        checked={driverNumber === 2}
                        onClick={() => setDriverNumber(2)}
                    />
                </>
            )}
            <CTable stripedColumns bordered>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Buổi</CTableHeaderCell>
                        {Array.from({ length: 7 }, (_, index) => index).map((dayIndex) => (
                            <CTableHeaderCell key={dayIndex} className="text-center" scope="col">
                                <b>
                                    <i>{dayInWeek[dayIndex]}</i>
                                </b>
                                <div>{format(addDays(startDate, dayIndex), 'dd/MM/yyyy')}</div>
                                <CTooltip content={'Giống tuần trước'}>
                                    <CFormCheck
                                        checked={listRepeat.includes(
                                            addDays(startDate, dayIndex).getDate(),
                                        )}
                                        onChange={() => {
                                            const day = addDays(startDate, dayIndex)
                                            if (listRepeat.includes(day.getDate()))
                                                setListRepeat(
                                                    listRepeat.filter(
                                                        (item) => item !== day.getDate(),
                                                    ),
                                                )
                                            else {
                                                setListRepeat([...listRepeat, day.getDate()])
                                                repeatSchedule(day)
                                            }
                                        }}
                                    ></CFormCheck>
                                </CTooltip>
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
                                        listSchedule.filter(
                                            (schd) => schd.date == startDate.getDate() + dayIndex,
                                        ),
                                        key,
                                    ).map((schedule, index) => (
                                        <ScheduleWrap
                                            key={index}
                                            schedule={schedule}
                                            listUpdate={listUpdate}
                                            handleSetInfo={handleUpdateListAssign}
                                            listError={listError}
                                        ></ScheduleWrap>
                                    ))}
                                </CTableDataCell>
                            ))}
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
                    <CCard color="light">
                        <CCardBody className="p-1">Chuyến xung đột lịch</CCardBody>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '0',
                                height: '0',
                                borderLeft: '8px solid transparent',
                                borderTop: '8px solid transparent',
                                borderRight: '8px solid red',
                                borderBottom: '8px solid red',
                            }}
                        ></div>
                    </CCard>
                </div>
                <div className="d-flex justify-content-end gap-2">
                    <CButton variant="outline" color="success" onClick={handleAssignment}>
                        Lưu thông tin
                    </CButton>
                    <CButton variant="outline" color="info" onClick={handleCheck}>
                        Kiểm tra
                    </CButton>
                    <CButton
                        variant="outline"
                        color="danger"
                        onClick={() => {
                            setListUpdate(null)
                            setAuto(false)
                        }}
                    >
                        Hủy
                    </CButton>
                </div>
            </div>
        </div>
    )
}

export const AssignScheduleForm = ({ visible, setVisible, currentDay, finishAdd }) => {
    const curTrip = useSelector(selectCurrentTrip)
    const curRoute = useSelector(selectCurrentRoute)
    const dispatch = useDispatch()
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [startDate, setStartDate] = useState(startOfWeek(currentDay, { weekStartsOn: 1 }))
    const [listSchedule, setListSchedule] = useState([])
    const [loading, setLoading] = useState(false)
    const getScheduleData = async () => {
        setLoading(false)
        const tempList = []
        let filterSchedule = []
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 7; i++) {
                await dispatch(
                    scheduleThunk.getSchedules({
                        routeId: curRoute.id,
                        departDate: new Date(startDate.getTime() + i * 86400000),
                        turn: j === 0 ? true : false,
                    }),
                )
                    .unwrap()
                    .then((res) => {
                        filterSchedule = res.filter(
                            (schedule) =>
                                schedule.tripInfor.id === curTrip.turnGo.id ||
                                schedule.tripInfor.id === curTrip.turnBack.id,
                        )
                        tempList.push({
                            date: startDate.getDate() + i,
                            schedules: filterSchedule,
                        })
                    })
                    .catch((error) => {
                        tempList.push({
                            date: startDate.getDate() + i,
                            schedules: [],
                        })
                    })
            }
            if (tempList.length === 14) {
                setListSchedule([...tempList])
                setLoading(false)
            }
        }
    }
    const handleGetBack = () => {
        setStartDate(subStractDays(startDate, 7))
    }
    const handleGetNext = () => {
        setStartDate(addDays(startDate, 7))
    }
    const finishUpdate = () => {
        addToast(() =>
            CustomToast({
                message: 'Đã phân công thành công',
                type: 'success',
            }),
        )
        setVisible(false)
        finishAdd()
    }
    useEffect(() => {
        if (visible) {
            getScheduleData()
        }
    }, [visible, startDate])
    useEffect(() => {
        setStartDate(startOfWeek(currentDay, { weekStartsOn: 1 }))
    }, [currentDay])

    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <CModal
                alignment="center"
                backdrop="static"
                scrollable
                visible={visible}
                size="xl"
                onClose={() => setVisible(false)}
            >
                <CModalHeader>
                    <CModalTitle>Phân công thực hiện chuyến xe</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {loading ? (
                        <CSpinner></CSpinner>
                    ) : (
                        <CRow>
                            <CCard className="p-0">
                                <CCardHeader className="bg-info d-flex justify-content-between align-items-center">
                                    <CIcon
                                        icon={cilArrowLeft}
                                        size="xl"
                                        role="button"
                                        onClick={handleGetBack}
                                    ></CIcon>
                                    <b>{`Bảng lịch trình tuần ${format(
                                        startDate,
                                        'dd/MM/yyyy',
                                    )} - ${format(addDays(startDate, 7), 'dd/MM/yyyy')}`}</b>
                                    <CIcon
                                        icon={cilArrowRight}
                                        size="xl"
                                        role="button"
                                        onClick={handleGetNext}
                                    ></CIcon>
                                </CCardHeader>
                                <CCardBody>
                                    <TableSchedule
                                        listScheduleIn={listSchedule}
                                        startDate={startDate}
                                        finishUpdate={finishUpdate}
                                    ></TableSchedule>
                                </CCardBody>
                            </CCard>
                        </CRow>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton
                        color="secondary"
                        onClick={() => setVisible(false)}
                        style={{ width: 'fit-content' }}
                    >
                        Đóng
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default AddScheduleForm
