import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableRow,
    CTableDataCell,
    CTableHeaderCell,
    CTableHead,
    CFormSelect,
    CButton,
    CToast,
    CToaster,
} from '@coreui/react'
import { selectListCompanyRoute } from 'src/feature/route/route.slice'
import { useState, useRef } from 'react'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import { CustomToast } from 'src/views/customToast/CustomToast'
import scheduleThunk from 'src/feature/schedule/schedule.service'
import { useEffect } from 'react'
import { selectListOfficialRoute, selectListRoute } from 'src/feature/route/route.slice'
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs'
import { MONTH_IN_YEAR } from 'src/utils/constants'
import { tripProcess } from 'src/utils/tripUtils'
import { CChart } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import 'react-time-picker/dist/TimePicker.css'
import feeThunk from 'src/feature/fee/fee.service'
import { addDays, convertToDisplayDate } from 'src/utils/convertUtils'
import { format, parse } from 'date-fns'
import { selectCurCompany, selectListAssign } from 'src/feature/bus-company/busCompany.slice'
import { selectCompanyId } from 'src/feature/auth/auth.slice'

const Expense = () => {
    const dispatch = useDispatch()
    const companyId = useSelector(selectCompanyId)
    const listRoute = useSelector(selectListCompanyRoute)
    const [activeTab, setActiveTab] = useState(0)
    const [listTrip, setListTrip] = useState([])
    const [listCompanyServiceFee, setListCompanyServiceFee] = useState([])
    const curCompany = useSelector(selectCurCompany)
    const listAssign = useSelector(selectListAssign)
    const startTime = curCompany ? addDays(new Date(curCompany?.busCompany.coopDay), 1) : new Date()
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
                setListCompanyServiceFee(res.filter((fee) => fee.company.id === companyId))
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

    const handlePay = (feeId) => {
        dispatch(feeThunk.getFeePaymentUrl(feeId))
            .unwrap()
            .then((res) => {
                //nav to res url in the same tab
                window.location.href = res
            })
    }
    const verifyPaymentStatus = () => {
        const url = window.location.href
        if (url.includes('vnp_ResponseCode') === false) return
        setActiveTab(1)
        const urlParams = new URLSearchParams(url)
        const vnp_ResponseCode = urlParams.get('vnp_ResponseCode')
        const vnp_TransactionNo = urlParams.get('vnp_TransactionNo')
        const vnp_TransactionDate = urlParams.get('vnp_PayDate')
        const content = urlParams.get('vnp_OrderInfo')
        //Get all character after "code" in content
        const feeId = content.slice(content.indexOf('code') + 4)
        if (vnp_ResponseCode === '00') {
            dispatch(
                feeThunk.feePay({
                    feeServiceId: feeId,
                    transactionNo: vnp_TransactionNo,
                    transactionDate: vnp_TransactionDate,
                }),
            )
                .unwrap()
                .then(() => {
                    addToast(() =>
                        CustomToast({ message: 'Thanh toán thành công', type: 'success' }),
                    )
                    getData()
                    //Get url before ? in url
                    window.history.pushState({}, document.title, url.split('?')[0])
                })
                .catch(() => {
                    addToast(() => CustomToast({ message: 'Có lỗi xảy ra', type: 'error' }))
                })
        } else {
            addToast(() => CustomToast({ message: 'Thanh toán không hợp lệ', type: 'error' }))
        }
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

    const getRouteCount = (dueDate) => {
        return listAssign.filter((assign) => new Date(dueDate) > new Date(assign.assignDate)).length
    }

    useEffect(() => {
        getMonthRange(yearValue)
    }, [yearValue])

    useEffect(() => {
        const listTripIn = tripProcess(listRoute, companyId)
        setListTrip(listTripIn)
    }, [listRoute])

    useEffect(() => {
        getLabelandColor()
    }, [listTrip])

    useEffect(() => {}, [monthValue, yearValue])

    useEffect(() => {
        getData()
        verifyPaymentStatus()
    }, [])

    return (
        <div>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <Tabs
                className="tabStyle"
                selectedIndex={activeTab}
                onSelect={(index) => setActiveTab(index)}
            >
                <TabList>
                    <Tab>Thống kê doanh số</Tab>
                    <Tab>Phí dịch vụ</Tab>
                </TabList>
                <TabPanel className="px-3">
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
                    <CRow className="justify-content-center align-items-center gap-3 mt-3">
                        <CCol md={3}>
                            <div>
                                <div className="text-center">
                                    <b style={{ fontSize: '20px' }}>{`${100} vé`}</b>
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
                                        <CTableHeaderCell scope="col">Tuyến</CTableHeaderCell>
                                        <CTableHeaderCell
                                            scope="col"
                                            align="center"
                                            className="text-center"
                                        >
                                            Số vé
                                        </CTableHeaderCell>
                                        <CTableHeaderCell
                                            scope="col"
                                            align="center"
                                            className="text-center"
                                        >
                                            Tổng tiền
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
                                            <CTableDataCell align="center" className="text-center">
                                                {chartData.data[index]}
                                            </CTableDataCell>
                                            <CTableDataCell align="center" className="text-center">
                                                {chartData.data[index] * 36}
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
                                        <CTableDataCell align="center" className="text-center">
                                            <b>1000</b>
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableHeaderCell scope="row">#2</CTableHeaderCell>
                                        <CTableDataCell colSpan={2}>
                                            <b>
                                                <i>Phí dịch vụ - 10%</i>
                                            </b>
                                        </CTableDataCell>
                                        <CTableDataCell align="center" className="text-center">
                                            <b>10</b>
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableHeaderCell scope="row">$</CTableHeaderCell>
                                        <CTableDataCell colSpan={2}>
                                            <div className="d-flex justify-content-between">
                                                <b style={{ color: 'red' }}>
                                                    <i>Tổng chi</i>
                                                </b>
                                                <i style={{ color: 'grey' }}>Chưa thanh toán</i>
                                                <i style={{ color: 'green' }}>Đã thanh toán</i>
                                            </div>
                                        </CTableDataCell>
                                        <CTableDataCell
                                            align="center"
                                            className="text-center"
                                            active
                                        >
                                            <b>990</b>
                                        </CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                            </CTable>
                        </CCol>
                    </CRow>
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
                                <CTableHeaderCell scope="col" colSpan={3} className="text-center">
                                    Kỳ hạn
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
                                <CTableHeaderCell scope="col" className="text-center">
                                    Ngày đến hạn
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {listCompanyServiceFee
                                .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
                                .map((fee, index) => (
                                    <CTableRow key={index}>
                                        <CTableHeaderCell
                                            scope="row"
                                            className="text-center align-middle"
                                            align="center"
                                        >
                                            {index + 2}
                                        </CTableHeaderCell>
                                        <CTableDataCell className="text-center align-middle">
                                            {format(
                                                addDays(new Date(fee.dueDate), 1),
                                                'dd/MM/yyyy',
                                            )}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center align-middle">
                                            {getNextDueDay(fee.dueDate)}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center align-middle">
                                            {convertToDisplayDate(fee.dueDate)}
                                            {fee.status === 'Chờ thanh toán' && (
                                                <>
                                                    <br></br>
                                                    <i>
                                                        <small
                                                            style={{
                                                                color: getDueState(fee.dueDate)
                                                                    .color,
                                                            }}
                                                        >
                                                            {getDueState(fee.dueDate).message}
                                                        </small>
                                                    </i>
                                                </>
                                            )}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center align-middle">
                                            {getRouteCount(fee.dueDate)}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center align-middle">
                                            {fee.fee.toLocaleString()}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center align-middle">
                                            {fee.status}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center align-middle">
                                            {'Đang cập nhật'}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center align-middle">
                                            {fee.status === 'Chờ thanh toán' && (
                                                <CButton
                                                    variant="outline"
                                                    onClick={() => handlePay(fee.id)}
                                                >
                                                    Thanh toán
                                                </CButton>
                                            )}
                                            {fee.status === 'Đã thanh toán' && (
                                                <CButton
                                                    variant="outline"
                                                    onClick={() => {}}
                                                    color="success"
                                                >
                                                    Chi tiết giao dịch
                                                </CButton>
                                            )}
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            <CTableRow>
                                <CTableHeaderCell
                                    scope="row"
                                    className="text-center align-middle"
                                    align="center"
                                >
                                    {1}
                                </CTableHeaderCell>
                                <CTableDataCell className="text-center align-middle" align="center">
                                    {convertToDisplayDate(format(startTime, 'yyyy-MM-dd'))}
                                </CTableDataCell>
                                <CTableDataCell className="text-center align-middle" align="center">
                                    {format(addDays(startTime, 14), 'dd/MM/yyyy')}
                                </CTableDataCell>
                                <CTableDataCell className="text-center" align="center">
                                    {'---'}
                                </CTableDataCell>
                                <CTableDataCell className="text-center" align="center">
                                    {listTrip.length}
                                </CTableDataCell>
                                <CTableDataCell
                                    className="text-center"
                                    align="center"
                                >{`Miễn phí`}</CTableDataCell>
                                <CTableDataCell
                                    className="text-center"
                                    align="center"
                                >{`---`}</CTableDataCell>
                                <CTableDataCell className="text-center" align="center">
                                    {'---'}
                                </CTableDataCell>
                                <CTableDataCell className="text-center" align="center">
                                    {'---'}
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Expense
