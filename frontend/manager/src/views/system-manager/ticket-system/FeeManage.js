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
} from '@coreui/react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectListRoute } from 'src/feature/route/route.slice'
import feeThunk from 'src/feature/fee/fee.service'
import { addDays, convertToDisplayDate } from 'src/utils/convertUtils'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { tripProcess } from 'src/utils/routeUtils'
import { CChart } from '@coreui/react-chartjs'
import { MONTH_IN_YEAR } from 'src/utils/constants'
import {
    companyActions,
    selectCurCompany,
    selectListCompany,
} from 'src/feature/bus-company/busCompany.slice'
import { getStyle } from '@coreui/utils'
import companyThunk from 'src/feature/bus-company/busCompany.service'

const FeeManage = () => {
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
    console.log(listCompanyServiceFee)
    return (
        <div>
            <Tabs className="tabStyle">
                <TabList>
                    <Tab>Phí dịch vụ</Tab>
                    <Tab>Phí bán vé</Tab>
                </TabList>
                <TabPanel className="px-3">
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
                                    <CTableDataCell className="text-center">
                                        34k/ngày
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
                                    <CTableDataCell className="text-center">
                                        <CDropdown variant="btn-group" key={index}>
                                            <CDropdownToggle
                                                color="secondary"
                                                size="sm"
                                            ></CDropdownToggle>
                                            <CDropdownMenu>
                                                <CDropdownItem as="button">
                                                    Ngừng dịch vụ
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
                </TabPanel>
                <TabPanel className="px-3">
                    {/* <CRow className="justify-content-center align-items-center">
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
                    </CRow> */}
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default FeeManage
