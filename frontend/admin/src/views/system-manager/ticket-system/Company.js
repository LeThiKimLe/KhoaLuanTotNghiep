import React, { useEffect, useState, useRef, useCallback } from 'react'
import { CButton } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import routeThunk from 'src/feature/route/route.service'
import { selectListOfficialRoute } from 'src/feature/route/route.slice'
import {
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CCard,
    CCardBody,
    CCardFooter,
    CFormFeedback,
    CFormInput,
    CFormCheck,
    CRow,
    CForm,
    CCol,
    CCardHeader,
    CFormLabel,
    CFormSelect,
    CModalFooter,
    CButtonGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTransfer, cilX, cilPlus } from '@coreui/icons'
import { getLocationData } from 'src/utils/routeUtils'
import CustomButton from 'src/views/customButton/CustomButton'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { add } from 'date-fns'
import TimePicker from 'react-time-picker'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import { convertTimeToInt } from 'src/utils/convertUtils'

const TimeBox = ({ time, removeTime, fix, turn }) => {
    const [showRemove, setShowRemove] = useState(false)
    const handleRemove = () => {
        removeTime(time, turn)
    }
    return (
        <CCard textColor={fix === true ? 'success' : 'warning'} className="border-warning mb-1">
            <CCardBody
                className="p-2 position-relative text-center"
                onMouseEnter={() => setShowRemove(true)}
                onMouseLeave={() => setShowRemove(false)}
            >
                <b>{time}</b>
                <CIcon
                    className="position-absolute top-0 right-0"
                    role="button"
                    icon={cilX}
                    style={{
                        visibility: showRemove && fix === false ? '' : 'hidden',
                        color: 'black',
                    }}
                    onClick={handleRemove}
                ></CIcon>
            </CCardBody>
        </CCard>
    )
}

const ScheduleBox = ({ listTime, addTime, removeTime, turn }) => {
    const [openTimer, setOpenTimer] = useState(false)
    const [curTime, setCurTime] = useState('07:00')
    return (
        <CRow className="mb-3 justify-content-center">
            <CFormLabel htmlFor="maxSchedule" className="col-sm-2 col-form-label">
                <b>{turn === 1 ? 'Lịch trình lượt đi' : 'Lịch trình lượt về'}</b>
            </CFormLabel>
            <CCol sm={5}>
                <CCard style={{ height: '100px', overflow: 'auto' }}>
                    <CCardBody>
                        {listTime.length > 0 && (
                            <CRow
                                style={{
                                    height: 'fit-content',
                                    width: '100%',
                                }}
                            >
                                {listTime.map((timer, index) => (
                                    <CCol key={index} xs="4">
                                        <TimeBox
                                            time={timer.time}
                                            removeTime={removeTime}
                                            fix={timer.fix}
                                            turn={turn}
                                        ></TimeBox>
                                    </CCol>
                                ))}
                            </CRow>
                        )}
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol sm={3}>
                <CButton
                    id={turn === 1 ? 'go' : 'return'}
                    color="info"
                    onClick={() => setOpenTimer(!openTimer)}
                >
                    <CIcon icon={cilPlus}></CIcon>
                    Thêm giờ
                </CButton>
                {openTimer && (
                    <CCard
                        className="mt-1"
                        style={{
                            width: '145px',
                            zIndex: 2,
                            position: 'absolute',
                        }}
                    >
                        <CCardBody>
                            <TimePicker
                                format="HH:mm"
                                onChange={setCurTime}
                                value={curTime}
                                clearIcon={null}
                                disableClock={true}
                            />
                            <CButton
                                id={turn === 1 ? 'add-go' : 'add-return'}
                                letiant="outline"
                                color="info"
                                onClick={() => addTime(curTime, turn)}
                                style={{
                                    width: 'fit-content',
                                    marginTop: '10px',
                                }}
                            >
                                OK
                            </CButton>
                        </CCardBody>
                    </CCard>
                )}
            </CCol>
        </CRow>
    )
}

const CompanyRoute = ({ id, addCompanyRoute }) => {
    const listLocation = useRef([])
    const listOfficialRoute = useSelector(selectListOfficialRoute)
    const [listDeparture, setListDeparture] = useState([])
    const [listDestination, setListDestination] = useState([])
    const [listStartStation, setListStartStation] = useState([])
    const [listEndStation, setListEndStation] = useState([])
    const [listJourney, setListJourney] = useState([])
    const [curDeparture, setCurDeparture] = useState(-1)
    const [curDestination, setCurDestination] = useState(-1)
    const [curStartStation, setCurStartStation] = useState(-1)
    const [curEndStation, setCurEndStation] = useState(-1)
    const [curJourney, setCurJourney] = useState(-1)
    const [listTimeGo, setListTimeGo] = useState([])
    const [listTimeReturn, setListTimeReturn] = useState([])
    const [listCompanyRoute, setListCompanyRoute] = useState([])
    const [curRoute, setCurRoute] = useState(null)
    const getListDestination = useCallback(() => {
        if (curDeparture === -1) return []
        const listDestinationNew = []
        const departure = listDeparture[curDeparture]
        listOfficialRoute.forEach((route) => {
            if (
                route.departure === departure.name &&
                listDestinationNew.findIndex((location) => location.name === route.destination) ===
                    -1
            ) {
                listDestinationNew.push(
                    listDeparture.find((location) => location.name === route.destination),
                )
            }
            if (
                route.destination === departure.name &&
                listDestinationNew.findIndex((location) => location.name === route.departure) === -1
            ) {
                listDestinationNew.push(
                    listDeparture.find((location) => location.name === route.departure),
                )
            }
        })
        return listDestinationNew
    }, [curDeparture])

    const getListStation = useCallback(() => {
        if (curDeparture === -1 || curDestination === -1)
            return {
                listStartStation: [],
                listEndStation: [],
            }
        const departure = listDeparture[curDeparture]
        const destination = listDestination[curDestination]
        const listAvaiRoute = listOfficialRoute.filter(
            (route) =>
                (route.departure === departure.name && route.destination === destination.name) ||
                (route.departure === destination.name && route.destination === departure.name),
        )
        const listStartStationNew = departure.listStation.filter((station) => {
            if (
                listAvaiRoute.findIndex(
                    (route) => route.startStation === station || route.endStation === station,
                ) !== -1
            )
                return true
            return false
        })
        const listEndStationNew = destination.listStation.filter((station) => {
            if (
                listAvaiRoute.findIndex(
                    (route) => route.startStation === station || route.endStation === station,
                ) !== -1
            )
                return true
            return false
        })
        return { listStartStation: listStartStationNew, listEndStation: listEndStationNew }
    }, [curDeparture, curDestination])

    const getListAvaiRoute = () => {
        return listOfficialRoute.filter(
            (route) =>
                (route.departure === listDeparture[curDeparture].name &&
                    route.destination === listDestination[curDestination].name &&
                    route.startStation === listStartStation[curStartStation] &&
                    route.endStation === listEndStation[curEndStation]) ||
                (route.departure === listDestination[curDestination].name &&
                    route.destination === listDeparture[curDeparture].name &&
                    route.startStation === listEndStation[curEndStation] &&
                    route.endStation === listStartStation[curStartStation]),
        )
    }

    const getListJourney = useCallback(() => {
        if (curEndStation === -1) return []
        const listJourneyNew = []
        const listAvaiRoute = getListAvaiRoute()
        listAvaiRoute.forEach((route) => {
            listJourneyNew.push(route.journey)
        })
        return listJourneyNew
    }, [curEndStation])

    const addTime = (time, turn) => {
        if (turn === 1) {
            if (listTimeGo.findIndex((timer) => timer.time === time) !== -1) return
            setListTimeGo((prev) => {
                const newTime = [...prev]
                newTime.push({ time: time, fix: false })
                newTime.sort((a, b) =>
                    convertTimeToInt(a.time) < convertTimeToInt(b.time) ? -1 : 1,
                )
                return newTime
            })
        } else {
            if (listTimeReturn.findIndex((timer) => timer.time === time) !== -1) return
            setListTimeReturn((prev) => {
                const newTime = [...prev]
                newTime.push({ time: time, fix: false })
                newTime.sort((a, b) =>
                    convertTimeToInt(a.time) < convertTimeToInt(b.time) ? -1 : 1,
                )
                return newTime
            })
        }
    }

    const removeTime = (time, turn) => {
        if (turn === 1) {
            setListTimeGo((prev) => {
                const newTime = prev.filter((timer) => timer.time !== time)
                return newTime
            })
        } else {
            setListTimeReturn((prev) => {
                const newTime = prev.filter((timer) => timer.time !== time)
                return newTime
            })
        }
    }

    useEffect(() => {
        if (listOfficialRoute.length !== 0) {
            listLocation.current = getLocationData(listOfficialRoute)
            setListDeparture(listLocation.current)
        }
    }, [])
    useEffect(() => {
        if (curDeparture !== -1) {
            setListDestination(getListDestination())
            setCurDestination(-1)
            setCurStartStation(-1)
            setCurEndStation(-1)
        }
    }, [curDeparture])
    useEffect(() => {
        if (curDestination !== -1) {
            const newStation = getListStation()
            setListStartStation(newStation.listStartStation)
            setListEndStation(newStation.listEndStation)
            setCurStartStation(-1)
            setCurEndStation(-1)
        }
    }, [curDestination])
    useEffect(() => {
        setCurJourney(-1)
        setListJourney(getListJourney())
    }, [curEndStation, curStartStation])
    useEffect(() => {
        if (curJourney !== -1)
            setCurRoute(
                getListAvaiRoute().find((route) => route.journey === listJourney[curJourney]),
            )
    }, [curJourney])
    useEffect(() => {
        if (
            curDeparture === -1 ||
            curDestination === -1 ||
            curStartStation === -1 ||
            curEndStation === -1 ||
            curJourney === -1
        )
            setCurRoute(null)
    }, [curDeparture, curDestination, curStartStation, curEndStation, curJourney])

    useEffect(() => {
        if (curRoute && listTimeGo.length !== 0 && listTimeReturn.length !== 0) {
            addCompanyRoute(id, curRoute, listTimeGo, listTimeReturn)
        }
    }, [curRoute, listTimeGo, listTimeReturn])
    return (
        <>
            <CRow className="mb-3 justify-content-center align-items-center">
                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                    <b>Chọn tuyến xe</b>
                </CFormLabel>
                <CCol sm="3">
                    <CFormSelect
                        value={curDeparture}
                        onChange={(e) => setCurDeparture(parseInt(e.target.value))}
                    >
                        <option value={-1} disabled>
                            Tỉnh đi
                        </option>
                        {listDeparture.map((dep, index) => (
                            <option key={index} value={index}>
                                {dep.name}
                            </option>
                        ))}
                    </CFormSelect>
                </CCol>
                <CCol sm="2" className="d-flex justify-content-center align-items-center">
                    <CIcon icon={cilTransfer}></CIcon>
                </CCol>
                <CCol sm="3">
                    <CFormSelect
                        value={curDestination}
                        onChange={(e) => setCurDestination(parseInt(e.target.value))}
                    >
                        <option value={-1} disabled>
                            Tỉnh đến
                        </option>
                        {listDestination.map((des, index) => (
                            <option key={index} value={index}>
                                {des.name}
                            </option>
                        ))}
                    </CFormSelect>
                </CCol>
            </CRow>

            <CRow className="mb-3 justify-content-center align-items-center">
                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                    <b>Chọn bến xe</b>
                </CFormLabel>
                <CCol sm="3">
                    <CFormSelect
                        value={curStartStation}
                        onChange={(e) => setCurStartStation(parseInt(e.target.value))}
                    >
                        <option value={-1} disabled>
                            Bến đi
                        </option>
                        {listStartStation.map((start, index) => (
                            <option key={index} value={index}>
                                {start}
                            </option>
                        ))}
                    </CFormSelect>
                </CCol>
                <CCol sm="2" className="d-flex justify-content-center align-items-center">
                    <CIcon icon={cilTransfer}></CIcon>
                </CCol>
                <CCol sm="3">
                    <CFormSelect
                        value={curEndStation}
                        onChange={(e) => setCurEndStation(parseInt(e.target.value))}
                    >
                        <option value={-1} disabled>
                            Bến đến
                        </option>
                        {listEndStation.map((end, index) => (
                            <option key={index} value={index}>
                                {end}
                            </option>
                        ))}
                    </CFormSelect>
                </CCol>
            </CRow>
            <CRow className="mb-3 justify-content-center align-items-center">
                <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                    <b>Chọn lộ trình</b>
                </CFormLabel>
                <CCol sm={8}>
                    <CFormSelect
                        value={curJourney}
                        onChange={(e) => setCurJourney(parseInt(e.target.value))}
                    >
                        <option value={-1} disabled>
                            Lộ trình di chuyển
                        </option>
                        {listJourney.map((journey, index) => (
                            <option key={index} value={index}>
                                {journey}
                            </option>
                        ))}
                    </CFormSelect>
                </CCol>
            </CRow>

            <ScheduleBox
                listTime={listTimeGo}
                addTime={addTime}
                removeTime={removeTime}
                turn={1}
            ></ScheduleBox>

            <ScheduleBox
                listTime={listTimeReturn}
                addTime={addTime}
                removeTime={removeTime}
                turn={0}
            ></ScheduleBox>
        </>
    )
}

const OpenForm = ({ visible, setVisible, preInfo }) => {
    const listOfficialRoute = useSelector(selectListOfficialRoute)
    const [companyInfo, setCompanyInfo] = useState({
        firmName: preInfo?.firmName,
        representName: preInfo?.representName,
        email: preInfo?.email,
        telephone: preInfo?.telephone,
        businessLicense: preInfo?.businessLicense,
    })
    const [error, setError] = useState('')
    const [validated, setValidated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(0)
    const [listCompanyRoute, setListCompanyRoute] = useState([
        {
            route: null,
            listTimeGo: [],
            listTimeReturn: [],
        },
    ])
    const companyInput = {
        firmName: {
            id: 1,
            name: 'firmName',
            type: 'text',
            placeholder: 'Nhập tên hãng xe',
            errorMessage: 'Tên hãng xe không được để trống',
            label: 'Tên hãng xe',
            pattern: '^.+$',
            required: true,
        },
        representName: {
            id: 2,
            name: 'representName',
            type: 'text',
            placeholder: 'Nhập tên người đại diện',
            errorMessage: 'Tên người đại diện không được để trống',
            label: 'Tên người đại diện',
            pattern: '^.{6,}$',
            required: true,
        },
        email: {
            id: 3,
            name: 'email',
            type: 'email',
            placeholder: 'Nhập email',
            errorMessage: 'Email không hợp lệ',
            label: 'Email',
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
            required: true,
        },
        telephone: {
            id: 4,
            name: 'telephone',
            type: 'text',
            placeholder: 'Nhập số điện thoại',
            errorMessage: 'Số điện thoại không hợp lệ',
            label: 'Nhập số điện thoại',
            pattern: '^[0-9]{10,11}$',
            required: true,
        },
        businessLicense: {
            id: 5,
            name: 'businessLicense',
            type: 'text',
            placeholder: 'Nhập số giấy phép kinh doanh',
            errorMessage: 'Số giấy phép không để trống',
            label: 'Số GPKD',
            pattern: '^.+$',
            required: true,
        },
    }
    const handleChangeCompanyInfo = (e) => {
        setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value })
    }
    const handleAddBus = (e) => {
        e.preventDefault()
        setLoading(true)
    }
    const reset = () => {
        setCompanyInfo({
            firmName: '',
            representName: '',
            email: '',
            telephone: '',
            businessLicense: '',
        })
    }
    const updateCompanyRoute = (index, route, listGo, listReturn) => {
        const routeData = {
            route: route,
            listTimeGo: listGo,
            listTimeReturn: listReturn,
        }
        setListCompanyRoute((prevRoutes) => {
            const newRoutes = [...prevRoutes]
            newRoutes[index] = routeData
            return newRoutes
        })
    }
    const addRouteTab = () => {
        let newRoutes = []
        setListCompanyRoute((prevRoutes) => {
            newRoutes = [...prevRoutes]
            newRoutes.push({
                route: null,
                listTimeGo: [],
                listTimeReturn: [],
            })
            return newRoutes
        })
        setActiveTab(newRoutes.length)
    }
    const removeRouteTab = (index) => {
        if (listCompanyRoute.length === 1) return
        setListCompanyRoute((prevRoutes) => {
            const newRoutes = prevRoutes.filter((route, i) => i !== index)
            return newRoutes
        })
        setActiveTab(index)
    }
    return (
        <CModal
            alignment="center"
            backdrop="static"
            scrollable
            visible={visible}
            size="lg"
            onClose={() => setVisible(false)}
        >
            <CModalHeader>
                <CModalTitle>Thêm nhà xe</CModalTitle>
            </CModalHeader>
            <CModalBody className="p-4">
                <CRow>
                    <CCard className="w-100 p-0">
                        <CCardHeader className="bg-info">
                            <b>Thông tin nhà xe</b>
                        </CCardHeader>
                        <CCardBody>
                            <Tabs
                                className="tabStyle"
                                selectedIndex={activeTab}
                                onSelect={(index) => setActiveTab(index)}
                            >
                                <TabList>
                                    <Tab>Liên hệ</Tab>
                                    {listCompanyRoute.map((route, index) => (
                                        <Tab key={index}>{`Tuyến xe ${index + 1}`}</Tab>
                                    ))}
                                </TabList>
                                <TabPanel>
                                    <CForm
                                        className="w-100"
                                        noValidate
                                        validated={validated}
                                        onSubmit={handleAddBus}
                                    >
                                        <CRow className="mb-3 justify-content-center align-items-center">
                                            <CFormLabel
                                                htmlFor="name"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Tên nhà xe</b>
                                            </CFormLabel>
                                            <CCol sm={8}>
                                                <CFormInput
                                                    type="text"
                                                    id="firmName"
                                                    name={companyInput.firmName.name}
                                                    pattern={companyInput.firmName.pattern}
                                                    required={companyInput.firmName.required}
                                                    value={companyInfo.firmName}
                                                    onChange={handleChangeCompanyInfo}
                                                />
                                                <CFormFeedback invalid>
                                                    {companyInput.firmName.errorMessage}
                                                </CFormFeedback>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center align-items-center">
                                            <CFormLabel
                                                htmlFor="name"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Đại diện</b>
                                            </CFormLabel>
                                            <CCol sm={3}>
                                                <CFormInput
                                                    type="text"
                                                    id="representName"
                                                    name={companyInput.representName.name}
                                                    pattern={companyInput.representName.pattern}
                                                    value={companyInfo.representName}
                                                    onChange={handleChangeCompanyInfo}
                                                />
                                                <CFormFeedback invalid>
                                                    {companyInput.representName.errorMessage}
                                                </CFormFeedback>
                                            </CCol>
                                            <CFormLabel
                                                htmlFor="color"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Số điện thoại</b>
                                            </CFormLabel>
                                            <CCol sm={3}>
                                                <CFormInput
                                                    type="text"
                                                    id="telephone"
                                                    required={companyInput.telephone.required}
                                                    pattern={companyInput.telephone.pattern}
                                                    value={companyInfo.telephone}
                                                    onChange={handleChangeCompanyInfo}
                                                />
                                                <CFormFeedback invalid>
                                                    {companyInput.telephone.errorMessage}
                                                </CFormFeedback>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center align-items-center">
                                            <CFormLabel
                                                htmlFor="color"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Email</b>
                                            </CFormLabel>
                                            <CCol sm={8}>
                                                <CFormInput
                                                    type="text"
                                                    id="email"
                                                    required={companyInput.email.required}
                                                    pattern={companyInput.email.pattern}
                                                    value={companyInfo.email}
                                                    onChange={handleChangeCompanyInfo}
                                                />
                                                <CFormFeedback invalid>
                                                    {companyInput.email.errorMessage}
                                                </CFormFeedback>
                                            </CCol>
                                        </CRow>

                                        <CRow className="mb-3 justify-content-center align-items-center">
                                            <CFormLabel
                                                htmlFor="color"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Số giấy phép kinh doanh</b>
                                            </CFormLabel>
                                            <CCol sm={8}>
                                                <CFormInput
                                                    type="text"
                                                    id="businessLicense"
                                                    required={companyInput.businessLicense.required}
                                                    pattern={companyInput.businessLicense.pattern}
                                                    value={companyInfo.businessLicense}
                                                    onChange={handleChangeCompanyInfo}
                                                />
                                                <CFormFeedback invalid>
                                                    {companyInput.businessLicense.errorMessage}
                                                </CFormFeedback>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center align-items-center">
                                            <CustomButton
                                                text="Thêm"
                                                type="submit"
                                                loading={loading}
                                                color="success"
                                                style={{ width: '100px', marginRight: '10px' }}
                                            ></CustomButton>
                                            <CButton
                                                variant="outline"
                                                style={{ width: '100px' }}
                                                color="danger"
                                                onClick={reset}
                                            >
                                                Hủy
                                            </CButton>
                                        </CRow>
                                    </CForm>
                                </TabPanel>
                                {listCompanyRoute.map((route, index) => (
                                    <TabPanel key={index}>
                                        <CForm>
                                            <CompanyRoute
                                                key={index}
                                                id={index}
                                                addCompanyRoute={updateCompanyRoute}
                                            ></CompanyRoute>
                                            <div className="d-flex justify-content-end">
                                                <CButtonGroup role="group" aria-label="route">
                                                    <CButton
                                                        color="success"
                                                        variant="outline"
                                                        onClick={addRouteTab}
                                                    >
                                                        Thêm tuyến
                                                    </CButton>
                                                    {index > 0 && (
                                                        <CButton
                                                            color="danger"
                                                            variant="outline"
                                                            onClick={() => removeRouteTab(index)}
                                                        >
                                                            Xoá tuyến
                                                        </CButton>
                                                    )}
                                                </CButtonGroup>
                                            </div>
                                        </CForm>
                                    </TabPanel>
                                ))}
                            </Tabs>
                        </CCardBody>
                        <CCardFooter className="bg-light">{error !== '' ? error : ''}</CCardFooter>
                    </CCard>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton
                    color="secondary"
                    onClick={() => setVisible(false)}
                    style={{ width: 'fit-content' }}
                >
                    Đóng
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

const Company = () => {
    const dispatch = useDispatch()
    const listRoute = useSelector(selectListOfficialRoute)
    const [openAddForm, setOpenAddForm] = useState(false)
    const [preInfo, setPreInfo] = useState({
        firmName: 'Xe Nguyễn Hưng',
        representName: 'Nguyễn Hưng',
        email: 'hung@gmail.com',
        telephone: '0583094584',
        businessLicense: '123456789',
    })
    useEffect(() => {
        if (listRoute.length === 0)
            dispatch(routeThunk.getOfficialRoute())
                .unwrap()
                .then(() => {})
                .catch(() => {})
    }, [])
    return (
        <div>
            <CButton onClick={() => setOpenAddForm(true)}>Thêm nhà xe</CButton>
            {openAddForm && (
                <OpenForm visible={openAddForm} setVisible={setOpenAddForm} preInfo={preInfo} />
            )}
        </div>
    )
}

export default Company
