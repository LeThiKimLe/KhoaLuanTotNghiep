import React from 'react'
import { Tab, TabPanel, Tabs, TabList } from 'react-tabs'
import { useEffect, useState, useRef } from 'react'
import staffThunk from 'src/feature/staff/staff.service'
import { useDispatch, useSelector } from 'react-redux'
import { selectDriverSchedules, selectDriverTrip } from 'src/feature/driver/driver.slice'
import driverThunk from 'src/feature/driver/driver.service'
import { selectCompanyId, selectUser } from 'src/feature/auth/auth.slice'
import { getTripJourney } from 'src/utils/tripUtils'
import {
    CSpinner,
    CRow,
    CFormLabel,
    CTable,
    CTableHeaderCell,
    CTableRow,
    CTableHead,
    CTableBody,
    CTableDataCell,
    CFormInput,
    CCol,
    CButtonGroup,
    CFormCheck,
    CCard,
    CCardBody,
    CButton,
    CFormSelect,
    CToaster,
    CTooltip,
    CModalFooter,
    CImage,
    CModalBody,
    CModalHeader,
    CModal,
    CPopover,
} from '@coreui/react'
import { selectListRoute } from 'src/feature/route/route.slice'
import { selectDriverRoute } from 'src/feature/driver/driver.slice'
import routeThunk from 'src/feature/route/route.service'
import { driverAction } from 'src/feature/driver/driver.slice'
import { convertToDisplayDate } from 'src/utils/convertUtils'
import {
    cilPencil,
    cilArrowRight,
    cilArrowLeft,
    cilReload,
    cilCircle,
    cilCheckCircle,
    cilExternalLink,
    cilDataTransferDown,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import DetailBus from './DetailBus'
import { convertTimeToInt } from 'src/utils/convertUtils'
import { startOfWeek, endOfWeek, format, setHours } from 'date-fns'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { dayInWeek } from 'src/utils/constants'
import MediaQuery from 'react-responsive'
import { useMediaQuery } from 'react-responsive'
import { subStractDays, addDays, addHours } from 'src/utils/convertUtils'
import { SCHEDULE_STATE, ORDER_STATE } from 'src/utils/constants'
import noImg from 'src/assets/images/no_img.png'
import CustomButton from '../customButton/CustomButton'
import orderThunk from 'src/feature/transportation-order/order.service'
import { CustomToast } from '../customToast/CustomToast'
import { selectCurCompany } from 'src/feature/bus-company/busCompany.slice'
import parse from 'date-fns/parse'
const ScheduleWrap = ({ schedule }) => {
    const getScheduleColor = () => {
        if (schedule.tripInfor && schedule.tripInfor.turn === true) return 'success'
        else return 'warning'
    }
    return (
        <CTable bordered className="mb-1">
            <CTableBody>
                <CTableRow>
                    <CTableDataCell className="text-center p-0">
                        <CCard color={getScheduleColor()} style={{ borderRadius: '0' }}>
                            <CCardBody className="p-1">
                                <b>{schedule.departTime.slice(0, -3)}</b>
                                <br></br>
                                <span>{schedule.bus ? schedule.bus.licensePlate : '---'}</span>
                            </CCardBody>
                        </CCard>
                    </CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>
    )
}
const ScheduleAsTable = ({ currentList, startDate }) => {
    const filterTime = (listSchd, time) => {
        if (time === 'morning')
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.departTime) >= 6 &&
                    convertTimeToInt(schd.departTime) < 12,
            )
        else if (time === 'afternoon')
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.departTime) >= 12 &&
                    convertTimeToInt(schd.departTime) < 18,
            )
        else if (time === 'evening')
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.departTime) >= 18 &&
                    convertTimeToInt(schd.departTime) < 24,
            )
        else
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.departTime) >= 0 && convertTimeToInt(schd.departTime) < 6,
            )
    }
    const validDate = (schd, index) => {
        const dayStart = new Date(startDate)
        const schdDate = new Date(schd.departDate).getDate()
        const weekDate = new Date(dayStart.setDate(dayStart.getDate() + index)).getDate()
        return schdDate === weekDate
    }
    return (
        <>
            <CTable stripedColumns bordered className="mt-3">
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Buổi</CTableHeaderCell>
                        {Array.from({ length: 7 }, (_, index) => index).map((dayIndex) => (
                            <CTableHeaderCell key={dayIndex} className="text-center" scope="col">
                                <b>
                                    <i>{dayInWeek[dayIndex]}</i>
                                </b>
                                <div>
                                    {format(
                                        new Date(startDate.getTime() + dayIndex * 86400000),
                                        'dd/MM',
                                    )}
                                </div>
                            </CTableHeaderCell>
                        ))}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow color="success">
                        <CTableHeaderCell scope="row">
                            <i>Sáng</i>
                            <div>{`(6h-12h)`}</div>
                        </CTableHeaderCell>
                        {Array.from({ length: 7 }, (_, index) => index).map((dayIndex) => (
                            <CTableDataCell key={dayIndex}>
                                {filterTime(
                                    currentList.filter(
                                        (schedule) => validDate(schedule, dayIndex) === true,
                                    ),
                                    'morning',
                                ).map((schedule) => (
                                    <ScheduleWrap
                                        key={schedule.id}
                                        schedule={schedule}
                                    ></ScheduleWrap>
                                ))}
                            </CTableDataCell>
                        ))}
                    </CTableRow>
                    <CTableRow color="primary">
                        <CTableHeaderCell scope="row">
                            <i>Chiều</i>
                            <div>{`(12h-18h)`}</div>
                        </CTableHeaderCell>
                        {Array.from({ length: 7 }, (_, index) => index).map((dayIndex) => (
                            <CTableDataCell key={dayIndex}>
                                {filterTime(
                                    currentList.filter(
                                        (schedule) => validDate(schedule, dayIndex) === true,
                                    ),
                                    'afternoon',
                                ).map((schedule) => (
                                    <ScheduleWrap
                                        key={schedule.id}
                                        schedule={schedule}
                                    ></ScheduleWrap>
                                ))}
                            </CTableDataCell>
                        ))}
                    </CTableRow>
                    <CTableRow color="info">
                        <CTableHeaderCell scope="row">
                            <i>Tối</i>
                            <div>{`(18h-24h)`}</div>
                        </CTableHeaderCell>
                        {Array.from({ length: 7 }, (_, index) => index).map((dayIndex) => (
                            <CTableDataCell key={dayIndex}>
                                {filterTime(
                                    currentList.filter(
                                        (schedule) => validDate(schedule, dayIndex) === true,
                                    ),
                                    'evening',
                                ).map((schedule) => (
                                    <ScheduleWrap
                                        key={schedule.id}
                                        schedule={schedule}
                                    ></ScheduleWrap>
                                ))}
                            </CTableDataCell>
                        ))}
                    </CTableRow>
                    <CTableRow color="warning">
                        <CTableHeaderCell scope="row">
                            <i>Khuya</i>
                            <div>{`(0h-6h)`}</div>
                        </CTableHeaderCell>
                        {Array.from({ length: 7 }, (_, index) => index).map((dayIndex) => (
                            <CTableDataCell key={dayIndex}>
                                {filterTime(
                                    currentList.filter(
                                        (schedule) => validDate(schedule, dayIndex) === true,
                                    ),
                                    'late',
                                ).map((schedule) => (
                                    <ScheduleWrap
                                        key={schedule.id}
                                        schedule={schedule}
                                    ></ScheduleWrap>
                                ))}
                            </CTableDataCell>
                        ))}
                    </CTableRow>
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
        </>
    )
}

const OrderStatus = ({ data }) => {
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

const OrderStatusTracker = ({ schedule }) => {
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
                <OrderStatus data={status} key={index}></OrderStatus>
            ))}
        </div>
    )
}

const ScheduleStatus = ({ data }) => {
    const [showCondition, setShowCondition] = useState(false)
    return (
        <div className="d-flex flex-column align-items-center" role="button">
            <CIcon
                icon={data.achived ? cilCheckCircle : cilCircle}
                size="xl"
                style={data.achived ? { color: 'green' } : { color: '#ccc' }}
            ></CIcon>
            <b
                style={data.achived ? { color: '#000' } : { color: '#8f938f' }}
            >{`${data.value}. ${data.label}`}</b>
        </div>
    )
}

const ScheduleStatusTracker = ({ schedule }) => {
    const dispatch = useDispatch()
    const listTrip = useSelector(selectDriverTrip)
    const [status, setStatus] = useState(
        SCHEDULE_STATE.map((status) => {
            return {
                ...status,
                achived: false,
                station: null,
            }
        }),
    )
    useEffect(() => {
        const newStatus = [...status]
        const trip = listTrip.find((trip) => trip.id === schedule.tripInfor.id)
        const tripStations = trip.stopStations
        const scheduleStatus = SCHEDULE_STATE.find((st) => st.label === schedule.state)
        console.log(scheduleStatus)
        let listStation = [],
            station = []
        for (let i = 0; i < newStatus.length; i++) {
            listStation = tripStations.filter((st) =>
                newStatus[i].stationType.includes(st.stationType),
            )
            console.log(listStation)
            if (listStation.length > 0) {
                if (newStatus[i].stationType.includes('departure'))
                    station = listStation.filter((st) => st.id === trip.startStation.id)
                else if (newStatus[i].stationType.includes('destination'))
                    station = listStation.filter((st) => st.id === trip.endStation.id)
                else station = listStation
            }
            newStatus[i].station = station
            if (newStatus[i].value === scheduleStatus.value) {
                newStatus[i].achived = true
            }
        }
        setStatus(newStatus)
    }, [schedule])
    return (
        <div className="d-flex flex-column gap-5 align-items-center justify-content-center">
            {status.map((status, index) => (
                <ScheduleStatus data={status} key={index}></ScheduleStatus>
            ))}
        </div>
    )
}

const ScheduleItem = ({ schedule, index, time }) => {
    const curCompany = useSelector(selectCurCompany)
    const dispatch = useDispatch()
    const [showOrder, setShowOrder] = useState(false)
    const [showState, setShowState] = useState(false)
    const [fileURL, setFileURL] = useState(null)
    const [file, setFile] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const currentOrderStatus = ORDER_STATE.find(
        (st) => st.label === schedule.transportationOrder?.status,
    )
    const [orderStatus, setOrderStatus] = useState(currentOrderStatus?.label)
    const [loading, setLoading] = useState(false)
    const toaster = useRef('')
    const [toast, addToast] = useState(0)
    const [showDetailBus, setShowDetailBus] = useState(false)
    const navigate = useNavigate()
    const getImage = () => {
        if (fileURL) return fileURL
        else if (schedule.transportationOrder && schedule.transportationOrder.image)
            return schedule.transportationOrder.image
        else return noImg
    }
    const handleUpImage = (e) => {
        setFile(e.target.files[0])
        setFileURL(URL.createObjectURL(e.target.files[0]))
    }
    const handleUpdate = () => {
        if (isUpdating) {
            setLoading(true)
            dispatch(
                orderThunk.updateOrder({
                    id: schedule.transportationOrder.id,
                    status: orderStatus,
                    file: file,
                }),
            )
                .unwrap()
                .then(() => {
                    setLoading(false)
                    addToast(() =>
                        CustomToast({ message: 'Đã cập nhật thành công', type: 'success' }),
                    )
                    setShowOrder(false)
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        } else {
            setIsUpdating(true)
        }
    }
    const getCurrentTrip = (schedule) => {
        dispatch(driverAction.setCurrentTrip(schedule.tripInfor))
        dispatch(driverAction.setCurrentSchedule(schedule))
        dispatch(driverAction.setCurrentTripTimeProps(time))
        navigate('detail')
    }
    const handleShowBusDetail = (bus) => {
        dispatch(driverAction.setCurrentBus(bus))
        setShowDetailBus(true)
    }
    const openOrderForm = () => {
        console.log(schedule)
        const listCommandData = JSON.parse(localStorage.getItem('commandData'))
        const commandData = {
            companyName: curCompany.busCompany.name,
            companyTel: curCompany.admin.tel,
            commandId: schedule.transportationOrder?.id,
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
            routeId: schedule.tripInfor.routeCode,
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
        let baseUrl = process.env.REACT_APP_BASE_URL
        if (!baseUrl) baseUrl = ''
        setTimeout(() => {
            const params = new URLSearchParams()
            params.append('id', schedule.id)
            window.open(`${baseUrl}/lenh-van-chuyen_form.html?${params.toString()}`, '_blank')
        }, 1000)
    }
    useEffect(() => {
        setOrderStatus(currentOrderStatus?.label)
    }, [schedule])
    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <CTableRow key={index}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell className="text-center">
                    {schedule.tripInfor && schedule.tripInfor.turn === true && 'Lượt đi'}
                    {schedule.tripInfor && schedule.tripInfor.turn === false && 'Lượt về'}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                    {convertToDisplayDate(schedule.departDate)}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                    {schedule.departTime.slice(0, -3)}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                    {schedule.finishTime !== '00:00:00'
                        ? schedule.finishTime.slice(0, -3)
                        : 'Đang cập nhật'}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                    {schedule.bus ? schedule.bus.licensePlate : 'Đang cập nhật'}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                    <i onClick={() => getCurrentTrip(schedule)} role="button">
                        Chi tiết
                    </i>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                    <i>{schedule.bus ? schedule.bus.availability : 'Đang cập nhật'}</i>
                    {schedule.bus && schedule.bus.availability !== 'Đang cập nhật' && (
                        <CTooltip content="Cập nhật trạng thái xe">
                            <CIcon
                                id={'bus-detail-' + schedule.bus.licensePlate}
                                color="success"
                                icon={cilPencil}
                                role="button"
                                style={{ marginLeft: '5px' }}
                                onClick={() => handleShowBusDetail(schedule.bus)}
                            ></CIcon>
                        </CTooltip>
                    )}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                    {schedule.transportationOrder ? (
                        <>
                            <i>{schedule.transportationOrder.status}</i>
                            <CTooltip content="Cập nhật lệnh vận chuyển">
                                <CIcon
                                    icon={cilPencil}
                                    role="button"
                                    style={{ marginLeft: '5px' }}
                                    onClick={() => setShowOrder(true)}
                                ></CIcon>
                            </CTooltip>
                        </>
                    ) : (
                        <i>Chưa có lệnh</i>
                    )}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                    <i>{schedule.state}</i>
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
            </CTableRow>
            <CModal visible={showOrder} onClose={() => setShowOrder(false)} size="lg">
                <CModalHeader>
                    <b>Lệnh vận chuyển</b>
                </CModalHeader>
                <CModalBody>
                    <CRow className="border-bottom justify-content-center p-3">
                        <CCol md="12">
                            <OrderStatusTracker schedule={schedule}></OrderStatusTracker>
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
                                {isUpdating && (
                                    <input
                                        type="file"
                                        onChange={handleUpImage}
                                        name="myImage"
                                        style={{ width: '100%' }}
                                    ></input>
                                )}
                            </div>
                        </CCol>
                        <CCol md="5">
                            <CFormSelect
                                value={orderStatus}
                                onChange={(e) => setOrderStatus(e.target.value)}
                            >
                                <option value="0" disabled>
                                    Chọn trạng thái
                                </option>
                                {ORDER_STATE.filter(
                                    (st) =>
                                        st.value === currentOrderStatus?.value ||
                                        st.value === currentOrderStatus?.value + 1,
                                ).map((status, index) => (
                                    <option
                                        key={index}
                                        value={status.label}
                                        disabled={status.value === 1}
                                    >
                                        {status.label}
                                    </option>
                                ))}
                            </CFormSelect>
                            <br></br>
                            <i>* Điều kiện: </i>
                            <i>{ORDER_STATE.find((st) => st.label === orderStatus)?.condition}</i>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton variant="outline" color="info" onClick={openOrderForm}>
                        Xem mẫu lệnh
                        <CIcon icon={cilExternalLink} style={{ marginLeft: '5px' }}></CIcon>
                    </CButton>
                    {/* <CButton variant="outline" color="primary">
                        Tải mẫu lệnh
                        <CIcon icon={cilDataTransferDown} style={{ marginLeft: '5px' }}></CIcon>
                    </CButton> */}
                    <CustomButton
                        color="success"
                        onClick={handleUpdate}
                        text={isUpdating ? 'Lưu' : 'Cập nhật'}
                    ></CustomButton>
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
                    <CRow className="border-bottom justify-content-center p-3">
                        <CCol md="12">
                            <ScheduleStatusTracker schedule={schedule}></ScheduleStatusTracker>
                        </CCol>
                    </CRow>
                    <CRow className="justify-content-center p-1">
                        {/* <CCol md="5">
                            <CFormSelect
                                value={orderStatus}
                                onChange={(e) => setOrderStatus(e.target.value)}
                            >
                                <option value="0" disabled>
                                    Chọn trạng thái
                                </option>
                                {ORDER_STATE.filter(
                                    (st) =>
                                        st.value === currentOrderStatus?.value ||
                                        st.value === currentOrderStatus?.value + 1,
                                ).map((status, index) => (
                                    <option
                                        key={index}
                                        value={status.label}
                                        disabled={status.value === 1}
                                    >
                                        {status.label}
                                    </option>
                                ))}
                            </CFormSelect>
                            <br></br>
                            <i>* Điều kiện: </i>
                            <i>{ORDER_STATE.find((st) => st.label === orderStatus)?.condition}</i>
                        </CCol> */}
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CustomButton
                        color="success"
                        onClick={handleUpdate}
                        text={isUpdating ? 'Lưu' : 'Cập nhật'}
                    ></CustomButton>
                    <CButton variant="outline" color="dark" onClick={() => setShowState(false)}>
                        Đóng
                    </CButton>
                </CModalFooter>
            </CModal>
            <DetailBus visible={showDetailBus} setVisible={setShowDetailBus}></DetailBus>
        </>
    )
}
const ScheduleAsList = ({ listSchedule, time }) => {
    const dispatch = useDispatch()
    const listTrip = useSelector(selectDriverTrip)
    const [listGo, setListGo] = useState([])
    const [listReturn, setListReturn] = useState([])
    const sortTime = (a, b) => {
        const timeA = new Date(a.departDate + 'T' + a.departTime).getTime()
        const timeB = new Date(b.departDate + 'T' + b.departTime).getTime()
        const today = new Date().getTime()
        const distanceA = timeA - today
        const distanceB = timeB - today
        const diff = Math.abs(distanceA) - Math.abs(distanceB)
        if (distanceA > 0 && distanceB < 0) return -1
        else if (distanceA < 0 && distanceB > 0) return 1
        else {
            if (diff < 0) return -1
            else if (diff > 0) return 1
            else return 0
        }
    }
    return (
        <>
            {listSchedule.length === 0 ? (
                <div className="d-flex justify-content-center mt-3">
                    <h4>Chưa có chuyến xe</h4>
                </div>
            ) : (
                <CTable striped>
                    <CTableHead>
                        <CTableRow color="info">
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell className="text-center" scope="col">
                                Lượt xe
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center" scope="col">
                                Ngày khởi hành
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center" scope="col">
                                Khởi hành
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center" scope="col">
                                Kết thúc
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center" scope="col">
                                Xe bus
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center" scope="col">
                                Chi tiết chuyến
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center" scope="col">
                                Trạng thái xe
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center" scope="col">
                                Lệnh vận chuyển
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center" scope="col">
                                Trạng thái chuyến
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {listSchedule.sort(sortTime).map((schedule, index) => (
                            <ScheduleItem
                                schedule={schedule}
                                index={index}
                                key={index}
                                time={time}
                            ></ScheduleItem>
                        ))}
                    </CTableBody>
                </CTable>
            )}
        </>
    )
}
const DriverTrip = () => {
    const route = useSelector(selectDriverRoute)
    const user = useSelector(selectUser)
    const listTrip = useSelector(selectDriverTrip)
    const listSchedule = useSelector(selectDriverSchedules)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [selectedTab, setSelectedTab] = useState(1)
    const [turnList, setTurnList] = useState(listSchedule)
    const [currentList, setCurrentList] = useState(listSchedule)
    const [listForm, setListForm] = useState('list')
    const [currentDay, setCurrentDay] = useState(new Date())
    const [startDate, setStartDate] = useState(startOfWeek(currentDay, { weekStartsOn: 1 }))
    const [endDate, setEndDate] = useState(endOfWeek(currentDay, { weekStartsOn: 1 }))
    const isBigScreen = useMediaQuery({ query: '(min-width: 878px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 878px)' })
    useEffect(() => {
        setCurrentList(
            turnList.filter(
                (schd) =>
                    new Date(schd.departDate) >= startDate && new Date(schd.departDate) <= endDate,
            ),
        )
    }, [startDate, endDate, turnList])
    useEffect(() => {
        setStartDate(startOfWeek(currentDay, { weekStartsOn: 1 }))
        setEndDate(endOfWeek(currentDay, { weekStartsOn: 1 }))
    }, [currentDay])
    useEffect(() => {
        if (listSchedule.length > 0 && listTrip.length > 0) {
            const listGo = listTrip.find((tp) => tp.turn === true)
            const listReturn = listTrip.find((tp) => tp.turn === false)
            const tempList = []
            if (listGo) {
                listSchedule.forEach((schedule) => {
                    if (
                        listGo.schedules &&
                        listGo.schedules.find((schd) => schd.id === schedule.id)
                    )
                        tempList.push({
                            ...schedule,
                            tripInfor: listGo,
                        })
                    else {
                        tempList.push({
                            ...schedule,
                            tripInfor: listReturn,
                        })
                    }
                })
                setTurnList(tempList)
            }
        }
    }, [listSchedule.length, listTrip.length])

    const getListSchedule = (time) => {
        var result = []
        const getTimeEndSpan = (schd) => {
            const startTime = new Date(schd.departDate + 'T' + schd.departTime)
            const endTime = addHours(startTime, listTrip[0].hours)
            return endTime.getTime() - new Date().getTime()
        }
        const getTimeStartSpan = (schd) => {
            return (
                new Date(schd.departDate + 'T' + schd.departTime).getTime() - new Date().getTime()
            )
        }
        const getTime = (schd) => {
            return Math.abs(new Date(schd.departDate + 'T' + schd.departTime).getTime())
        }
        if (route) {
            if (time === 'past') result = currentList.filter((schd) => getTimeEndSpan(schd) <= 0)
            else if (time === 'current')
                result = currentList.filter(
                    (schd) => getTimeEndSpan(schd) >= 0 && getTimeStartSpan(schd) <= 60 * 60 * 1000,
                )
            else result = currentList.filter((schd) => getTimeStartSpan(schd) >= 60 * 60 * 1000)
        }
        return result.sort((a, b) => getTime(a) - getTime(b))
    }
    const getDriverRoute = (tripId, listRoute) => {
        for (let i = 0; i < listRoute.length; i++) {
            if (listRoute[i].trips && listRoute[i].trips.length !== 0)
                if (listRoute[i].trips.find((tp) => tp.id === tripId)) return listRoute[i]
        }
        return null
    }
    const handleGetBack = () => {
        setCurrentDay(subStractDays(currentDay, 7))
    }
    const handleGetNext = () => {
        setCurrentDay(addDays(currentDay, 7))
    }
    const reload = () => {
        window.location.reload()
    }
    useEffect(() => {
        const getInfor = async () => {
            if (user) {
                setLoading(true)
                try {
                    await dispatch(driverThunk.getDriverTrip(user.user.driver.driverId)).unwrap()
                    await dispatch(
                        driverThunk.getDriverSchedules(user.user.driver.driverId),
                    ).unwrap()
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
                }
            }
        }
        getInfor()
    }, [])
    useEffect(() => {
        if (!route && listTrip.length > 0) {
            dispatch(routeThunk.getRoute())
                .unwrap()
                .then((res) => {
                    dispatch(driverAction.setDriverRoute(getDriverRoute(listTrip[0].id, res)))
                })
                .catch((error) => {})
        }
    }, [listTrip])
    return (
        <>
            <CRow className="my-3 gap-2 justify-content-between">
                <CCol
                    md={5}
                    sm={12}
                    style={{ textAlign: 'right' }}
                    className={`d-flex gap-1 customDatePicker ${
                        isTabletOrMobile ? 'flex-column' : 'align-items-center'
                    }`}
                >
                    <CIcon
                        icon={cilArrowLeft}
                        size="xl"
                        role="button"
                        onClick={handleGetBack}
                    ></CIcon>
                    <div className="d-flex align-items-center gap-1">
                        <b>
                            <i>Ngày</i>
                        </b>
                        <DatePicker
                            selected={currentDay}
                            onChange={setCurrentDay}
                            dateFormat="dd/MM/yyyy"
                            showWeekNumbers
                        />
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        <b>
                            <i>{` Tuần`}</i>
                        </b>
                        <CFormInput
                            value={`${format(startDate, 'dd/MM/yyyy')} - ${format(
                                endDate,
                                'dd/MM/yyyy',
                            )}`}
                            disabled
                            style={{ width: '250px', marrginLeft: '10px' }}
                        ></CFormInput>
                    </div>
                    <CIcon
                        icon={cilArrowRight}
                        size="xl"
                        role="button"
                        onClick={handleGetNext}
                    ></CIcon>
                </CCol>
                <CCol
                    md={5}
                    sm={12}
                    style={isBigScreen ? { textAlign: 'right' } : { textAlign: 'center' }}
                >
                    <CButton onClick={reload} variant="outline" color="dark" className="mx-2">
                        <CIcon icon={cilReload}></CIcon>
                    </CButton>
                    <i>Hiển thị: </i>
                    <CButtonGroup role="group" aria-label="Form option" color="info">
                        <CFormCheck
                            type="radio"
                            button={{ color: 'primary', variant: 'outline' }}
                            name="btnradio"
                            id="btnradio1"
                            autoComplete="off"
                            label="Danh sách"
                            checked={listForm === 'list'}
                            onChange={() => setListForm('list')}
                        />
                        <CFormCheck
                            type="radio"
                            button={{ color: 'primary', variant: 'outline' }}
                            name="btnradio"
                            id="btnradio2"
                            autoComplete="off"
                            label="Bảng"
                            checked={listForm === 'table'}
                            onChange={() => setListForm('table')}
                        />
                    </CButtonGroup>
                </CCol>
            </CRow>
            {listTrip.length !== 0 && (
                <>
                    <CRow>
                        <CFormLabel className="col-sm-2 col-form-label">Tuyến hoạt động</CFormLabel>
                        <CCol sm="5">
                            <CFormInput
                                className="col-sm-3"
                                disabled
                                defaultValue={getTripJourney(listTrip[0])}
                            ></CFormInput>
                        </CCol>
                    </CRow>
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                        {listForm === 'list' ? (
                            <CRow className="tabStyle">
                                {listSchedule.length > 0 ? (
                                    <Tabs
                                        className="mt-3"
                                        selectedIndex={selectedTab}
                                        onSelect={(index) => setSelectedTab(index)}
                                    >
                                        <TabList>
                                            <Tab>Đã thực hiện</Tab>
                                            <Tab>Đang diễn ra</Tab>
                                            <Tab>Sắp diễn ra</Tab>
                                        </TabList>
                                        <TabPanel>
                                            <ScheduleAsList
                                                listSchedule={getListSchedule('past')}
                                                time="past"
                                            ></ScheduleAsList>
                                        </TabPanel>
                                        <TabPanel>
                                            <ScheduleAsList
                                                listSchedule={getListSchedule('current')}
                                                time="current"
                                            ></ScheduleAsList>
                                        </TabPanel>
                                        <TabPanel>
                                            <ScheduleAsList
                                                listSchedule={getListSchedule('future')}
                                                time="future"
                                            ></ScheduleAsList>
                                        </TabPanel>
                                    </Tabs>
                                ) : (
                                    <div className="d-flex justify-content-center mt-3">
                                        <h4>Bạn chưa có lịch trình hoạt động</h4>
                                    </div>
                                )}
                            </CRow>
                        ) : (
                            <ScheduleAsTable
                                currentList={currentList}
                                startDate={startDate}
                            ></ScheduleAsTable>
                        )}
                    </div>
                </>
            )}
            {loading && (
                <div className="d-flex justify-content-center">
                    <CSpinner />
                </div>
            )}
            {!loading && listTrip.length === 0 && (
                <div className="d-flex justify-content-center">
                    <h3>Bạn chưa được phân công tuyến xe nào</h3>
                </div>
            )}
        </>
    )
}

export default DriverTrip
