import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { subStractDays, addDays, convertToDisplayDate } from 'src/utils/convertUtils'
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
} from '@coreui/react'
import parse from 'date-fns/parse'
import { addHours } from 'src/utils/convertUtils'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import scheduleThunk from 'src/feature/schedule/schedule.service'
import { getTripJourney } from 'src/utils/tripUtils'
import { selectActiveTicket } from 'src/feature/ticket/ticket.slice'
import { Document, Packer } from 'docxtemplater'
import axios from 'axios'
const WordProcessor = () => {
    const [template, setTemplate] = useState(null)
    useEffect(() => {
        // Gửi yêu cầu GET đến tệp Word mẫu
        axios
            .get('/path/to/template.docx', { responseType: 'arraybuffer' })
            .then((response) => {
                setTemplate(response.data) // Lưu nội dung tệp Word vào state
            })
            .catch((error) => {
                console.error('Error fetching template:', error)
            })
    }, [])

    const generateDocument = () => {
        if (template) {
            const doc = new Document(template)
            doc.setData({
                // Điền dữ liệu vào các trường
                firstName: 'John',
                lastName: 'Doe',
                age: 30,
            })
            doc.render()

            const buffer = doc.getZip().generate({ type: 'arraybuffer' })
            saveAs(buffer, 'generated_document.docx') // Tải xuống tệp Word đã được điền nội dung
        }
    }

    return (
        <div>
            <button onClick={generateDocument}>Generate Document</button>
        </div>
    )
}
const ScheduleData = ({ index, schedule }) => {
    const [exportCommand, setExportCommand] = useState(false)
    return (
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
            <CTableDataCell>{schedule.bus?.licensePlate}</CTableDataCell>
            <CTableDataCell>
                {!exportCommand ? (
                    <CButton variant="outline">Xuất lệnh</CButton>
                ) : (
                    <>
                        <i>Xem lệnh</i> / <i>Chỉnh sửa</i>
                    </>
                )}
            </CTableDataCell>
            <CTableDataCell>{`Sắp rời bến`}</CTableDataCell>
        </CTableRow>
    )
}

const ListTrip = ({ listSchedule }) => {
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
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {listProcess.map((schedule, index) => (
                            <ScheduleData
                                key={index}
                                schedule={schedule}
                                index={index}
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
        setReload(reload + 1)
    }
    const getScheduleData = async () => {
        setLoading(false)
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
        if (listTrip.length === 0) {
            const listTripIn = tripProcess(listRoute, companyId)
            setListTrip(listTripIn)
        }
        setCurrentTrip(null)
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
        }
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
                    {listTrip
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
                        ))}
                </div>
            )}
            <div className="tabStyle">
                <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                    <TabList>
                        <Tab>Sắp diễn ra</Tab>
                        <Tab>Đang diễn ra</Tab>
                        <Tab>Đã kết thúc</Tab>
                    </TabList>
                    <TabPanel>
                        <ListTrip listSchedule={getScheduleForStatus('Ready')}></ListTrip>
                    </TabPanel>
                    <TabPanel>
                        <ListTrip listSchedule={getScheduleForStatus('OnGoing')}></ListTrip>
                    </TabPanel>
                    <TabPanel>
                        <ListTrip listSchedule={getScheduleForStatus('Finished')}></ListTrip>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}

export default ScheduleTracking