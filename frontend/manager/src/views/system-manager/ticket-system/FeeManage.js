import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {
    CCol,
    CFormSelect,
    CRow,
    CTable,
    CTableRow,
    CTableHead,
    CTableHeaderCell,
    CTableDataCell,
    CTableBody,
    CTooltip,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
    CToaster,
} from '@coreui/react'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectListRoute } from 'src/feature/route/route.slice'
import feeThunk from 'src/feature/fee/fee.service'
import { addDays, convertToDisplayDate, convertToDisplayTimeStamp } from 'src/utils/convertUtils'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { tripProcess } from 'src/utils/routeUtils'
import { CChart } from '@coreui/react-chartjs'
import { MONTH_IN_YEAR } from 'src/utils/constants'
import CIcon from '@coreui/icons-react'
import {
    companyActions,
    selectCurCompany,
    selectListCompany,
} from 'src/feature/bus-company/busCompany.slice'
import { getStyle } from '@coreui/utils'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import { CustomToast } from 'src/views/customToast/CustomToast'
import { cilExternalLink } from '@coreui/icons'
import { getTripJourney } from 'src/utils/tripUtils'
const TripListModal = ({ visible, onClose, curCompany, listSchedule = [] }) => {
    return (
        <CModal visible={visible} onClose={onClose} size="lg">
            <CModalHeader>Danh sách chuyến xe</CModalHeader>
            <CModalBody>
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
                            <CTableHeaderCell
                                scope="col"
                                rowSpan={2}
                                className="align-middle text-center"
                            >
                                Chuyến
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col" colSpan={2} className="text-center">
                                Thời gian
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                rowSpan={2}
                                className="align-middle text-center"
                            >
                                Tài xế 1
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                rowSpan={2}
                                className="align-middle text-center"
                            >
                                Tài xế 2
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                rowSpan={2}
                                className="align-middle text-center"
                            >
                                Biển số xe
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                rowSpan={2}
                                className="align-middle text-center"
                            >
                                Số khách
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
                                Xem lệnh vận chuyển
                            </CTableHeaderCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell scope="col" className="text-center">
                                Xuất bến
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col" className="text-center">
                                Đến bến
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {listSchedule.map((schd, index) => (
                            <CTableRow key={schd}>
                                <CTableHeaderCell scope="row" className="text-center">
                                    {index + 1}
                                </CTableHeaderCell>
                                <CTableHeaderCell scope="row" className="text-center">
                                    {getTripJourney(schd.tripInfo)}
                                </CTableHeaderCell>
                                <CTableDataCell className="text-center">{`${schd.departTime.slice(
                                    0,
                                    -3,
                                )} - ${convertToDisplayDate(schd.departDate)}`}</CTableDataCell>
                                <CTableDataCell className="text-center">{`${convertToDisplayTimeStamp(
                                    schd.updatedTime,
                                )}`}</CTableDataCell>
                                <CTableDataCell className="text-center">
                                    {schd.driverUser1?.name}
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    {schd.driverUser2?.name}
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    {schd.bus?.licensePlate}
                                </CTableDataCell>
                                <CTableDataCell className="text-center">{30}</CTableDataCell>
                                <CTableDataCell className="text-center">
                                    {schd.state}
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    {schd.transportationOrder?.status}
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CModalBody>
        </CModal>
    )
}
const TicketFee = () => {
    const dispatch = useDispatch()
    const listRoute = useSelector(selectListRoute)
    const listAssignRouteId = listRoute.map((route) => route.id)
    const [listSchedule, setListSchedule] = useState([])
    const [listCompanyServiceFee, setListCompanyServiceFee] = useState([])
    const listCompany = useSelector(selectListCompany)
    const startTime = new Date('2024-01-01')
    const today = new Date()
    const [yearValue, setYearValue] = useState(today.getFullYear())
    const [monthValue, setMonthValue] = useState(today.getMonth())
    const [monthRange, setMonthRange] = useState({
        start: 0,
        end: 11,
    })
    const [curCompany, setCurCompany] = useState(null)
    const [loading, setLoading] = useState(false)
    const [openComfirmForm, setOpenComfirmForm] = useState(false)
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [openTripList, setOpenTripList] = useState(false)
    const getYearRange = () => {
        var year = []
        const startYear = startTime.getFullYear()
        for (let i = startYear; i <= today.getFullYear(); i++) {
            year.push(i)
        }
        return year
    }
    const getData = () => {
        // dispatch(feeThunk.getFee())
        //     .unwrap()
        //     .then((res) => {
        //         //filter res by month and year in dueDate
        //         const listFee = res.filter((fee) => {
        //             const date = parse(fee.dueDate, 'yyyy-MM-dd', new Date())
        //             return date.getFullYear() === yearValue && date.getMonth() === monthValue
        //         })
        //         setListCompanyServiceFee(listFee)
        //     })
    }

    const getNextDueDay = (currentDueDay) => {
        let currentDay = parse(currentDueDay, 'yyyy-MM-dd', new Date())
        let currentMonth = currentDay.getMonth()
        let nextDate = new Date(currentDay.getTime())
        nextDate.setDate(5)
        nextDate.setMonth(currentMonth + 1)
        return format(nextDate, 'dd/MM/yyyy')
    }

    const viewCompany = (companyId) => {
        const company = listCompany.find((cpn) => cpn.busCompany.id === companyId)
        dispatch(companyActions.setCurCompany(company))
        setTimeout(() => {
            window.location.href = '#/ticket-system/bus-companies/company-detail'
        }, 200)
    }

    const getDueState = (dueDate) => {
        let currentDay = parse(dueDate, 'yyyy-MM-dd', new Date())
        let today = new Date()
        const diffTime = Math.abs(currentDay - today)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (currentDay < today) {
            return {
                state: 'overdue',
                message: `Quá hạn ${diffDays} ngày`,
                color: 'red',
            }
        } else if (diffDays < 5) {
            return {
                state: 'not-overdue',
                message: `Còn ${diffDays} ngày`,
                color: 'yellow',
            }
        } else {
            return {
                state: 'not-overdue',
                message: `Còn ${diffDays} ngày`,
                color: 'green',
            }
        }
    }

    const handleActiveCompany = () => {
        setLoading(true)
        dispatch(
            companyThunk.activeCompany({ companyId: curCompany.id, active: !curCompany.active }),
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

    const handleOpenTripList = (company) => {
        setCurCompany(company)
        setOpenTripList(true)
    }

    // useEffect(() => {
    //     const listAssign = listRoute.filter((route) =>
    //         listAssignRouteId.find((id) => id.routeId === route.id),
    //     )
    //     const listTripIn = tripProcess(listAssign)
    //     setListTrip(listTripIn)
    // }, [listAssignRouteId])

    useEffect(() => {
        getData()
    }, [monthValue, yearValue])

    useEffect(() => {
        getData()
        if (listCompany.length === 0) {
            dispatch(companyThunk.getCompany())
                .unwrap()
                .then()
                .catch((err) => console.log(err))
        }
    }, [])
    return (
        <>
            <CRow className="my-3">
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
                        {MONTH_IN_YEAR.slice(monthRange.start, monthRange.end + 1).map(
                            (month, index) => (
                                <option value={monthRange.start + index} key={index}>
                                    {month}
                                </option>
                            ),
                        )}
                    </CFormSelect>
                </CCol>
            </CRow>
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
                        <CTableHeaderCell
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Công ty
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" colSpan={2} className="text-center">
                            Kỳ dịch vụ
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Hạn thanh toán
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Số chuyến xe
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Số vé bán được
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Tiền bán vé
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Phí hoa hồng
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
                            Tác vụ
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
                        <CTableHeaderCell scope="row" className="text-center">
                            {'Xe Châu An'}
                            <br></br>
                        </CTableHeaderCell>
                        <CTableDataCell className="text-center">{'01/06/2024'}</CTableDataCell>
                        <CTableDataCell className="text-center">{'31/06/2024'}</CTableDataCell>
                        <CTableDataCell className="text-center">{'06/07 - 10/07'}</CTableDataCell>
                        <CTableDataCell className="text-center">
                            {'3 chuyến'}
                            <CIcon
                                icon={cilExternalLink}
                                role="button"
                                style={{ marginLeft: '5px' }}
                                onClick={() => handleOpenTripList('company')}
                            ></CIcon>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                            {'123'}
                            <CIcon
                                icon={cilExternalLink}
                                role="button"
                                style={{ marginLeft: '5px' }}
                            ></CIcon>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">{'1,200,000 đ'}</CTableDataCell>
                        <CTableDataCell className="text-center">{'120,000 đ'}</CTableDataCell>
                        <CTableDataCell className="text-center">{'---'}</CTableDataCell>
                        <CTableDataCell className="text-center">
                            <CButton variant="outline">Thanh toán</CButton>
                        </CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
            <TripListModal
                visible={openTripList}
                onClose={() => setOpenTripList(false)}
            ></TripListModal>
        </>
    )
}
const ServiceFee = () => {
    const dispatch = useDispatch()
    const listRoute = useSelector(selectListRoute)
    const listAssignRouteId = listRoute.map((route) => route.id)
    const [listTrip, setListTrip] = useState([])
    const [listCompanyServiceFee, setListCompanyServiceFee] = useState([])
    const listCompany = useSelector(selectListCompany)
    const startTime = new Date('2024-01-01')
    const today = new Date()
    const [chartData, setChartData] = useState({
        labels: [],
        backGroundColor: [],
        data: [],
    })
    const [yearValue, setYearValue] = useState(today.getFullYear())
    const [monthValue, setMonthValue] = useState(today.getMonth())
    const [monthRange, setMonthRange] = useState({
        start: 0,
        end: 11,
    })
    const [curCompany, setCurCompany] = useState(null)
    const [loading, setLoading] = useState(false)
    const [openComfirmForm, setOpenComfirmForm] = useState(false)
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const getYearRange = () => {
        var year = []
        const startYear = startTime.getFullYear()
        for (let i = startYear; i <= today.getFullYear(); i++) {
            year.push(i)
        }
        return year
    }

    //Generate a random color
    const randomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }

    const getLabelandColor = () => {
        const labels = []
        const data = []
        const backGroundColor = []
        listTrip.forEach((trip) => {
            labels.push(`${trip.startStation.name} - ${trip.endStation.name}`)
            //get random number
            data.push(Math.floor(Math.random() * 100) + 1)
            backGroundColor.push(randomColor())
        })
        setChartData({ labels: labels, data: data, backGroundColor: backGroundColor })
    }

    const getData = () => {
        dispatch(feeThunk.getFee())
            .unwrap()
            .then((res) => {
                //filter res by month and year in dueDate
                const listFee = res.filter((fee) => {
                    const date = parse(fee.dueDate, 'yyyy-MM-dd', new Date())
                    return date.getFullYear() === yearValue && date.getMonth() === monthValue
                })
                setListCompanyServiceFee(listFee)
            })
    }

    const getNextDueDay = (currentDueDay) => {
        let currentDay = parse(currentDueDay, 'yyyy-MM-dd', new Date())
        let currentMonth = currentDay.getMonth()
        let nextDate = new Date(currentDay.getTime())
        nextDate.setDate(5)
        nextDate.setMonth(currentMonth + 1)
        return format(nextDate, 'dd/MM/yyyy')
    }

    const viewCompany = (companyId) => {
        const company = listCompany.find((cpn) => cpn.busCompany.id === companyId)
        dispatch(companyActions.setCurCompany(company))
        setTimeout(() => {
            window.location.href = '#/ticket-system/bus-companies/company-detail'
        }, 200)
    }

    const getDueState = (dueDate) => {
        let currentDay = parse(dueDate, 'yyyy-MM-dd', new Date())
        let today = new Date()
        const diffTime = Math.abs(currentDay - today)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (currentDay < today) {
            return {
                state: 'overdue',
                message: `Quá hạn ${diffDays} ngày`,
                color: 'red',
            }
        } else if (diffDays < 5) {
            return {
                state: 'not-overdue',
                message: `Còn ${diffDays} ngày`,
                color: 'yellow',
            }
        } else {
            return {
                state: 'not-overdue',
                message: `Còn ${diffDays} ngày`,
                color: 'green',
            }
        }
    }

    const handleActiveCompany = () => {
        setLoading(true)
        dispatch(
            companyThunk.activeCompany({ companyId: curCompany.id, active: !curCompany.active }),
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

    // useEffect(() => {
    //     const listAssign = listRoute.filter((route) =>
    //         listAssignRouteId.find((id) => id.routeId === route.id),
    //     )
    //     const listTripIn = tripProcess(listAssign)
    //     setListTrip(listTripIn)
    // }, [listAssignRouteId])

    useEffect(() => {
        getLabelandColor()
    }, [listTrip])

    useEffect(() => {
        getData()
    }, [monthValue, yearValue])

    useEffect(() => {
        getData()
        if (listCompany.length === 0) {
            dispatch(companyThunk.getCompany())
                .unwrap()
                .then()
                .catch((err) => console.log(err))
        }
    }, [])
    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <CRow className="my-3">
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
                        {MONTH_IN_YEAR.slice(monthRange.start, monthRange.end + 1).map(
                            (month, index) => (
                                <option value={monthRange.start + index} key={index}>
                                    {month}
                                </option>
                            ),
                        )}
                    </CFormSelect>
                </CCol>
            </CRow>
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
                        <CTableHeaderCell
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Công ty
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col" colSpan={2} className="text-center">
                            Kỳ dịch vụ
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Hạn thanh toán
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
                            Đơn giá tính
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
                        <CTableHeaderCell
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Tác vụ
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
                    {listCompanyServiceFee.map((fee, index) => (
                        <CTableRow key={index}>
                            <CTableHeaderCell scope="row" className="text-center">
                                {index + 1}
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="row" className="text-center">
                                {fee.company.name}
                                <br></br>
                                {!fee.company.active && (
                                    <small style={{ color: 'red' }}>
                                        <i>Đã ngừng dịch vụ</i>
                                    </small>
                                )}
                            </CTableHeaderCell>
                            <CTableDataCell className="text-center">
                                {format(addDays(new Date(fee.dueDate), 1), 'dd/MM/yyyy')}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                {getNextDueDay(fee.dueDate)}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                {convertToDisplayDate(fee.dueDate)}
                                {fee.status === 'Chờ thanh toán' && (
                                    <>
                                        <br></br>
                                        <i>
                                            <small
                                                style={{
                                                    color: getDueState(fee.dueDate).color,
                                                }}
                                            >
                                                {getDueState(fee.dueDate).message}
                                            </small>
                                        </i>
                                    </>
                                )}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                {listTrip.length}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">34k/ngày</CTableDataCell>
                            <CTableDataCell className="text-center">
                                {fee.fee.toLocaleString()}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">{fee.status}</CTableDataCell>
                            <CTableDataCell className="text-center">
                                {fee.systemTransaction
                                    ? fee.systemTransaction.transactionNo
                                    : '---'}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                <CDropdown variant="btn-group" key={index}>
                                    <CDropdownToggle color="secondary" size="sm"></CDropdownToggle>
                                    <CDropdownMenu>
                                        <CDropdownItem
                                            as="button"
                                            onClick={() => {
                                                setCurCompany(fee.company)
                                                setOpenComfirmForm(true)
                                            }}
                                        >
                                            {fee.company.active ? `Ngừng dịch vụ` : `Tái dịch vụ`}
                                        </CDropdownItem>
                                        <CDropdownItem
                                            as="button"
                                            onClick={() => viewCompany(fee.company.id)}
                                        >
                                            Xem thông tin nhà xe
                                        </CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
            <CModal visible={openComfirmForm} onClose={() => setOpenComfirmForm(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Thông báo</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {`Bạn có chắc chắn muốn ${
                        curCompany && curCompany.active ? 'ngừng hợp tác' : 'tái hợp tác'
                    } với công ty ${curCompany?.name}?`}
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={handleActiveCompany}>
                        Xác nhận
                    </CButton>
                    <CButton color="secondary" onClick={() => setOpenComfirmForm(false)}>
                        Hủy
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}
const FeeManage = () => {
    return (
        <div>
            <Tabs className="tabStyle">
                <TabList>
                    <Tab>Phí dịch vụ</Tab>
                    <Tab>Phí bán vé</Tab>
                </TabList>
                <TabPanel className="px-3">
                    <ServiceFee></ServiceFee>
                </TabPanel>
                <TabPanel className="px-3">
                    <TicketFee></TicketFee>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default FeeManage
