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
    CModalHeader,
    CModalBody,
    CModal,
    CFormLabel,
    CFormInput,
    CSpinner,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
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
import { addDays, convertToDisplayDate, convertToDisplayTimeStamp } from 'src/utils/convertUtils'
import { format, parse } from 'date-fns'
import { selectCurCompany, selectListAssign } from 'src/feature/bus-company/busCompany.slice'
import { selectCompanyId } from 'src/feature/auth/auth.slice'
import { selectServiceDueDate } from 'src/feature/fee/fee.slice'
import { feeAction } from 'src/feature/fee/fee.slice'
import { noticeAction } from 'src/feature/notification/notice.slice'
import { getTripJourney } from 'src/utils/tripUtils'
import statisticsThunk from 'src/feature/statistics/statistics.service'
import { selectListOnlineTicket } from 'src/feature/statistics/statistics.slice'
import { reverseString } from 'src/utils/tripUtils'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const publicStripe = process.env.REACT_APP_STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(publicStripe)

const SaleData = () => {
    const dispatch = useDispatch()
    const companyId = useSelector(selectCompanyId)
    const listRoute = useSelector(selectListCompanyRoute)
    const [listTrip, setListTrip] = useState([])
    const curCompany = useSelector(selectCurCompany)
    const listAssign = useSelector(selectListAssign)
    const startTime = curCompany ? addDays(new Date(curCompany?.busCompany.coopDay), 1) : new Date()
    const today = new Date()
    const [showTransactionDetail, setShowTransactionDetail] = useState(false)
    const [currentFee, setCurrentFee] = useState(null)
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
    const [loading, setLoading] = useState(false)
    const [listCompanySchedule, setListCompanySchedule] = useState([])
    const listOnlineTicket = useSelector(selectListOnlineTicket)
    const [totalMoney, setTotalMoney] = useState('---')
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
        listTrip.map((trip) => {
            listData.push({
                tripId: trip.turnGo.id,
                tripName: getTripJourney(trip),
                listSchedule: [],
            })
            listData.push({
                tripId: trip.turnBack.id,
                tripName: reverseString(getTripJourney(trip)),
                listSchedule: [],
            })
        })
        if (listCompanySchedule)
            for (let i = 0; i < listCompanySchedule.length; i++) {
                const item = listData.findIndex(
                    (item) => item.tripId === listCompanySchedule[i].trip.id,
                )
                if (item != -1) {
                    listData[item].listSchedule.push(listCompanySchedule[i])
                }
            }
        listData.forEach((item) => {
            labels.push(item.tripName)
            //get random number
            data.push(item.listSchedule.length)
            backGroundColor.push(randomColor())
        })
        setChartData({ labels: labels, data: data, backGroundColor: backGroundColor })
    }

    const getSaleData = async () => {
        setLoading(true)
        await dispatch(
            statisticsThunk.getCompanySchedule({
                month: monthValue + 1,
                year: yearValue,
            }),
        )
            .unwrap()
            .then((res) => {
                setListCompanySchedule(
                    res.find((item) => item.busCompany.id === curCompany?.busCompany.id)?.schedules,
                )
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })

        await dispatch(statisticsThunk.getOnlineTicket({ month: monthValue + 1, year: yearValue }))
            .unwrap()
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {})
        await dispatch(feeThunk.getTicketOnlineSale({ month: monthValue + 1, year: yearValue }))
            .unwrap()
            .then((res) => {
                setTotalMoney(res)
            })
            .catch((err) => {
                console.log(err)
                setTotalMoney('---')
            })
    }

    useEffect(() => {
        getMonthRange(yearValue)
    }, [yearValue])

    useEffect(() => {
        const listTripIn = tripProcess(listRoute, companyId)
        setListTrip(listTripIn)
    }, [listRoute])

    // useEffect(() => {
    //     getLabelandColor()
    // }, [listTrip])

    useEffect(() => {
        getSaleData()
    }, [monthValue, yearValue])

    useEffect(() => {
        getLabelandColor()
    }, [listCompanySchedule])
    console.log(listCompanySchedule)
    return (
        <>
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
                                    <b
                                        style={{ fontSize: '20px' }}
                                    >{`${listCompanySchedule?.length} chuyến`}</b>
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
                                        <CTableHeaderCell
                                            style={{ verticalAlign: 'middle' }}
                                            scope="col"
                                        >
                                            STT
                                        </CTableHeaderCell>
                                        <CTableHeaderCell
                                            style={{ verticalAlign: 'middle' }}
                                            scope="col"
                                        >
                                            Tuyến
                                        </CTableHeaderCell>
                                        <CTableHeaderCell
                                            style={{ verticalAlign: 'middle' }}
                                            scope="col"
                                            align="center"
                                            className="text-center"
                                        >
                                            Số chuyến
                                        </CTableHeaderCell>
                                        <CTableHeaderCell
                                            style={{ verticalAlign: 'middle' }}
                                            scope="col"
                                            align="center"
                                            className="text-center"
                                        >
                                            Số vé online
                                        </CTableHeaderCell>
                                        <CTableHeaderCell
                                            style={{ verticalAlign: 'middle' }}
                                            scope="col"
                                            align="center"
                                            className="text-center"
                                        >
                                            Số vé offline
                                        </CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {chartData &&
                                        chartData.labels.map((label, index) => (
                                            <CTableRow key={index}>
                                                <CTableHeaderCell
                                                    style={{ verticalAlign: 'middle' }}
                                                    scope="row"
                                                >
                                                    {index + 1}
                                                </CTableHeaderCell>
                                                <CTableDataCell style={{ verticalAlign: 'middle' }}>
                                                    {label}
                                                </CTableDataCell>
                                                <CTableDataCell
                                                    style={{ verticalAlign: 'middle' }}
                                                    align="center"
                                                    className="text-center"
                                                >
                                                    {chartData.data[index]}
                                                </CTableDataCell>
                                                <CTableDataCell
                                                    style={{ verticalAlign: 'middle' }}
                                                    align="center"
                                                    className="text-center"
                                                >
                                                    {
                                                        listOnlineTicket?.ticKets?.filter(
                                                            (item) =>
                                                                getTripJourney(
                                                                    item.booking.trip,
                                                                ) === label &&
                                                                item.state == 'Đã thanh toán',
                                                        ).length
                                                    }
                                                </CTableDataCell>
                                                <CTableDataCell
                                                    style={{ verticalAlign: 'middle' }}
                                                    align="center"
                                                    className="text-center"
                                                >
                                                    {listCompanySchedule.reduce((sum, item) => {
                                                        if (getTripJourney(item.trip) === label) {
                                                            return (
                                                                sum +
                                                                item.tickets.filter(
                                                                    (tk) =>
                                                                        tk.state == 'Đã thanh toán',
                                                                ).length
                                                            )
                                                        }
                                                        return sum
                                                    }, 0) -
                                                        listOnlineTicket?.ticKets?.filter(
                                                            (item) =>
                                                                getTripJourney(
                                                                    item.booking.trip,
                                                                ) === label &&
                                                                item.state == 'Đã thanh toán',
                                                        ).length}
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))}
                                    <CTableRow>
                                        <CTableHeaderCell
                                            style={{ verticalAlign: 'middle' }}
                                            scope="row"
                                        >
                                            #1
                                        </CTableHeaderCell>
                                        <CTableDataCell
                                            style={{ verticalAlign: 'middle' }}
                                            colSpan={2}
                                        >
                                            <b>
                                                <i>Tổng tiền vé</i>
                                            </b>
                                        </CTableDataCell>
                                        <CTableDataCell
                                            style={{ verticalAlign: 'middle' }}
                                            align="center"
                                            className="text-center"
                                        >
                                            <b>
                                                {totalMoney != '---' &&
                                                    totalMoney?.ticketSales?.toLocaleString()}
                                                {totalMoney == '---' && <i>---</i>}
                                            </b>
                                        </CTableDataCell>
                                        <CTableDataCell
                                            style={{ verticalAlign: 'middle' }}
                                            align="center"
                                            className="text-center"
                                        >
                                            <b>{`${listCompanySchedule
                                                ?.reduce((sum, schd) => {
                                                    return (
                                                        sum +
                                                        schd.tickets
                                                            .filter(
                                                                (tk) =>
                                                                    tk.state == 'Đã thanh toán' &&
                                                                    !listOnlineTicket?.ticKets?.find(
                                                                        (tic) => tic.id == tk.id,
                                                                    ),
                                                            )
                                                            .reduce((sum, tk) => {
                                                                return sum + tk.ticketPrice
                                                            }, 0) +
                                                        schd.tickets
                                                            .filter(
                                                                (tk) =>
                                                                    tk.state == 'Đã hủy' &&
                                                                    tk.histories.length > 0 &&
                                                                    tk.histories.find(
                                                                        (his) =>
                                                                            his.action == 'Hủy' &&
                                                                            his.paymentMethod ==
                                                                                'Cash',
                                                                    ),
                                                            )
                                                            .reduce((sum, tk) => {
                                                                return (
                                                                    sum +
                                                                    tk.ticketPrice -
                                                                    tk.histories.find(
                                                                        (his) =>
                                                                            his.action == 'Hủy',
                                                                    )?.transaction.amount
                                                                )
                                                            }, 0)
                                                    )
                                                }, 0)
                                                .toLocaleString()}`}</b>
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableHeaderCell
                                            style={{ verticalAlign: 'middle' }}
                                            scope="row"
                                        >
                                            #2
                                        </CTableHeaderCell>
                                        <CTableDataCell
                                            style={{ verticalAlign: 'middle' }}
                                            colSpan={2}
                                        >
                                            <b>
                                                <i>Phí dịch vụ - 20%</i>
                                            </b>
                                        </CTableDataCell>
                                        <CTableDataCell
                                            style={{ verticalAlign: 'middle' }}
                                            align="center"
                                            className="text-center"
                                        >
                                            <b>
                                                {/* check type of totalMoney */}
                                                {totalMoney != '---'
                                                    ? (
                                                          (totalMoney.ticketSales * 20) /
                                                          100
                                                      ).toLocaleString()
                                                    : '---'}
                                            </b>
                                        </CTableDataCell>
                                        <CTableDataCell
                                            style={{ verticalAlign: 'middle' }}
                                            align="center"
                                            className="text-center"
                                        >
                                            <b>---</b>
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableHeaderCell
                                            style={{ verticalAlign: 'middle' }}
                                            scope="row"
                                        >
                                            $
                                        </CTableHeaderCell>
                                        <CTableDataCell
                                            style={{ verticalAlign: 'middle' }}
                                            colSpan={2}
                                        >
                                            <div className="d-flex justify-content-between">
                                                <b>
                                                    <i>Tổng doanh thu</i>
                                                </b>
                                            </div>
                                        </CTableDataCell>
                                        <CTableDataCell
                                            style={{ verticalAlign: 'middle' }}
                                            align="center"
                                            className="text-center"
                                            active
                                        >
                                            <b>
                                                {totalMoney != '---'
                                                    ? (
                                                          (totalMoney.ticketSales * 80) /
                                                          100
                                                      ).toLocaleString()
                                                    : '---'}
                                                <br></br>
                                                {totalMoney != '---' &&
                                                    (totalMoney?.systemTransaction ? (
                                                        <small style={{ color: 'green' }}>
                                                            Đã thanh toán
                                                        </small>
                                                    ) : (
                                                        <small style={{ color: 'grey' }}>
                                                            Chưa thanh toán
                                                        </small>
                                                    ))}
                                            </b>
                                        </CTableDataCell>
                                        <CTableDataCell
                                            style={{ verticalAlign: 'middle', color: 'red' }}
                                            className="text-center"
                                        >
                                            <b>
                                                {totalMoney != '---'
                                                    ? (
                                                          (totalMoney.ticketSales * 80) / 100 +
                                                          listCompanySchedule.reduce(
                                                              (sum, schd) => {
                                                                  return (
                                                                      sum +
                                                                      schd.tickets
                                                                          .filter(
                                                                              (tk) =>
                                                                                  tk.state ==
                                                                                      'Đã thanh toán' &&
                                                                                  !listOnlineTicket?.ticKets?.find(
                                                                                      (tic) =>
                                                                                          tic.id ==
                                                                                          tk.id,
                                                                                  ),
                                                                          )
                                                                          .reduce((sum, tk) => {
                                                                              return (
                                                                                  sum +
                                                                                  tk.ticketPrice
                                                                              )
                                                                          }, 0) +
                                                                      schd.tickets
                                                                          .filter(
                                                                              (tk) =>
                                                                                  tk.state ==
                                                                                      'Đã hủy' &&
                                                                                  tk.histories
                                                                                      .length > 0 &&
                                                                                  tk.histories.find(
                                                                                      (his) =>
                                                                                          his.action ==
                                                                                              'Hủy' &&
                                                                                          his.paymentMethod ==
                                                                                              'Cash',
                                                                                  ),
                                                                          )
                                                                          .reduce((sum, tk) => {
                                                                              return (
                                                                                  sum +
                                                                                  tk.ticketPrice -
                                                                                  tk.histories.find(
                                                                                      (his) =>
                                                                                          his.action ==
                                                                                          'Hủy',
                                                                                  )?.transaction
                                                                                      .amount
                                                                              )
                                                                          }, 0)
                                                                  )
                                                              },
                                                              0,
                                                          )
                                                      ).toLocaleString()
                                                    : '---'}
                                            </b>
                                        </CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                            </CTable>
                        </CCol>
                    </CRow>
                </>
            )}
        </>
    )
}

const ServiceData = ({ reload, setReload }) => {
    const dispatch = useDispatch()
    const companyId = useSelector(selectCompanyId)
    const listRoute = useSelector(selectListCompanyRoute)
    const [listTrip, setListTrip] = useState([])
    const [listCompanyServiceFee, setListCompanyServiceFee] = useState([])
    const curCompany = useSelector(selectCurCompany)
    const listAssign = useSelector(selectListAssign)
    const startTime = curCompany ? addDays(new Date(curCompany?.busCompany.coopDay), 1) : new Date()
    const today = new Date()
    const [showTransactionDetail, setShowTransactionDetail] = useState(false)
    const [currentFee, setCurrentFee] = useState(null)
    const [yearValue, setYearValue] = useState(today.getFullYear())
    const [monthValue, setMonthValue] = useState(today.getMonth())
    const [monthRange, setMonthRange] = useState({
        start: today.getFullYear() == 2023 ? 8 : 0,
        end: today.getMonth(),
    })
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const dueDate = useSelector(selectServiceDueDate)
    const [loading, setLoading] = useState(false)
    const [listCompanySchedule, setListCompanySchedule] = useState([])
    const [openStripe, setOpenStripe] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [returnUrl, setReturnUrl] = useState('')
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

    const getData = () => {
        dispatch(feeThunk.getFee())
            .unwrap()
            .then((res) => {
                const companyFee = res.filter((fee) => fee.company.id == companyId)
                setListCompanyServiceFee(companyFee)
                const sortedFees = companyFee.sort((a, b) => {
                    return new Date(b.dueDate) - new Date(a.dueDate)
                })
                // Get the first fee from the sorted array
                const lastestFee = sortedFees[0]
                if (lastestFee) {
                    if (lastestFee.status === 'Đã thanh toán') {
                        const dueDate = getLastDateOfMonth(lastestFee.dueDate)
                        dispatch(feeAction.setServiceDueDate(dueDate))
                    } else {
                        dispatch(feeAction.setServiceDueDate(new Date(lastestFee.dueDate)))
                    }
                }
                setReload(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handlePay = (feeId) => {
        dispatch(feeThunk.getFeePaymentUrl(feeId))
            .unwrap()
            .then((res) => {
                //nav to res url in the same tab
                // console.log(res)
                window.location.href = res
            })
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

    const handleStripePayment = (fee) => {
        setCurrentFee(fee)
        if (clientSecret == '')
            dispatch(feeThunk.createStripePayment(fee))
                .unwrap()
                .then((res) => {
                    setClientSecret(res.clientSecret)
                    setReturnUrl(res.returnURL)
                    setOpenStripe(true)
                })
                .catch((err) => {
                    console.log(err)
                })
        else setOpenStripe(true)
    }

    const appearance = {
        theme: 'stripe',
    }
    const options = {
        clientSecret: clientSecret,
        appearance,
    }

    useEffect(() => {
        getMonthRange(yearValue)
    }, [yearValue])

    useEffect(() => {
        const listTripIn = tripProcess(listRoute, companyId)
        setListTrip(listTripIn)
    }, [listRoute])

    useEffect(() => {
        getData()
    }, [monthValue, yearValue])
    useEffect(() => {
        if (reload) getData()
    }, [reload])
    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            {dueDate < new Date() && (
                <b style={{ color: 'red' }}>
                    <i>{`Dịch vụ quá hạn. Vui lòng thanh toán phí dịch vụ trước ngày ${format(
                        dueDate,
                        'dd/MM/yyyy',
                    )} để tiếp tục sử dụng dịch vụ. Sau thời gian trên, hệ thống sẽ ngừng cung cấp dịch vụ cho nhà xe của bạn.`}</i>
                </b>
            )}
            <CTable striped bordered>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell
                            style={{ verticalAlign: 'middle' }}
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            STT
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            style={{ verticalAlign: 'middle' }}
                            scope="col"
                            colSpan={3}
                            className="text-center"
                        >
                            Kỳ hạn
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            style={{ verticalAlign: 'middle' }}
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Số tuyến xe
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            style={{ verticalAlign: 'middle' }}
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Tổng phí
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            style={{ verticalAlign: 'middle' }}
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Trạng thái
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            style={{ verticalAlign: 'middle' }}
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Mã giao dịch
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            style={{ verticalAlign: 'middle' }}
                            scope="col"
                            rowSpan={2}
                            className="align-middle text-center"
                        >
                            Tác vụ
                        </CTableHeaderCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableHeaderCell
                            style={{ verticalAlign: 'middle' }}
                            scope="col"
                            className="text-center"
                        >
                            Ngày bắt đầu
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            style={{ verticalAlign: 'middle' }}
                            scope="col"
                            className="text-center"
                        >
                            Ngày kết thúc
                        </CTableHeaderCell>
                        <CTableHeaderCell
                            style={{ verticalAlign: 'middle' }}
                            scope="col"
                            className="text-center"
                        >
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
                                    style={{ verticalAlign: 'middle' }}
                                    scope="row"
                                    className="text-center align-middle"
                                    align="center"
                                >
                                    {index + 2}
                                </CTableHeaderCell>
                                <CTableDataCell
                                    style={{ verticalAlign: 'middle' }}
                                    className="text-center align-middle"
                                >
                                    {format(getStartDateOfService(fee.dueDate), 'dd/MM/yyyy')}
                                </CTableDataCell>
                                <CTableDataCell
                                    style={{ verticalAlign: 'middle' }}
                                    className="text-center align-middle"
                                >
                                    {format(getLastDateOfMonth(fee.dueDate), 'dd/MM/yyyy')}
                                </CTableDataCell>
                                <CTableDataCell
                                    style={{ verticalAlign: 'middle' }}
                                    className="text-center align-middle"
                                >
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
                                <CTableDataCell
                                    style={{ verticalAlign: 'middle' }}
                                    className="text-center align-middle"
                                >
                                    {getRouteCount(fee.dueDate)}
                                </CTableDataCell>
                                <CTableDataCell
                                    style={{ verticalAlign: 'middle' }}
                                    className="text-center align-middle"
                                >
                                    {fee.fee.toLocaleString()}
                                </CTableDataCell>
                                <CTableDataCell
                                    style={{ verticalAlign: 'middle' }}
                                    className="text-center align-middle"
                                >
                                    {fee.status}
                                </CTableDataCell>
                                <CTableDataCell
                                    style={{ verticalAlign: 'middle' }}
                                    className="text-center align-middle"
                                >
                                    {fee.systemTransaction
                                        ? fee.systemTransaction.transactionNo.length > 8
                                            ? fee.systemTransaction.transactionNo.substring(0, 8) +
                                              '...'
                                            : fee.systemTransaction.transactionNo
                                        : '---'}
                                </CTableDataCell>
                                <CTableDataCell
                                    style={{ verticalAlign: 'middle' }}
                                    className="text-center align-middle"
                                >
                                    {fee.status === 'Chờ thanh toán' && (
                                        <CDropdown>
                                            <CDropdownToggle color="secondary">
                                                Thanh toán
                                            </CDropdownToggle>
                                            <CDropdownMenu>
                                                <CDropdownItem
                                                    as="button"
                                                    role="button"
                                                    onClick={() => handlePay(fee.id)}
                                                >
                                                    VNPay
                                                </CDropdownItem>
                                                <CDropdownItem
                                                    as="button"
                                                    role="button"
                                                    onClick={() => handleStripePayment(fee)}
                                                >
                                                    Stripe - Thẻ Visa
                                                </CDropdownItem>
                                            </CDropdownMenu>
                                        </CDropdown>
                                    )}
                                    {fee.status === 'Đã thanh toán' && (
                                        <CButton
                                            variant="outline"
                                            onClick={() => {
                                                setShowTransactionDetail(true)
                                                setCurrentFee(fee)
                                            }}
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
                            style={{ verticalAlign: 'middle' }}
                            scope="row"
                            className="text-center align-middle"
                            align="center"
                        >
                            {1}
                        </CTableHeaderCell>
                        <CTableDataCell
                            style={{ verticalAlign: 'middle' }}
                            className="text-center align-middle"
                            align="center"
                        >
                            {convertToDisplayDate(format(startTime, 'yyyy-MM-dd'))}
                        </CTableDataCell>
                        <CTableDataCell
                            style={{ verticalAlign: 'middle' }}
                            className="text-center align-middle"
                            align="center"
                        >
                            {format(addDays(startTime, 14), 'dd/MM/yyyy')}
                        </CTableDataCell>
                        <CTableDataCell
                            style={{ verticalAlign: 'middle' }}
                            className="text-center"
                            align="center"
                        >
                            {'---'}
                        </CTableDataCell>
                        <CTableDataCell
                            style={{ verticalAlign: 'middle' }}
                            className="text-center"
                            align="center"
                        >
                            {listTrip.length}
                        </CTableDataCell>
                        <CTableDataCell
                            style={{ verticalAlign: 'middle' }}
                            className="text-center"
                            align="center"
                        >{`Miễn phí`}</CTableDataCell>
                        <CTableDataCell
                            style={{ verticalAlign: 'middle' }}
                            className="text-center"
                            align="center"
                        >{`---`}</CTableDataCell>
                        <CTableDataCell
                            style={{ verticalAlign: 'middle' }}
                            className="text-center"
                            align="center"
                        >
                            {'---'}
                        </CTableDataCell>
                        <CTableDataCell
                            style={{ verticalAlign: 'middle' }}
                            className="text-center"
                            align="center"
                        >
                            {'---'}
                        </CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
            <CModal visible={showTransactionDetail} onClose={() => setShowTransactionDetail(false)}>
                <CModalHeader>
                    <b>{`Chi tiết giao dịch ${currentFee?.systemTransaction?.transactionNo}`}</b>
                </CModalHeader>
                <CModalBody>
                    {currentFee && currentFee.systemTransaction && (
                        <>
                            <CRow className="mb-3 justify-content-center">
                                <CFormLabel htmlFor="time" className="col-sm-5 col-form-label">
                                    <b>Thời gian giao dịch</b>
                                </CFormLabel>
                                <CCol sm={5}>
                                    <CFormInput
                                        type="text"
                                        id="time"
                                        defaultValue={convertToDisplayTimeStamp(
                                            currentFee.systemTransaction.paymentTime,
                                        )}
                                        readOnly
                                        plainText
                                        style={{ textAlign: 'right' }}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3 justify-content-center">
                                <CFormLabel htmlFor="money" className="col-sm-5 col-form-label">
                                    <b>Số tiền giao dịch</b>
                                </CFormLabel>
                                <CCol sm={5}>
                                    <CFormInput
                                        type="text"
                                        id="money"
                                        defaultValue={`${Math.floor(
                                            currentFee.systemTransaction.amount,
                                        ).toLocaleString()} VND`}
                                        readOnly
                                        plainText
                                        style={{ textAlign: 'right' }}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3 justify-content-center">
                                <CFormLabel htmlFor="method" className="col-sm-5 col-form-label">
                                    <b>Phương thức thanh toán</b>
                                </CFormLabel>
                                <CCol sm={5}>
                                    <CFormInput
                                        type="text"
                                        id="method"
                                        defaultValue={currentFee.systemTransaction.paymentMethod}
                                        readOnly
                                        plainText
                                        style={{ textAlign: 'right' }}
                                    />
                                </CCol>
                            </CRow>
                        </>
                    )}
                </CModalBody>
            </CModal>
            <CModal visible={openStripe} onClose={() => setOpenStripe(false)}>
                <CModalHeader>
                    <b>THANH TOÁN PHÍ</b>
                </CModalHeader>
                <CModalBody>
                    <div className="w-100 text-center mb-1">
                        <b>{`Số tiền thanh toán: ${currentFee?.fee?.toLocaleString()}đ`}</b>
                    </div>
                    {openStripe && clientSecret != '' && (
                        <Elements stripe={stripePromise} options={options}>
                            <StripePaymentDialog returnUrl={returnUrl}></StripePaymentDialog>
                        </Elements>
                    )}
                </CModalBody>
            </CModal>
        </>
    )
}
const StripePaymentDialog = ({ returnUrl }) => {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!stripe) {
            return
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret',
        )

        if (!clientSecret) {
            return
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            console.log(paymentIntent)
            switch (paymentIntent.status) {
                case 'succeeded':
                    console.log('Thanh toán thành công')
                    break
                case 'processing':
                    console.log('Đang thực hiện thanh toán')
                    break
                case 'requires_payment_method':
                    console.log('Thanh toán thất bại')
                    break
                default:
                    console.log('Có lỗi xảy ra. Vui lòng thử lại sau')
                    break
            }
        })
    }, [stripe])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: returnUrl,
            },
        })

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message)
        } else {
            setMessage('Có lỗi xảy ra.Vui lòng thử lại sau')
        }

        setIsLoading(false)
    }

    const paymentElementOptions = {
        layout: 'tabs',
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="stripe-form">
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="stripe-button"
            >
                <span id="button-text">
                    {isLoading ? (
                        <div className="stripe-spinner" id="spinner"></div>
                    ) : (
                        'Thanh toán ngay'
                    )}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}
const Expense = () => {
    const [activeTab, setActiveTab] = useState(1)
    const dispatch = useDispatch()
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [reload, setReload] = useState(false)
    const dueDate = useSelector(selectServiceDueDate)
    const curDueDate = useRef('')
    // http://localhost:3001/?payment_intent=pi_3PcXYiGlLuaJqSOV068Rp4Pz&payment_intent_client_secret=pi_3PcXYiGlLuaJqSOV068Rp4Pz_secret_5rnK9otJ71Lzr6p3qUkNcStqH&redirect_status=succeeded#/system-manage/expense?feeId=28/
    const verifyPaymentStatus = () => {
        console.log('verify')
        const url = window.location.search
        if (!(url.includes('vnp_ResponseCode') || url.includes('redirect_status'))) return
        setActiveTab(1)
        const urlParams = new URLSearchParams(url)
        const vnp_ResponseCode =
            urlParams.get('vnp_ResponseCode') || urlParams.get('redirect_status').split('#')[0]
        const vnp_TransactionNo =
            urlParams.get('vnp_TransactionNo') || urlParams.get('payment_intent')
        const vnp_TransactionDate =
            urlParams.get('vnp_PayDate') || format(new Date(), 'yyyyMMddHHmmss')
        const content = urlParams.get('vnp_OrderInfo') || urlParams.get('feeId')
        //Get all character after "code" in content
        console.log(content)
        let feeId = ''
        if (content) {
            if (content.includes('code')) feeId = content.slice(content.indexOf('code') + 4)
            else feeId = content
            if (vnp_ResponseCode === '00' || vnp_ResponseCode === 'succeeded') {
                dispatch(
                    feeThunk.feePay({
                        feeServiceId: feeId,
                        paymentMethod: vnp_ResponseCode === '00' ? 'VNPay' : 'Stripe',
                        transactionNo: vnp_TransactionNo,
                        transactionDate: vnp_TransactionDate,
                    }),
                )
                    .unwrap()
                    .then(() => {
                        addToast(() =>
                            CustomToast({ message: 'Thanh toán thành công', type: 'success' }),
                        )
                        //Get url before ? in url
                        setTimeout(() => {
                            setReload(true)
                            dispatch(
                                noticeAction.removeNotice({ id: parseInt(feeId), type: 'fee' }),
                            )
                            window.location.href = './#/system-manage/expense'
                        }, [1000])
                    })
                    .catch(() => {
                        addToast(() => CustomToast({ message: 'Có lỗi xảy ra', type: 'error' }))
                    })
            } else {
                addToast(() => CustomToast({ message: 'Thanh toán không hợp lệ', type: 'error' }))
            }
        }
    }
    useEffect(() => {
        if (dueDate) {
            if (dueDate < new Date() && format(dueDate, 'yyyyMMdd') !== curDueDate.current) {
                setActiveTab(1)
            } else if (format(dueDate, 'yyyyMMdd') !== curDueDate.current) {
                setActiveTab(0)
            }
            curDueDate.current = format(dueDate, 'yyyyMMdd')
        }
    }, [dueDate])
    useEffect(() => {
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
                    <SaleData />
                </TabPanel>
                <TabPanel className="px-3">
                    <ServiceData reload={reload} setReload={setReload}></ServiceData>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Expense
