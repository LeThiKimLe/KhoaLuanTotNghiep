import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import {
    subStractDays,
    addDays,
    convertToDisplayDate,
    convertToDisplayTimeStamp,
} from 'src/utils/convertUtils'
import { tripProcess } from 'src/utils/tripUtils'
import { selectCompanyId } from 'src/feature/auth/auth.slice'
import { selectListCompanyRoute } from 'src/feature/route/route.slice'
import { getRouteJourney } from 'src/utils/tripUtils'
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CCol,
    CFormSelect,
    CFormCheck,
    CRow,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CFormInput,
    CFormLabel,
    CCardBody,
    CForm,
    CCard,
    CCardHeader,
    CSpinner,
    CToaster,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CTooltip,
    CPopover,
    CImage,
} from '@coreui/react'
import parse from 'date-fns/parse'
import { addHours } from 'src/utils/convertUtils'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import scheduleThunk from 'src/feature/schedule/schedule.service'
import { getTripJourney } from 'src/utils/tripUtils'
import { selectActiveTicket } from 'src/feature/ticket/ticket.slice'
import axios from 'axios'
import { selectCurCompany } from 'src/feature/bus-company/busCompany.slice'
import format from 'date-fns/format'
import orderThunk from 'src/feature/transportation-order/order.service'
import { CustomToast } from '../customToast/CustomToast'
import { ORDER_STATE, SCHEDULE_STATE } from 'src/utils/constants'
import noImg from 'src/assets/images/no_img.png'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilCircle } from '@coreui/icons'
import CustomButton from '../customButton/CustomButton'
import travelingImg from 'src/assets/images/loadingdots2.gif'
import { cilPencil } from '@coreui/icons'
const Status = ({ data }) => {
    const [showCondition, setShowCondition] = useState(false)
    return (
        <CTooltip content={data.describe}>
            <div className="d-flex flex-column align-items-center" role="button">
                <CIcon
                    icon={data.achived ? cilCheckCircle : cilCircle}
                    size="xl"
                    style={data.achived ? { color: 'green' } : { color: '#ccc' }}
                ></CIcon>
                <b
                    style={data.achived ? { color: '#000' } : { color: '#8f938f' }}
                >{`${data.value}. ${data.label}`}</b>
                <CPopover content={data.condition} placement="bottom">
                    <small role="button">{'Điều kiện'}</small>
                </CPopover>
            </div>
        </CTooltip>
    )
}

const StatusTracker = ({ schedule }) => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState(
        ORDER_STATE.map((status) => {
            return {
                ...status,
                achived: false,
            }
        }),
    )
    useEffect(() => {
        const newStatus = [...status]
        if (schedule.transportationOrder) {
            const orderStatus = schedule.transportationOrder.status
            for (let i = 0; i < newStatus.length; i++) {
                newStatus[i].achived = true
                if (newStatus[i].label === orderStatus) {
                    break
                }
            }
        }
        setStatus(newStatus)
    }, [schedule])
    return (
        <div className="d-flex gap-5 align-items-center justify-content-center">
            {status.map((status, index) => (
                <Status data={status} key={index}></Status>
            ))}
        </div>
    )
}

const ScheduleStatus = ({ data }) => {
    const [showCondition, setShowCondition] = useState(false)
    return (
        <CCol md="2" className="d-flex flex-column align-items-center my-2" role="button">
            <CIcon
                icon={data.achived ? cilCheckCircle : cilCircle}
                size="xl"
                style={data.achived ? { color: 'green' } : { color: '#ccc' }}
            ></CIcon>
            <b
                style={data.achived ? { color: '#000' } : { color: '#8f938f' }}
            >{`${data.stationData.arrivalTime}. ${data.state?.label}`}</b>
            <small>{data.stationData?.station?.name}</small>
        </CCol>
    )
}

const ScheduleStatusTracker = ({ schedule, openOrderForm, closeForm, finishAdd }) => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState([])
    const scheduleStatus = SCHEDULE_STATE.find((st) => st.data === schedule.state)
    const currenStation = schedule.currentStation
    const toaster = useRef('')
    const [toast, addToast] = useState(0)
    const updateTime = schedule.updateTime
    const [nextAction, setNextAction] = useState(null)
    const [loading, setLoading] = useState(false)
    const getStationType = (station) => {
        if (station.stationType === 'pick')
            if (station.station.id == schedule.tripInfor.startStation.id)
                return {
                    name: 'Trạm đi',
                    state: SCHEDULE_STATE.find((st) => st.label === 'Đến bến đi'),
                }
            else
                return {
                    name: 'Trạm đón',
                    state: SCHEDULE_STATE.find((st) => st.label === 'Đến trạm đón'),
                }
        else if (station.stationType === 'drop')
            if (station.station.id == schedule.tripInfor.endStation.id)
                return {
                    name: 'Trạm đến',
                    state: SCHEDULE_STATE.find((st) => st.label === 'Đến bến đến'),
                }
            else
                return {
                    name: 'Trạm trả',
                    state: SCHEDULE_STATE.find((st) => st.label === 'Đến trạm trả'),
                }
        else if (station.stationType === 'stop')
            return {
                name: 'Trạm dừng nghỉ',
                state: SCHEDULE_STATE.find((st) => st.label === 'Đến trạm dừng chân'),
            }
        else if (station.stationType === 'park-start')
            return {
                name: 'Bãi đỗ đầu',
                state: SCHEDULE_STATE.find((st) => st.label === 'Rời bãi đỗ'),
            }
        else
            return {
                name: 'Bãi đỗ cuối',
                state: SCHEDULE_STATE.find((st) => st.label === 'Về bãi đỗ'),
            }
    }
    const handleUpdateState = () => {
        if (!schedule.transportationOrder) {
            addToast(() => CustomToast({ message: 'Cần được cấp lệnh vận chuyển', type: 'error' }))
            return
        }
        let scheduleInfor = null
        if (nextAction.state.label === 'Tiếp tục hành trình') {
            scheduleInfor = {
                id: schedule.id,
                state: 'Đang đi',
                currentStation: nextAction.stationData.id,
            }
        } else {
            scheduleInfor = {
                id: schedule.id,
                state: nextAction.state.label,
                currentStation: nextAction.stationData.id,
            }
            if (nextAction.state.needOrder !== '') {
                if (nextAction.state.needOrder !== schedule.transportationOrder.status) {
                    addToast(() =>
                        CustomToast({
                            message: nextAction.state.condition,
                            type: 'warning',
                        }),
                    )
                    return
                }
            }
        }
        setLoading(true)
        dispatch(scheduleThunk.updateScheduleState(scheduleInfor))
            .unwrap()
            .then(async () => {
                addToast(() => CustomToast({ message: 'Đã cập nhật thành công', type: 'success' }))
                setLoading(false)
                finishAdd()
                setTimeout(() => closeForm(), 1000)
            })
            .catch((err) => {
                setLoading(false)
                addToast(() => CustomToast({ message: err, type: 'error' }))
            })
    }
    useEffect(() => {
        const trip = schedule.tripInfor
        const listState = [...trip.stopStations]
            .sort((a, b) => a.arrivalTime - b.arrivalTime)
            .map((st) => {
                return {
                    stationData: st,
                    stationType: getStationType(st).name,
                    state: getStationType(st).state,
                    achived: false,
                }
            })
        const currentStopStation = trip.stopStations.find((st) => st.id == currenStation)
        let currentIndex = currentStopStation ? currentStopStation.arrivalTime : 0
        for (let i = 0; i < listState.length; i++) {
            if (listState[i].stationData.arrivalTime <= currentIndex) {
                listState[i].achived = true
            }
        }
        listState.push({
            stationData: {
                ...listState[listState.length - 1].stationData,
                arrivalTime: listState[listState.length - 1].stationData.arrivalTime + 1,
            },
            stationType: 'Bãi đỗ cuối',
            state: SCHEDULE_STATE.find((st) => st.label === 'Hoàn thành'),
            achived: scheduleStatus?.data === 'Hoàn thành' ? true : false,
        })
        setStatus(listState)
    }, [schedule])
    useEffect(() => {
        if (status.length > 0) {
            const currentStopStation = schedule.tripInfor.stopStations.find(
                (st) => st.id == currenStation,
            )
            if (scheduleStatus)
                if (
                    scheduleStatus.data === 'Đang đi' ||
                    scheduleStatus.data === 'Về bãi đỗ' ||
                    scheduleStatus.data === 'Hoàn thành'
                )
                    setNextAction(
                        status.find(
                            (st) =>
                                st.stationData.arrivalTime === currentStopStation.arrivalTime + 1,
                        ),
                    )
                else {
                    const newState = {
                        stationData: currentStopStation,
                        stationStatus: '',
                        state: SCHEDULE_STATE.find((st) => st.label === 'Tiếp tục hành trình'),
                        achived: false,
                    }
                    setNextAction(newState)
                }
            else setNextAction(status[0])
        }
    }, [status])
    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <CRow className="gap-2 justify-content-center">
                {status.map((status, index) => (
                    <>
                        {scheduleStatus &&
                            scheduleStatus.data == 'Đang đi' &&
                            nextAction &&
                            status.state.label === nextAction.state.label && (
                                <img
                                    src={travelingImg}
                                    style={{ width: '90px', height: '55px' }}
                                ></img>
                            )}
                        <ScheduleStatus data={status} key={index}></ScheduleStatus>
                    </>
                ))}
            </CRow>
            <CRow className="justify-content-center my-3 gap-2">
                {nextAction && scheduleStatus?.data !== 'Hoàn thành' && (
                    <CustomButton
                        loading={loading}
                        text={'Xác nhận hoàn thành'}
                        style={{ maxWidth: '250px' }}
                        onClick={handleUpdateState}
                        color="success"
                    ></CustomButton>
                )}
                <CButton
                    onClick={openOrderForm}
                    variant="outline"
                    color="info"
                    style={{ maxWidth: '250px' }}
                >
                    Xem lệnh vận chuyển
                </CButton>
            </CRow>
        </>
    )
}

const ScheduleData = ({ index, schedule, state, finishAdd }) => {
    const [exportCommand, setExportCommand] = useState(false)
    const dispatch = useDispatch()
    const curCompany = useSelector(selectCurCompany)
    const [toast, addToast] = useState(0)
    const [showState, setShowState] = useState(false)
    const [showOrder, setShowOrder] = useState(false)
    const toaster = useRef('')
    const [viewBusState, setViewBusState] = useState(false)
    //Get list commandData from local storage
    const listCommandData = JSON.parse(localStorage.getItem('commandData'))
    const commandData = {
        companyName: curCompany.busCompany.name,
        companyTel: curCompany.admin.tel,
        commandId: '02',
        exportTime: ['TP. Hồ Chí Minh', '12', '03', '2024'],
        valueSpan: [
            convertToDisplayDate(schedule.departDate),
            format(
                addHours(
                    parse(schedule.departDate, 'yyyy-MM-dd', new Date()),
                    schedule.tripInfor.hours,
                ),
                'dd/MM/yyyy',
            ),
        ],
        driver1: schedule.driverUser?.name,
        driver2: schedule.driverUser2?.name,
        assistant: 'Lê Văn A',
        busPlate: schedule.bus?.licensePlate,
        seatNum: schedule.bus?.type?.capacity,
        busType: schedule.bus?.type?.description,
        desdep: getTripJourney(schedule.tripInfor),
        routeId: '34UFYCHN',
        route: schedule.tripInfor.schedule,
        dep: getTripJourney(schedule.tripInfor).split('-')[0],
        departTime: schedule.departTime.slice(0, -3),
        departDate: convertToDisplayDate(schedule.departDate),
        des: getTripJourney(schedule.tripInfor).split('-')[1],
        arrivalTime: format(
            addHours(
                parse(schedule.departDate, 'yyyy-MM-dd', new Date()),
                schedule.tripInfor.hours,
            ),
            'HH:mm',
        ),
        arrivalDate: format(
            addHours(
                parse(schedule.departDate, 'yyyy-MM-dd', new Date()),
                schedule.tripInfor.hours,
            ),
            'dd/MM/yyyy',
        ),
    }
    localStorage.setItem(
        'commandData',
        JSON.stringify({
            ...listCommandData,
            [schedule.id]: commandData,
        }),
    )
    const viewCommand = () => {
        const params = new URLSearchParams()
        params.append('id', schedule.id)
        let baseUrl = process.env.REACT_APP_BASE_URL
        if (!baseUrl) baseUrl = ''
        window.open(`${baseUrl}/lenh-van-chuyen_form.html?${params.toString()}`, '_blank')
    }
    const createCommand = () => {
        if (schedule.bus && schedule.driverUser)
            dispatch(orderThunk.createOrder({ scheduleId: schedule.id, file: null }))
                .unwrap()
                .then(() => {
                    //reload page
                    addToast(() =>
                        CustomToast({
                            message: 'Đã cấp lệnh thành công',
                            type: 'success',
                        }),
                    )
                    setTimeout(() => {
                        finishAdd()
                    }, 1000)
                })
                .catch((err) => {
                    addToast(() =>
                        CustomToast({
                            message: err,
                            type: 'error',
                        }),
                    )
                })
        else {
            addToast(() =>
                CustomToast({
                    message: 'Cần phân công tài xế và xe cho chuyến để cấp lệnh',
                    type: 'error',
                }),
            )
        }
    }

    const getImage = () => {
        if (schedule.transportationOrder && schedule.transportationOrder.image)
            return schedule.transportationOrder.image
        else return noImg
    }
    const confirmOrder = () => {
        if (schedule.transportationOrder && schedule.transportationOrder.status === 'Đến bến') {
            dispatch(
                orderThunk.updateOrder({
                    id: schedule.transportationOrder.id,
                    status: 'Đã hoàn thành',
                    file: null,
                }),
            )
                .unwrap()
                .then(() => {
                    addToast(() =>
                        CustomToast({
                            message: 'Xác nhận thành công',
                            type: 'success',
                        }),
                    )
                    setShowOrder(false)
                    setTimeout(() => {
                        finishAdd()
                    }, 1000)
                })
                .catch((err) => {
                    addToast(() =>
                        CustomToast({
                            message: err,
                            type: 'error',
                        }),
                    )
                })
        } else {
            addToast(() =>
                CustomToast({
                    message: 'Không thể xác nhận lệnh vì chưa hoàn tất chuyến',
                    type: 'error',
                }),
            )
        }
    }
    const deleteOrder = () => {
        if (schedule.transportationOrder && schedule.transportationOrder.status === 'Đã cấp lệnh') {
            dispatch(orderThunk.deleteOrder(schedule.transportationOrder.id))
                .unwrap()
                .then(() => {
                    addToast(() =>
                        CustomToast({
                            message: 'Thu hồi thành công',
                            type: 'success',
                        }),
                    )
                })
                .catch((err) => {
                    addToast(() =>
                        CustomToast({
                            message: err,
                            type: 'error',
                        }),
                    )
                })
        } else {
            addToast(() =>
                CustomToast({
                    message: 'Không thể thu hồi lệnh',
                    type: 'error',
                }),
            )
        }
    }
    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <CTableRow>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{getTripJourney(schedule.tripInfor)}</CTableDataCell>
                <CTableDataCell>{`${schedule.departTime.slice(0, -3)} - ${convertToDisplayDate(
                    schedule.departDate,
                )}`}</CTableDataCell>
                <CTableDataCell>
                    {schedule.tickets.filter((ticket) => !ticket.state.includes('hủy')).length}
                </CTableDataCell>
                <CTableDataCell>{schedule.driverUser?.name}</CTableDataCell>
                <CTableDataCell>{schedule.driverUser2?.name}</CTableDataCell>
                <CTableDataCell>
                    <CTooltip content="Xem trạng thái xe">
                        <i role="button" onClick={() => setViewBusState(true)}>
                            {schedule.bus?.licensePlate}
                        </i>
                    </CTooltip>
                    <CModal
                        size="lg"
                        alignment="center"
                        visible={viewBusState}
                        onClose={() => setViewBusState(false)}
                    >
                        <CModalHeader>
                            <b>{`Trạng thái xe ${schedule.bus?.licensePlate}`}</b>
                        </CModalHeader>
                        <CModalBody>
                            <CRow className="justify-content-center">
                                <CCol md="10">
                                    <CCard className="mt-1 p-0">
                                        <CCardBody>
                                            <CForm className="w-100">
                                                <CRow>
                                                    <CCol md="6">
                                                        <CRow className="mb-3 justify-content-center">
                                                            <CFormLabel
                                                                htmlFor="brake"
                                                                className="col-sm-4 col-form-label"
                                                            >
                                                                <b>Phanh</b>
                                                            </CFormLabel>
                                                            <CCol sm={8}>
                                                                <CFormInput
                                                                    type="text"
                                                                    id="brake"
                                                                    name="brake"
                                                                    disabled
                                                                    value={
                                                                        schedule.bus?.state.brake
                                                                    }
                                                                />
                                                            </CCol>
                                                        </CRow>
                                                    </CCol>
                                                    <CCol md="6">
                                                        <CRow className="mb-3 justify-content-center">
                                                            <CFormLabel
                                                                htmlFor="lighting"
                                                                className="col-sm-4 col-form-label"
                                                            >
                                                                <b>Chiếu sáng</b>
                                                            </CFormLabel>
                                                            <CCol sm={8}>
                                                                <CFormInput
                                                                    type="text"
                                                                    id="lighting"
                                                                    name="lighting"
                                                                    disabled
                                                                    value={
                                                                        schedule.bus?.state.lighting
                                                                    }
                                                                />
                                                            </CCol>
                                                        </CRow>
                                                    </CCol>
                                                    <CCol md="6">
                                                        <CRow className="mb-3 justify-content-center">
                                                            <CFormLabel
                                                                htmlFor="tire"
                                                                className="col-sm-4 col-form-label"
                                                            >
                                                                <b>Bánh xe</b>
                                                            </CFormLabel>
                                                            <CCol sm={8}>
                                                                <CFormInput
                                                                    type="text"
                                                                    id="tire"
                                                                    name="tire"
                                                                    disabled
                                                                    value={schedule.bus?.state.tire}
                                                                />
                                                            </CCol>
                                                        </CRow>
                                                    </CCol>
                                                    <CCol md="6">
                                                        <CRow className="mb-3 justify-content-center">
                                                            <CFormLabel
                                                                htmlFor="steering"
                                                                className="col-sm-4 col-form-label"
                                                            >
                                                                <b>Lái</b>
                                                            </CFormLabel>
                                                            <CCol sm={8}>
                                                                <CFormInput
                                                                    type="text"
                                                                    id="steering"
                                                                    name="steering"
                                                                    disabled
                                                                    value={
                                                                        schedule.bus?.state.steering
                                                                    }
                                                                />
                                                            </CCol>
                                                        </CRow>
                                                    </CCol>
                                                    <CCol md="6">
                                                        <CRow className="mb-3 justify-content-center">
                                                            <CFormLabel
                                                                htmlFor="mirror"
                                                                className="col-sm-4 col-form-label"
                                                            >
                                                                <b>Gương xe</b>
                                                            </CFormLabel>
                                                            <CCol sm={8}>
                                                                <CFormInput
                                                                    type="text"
                                                                    id="mirror"
                                                                    name="mirror"
                                                                    disabled
                                                                    value={
                                                                        schedule.bus?.state.mirror
                                                                    }
                                                                />
                                                            </CCol>
                                                        </CRow>
                                                    </CCol>
                                                    <CCol md="6">
                                                        <CRow className="mb-3 justify-content-center">
                                                            <CFormLabel
                                                                htmlFor="airCondition"
                                                                className="col-sm-4 col-form-label"
                                                            >
                                                                <b>Điều hòa</b>
                                                            </CFormLabel>
                                                            <CCol sm={8}>
                                                                <CFormInput
                                                                    type="text"
                                                                    id="airCondition"
                                                                    name="airCondition"
                                                                    disabled
                                                                    value={
                                                                        schedule.bus?.state
                                                                            .airCondition
                                                                    }
                                                                />
                                                            </CCol>
                                                        </CRow>
                                                    </CCol>
                                                    <CCol md="6">
                                                        <CRow className="mb-3 justify-content-center">
                                                            <CFormLabel
                                                                htmlFor="electric"
                                                                className="col-sm-4 col-form-label"
                                                            >
                                                                <b>Điện</b>
                                                            </CFormLabel>
                                                            <CCol sm={8}>
                                                                <CFormInput
                                                                    type="text"
                                                                    id="electric"
                                                                    name="electric"
                                                                    disabled
                                                                    value={
                                                                        schedule.bus?.state.electric
                                                                    }
                                                                />
                                                            </CCol>
                                                        </CRow>
                                                    </CCol>
                                                    <CCol md="6">
                                                        <CRow className="mb-3 justify-content-center">
                                                            <CFormLabel
                                                                htmlFor="fuel"
                                                                className="col-sm-4 col-form-label"
                                                            >
                                                                <b>Nhiên liệu</b>
                                                            </CFormLabel>
                                                            <CCol sm={8}>
                                                                <CFormInput
                                                                    type="text"
                                                                    id="fuel"
                                                                    name="fuel"
                                                                    disabled
                                                                    value={schedule.bus?.state.fuel}
                                                                />
                                                            </CCol>
                                                        </CRow>
                                                    </CCol>
                                                    <CCol md="12">
                                                        <CRow className="mb-3 justify-content-center">
                                                            <CFormLabel
                                                                htmlFor="overallState"
                                                                className="col-sm-4 col-form-label"
                                                            >
                                                                <b>Đánh giá chung</b>
                                                            </CFormLabel>
                                                            <CCol sm={8}>
                                                                <CFormInput
                                                                    type="text"
                                                                    id="overallState"
                                                                    name="overallState"
                                                                    disabled
                                                                    value={
                                                                        schedule.bus?.state
                                                                            .overallState
                                                                    }
                                                                />
                                                            </CCol>
                                                        </CRow>
                                                    </CCol>
                                                    <CCol md="12">
                                                        <CRow className="mb-3 justify-content-center">
                                                            <CFormLabel
                                                                htmlFor="time"
                                                                className="col-sm-4 col-form-label"
                                                            >
                                                                <b>Cập nhật mới nhất vào: </b>
                                                            </CFormLabel>
                                                            <CCol sm={8}>
                                                                <CFormInput
                                                                    type="text"
                                                                    disabled
                                                                    value={convertToDisplayDate(
                                                                        schedule.bus?.state
                                                                            .updatedAt,
                                                                    )}
                                                                />
                                                            </CCol>
                                                        </CRow>
                                                    </CCol>
                                                </CRow>
                                            </CForm>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CModalBody>
                    </CModal>
                </CTableDataCell>
                <CTableDataCell>
                    {state == 'Ready' && !schedule.transportationOrder ? (
                        <CButton variant="outline" color="success" onClick={createCommand}>
                            Cấp lệnh
                        </CButton>
                    ) : schedule.transportationOrder ? (
                        <>
                            <i role="button">{schedule.transportationOrder?.status}</i>
                            <CDropdown className="px-1">
                                <CDropdownToggle color="light" size="sm"></CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem as="button" onClick={viewCommand}>
                                        Xem mẫu lệnh
                                    </CDropdownItem>
                                    <CDropdownItem as="button" onClick={() => setShowOrder(true)}>
                                        Chi tiết
                                    </CDropdownItem>
                                    <CDropdownItem as="button" onClick={deleteOrder}>
                                        Thu hồi lệnh
                                    </CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </>
                    ) : (
                        <i>Chưa cấp lệnh</i>
                    )}
                </CTableDataCell>
                <CTableDataCell>
                    <i>{schedule.state ? schedule.state : '---'}</i>
                    <CTooltip content="Cập nhật trạng thái chuyến xe">
                        <CIcon
                            id={'status-' + schedule.id}
                            color="success"
                            icon={cilPencil}
                            role="button"
                            style={{ marginLeft: '5px' }}
                            onClick={() => setShowState(true)}
                        ></CIcon>
                    </CTooltip>
                </CTableDataCell>
                <CTableDataCell>
                    <i>{convertToDisplayTimeStamp(schedule.updateTime)}</i>
                </CTableDataCell>
            </CTableRow>
            <CModal visible={showOrder} onClose={() => setShowOrder(false)} size="lg">
                <CModalHeader>
                    <b>Lệnh vận chuyển</b>
                </CModalHeader>
                <CModalBody>
                    <CRow className="border-bottom justify-content-center p-3">
                        <CCol md="12">
                            <StatusTracker schedule={schedule}></StatusTracker>
                        </CCol>
                    </CRow>
                    <CRow className="justify-content-center p-1">
                        <CCol md="5">
                            <div>
                                <CImage
                                    rounded
                                    thumbnail
                                    src={getImage()}
                                    width={300}
                                    height={400}
                                />
                            </div>
                            <div className="text-center mt-2">
                                <CustomButton
                                    onClick={confirmOrder}
                                    text={'Xác nhận hợp lệ'}
                                    color="success"
                                    disabled={
                                        schedule.transportationOrder &&
                                        schedule.transportationOrder.status === 'Đã hoàn thành'
                                            ? true
                                            : false
                                    }
                                ></CustomButton>
                            </div>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton variant="outline" color="dark" onClick={() => setShowOrder(false)}>
                        Đóng
                    </CButton>
                </CModalFooter>
            </CModal>
            <CModal visible={showState} onClose={() => setShowState(false)} size="xl">
                <CModalHeader>
                    <b>Trạng thái chuyến xe</b>
                </CModalHeader>
                <CModalBody>
                    <CRow className="justify-content-center p-3">
                        <CCol md="12">
                            <ScheduleStatusTracker
                                schedule={schedule}
                                openOrderForm={() => setShowOrder(true)}
                                closeForm={() => setShowState(false)}
                                finishAdd={finishAdd}
                            ></ScheduleStatusTracker>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton variant="outline" color="dark" onClick={() => setShowState(false)}>
                        Đóng
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

const ListTrip = ({ listSchedule, state, finishAdd }) => {
    const [listProcess, setListProcess] = useState(listSchedule)
    const sortTrip = () => {
        const listSort = [...listSchedule]
        listSort.sort(
            (a, b) =>
                parse(
                    a.departDate + 'T' + a.departTime,
                    "yyyy-MM-dd'T'HH:mm:ss",
                    new Date(),
                ).getTime() -
                parse(
                    b.departDate + 'T' + b.departTime,
                    "yyyy-MM-dd'T'HH:mm:ss",
                    new Date(),
                ).getTime(),
        )
        setListProcess([...listSort])
    }
    useEffect(() => {
        sortTrip()
    }, [listSchedule])
    return (
        <>
            {listProcess.length > 0 ? (
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>STT</CTableHeaderCell>
                            <CTableHeaderCell>Tuyến</CTableHeaderCell>
                            <CTableHeaderCell>Thời gian</CTableHeaderCell>
                            <CTableHeaderCell>Số khách</CTableHeaderCell>
                            <CTableHeaderCell>Tài xế 1</CTableHeaderCell>
                            <CTableHeaderCell>Tài xế 2</CTableHeaderCell>
                            <CTableHeaderCell>Biển số xe</CTableHeaderCell>
                            <CTableHeaderCell>Lệnh vận chuyển</CTableHeaderCell>
                            <CTableHeaderCell>Trạng thái</CTableHeaderCell>
                            <CTableHeaderCell>Cập nhật gần nhất</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {listProcess.map((schedule, index) => (
                            <ScheduleData
                                key={index}
                                schedule={schedule}
                                index={index}
                                state={state}
                                finishAdd={finishAdd}
                            ></ScheduleData>
                        ))}
                    </CTableBody>
                </CTable>
            ) : (
                <div className="text-center">
                    <b>Không có chuyến xe</b>
                </div>
            )}
        </>
    )
}

const ScheduleTracking = () => {
    const dispatch = useDispatch()
    const listRoute = useSelector(selectListCompanyRoute)
    const companyId = useSelector(selectCompanyId)
    const [currentRoute, setCurrentRoute] = useState(0)
    const [currentTrip, setCurrentTrip] = useState(null)
    const [currentDay, setCurrentDate] = useState(new Date())
    const startDate = subStractDays(currentDay, 1)
    const endDate = addDays(currentDay, 1)
    const [openAddForm, setOpenAddForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const countLoad = useRef(0)
    const [reload, setReload] = useState(0)
    const [selectedTab, setSelectedTab] = useState(0)
    const [listScheduleData, setListScheduleData] = useState([
        {
            trip: 0,
            schedules: [],
        },
    ])
    const [showList, setShowList] = useState([])
    const setCurrentDay = (newDate) => {
        if (newDate instanceof Date) {
            // newDate is a Date object
            setCurrentDate(newDate)
        }
    }
    const [listTrip, setListTrip] = useState([])
    const getScheduleForStatus = (status) => {
        if (status === 'Ready') {
            //get schedule has departTime > current time at most 24 hours
            return showList.filter((schedule) => {
                const departTime = parse(
                    schedule.departDate + 'T' + schedule.departTime,
                    "yyyy-MM-dd'T'HH:mm:ss",
                    new Date(),
                )
                const currentTime = new Date()
                return (
                    currentTime.getTime() < departTime.getTime() &&
                    currentTime.getTime() + 24 * 60 * 60 * 1000 > departTime.getTime()
                )
            })
        }
        if (status === 'OnGoing') {
            //get schedule has departTime < current time and has not arrived
            return showList.filter((schedule) => {
                const departTime = parse(
                    schedule.departDate + 'T' + schedule.departTime,
                    "yyyy-MM-dd'T'HH:mm:ss",
                    new Date(),
                )
                const currentTime = new Date()
                const arriveTime = addHours(departTime, schedule.tripInfor.hours)
                return (
                    departTime.getTime() - currentTime.getTime() <= 0 &&
                    currentTime.getTime() - arriveTime.getTime() <= 0
                )
            })
        }
        if (status === 'Finished') {
            //get schedule has departTime < current time and has arrived
            return showList.filter((schedule) => {
                const departTime = parse(
                    schedule.departDate + 'T' + schedule.departTime,
                    "yyyy-MM-dd'T'HH:mm:ss",
                    new Date(),
                )
                const currentTime = new Date()
                const arriveTime = addHours(departTime, schedule.tripInfor.hours)
                return currentTime.getTime() - arriveTime.getTime() > 0
            })
        }
    }
    const finishAdd = () => {
        getScheduleData()
    }
    const getScheduleData = async () => {
        setLoading(true)
        let filterSchedule = []
        const searchDate = [startDate, currentDay, endDate]
        let curTrip = null
        const listSchedule = []
        for (let k = 0; k < listTrip.length; k++) {
            curTrip = listTrip[k]
            for (let j = 0; j < 2; j++) {
                for (let i = 0; i < 3; i++) {
                    await dispatch(
                        scheduleThunk.getSchedules({
                            routeId: curTrip.route.id,
                            departDate: searchDate[i],
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
                            const index = listSchedule.findIndex(
                                (item) => item.trip.id === curTrip.id,
                            )
                            if (index == -1) {
                                listSchedule.push({
                                    trip: curTrip,
                                    schedules: [...filterSchedule],
                                })
                            } else {
                                filterSchedule.forEach((item) => {
                                    listSchedule[index].schedules.push(item)
                                })
                            }
                        })
                        .catch((error) => {
                            const index = listSchedule.findIndex(
                                (item) => item.trip.id === curTrip.id,
                            )
                            if (index == -1) {
                                listSchedule.push({
                                    trip: curTrip,
                                    schedules: [],
                                })
                            }
                        })
                }
            }
        }
        setLoading(false)
        setListScheduleData([...listSchedule])
    }
    useEffect(() => {
        if (currentRoute !== -1) {
            const listTripIn = tripProcess(listRoute, companyId).filter(
                (trip) =>
                    trip.route.id == currentRoute &&
                    trip.price !== 0 &&
                    trip.active &&
                    trip.busType &&
                    trip.turnGo.stopStations.some((st) => st.stationType.includes('park')),
            )
            setListTrip(listTripIn)
            if (listTripIn.length > 0) {
                setCurrentTrip(listTripIn[0])
            } else setCurrentTrip(null)
        }
    }, [currentRoute])
    useEffect(() => {
        const schdShowList = []
        listScheduleData.forEach((item) => {
            if (!currentTrip) {
                if (item.schedules.length > 0) {
                    schdShowList.push(...item.schedules)
                }
            } else if (currentTrip.id === item.trip.id) {
                if (item.schedules.length > 0) {
                    schdShowList.push(...item.schedules)
                }
            }
        })
        setShowList(schdShowList)
    }, [listScheduleData])
    useEffect(() => {
        console.log('change trip')
        if (currentTrip) {
            const schdShowList = []
            listScheduleData
                .filter((item) => currentTrip.id === item.trip.id)
                .forEach((item) => {
                    if (item.schedules.length > 0) {
                        schdShowList.push(...item.schedules)
                    }
                })
            setShowList(schdShowList)
        } else setShowList([])
    }, [currentTrip])
    useEffect(() => {
        if (currentDay) {
            getScheduleData()
        }
    }, [currentDay])
    useEffect(() => {
        setCurrentDate(new Date())
    }, [])
    return (
        <>
            <CRow className="justify-content-between">
                <CCol md="3">
                    <CFormSelect
                        id="route-select"
                        value={currentRoute}
                        onChange={(e) => setCurrentRoute(e.target.value)}
                    >
                        <option value={0}>Tất cả</option>
                        {listRoute.map((route) => (
                            <option key={route.id} value={route.id}>
                                {getRouteJourney(route)}
                            </option>
                        ))}
                    </CFormSelect>
                </CCol>
                <CCol
                    md="6"
                    style={{ textAlign: 'right' }}
                    className="d-flex align-items-center gap-1 customDatePicker"
                >
                    <b>
                        <i>Ngày</i>
                    </b>
                    <DatePicker
                        selected={currentDay}
                        onChange={setCurrentDay}
                        dateFormat="dd/MM/yyyy"
                    />
                </CCol>
            </CRow>
            {currentRoute !== 0 && (
                <div className="mt-3">
                    {/* {listTrip
                        .filter((trip) => trip.route.id == currentRoute)
                        .map((trip, index) => (
                            <CFormCheck
                                inline
                                type="radio"
                                key={index}
                                name="tripOptions"
                                required
                                id={index}
                                value={currentTrip ? currentTrip.id : -1}
                                label={getTripJourney(trip)}
                                checked={currentTrip ? currentTrip.id == trip.id : false}
                                onChange={() => setCurrentTrip(trip)}
                            />
                        ))} */}
                    <i>{currentTrip ? getTripJourney(currentTrip) : 'Tuyến chưa có chuyến xe'}</i>
                </div>
            )}

            <div className="tabStyle">
                {loading ? (
                    <div className="text-center w-100">
                        <CSpinner></CSpinner>
                    </div>
                ) : (
                    <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                        <TabList>
                            <Tab>Sắp diễn ra</Tab>
                            <Tab>Đang diễn ra</Tab>
                            <Tab>Đã kết thúc</Tab>
                        </TabList>
                        <TabPanel>
                            <ListTrip
                                listSchedule={getScheduleForStatus('Ready')}
                                state="Ready"
                                finishAdd={finishAdd}
                            ></ListTrip>
                        </TabPanel>
                        <TabPanel>
                            <ListTrip
                                listSchedule={getScheduleForStatus('OnGoing')}
                                state="OnGoing"
                                finishAdd={finishAdd}
                            ></ListTrip>
                        </TabPanel>
                        <TabPanel>
                            <ListTrip
                                listSchedule={getScheduleForStatus('Finished')}
                                state="Finished"
                                finishAdd={finishAdd}
                            ></ListTrip>
                        </TabPanel>
                    </Tabs>
                )}
            </div>
        </>
    )
}

export default ScheduleTracking
