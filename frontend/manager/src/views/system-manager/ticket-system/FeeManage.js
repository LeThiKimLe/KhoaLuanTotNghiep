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
    CSpinner,
    CButtonGroup,
    CFormCheck,
    CImage,
    CFormLabel,
    CFormInput,
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
    selectListAssign,
    selectListCompany,
} from 'src/feature/bus-company/busCompany.slice'
import { getStyle } from '@coreui/utils'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import { CustomToast } from 'src/views/customToast/CustomToast'
import { cilExternalLink } from '@coreui/icons'
import { getTripJourney } from 'src/utils/tripUtils'
import noImage from 'src/assets/images/no_img.png'
import { selectListOnlineTicket } from 'src/feature/statistics/statistics.slice'
import stationThunk from 'src/feature/station/station.service'
import statisticsThunk from 'src/feature/statistics/statistics.service'
import CustomButton from 'src/views/customButton/CustomButton'
const TripListModal = ({ visible, onClose, curCompany, listSchedule }) => {
    const [showComplete, setShowComplete] = useState(true)
    const [listShow, setListShow] = useState(
        listSchedule
            ? listSchedule.filter(
                  (schd) =>
                      schd &&
                      schd.state === 'Hoàn thành' &&
                      schd.transportationOrder?.status === 'Đã hoàn thành',
              )
            : [],
    )
    const [showTransportationOrder, setShowTransportationOrder] = useState(false)
    const [curSchd, setCurSchd] = useState(null)
    const randomColorBaseonTrip = (trip) => {
        const listColor = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink']
        const tripName = getTripJourney(trip)
        const minBrightness = 128 // Giá trị độ sáng tối thiểu (0-255)
        const maxBrightness = 255 // Giá trị độ sáng tối đa (0-255)
        const color =
            tripName
                .split('')
                .map((char) => char.charCodeAt(0))
                .reduce((acc, cur) => acc + cur, 0) % listColor.length
        return listColor[color]
    }

    useEffect(() => {
        if (listSchedule) {
            if (showComplete) {
                setListShow(
                    listSchedule.filter(
                        (schd) =>
                            schd.state === 'Hoàn thành' &&
                            schd?.transportationOrder?.status === 'Đã hoàn thành',
                    ),
                )
            } else {
                setListShow(
                    listSchedule.filter(
                        (schd) =>
                            schd.state !== 'Hoàn thành' ||
                            schd?.transportationOrder?.status !== 'Đã hoàn thành',
                    ),
                )
            }
        }
    }, [showComplete])
    useEffect(() => {
        if (listSchedule)
            setListShow(
                listSchedule.filter(
                    (schd) =>
                        schd?.state == 'Hoàn thành' &&
                        schd?.transportationOrder?.status == 'Đã hoàn thành',
                ),
            )
    }, [listSchedule])
    return (
        <CModal visible={visible} onClose={onClose} size="lg">
            <CModalHeader>{`Danh sách chuyến xe - Nhà xe ${curCompany?.name}`}</CModalHeader>
            <CModalBody style={{ maxHeight: '500px', overflow: 'auto' }}>
                <CButtonGroup style={{ marginBottom: '10px' }}>
                    <CFormCheck
                        type="radio"
                        button={{ color: 'success', variant: 'outline' }}
                        name="btnradio"
                        id="complete"
                        checked={showComplete}
                        onClick={() => setShowComplete(true)}
                        label="Chuyến hợp lệ"
                    />
                    <CFormCheck
                        type="radio"
                        button={{ color: 'warning', variant: 'outline' }}
                        name="btnradio"
                        id="uncompleted"
                        autoComplete="off"
                        checked={!showComplete}
                        onClick={() => setShowComplete(false)}
                        label="Chuyến không hợp lệ"
                    />
                </CButtonGroup>
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
                                Lệnh vận chuyển
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
                        {listShow.map((schd, index) => (
                            <CTableRow key={schd.id}>
                                <CTableHeaderCell scope="row" className="text-center">
                                    {index + 1}
                                </CTableHeaderCell>
                                <CTableHeaderCell
                                    scope="row"
                                    className="text-center"
                                    style={{ color: randomColorBaseonTrip(schd.trip) }}
                                >
                                    {getTripJourney(schd.trip)}
                                    {'---'}
                                </CTableHeaderCell>
                                <CTableDataCell className="text-center">{`${schd.departTime.slice(
                                    0,
                                    -3,
                                )} - ${convertToDisplayDate(schd.departDate)}`}</CTableDataCell>
                                <CTableDataCell className="text-center">{`${convertToDisplayTimeStamp(
                                    schd.updateTime,
                                )}`}</CTableDataCell>
                                <CTableDataCell className="text-center">
                                    {
                                        schd.tickets.filter((tk) => tk.state === 'Đã thanh toán')
                                            .length
                                    }
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    {schd.state}
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    {schd.transportationOrder?.status}
                                    <CIcon
                                        icon={cilExternalLink}
                                        role="button"
                                        onClick={() => {
                                            setShowTransportationOrder(true)
                                            setCurSchd(schd)
                                        }}
                                    ></CIcon>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CModalBody>
            <CModal
                visible={showTransportationOrder}
                onClose={() => setShowTransportationOrder(false)}
            >
                <CModalBody>
                    <div>
                        <CImage
                            rounded
                            thumbnail
                            src={curSchd?.transportationOrder?.image}
                            onError={(e) => {
                                e.target.onerror = null
                                e.target.src = noImage
                            }}
                        />
                    </div>
                </CModalBody>
            </CModal>
        </CModal>
    )
}
const TicketFee = () => {
    const dispatch = useDispatch()
    const listRoute = useSelector(selectListRoute)
    const listAssignRouteId = listRoute.map((route) => route.id)
    const [listSchedule, setListSchedule] = useState([])
    const [listCompanySchedule, setListCompanySchedule] = useState([])
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
    const [listTicketFee, setListTicketFee] = useState([])
    const [listValidCompany, setListValidCompany] = useState([])
    const listOnlineTicket = useSelector(selectListOnlineTicket)
    const [currentFee, setCurrentFee] = useState(null)
    const [showTransactionDetail, setShowTransactionDetail] = useState(false)
    const getYearRange = () => {
        var year = []
        const startYear = startTime.getFullYear()
        for (let i = startYear; i <= today.getFullYear(); i++) {
            year.push(i)
        }
        return year
    }
    const getLastDateOfMonth = (dueDate) => {
        let currentSpan = parse(dueDate, 'yyyy-MM-dd', new Date())
        let lastDate = new Date(currentSpan.getFullYear(), currentSpan.getMonth() + 1, 0)
        return lastDate
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
    const getValidCompanyForTime = () => {
        dispatch(feeThunk.getFee())
            .unwrap()
            .then((res) => {
                const listValid = []
                listCompany.forEach((company) => {
                    const companyFee = res.filter((fee) => fee.company.id == company.busCompany.id)
                    const freeSpan = {
                        company: company,
                        dueDate: company.busCompany.coopDay,
                        status: 'Đã thanh toán',
                    }
                    companyFee.push(freeSpan)
                    // Sort fees based on status and dueDate
                    const sortedFees = companyFee.sort((a, b) => {
                        return new Date(b.dueDate) - new Date(a.dueDate)
                    })
                    // Get the first fee from the sorted array
                    const monthFee = sortedFees.find((fee) => {
                        if (
                            new Date(fee.dueDate).getMonth() === monthValue &&
                            new Date(fee.dueDate).getFullYear() === yearValue
                        )
                            return true
                    })
                    if (monthFee && monthFee.status === 'Đã thanh toán') {
                        listValid.push(company.busCompany)
                    }
                })
                setListValidCompany(listValid)
            })
            .catch((res) => {
                console.log(res)
            })
    }

    const getData = () => {
        setLoading(true)
        dispatch(
            feeThunk.getCompanySchedule({
                month: monthValue + 1,
                year: yearValue,
            }),
        )
            .unwrap()
            .then((res) => {
                console.log(res)
                setListCompanySchedule(res)
                handleCalTicketSale()
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })

        dispatch(statisticsThunk.getOnlineTicket({ month: monthValue + 1, year: yearValue }))
            .unwrap()
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {})
    }

    const handleCalTicketSale = () => {
        dispatch(
            feeThunk.getTicketSale({
                month: monthValue + 1,
                year: yearValue,
            }),
        )
            .unwrap()
            .then((res) => {
                console.log(res)
                setListTicketFee(res)
            })
            .catch((err) => {
                setListTicketFee([])
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

    const handleOpenTripList = (company) => {
        setCurCompany(company)
        setOpenTripList(true)
    }

    const handlePaymentAction = (fee) => {
        if (fee) {
            if (fee?.ticketSave?.systemTransaction) {
                setCurrentFee(fee)
                setShowTransactionDetail(true)
            } else {
                setLoading(true)
                dispatch(feeThunk.companyPayment(fee.ticketSave.id))
                    .unwrap()
                    .then((res) => {
                        handleCalTicketSale()
                        addToast(() =>
                            CustomToast({ message: 'Thanh toán thành công', type: 'success' }),
                        )
                        setLoading(false)
                    })
                    .catch((err) => {
                        setLoading(false)
                        addToast(() =>
                            CustomToast({ message: 'Thanh toán thất bại', type: 'error' }),
                        )
                    })
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
        console.log('recall')
        getValidCompanyForTime()
        getData()
    }, [monthValue, yearValue])

    useEffect(() => {
        if (listCompany.length === 0) {
            dispatch(companyThunk.getCompany())
                .unwrap()
                .then()
                .catch((err) => console.log(err))
        }
    }, [])

    useEffect(() => {
        // if (!openTripList) setCurCompany(null)
    }, [openTripList])
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
            {loading ? (
                <div className="d-flex justify-content-center">
                    <CSpinner />
                </div>
            ) : (
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
                                Số chuyến xe hợp lệ
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope="col"
                                rowSpan={2}
                                className="align-middle text-center"
                            >
                                Số vé online
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
                        {listTicketFee &&
                            listValidCompany.map((company, index) => {
                                const ticketSale = listTicketFee?.find(
                                    (item) => item.busCompany.id === company.id,
                                )
                                console.log(ticketSale)
                                return (
                                    <CTableRow key={index}>
                                        <CTableHeaderCell scope="row" className="text-center">
                                            {index + 1}
                                        </CTableHeaderCell>
                                        <CTableHeaderCell scope="row" className="text-center">
                                            {company.name}
                                            <br></br>
                                        </CTableHeaderCell>
                                        <CTableDataCell className="text-center">
                                            {new Date(company.coopDay) <
                                            new Date(yearValue, monthValue, 1)
                                                ? format(
                                                      new Date(yearValue, monthValue, 1),
                                                      'dd/MM/yyyy',
                                                  )
                                                : convertToDisplayDate(company.coopDay)}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            {format(
                                                new Date(yearValue, monthValue + 1, 0),
                                                'dd/MM/yyyy',
                                            )}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            {`${format(
                                                new Date(yearValue, monthValue + 1, 5),
                                                'dd/MM',
                                            )} - ${format(
                                                new Date(yearValue, monthValue + 1, 10),
                                                'dd/MM',
                                            )}`}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            {`${
                                                listCompanySchedule
                                                    .find(
                                                        (item) => item.busCompany.id === company.id,
                                                    )
                                                    ?.schedules.filter(
                                                        (schd) =>
                                                            schd.state === 'Hoàn thành' &&
                                                            schd.transportationOrder?.status ===
                                                                'Đã hoàn thành',
                                                    ).length
                                            } chuyến`}
                                            <CIcon
                                                icon={cilExternalLink}
                                                role="button"
                                                style={{ marginLeft: '5px' }}
                                                onClick={() => handleOpenTripList(company)}
                                            ></CIcon>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            {/* {`${listCompanySchedule
                                        .find((item) => item.busCompany.id === company.id)
                                        ?.schedules?.reduce(
                                            (acc, cur) =>
                                                acc +
                                                cur.tickets.filter(
                                                    (tk) => tk.state === 'Đã thanh toán',
                                                ).length,
                                            0,
                                        )}`} */}
                                            {
                                                listOnlineTicket
                                                    .find(
                                                        (item) => item.busCompany.id === company.id,
                                                    )
                                                    .ticKets.filter(
                                                        (tk) => tk.state == 'Đã thanh toán',
                                                    ).length
                                            }
                                            <CIcon
                                                icon={cilExternalLink}
                                                role="button"
                                                style={{ marginLeft: '5px' }}
                                                onClick={() => viewCompany(company.id)}
                                            ></CIcon>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">{`${
                                            ticketSale
                                                ? ticketSale.ticketSave?.ticketSales.toLocaleString()
                                                : '---'
                                        }`}</CTableDataCell>
                                        <CTableDataCell className="text-center">{`${
                                            ticketSale
                                                ? (
                                                      (ticketSale.ticketSave?.ticketSales * 20) /
                                                      100
                                                  ).toLocaleString()
                                                : '---'
                                        }`}</CTableDataCell>
                                        <CTableDataCell className="text-center">{`${
                                            listTicketFee.length > 0
                                                ? ticketSale?.ticketSave?.systemTransaction
                                                    ? 'Đã thanh toán'
                                                    : 'Chưa thanh toán'
                                                : '---'
                                        }`}</CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CustomButton
                                                loading={loading}
                                                variant="outline"
                                                onClick={() => handlePaymentAction(ticketSale)}
                                            >
                                                {`${
                                                    listTicketFee.length > 0
                                                        ? ticketSale?.ticketSave?.systemTransaction
                                                            ? 'Xem giao dịch'
                                                            : `Thanh toán ${ticketSale?.ticketSave?.profit.toLocaleString()}đ`
                                                        : '---'
                                                }`}
                                            </CustomButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                )
                            })}
                    </CTableBody>
                </CTable>
            )}
            <TripListModal
                visible={openTripList}
                onClose={() => setOpenTripList(false)}
                listSchedule={
                    listCompanySchedule.find((item) => item.busCompany.id === curCompany?.id)
                        ?.schedules
                }
                curCompany={curCompany}
            ></TripListModal>
            <CModal visible={showTransactionDetail} onClose={() => setShowTransactionDetail(false)}>
                <CModalHeader>
                    <b>{`Chi tiết giao dịch vé nhà xe "${currentFee?.busCompany.name}" T${
                        monthValue + 1
                    }/${yearValue}`}</b>
                </CModalHeader>
                <CModalBody>
                    {currentFee && currentFee.ticketSave.systemTransaction && (
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
                                            currentFee.ticketSave.systemTransaction.paymentTime,
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
                                            currentFee.ticketSave.systemTransaction.amount,
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
                                        defaultValue={
                                            currentFee.ticketSave.systemTransaction.paymentMethod
                                        }
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
    const listAssign = useSelector(selectListAssign)
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

    const getCompanyTripNumber = (companyId) => {
        const assignedTrip = listAssign.filter(
            (assign) =>
                assign.busCompanyId == companyId &&
                new Date(assign.assignDate).getMonth() <= monthValue,
        )
        return assignedTrip.length
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
        dispatch(companyThunk.getCompany())
            .unwrap()
            .then()
            .catch((err) => console.log(err))
        dispatch(companyThunk.getAssignedRouteForCompany())
            .unwrap()
            .then()
            .catch((err) => console.log(err))
    }, [])
    console.log(listAssign)
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
                                {format(getStartDateOfService(fee.dueDate), 'dd/MM/yyyy')}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                                {format(getLastDateOfMonth(fee.dueDate), 'dd/MM/yyyy')}
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
                                {getCompanyTripNumber(fee.company.id)}
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
