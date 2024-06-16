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
import { selectCurrentMonthStatistics } from 'src/feature/statistics/statistics.slice'
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

const Dashboard = () => {
    const dispatch = useDispatch()
    const monthStatistic = useSelector(selectCurrentMonthStatistics)
    const today = new Date()
    const [timeOption, setTimeOption] = useState('month')

    //Chart 1
    const [yearValue, setYearValue] = useState(today.getFullYear())
    const [monthRange, setMonthRange] = useState({
        start: today.getFullYear() == 2023 ? 8 : 0,
        end: today.getMonth(),
    })
    const [chartData, setChartData] = useState({
        labels: [],
        backGroundColor: [],
        data: [],
    })
    const [chartOption, setChartOption] = useState('revenue')

    //Chart 2
    const [yearValue2, setYearValue2] = useState(today.getFullYear())
    const [monthValue, setMonthValue] = useState(today.getMonth())
    const [dayRange, setDayRange] = useState({
        start: 1,
        end: today.getDate(),
    })
    const [monthRange2, setMonthRange2] = useState({
        start: today.getFullYear() == 2023 ? 8 : 0,
        end: today.getMonth(),
    })
    const [chartOption2, setChartOption2] = useState('revenue')
    const [currentMonthStatic, setCurrentMonthStatic] = useState([])

    //Chart 3
    const [yearValue3, setYearValue3] = useState(today.getFullYear())
    const [monthValue3, setMonthValue3] = useState(today.getMonth())
    const [monthRange3, setMonthRange3] = useState({
        start: today.getFullYear() == 2023 ? 8 : 0,
        end: today.getMonth(),
    })
    const [currentMonthStatic3, setCurrentMonthStatic3] = useState([])
    const [reloadCount, setReloadCount] = useState(false)
    const [sortResult, setSortResult] = useState([])
    const sortSum = useRef(0)
    const listRoute = useSelector(selectListRoute)
    const listTrip = listRoute.map((route) => route.trips)
    const listCompany = useSelector(selectListCompany)
    const listAssign = useSelector(selectListAssign)
    //Chart 1 Process
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

    //Chart 2 process
    const getMonthRange2 = (year) => {
        if (2023 == year) {
            setMonthRange2({
                start: 8,
                end: today.getFullYear() === year ? today.getMonth() : 11,
            })
        } else {
            setMonthRange2({
                start: 0,
                end: today.getFullYear() === year ? today.getMonth() : 11,
            })
        }
    }
    const getLastDate = (year, month) => {
        const nextMonth = new Date(year, month + 1, 1)
        const lastDayOfMonth = new Date(nextMonth - 1)
        return lastDayOfMonth.getDate()
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
    const handleYearChoose2 = (value) => {
        setYearValue2(value)
        getMonthRange2(value)
    }
    const handleMonthChoose = (value) => {
        setMonthValue(value)
        dispatch(statisticsThunk.getStatistics({ year: yearValue2, month: value }))
            .unwrap()
            .then((res) => {
                setCurrentMonthStatic(res)
            })
            .catch(() => {})
        getDayRange(yearValue2, value)
    }

    //Chart 3 Process
    const getMonthRange3 = (year) => {
        if (2023 == year) {
            setMonthRange3({
                start: 8,
                end: today.getFullYear() === year ? today.getMonth() : 11,
            })
        } else {
            setMonthRange3({
                start: 0,
                end: today.getFullYear() === year ? today.getMonth() : 11,
            })
        }
    }
    const handleYearChoose3 = (value) => {
        setYearValue3(value)
        getMonthRange3(value)
    }
    const handleMonthChoose3 = (value) => {
        setMonthValue3(value)
        dispatch(statisticsThunk.getStatisticsTrip({ year: yearValue3, month: value }))
            .unwrap()
            .then((res) => {
                setCurrentMonthStatic3(res)
                setReloadCount(true)
            })
            .catch(() => {})
    }
    const getTripInfor = (tripId) => {
        var tempItem = null
        for (let i = 0; i < listTrip.length; i++) {
            tempItem = listTrip[i].find((trip) => trip.id == tripId)
            if (tempItem) return getTripJourney(tempItem)
        }
        if (!tempItem) return 'Đang xác định'
    }
    const getTripStaticCount = () => {
        var result = []
        var curItem = null
        var index = 0
        currentMonthStatic3.forEach((data) => {
            if (data.statisticTickets.length > 0) {
                data.statisticTickets.forEach((data2) => {
                    curItem = result.find((dt) => dt.tripId == data2.tripId)
                    if (curItem) {
                        index = result.findIndex((item) => item.tripId == curItem.tripId)
                        result[index] = {
                            tripId: curItem.tripId,
                            tickets: curItem.tickets + data2.tickets,
                        }
                    } else {
                        result.push({
                            tripId: data2.tripId,
                            tickets: data2.tickets,
                        })
                    }
                })
            }
        })
        result.sort((a, b) => b.tickets - a.tickets)
        if (result.length === 0) sortSum.current = 1
        else sortSum.current = result.reduce((sum, item) => sum + item.tickets, 0)
        setSortResult(result)
    }

    const getSortResultTotal = () => {
        return sortResult.reduce((sum, item) => sum + item.tickets, 0)
    }
    const getRandomColor = () => {
        return COLOR[Math.floor(Math.random() * (COLOR.length - 1))]
    }
    const randomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }
    const getLabelandColor = () => {
        const labels = []
        const data = []
        const backGroundColor = []
        listRoute.forEach((route) => {
            labels.push(`${getRouteJourney(route)}`)
            //get random number
            data.push(Math.floor(Math.random() * 100) + 1)
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
        setChartData({
            labels: labels.slice(0, 5),
            data: data.slice(0, 5),
            backGroundColor: backGroundColor.slice(0, 5),
        })
    }

    useEffect(() => {
        dispatch(statisticsThunk.getTodayStatistics())
            .unwrap()
            .then(() => {})
            .catch(() => {})
        dispatch(statisticsThunk.getCurrentMonthStatistics())
            .unwrap()
            .then(() => {})
            .catch(() => {})
        dispatch(statisticsThunk.getStatistics({ year: yearValue2, month: monthValue }))
            .unwrap()
            .then((res) => {
                setCurrentMonthStatic(res)
            })
            .catch(() => {})
        dispatch(statisticsThunk.getStatisticsTrip({ year: yearValue3, month: monthValue3 }))
            .unwrap()
            .then((res) => {
                setCurrentMonthStatic3(res)
                setReloadCount(true)
            })
            .catch(() => {})
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
        if (reloadCount === true) {
            getTripStaticCount()
            setReloadCount(false)
        }
    }, [reloadCount])
    useEffect(() => {
        dispatch(statisticsThunk.getCurrentMonthStatistics(yearValue))
            .unwrap()
            .then(() => {})
            .catch(() => {})
    }, [yearValue])
    useEffect(() => {
        handleMonthChoose(monthRange2.end)
    }, [yearValue2])
    useEffect(() => {
        handleMonthChoose3(monthRange3.end)
    }, [yearValue3])
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
    }, [])
    useEffect(() => {
        getLabelandColor()
    }, [listRoute])
    return (
        <>
            <StatisticsWidget />
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
                                            monthRange2.start,
                                            monthRange2.end + 1,
                                        ).map((month, index) => (
                                            <option value={monthRange2.start + index} key={index}>
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
                                <CButton
                                    color="outline-secondary"
                                    className="mx-0"
                                    active={timeOption === 'year'}
                                    onClick={() => setTimeOption('year')}
                                >
                                    {'Năm'}
                                </CButton>
                            </CButtonGroup>
                        </CCol>
                    </CRow>
                    <CRow className="align-items-center">
                        <CCol md="4">
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
                        </CCol>
                        <CCol md="8">
                            {timeOption === 'month' && (
                                <CChartLine
                                    style={{ height: '300px', marginTop: '40px' }}
                                    data={{
                                        labels: MONTH_IN_YEAR.slice(
                                            monthRange.start,
                                            monthRange.end + 1,
                                        ),
                                        datasets: [
                                            {
                                                label:
                                                    chartOption === 'ticket'
                                                        ? 'Số vé'
                                                        : 'Doanh thu',
                                                backgroundColor: hexToRgba(
                                                    getStyle('--cui-info'),
                                                    10,
                                                ),
                                                borderColor:
                                                    chartOption === 'ticket'
                                                        ? getStyle('--cui-info')
                                                        : getStyle('--cui-success'),
                                                pointHoverBackgroundColor: getStyle('--cui-info'),
                                                pointBackgroundColor: 'red',
                                                pointBorderColor: '#fff',
                                                borderWidth: 2,
                                                data: monthStatistic
                                                    .slice(monthRange.start, monthRange.end + 1)
                                                    .map((data) =>
                                                        chartOption === 'ticket'
                                                            ? data.tickets
                                                            : data.revenue,
                                                    ),
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
                            )}
                            {timeOption === 'day' && (
                                <CChart
                                    type="bar"
                                    style={{ height: '300px', marginTop: '40px' }}
                                    data={{
                                        labels: currentMonthStatic
                                            .slice(dayRange.start - 1, dayRange.end)
                                            .map((data) =>
                                                format(
                                                    parse(data.date, 'yyyy-MM-dd', new Date()),
                                                    'dd/MM',
                                                ),
                                            ),
                                        datasets: [
                                            {
                                                label:
                                                    chartOption2 === 'ticket'
                                                        ? 'Số vé'
                                                        : 'Doanh thu',
                                                backgroundColor: hexToRgba(
                                                    getStyle('--cui-info'),
                                                    10,
                                                ),
                                                borderColor:
                                                    chartOption2 === 'ticket'
                                                        ? getStyle('--cui-info')
                                                        : getStyle('--cui-success'),
                                                pointHoverBackgroundColor: getStyle('--cui-info'),
                                                pointBackgroundColor: 'red',
                                                pointBorderColor: '#fff',
                                                borderWidth: 2,
                                                data: currentMonthStatic
                                                    .slice(dayRange.start - 1, dayRange.end)
                                                    .map((data) =>
                                                        chartOption2 === 'ticket'
                                                            ? data.tickets
                                                            : data.revenue,
                                                    ),
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
                            )}
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            {/* <CCard className="mb-4">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 id="traffic" className="card-title mb-0">
                                Doanh số theo ngày
                            </h4>
                            <CRow>
                                <CFormSelect
                                    value={yearValue2}
                                    className="mt-3 mb-3 col-sm-2"
                                    onChange={(e) => handleYearChoose2(parseInt(e.target.value))}
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
                                <CFormSelect
                                    value={monthValue}
                                    className="mt-1 mb-3 col-sm-3"
                                    onChange={(e) => handleMonthChoose(parseInt(e.target.value))}
                                >
                                    <option value="-1" disabled>
                                        Chọn tháng
                                    </option>
                                    {MONTH_IN_YEAR.slice(
                                        monthRange2.start,
                                        monthRange2.end + 1,
                                    ).map((month, index) => (
                                        <option value={monthRange2.start + index} key={index}>
                                            {month}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CRow>
                            <div className="text-medium-emphasis">{`${dayRange.start} - ${
                                dayRange.end
                            }/${monthValue + 1}/${yearValue2}`}</div>
                        </CCol>
                        <CCol sm={7} className="d-none d-md-block">
                            <CButton color="primary" className="float-end">
                                <CIcon icon={cilCloudDownload} />
                            </CButton>
                            <CButtonGroup className="float-end me-3">
                                <CButton
                                    color="outline-secondary"
                                    className="mx-0"
                                    active={chartOption2 === 'ticket'}
                                    onClick={() => setChartOption2('ticket')}
                                >
                                    {'Số vé'}
                                </CButton>
                                <CButton
                                    color="outline-secondary"
                                    className="mx-0"
                                    active={chartOption2 === 'revenue'}
                                    onClick={() => setChartOption2('revenue')}
                                >
                                    {'Doanh thu'}
                                </CButton>
                            </CButtonGroup>
                        </CCol>
                    </CRow>
                    <CChart
                        type="bar"
                        style={{ height: '300px', marginTop: '40px' }}
                        data={{
                            labels: currentMonthStatic
                                .slice(dayRange.start - 1, dayRange.end)
                                .map((data) =>
                                    format(parse(data.date, 'yyyy-MM-dd', new Date()), 'dd/MM'),
                                ),
                            datasets: [
                                {
                                    label: chartOption2 === 'ticket' ? 'Số vé' : 'Doanh thu',
                                    backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                                    borderColor:
                                        chartOption2 === 'ticket'
                                            ? getStyle('--cui-info')
                                            : getStyle('--cui-success'),
                                    pointHoverBackgroundColor: getStyle('--cui-info'),
                                    pointBackgroundColor: 'red',
                                    pointBorderColor: '#fff',
                                    borderWidth: 2,
                                    data: currentMonthStatic
                                        .slice(dayRange.start - 1, dayRange.end)
                                        .map((data) =>
                                            chartOption2 === 'ticket' ? data.tickets : data.revenue,
                                        ),
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
                </CCardBody>
            </CCard> */}
            {/* <CCard className="mb-4">
                <CCardBody>
                    <CRow>
                        <CCol sm={5}>
                            <h4 id="traffic" className="card-title mb-0">
                                Đặt nhiều nhất
                            </h4>
                            <CRow>
                                <CFormSelect
                                    value={yearValue3}
                                    className="mt-3 mb-3 col-sm-2"
                                    onChange={(e) => handleYearChoose3(parseInt(e.target.value))}
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
                                <CFormSelect
                                    value={monthValue3}
                                    className="mt-1 mb-3 col-sm-3"
                                    onChange={(e) => handleMonthChoose3(parseInt(e.target.value))}
                                >
                                    <option value="-1" disabled>
                                        Chọn tháng
                                    </option>
                                    {MONTH_IN_YEAR.slice(
                                        monthRange3.start,
                                        monthRange3.end + 1,
                                    ).map((month, index) => (
                                        <option value={monthRange3.start + index} key={index}>
                                            {month}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CRow>
                            <div className="small text-medium-emphasis">{`${MONTH_IN_YEAR[monthValue3]} - ${yearValue3}`}</div>
                        </CCol>
                        <CCol sm={7} className="d-none d-md-block">
                            <CButton color="primary" className="float-end">
                                <CIcon icon={cilCloudDownload} />
                            </CButton>
                        </CCol>
                    </CRow>
                    <CRow className="justify-content-center">
                        {sortResult.length > 0 &&
                            sortResult.slice(0, 5).map((result, index) => (
                                <CCol md="4" key={result.tripId}>
                                    <CWidgetStatsB
                                        className="mb-4"
                                        progress={{
                                            color: COLOR[index],
                                            value: (result.tickets / sortSum.current) * 100,
                                        }}
                                        text={`${result.tickets} vé`}
                                        title={getTripInfor(result.tripId)}
                                        value={`${(
                                            (result.tickets / sortSum.current) *
                                            100
                                        ).toFixed(2)}%`}
                                    />
                                </CCol>
                            ))}
                        {sortResult.length === 0 && <span>Chưa có lượt đặt vé</span>}
                    </CRow>
                </CCardBody>
            </CCard> */}
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
                                <b style={{ fontSize: '20px' }}>3289534572</b>
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
                                    <small> 50k đã bán</small>
                                </div>
                                <CProgress color={getRandomColor()} value={50} thin></CProgress>
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
                                        <div className="fw-semibold">{50}%</div>
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
                                    <CProgress thin color={getRandomColor()} value={50} />
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <div className="small text-body-secondary text-nowrap">
                                        123 đánh giá
                                    </div>
                                    <div className="fw-semibold text-nowrap">
                                        {' 3/5 '}
                                        <CIcon icon={cilStar} style={{ color: '#c4c41f' }}></CIcon>
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
