import React, { useRef } from 'react'

import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CFormSelect,
    CProgress,
    CProgressBar,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTooltip,
    CWidgetStatsB,
} from '@coreui/react'
import { CChartLine, CChart } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
    cibGoogle,
    cibFacebook,
    cibLinkedin,
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs,
    cibTwitter,
    cilCloudDownload,
    cilPeople,
    cilUser,
    cilUserFemale,
    cilMap,
    cilGarage,
    cilMobileLandscape,
    cilCursor,
    cilStar,
} from '@coreui/icons'

import StatisticsWidget from './StatisticsWidget'
import stationThunk from 'src/feature/station/station.service'
import {
    selectCurrentMonthStatistics,
    selectListReview,
} from 'src/feature/statistics/statistics.slice'
import { MONTH_IN_YEAR } from 'src/utils/constants'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import statisticsThunk from 'src/feature/statistics/statistics.service'
import { parse, format } from 'date-fns'
import routeThunk from 'src/feature/route/route.service'
import { selectListRoute } from 'src/feature/route/route.slice'
import { getRouteJourney, getTripJourney } from 'src/utils/tripUtils'
import { COLOR } from 'src/utils/constants'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import { selectListAssign, selectListCompany } from 'src/feature/bus-company/busCompany.slice'
import userMale from 'src/assets/images/avatars/male.svg'
import userFemale from 'src/assets/images/avatars/female.svg'
import { convertToDisplayDate } from 'src/utils/convertUtils'
import { selectListOnlineTicket } from 'src/feature/statistics/statistics.slice'
import { selectListTicketCountByCompany } from 'src/feature/statistics/statistics.slice'
import { selectListTicketCountByRoute } from 'src/feature/statistics/statistics.slice'

const Dashboard = () => {
    const dispatch = useDispatch()
    const today = new Date()
    const [timeOption, setTimeOption] = useState('day')
    const [yearValue, setYearValue] = useState(today.getFullYear())
    const [monthValue, setMonthValue] = useState(today.getMonth())

    const [monthRange, setMonthRange] = useState({
        start: today.getFullYear() == 2023 ? 8 : 0,
        end: today.getMonth(),
    })
    const [dayRange, setDayRange] = useState({
        start: 1,
        end: today.getDate(),
    })
    const [yearRange, setYearRange] = useState({
        start: 2023,
        end: today.getFullYear(),
    })

    const [chartData, setChartData] = useState({
        labels: [],
        backGroundColor: [],
        data: [],
    })
    const [currentStatic, setCurrentStatic] = useState({
        label: [],
        data: [],
    })
    const listRoute = useSelector(selectListRoute)
    const listTrip = listRoute.map((route) => route.trips)
    const listCompany = useSelector(selectListCompany)
    const listAssign = useSelector(selectListAssign)
    const listOnlineTicket = useSelector(selectListOnlineTicket)
    const listTicketCountByRoute = useSelector(selectListTicketCountByRoute)
    const listTicketCountByCompany = useSelector(selectListTicketCountByCompany)
    const listReview = useSelector(selectListReview)
    const handleYearChoose = (e) => {
        setYearValue(e)
        getMonthRange(e)
    }
    const getYearRange = () => {
        var year = []
        const startYear = 2023
        for (let i = startYear; i <= today.getFullYear(); i++) {
            year.push(i)
        }
        return year
    }
    const getMonthRange = (year) => {
        if (2023 === year) {
            setMonthRange({
                start: 8,
                end: today.getFullYear() === year ? today.getMonth() : 11,
            })
        } else {
            setMonthRange({
                start: 0,
                end: today.getFullYear() === year ? today.getMonth() : 11,
            })
        }
    }

    const handleMonthChoose = (value) => {
        setMonthValue(value)
        getDayRange(yearValue, value)
    }

    const getDayRange = (year, month) => {
        if (year == today.getFullYear()) {
            if (month == today.getMonth())
                setDayRange({
                    start: 1,
                    end: today.getDate(),
                })
            else {
                setDayRange({
                    start: 1,
                    end: getLastDate(year, month),
                })
            }
        } else
            setDayRange({
                start: 1,
                end: getLastDate(year, month),
            })
    }

    const getLastDate = (year, month) => {
        const nextMonth = new Date(year, month + 1, 1)
        const lastDayOfMonth = new Date(nextMonth - 1)
        return lastDayOfMonth.getDate()
    }

    const getTripInfor = (tripId) => {
        var tempItem = null
        for (let i = 0; i < listTrip.length; i++) {
            tempItem = listTrip[i].find((trip) => trip.id == tripId)
            if (tempItem) return getTripJourney(tempItem)
        }
        if (!tempItem) return 'Đang xác định'
    }

    const getRandomColor = () => {
        return COLOR[Math.floor(Math.random() * (COLOR.length - 1))]
    }
    const randomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }
    const getMonthlyTicketForRoute = (routeId) => {
        return listOnlineTicket.reduce((sum, item) => {
            return item.ticKets.filter((tk) => tk.booking.trip.route.id === routeId).length + sum
        }, 0)
    }
    const getLabelandColor = () => {
        const labels = []
        const data = []
        const backGroundColor = []
        listRoute.forEach((route) => {
            labels.push(`${getRouteJourney(route)}`)
            data.push(getMonthlyTicketForRoute(route.id))
            backGroundColor.push(randomColor())
        })
        //sort list base on data desc
        for (let i = 0; i < data.length; i++) {
            for (let j = i + 1; j < data.length; j++) {
                if (data[i] < data[j]) {
                    let temp = data[i]
                    data[i] = data[j]
                    data[j] = temp
                    temp = labels[i]
                    labels[i] = labels[j]
                    labels[j] = temp
                    temp = backGroundColor[i]
                    backGroundColor[i] = backGroundColor[j]
                    backGroundColor[j] = temp
                }
            }
        }
        let sliceIndex = data.findIndex((dt) => dt == 0)
        if (sliceIndex > 4) sliceIndex = 4
        setChartData({
            labels: labels.slice(0, sliceIndex),
            data: data.slice(0, sliceIndex),
            backGroundColor: backGroundColor.slice(0, sliceIndex),
        })
    }

    const updateBarChartData = () => {
        const statisticData = {
            label: [],
            data: [],
        }
        if (timeOption === 'day') {
            for (let i = dayRange.start; i <= dayRange.end; i++) {
                statisticData.label.push(`${i}/${monthValue + 1}`)
                statisticData.data.push(
                    listOnlineTicket.reduce((sum, item) => {
                        return (
                            sum +
                            item.ticKets.filter((tk) => {
                                const date = new Date(tk.booking.bookingDate)
                                return (
                                    date.getDate() === i &&
                                    date.getMonth() === monthValue &&
                                    date.getFullYear() === yearValue
                                )
                            }).length
                        )
                    }, 0),
                )
            }
        } else {
            for (let i = monthRange.start; i <= monthRange.end; i++) {
                statisticData.label.push(`${MONTH_IN_YEAR[i]}`)
                statisticData.data.push(
                    listOnlineTicket.reduce((sum, item) => {
                        return (
                            sum +
                            item.ticKets.filter((tk) => {
                                const date = new Date(tk.booking.bookingDate)
                                return date.getMonth() === i && date.getFullYear() === yearValue
                            }).length
                        )
                    }, 0),
                )
            }
        }
        setCurrentStatic(statisticData)
    }
    const getCompanyAverageRate = (company) => {
        const listRv = listReview.filter(
            (rv) => rv.scheduleTrip.busCompany.id === company.busCompany.id,
        )
        if (listRv.length > 0)
            return (
                listRv.reduce((sum, item) => {
                    return sum + item.rate
                }, 0) / listRv.length
            )
        else return 0
    }

    useEffect(() => {
        if (listRoute.length === 0) {
            dispatch(routeThunk.getRoute())
                .unwrap()
                .then(() => {
                    getLabelandColor()
                })
                .catch(() => {})
        }
    }, [])
    useEffect(() => {
        setMonthValue(monthRange.end)
    }, [yearValue])
    useEffect(() => {
        dispatch(companyThunk.getCompany())
            .unwrap()
            .then(() => {})
            .catch(() => {})
        dispatch(companyThunk.getAssignedRouteForCompany())
            .unwrap()
            .then(() => {})
            .catch(() => {})
        dispatch(routeThunk.getRoute())
            .unwrap()
            .then(() => {})
            .catch(() => {})
        dispatch(statisticsThunk.getAllReview()).unwrap().then().catch()
        dispatch(statisticsThunk.countTicketByCompany()).unwrap().then().catch()
        dispatch(statisticsThunk.countTicketByRoute()).unwrap().then().catch()
    }, [])
    useEffect(() => {
        dispatch(
            statisticsThunk.getOnlineTicket({
                month: monthValue + 1,
                year: yearValue,
            }),
        )
            .unwrap()
            .then()
            .catch()
    }, [listRoute, monthValue, yearValue])

    useEffect(() => {
        getLabelandColor()
        updateBarChartData()
    }, [timeOption, listOnlineTicket])
    return (
        <>
            {/* <StatisticsWidget /> */}
            <CCard className="mb-4">
                <CCardBody>
                    <CRow className="mb-3">
                        <h4 id="traffic" className="card-title mb-0">
                            Số vé bán ra
                        </h4>
                        <CCol sm={6}>
                            <div className="d-flex gap-1 align-items-center my-2">
                                {(timeOption === 'month' || timeOption === 'day') && (
                                    <CFormSelect
                                        value={yearValue}
                                        onChange={(e) => handleYearChoose(parseInt(e.target.value))}
                                    >
                                        {getYearRange().map((year) => (
                                            <option value={year} key={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                )}
                                {timeOption === 'day' && (
                                    <CFormSelect
                                        value={monthValue}
                                        onChange={(e) =>
                                            handleMonthChoose(parseInt(e.target.value))
                                        }
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
                                )}
                            </div>
                            <div className="small text-medium-emphasis">{`${
                                MONTH_IN_YEAR[monthRange.start]
                            } - ${MONTH_IN_YEAR[monthRange.end]} ${yearValue}`}</div>
                        </CCol>
                        <CCol sm={6} className="d-none d-md-block">
                            {/* <CButton color="primary" className="float-end">
                                <CIcon icon={cilCloudDownload} />
                            </CButton> */}
                            <CButtonGroup className="float-end me-3">
                                <CButton
                                    color="outline-secondary"
                                    className="mx-0"
                                    active={timeOption === 'day'}
                                    onClick={() => setTimeOption('day')}
                                >
                                    {'Ngày'}
                                </CButton>
                                <CButton
                                    color="outline-secondary"
                                    className="mx-0"
                                    active={timeOption === 'month'}
                                    onClick={() => setTimeOption('month')}
                                >
                                    {'Tháng'}
                                </CButton>
                            </CButtonGroup>
                        </CCol>
                    </CRow>
                    <CRow className="align-items-center">
                        <CCol md="4">
                            {chartData && (
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
                            )}
                        </CCol>
                        <CCol md="8">
                            <CChart
                                type="bar"
                                style={{ height: '300px', marginTop: '40px' }}
                                data={{
                                    labels: currentStatic.label,
                                    datasets: [
                                        {
                                            label: 'Số vé',
                                            backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                                            borderColor: getStyle('--cui-success'),
                                            pointHoverBackgroundColor: getStyle('--cui-info'),
                                            pointBackgroundColor: 'red',
                                            pointBorderColor: '#fff',
                                            borderWidth: 2,
                                            data: currentStatic.data,
                                            fill: true,
                                        },
                                    ],
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                        },
                                    },
                                    scales: {
                                        x: {
                                            grid: {
                                                drawOnChartArea: false,
                                            },
                                        },
                                        y: {
                                            ticks: {
                                                beginAtZero: true,
                                                maxTicksLimit: 5,
                                                stepSize: Math.ceil(250 / 5),
                                                max: 250,
                                            },
                                        },
                                    },
                                    elements: {
                                        line: {
                                            tension: 0.4,
                                        },
                                        point: {
                                            radius: 0,
                                            hitRadius: 10,
                                            hoverRadius: 4,
                                            hoverBorderWidth: 3,
                                        },
                                    },
                                }}
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <CCard>
                <CCardHeader>
                    <b>Tổng thống kê</b>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol
                            sm={3}
                            className="d-flex justify-content-start gap-3 align-items-center border-start border-start-4 border-start-info px-3 mb-3"
                        >
                            <CIcon icon={cilMap} size="3xl"></CIcon>
                            <div>
                                <b style={{ fontSize: '16px', fontWeight: '600' }}>
                                    Tổng số tuyến xe
                                </b>
                                <br></br>
                                <b style={{ fontSize: '20px' }}>{listRoute.length}</b>
                            </div>
                        </CCol>
                        <CCol
                            sm={3}
                            className="d-flex justify-content-start gap-3 align-items-center border-start border-start-4 border-start-danger px-3 mb-3"
                        >
                            <CIcon icon={cilGarage} size="3xl"></CIcon>
                            <div>
                                <b style={{ fontSize: '16px', fontWeight: '600' }}>
                                    Số nhà xe cộng tác
                                </b>
                                <br></br>
                                <b style={{ fontSize: '20px' }}>{listCompany.length}</b>
                            </div>
                        </CCol>
                        <CCol
                            sm={3}
                            className="d-flex justify-content-start gap-3 align-items-center border-start border-start-4 border-start-success px-3 mb-3"
                        >
                            <CIcon icon={cilMobileLandscape} size="3xl"></CIcon>
                            <div>
                                <b style={{ fontSize: '16px', fontWeight: '600' }}>Số vé đã bán</b>
                                <br></br>
                                <b style={{ fontSize: '20px' }}>
                                    {listTicketCountByCompany.reduce((sum, item) => {
                                        return sum + item.count
                                    }, 0)}
                                </b>
                            </div>
                        </CCol>
                        <CCol
                            sm={3}
                            className="d-flex justify-content-start gap-3 align-items-center border-start border-start-4 border-start-warning px-3 mb-3"
                        >
                            <CIcon icon={cilUser} size="3xl"></CIcon>
                            <div>
                                <b style={{ fontSize: '16px', fontWeight: '600' }}>Số khách hàng</b>
                                <br></br>
                                <b style={{ fontSize: '20px' }}>12345</b>
                            </div>
                        </CCol>
                    </CRow>
                </CCardBody>
                <CRow className="mx-0 justify-content-center gap-4">
                    {listRoute.map((route, index) => (
                        <CCol sm={5} className="d-flex gap-1 align-items-center mb-2" key={index}>
                            <div className="col-4">
                                <CIcon icon={cilCursor} color="dark"></CIcon>
                                <strong>
                                    <i>{getRouteJourney(route)}</i>
                                </strong>
                            </div>
                            <div className="col-8">
                                <div className="d-flex w-100 justify-content-between">
                                    <small>
                                        {`${
                                            listAssign.filter((item) => item.routeId === route.id)
                                                .length
                                        } nhà xe`}
                                    </small>
                                    <small>
                                        {`${
                                            listTicketCountByRoute.find(
                                                (item) => item.route.id === route.id,
                                            )?.count
                                        } đã bán`}
                                    </small>
                                </div>
                                <CProgress
                                    color={getRandomColor()}
                                    value={(
                                        (listTicketCountByRoute.find(
                                            (item) => item.route.id === route.id,
                                        )?.count /
                                            listTicketCountByRoute.reduce((sum, item) => {
                                                return sum + item.count
                                            }, 0)) *
                                        100
                                    ).toFixed(2)}
                                    thin
                                ></CProgress>
                            </div>
                        </CCol>
                    ))}
                    {listRoute.length % 2 === 1 && (
                        <CCol sm={5} className="d-flex gap-1 align-items-center mb-4"></CCol>
                    )}
                </CRow>
                <CTable align="middle" className="mt-3 mb-0 border" hover responsive>
                    <CTableHead className="text-nowrap">
                        <CTableRow>
                            <CTableHeaderCell className="bg-body-tertiary text-center">
                                Admin
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary">Nhà xe</CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary">
                                Địa chỉ
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary">Đã bán</CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary text-center">
                                Đánh giá
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {listCompany.map((company, index) => (
                            <CTableRow v-for="item in tableItems" key={index}>
                                <CTableDataCell className="text-center">
                                    <CTooltip
                                        content={`${company.admin.name} - SĐT: ${company.admin.tel}`}
                                    >
                                        <CAvatar
                                            size="md"
                                            src={index % 2 == 0 ? userFemale : userMale}
                                        />
                                    </CTooltip>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{company.busCompany.name}</div>
                                    <div className="small text-body-secondary text-nowrap">
                                        <span>
                                            {new Date().getMonth() -
                                                new Date(company.busCompany.coopDay).getMonth() <
                                            2
                                                ? 'Đối tác mới'
                                                : 'Đối tác tin cậy'}
                                        </span>{' '}
                                        | Ký kết: {convertToDisplayDate(company.busCompany.coopDay)}
                                    </div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <small>{company.admin.staff.address}</small>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div className="d-flex justify-content-between text-nowrap">
                                        <div className="fw-semibold">{`${
                                            listTicketCountByCompany.find(
                                                (item) =>
                                                    item.busCompany.id === company.busCompany.id,
                                            )?.count
                                        } vé`}</div>
                                        <div className="ms-3">
                                            <small className="text-body-secondary">
                                                {`${
                                                    listAssign.filter(
                                                        (item) =>
                                                            item.busCompanyId ===
                                                            company.busCompany.id,
                                                    ).length
                                                } tuyến xe`}
                                            </small>
                                        </div>
                                    </div>
                                    <CProgress
                                        thin
                                        color={getRandomColor()}
                                        value={(
                                            (listTicketCountByCompany.find(
                                                (item) =>
                                                    item.busCompany.id === company.busCompany.id,
                                            )?.count /
                                                listTicketCountByCompany.reduce((sum, item) => {
                                                    return sum + item.count
                                                }, 0)) *
                                            100
                                        ).toFixed(2)}
                                    />
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <div className="small text-body-secondary text-nowrap">
                                        {`${
                                            listReview.filter(
                                                (rv) =>
                                                    rv.scheduleTrip.busCompany.id ===
                                                    company.busCompany.id,
                                            ).length
                                        } đánh giá`}
                                    </div>
                                    <div className="fw-semibold text-nowrap">
                                        <CIcon icon={cilStar} style={{ color: '#c4c41f' }}></CIcon>
                                        {` ${getCompanyAverageRate(company)} /5`}
                                    </div>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCard>
        </>
    )
}

export default Dashboard
