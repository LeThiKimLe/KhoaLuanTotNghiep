import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CForm,
    CFormFeedback,
    CFormLabel,
    CCol,
    CRow,
    CFormInput,
    CCardFooter,
    CToaster,
    CButton,
    CTable,
    CTableBody,
    CTableRow,
    CTableDataCell,
    CTableHeaderCell,
    CTableHead,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
} from '@coreui/react'
import { companyActions, selectCurCompany } from 'src/feature/bus-company/busCompany.slice'
import { companyInput } from 'src/utils/constants'
import { useState, useRef } from 'react'
import companyThunk from 'src/feature/bus-company/busCompany.service'
import { CustomToast } from 'src/views/customToast/CustomToast'
import scheduleThunk from 'src/feature/schedule/schedule.service'
import { useEffect } from 'react'
import { selectListFixSchedule } from 'src/feature/schedule/schedule.slice'
import CustomButton from 'src/views/customButton/CustomButton'
import { selectListAssign } from 'src/feature/bus-company/busCompany.slice'
import { selectListOfficialRoute, selectListRoute } from 'src/feature/route/route.slice'
import { getRouteJourney } from 'src/utils/tripUtils'
import { CompanyRoute } from './Company'
import { dayInWeek } from 'src/utils/constants'
import { TIME_TABLE, COLOR } from 'src/utils/constants'
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs'
import { convertTimeToInt } from 'src/utils/convertUtils'
import CIcon from '@coreui/icons-react'
import { cilTransfer } from '@coreui/icons'
const ScheduleWrap = ({ schedule, turn }) => {
    const getScheduleColor = () => {
        if (turn === true) return 'success'
        else return 'warning'
    }
    return (
        <CTable bordered className="mb-1">
            <CTableBody>
                <CTableRow>
                    <CTableDataCell className="text-center p-0">
                        <CCard color={getScheduleColor()} style={{ borderRadius: '0' }}>
                            <CCardBody className="p-1">
                                <b>{schedule.time.slice(0, -3)}</b>
                            </CCardBody>
                        </CCard>
                    </CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>
    )
}

const TableSchedule = ({ listFixSchedule, tripGoId }) => {
    const filterTime = (listSchd, time) => {
        //sort list based on time
        listSchd.sort((a, b) => {
            const timeA = convertTimeToInt(a.time.slice(0, -3))
            const timeB = convertTimeToInt(b.time.slice(0, -3))
            if (timeA > timeB) return 1
            if (timeA < timeB) return -1
            return 0
        })
        if (time === 'morning')
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.time.slice(0, -3)) >= 6 &&
                    convertTimeToInt(schd.time.slice(0, -3)) < 12,
            )
        else if (time === 'afternoon')
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.time.slice(0, -3)) >= 12 &&
                    convertTimeToInt(schd.time.slice(0, -3)) < 18,
            )
        else if (time === 'evening')
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.time.slice(0, -3)) >= 18 &&
                    convertTimeToInt(schd.time.slice(0, -3)) < 24,
            )
        else
            return listSchd.filter(
                (schd) =>
                    convertTimeToInt(schd.time.slice(0, -3)) >= 0 &&
                    convertTimeToInt(schd.time.slice(0, -3)) < 6,
            )
    }
    return (
        <div>
            <CTable stripedColumns bordered>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Buổi</CTableHeaderCell>
                        {Array.from({ length: 7 }, (_, index) => index).map((dayIndex) => (
                            <CTableHeaderCell key={dayIndex} className="text-center" scope="col">
                                <b>
                                    <i>{dayInWeek[dayIndex]}</i>
                                </b>
                            </CTableHeaderCell>
                        ))}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {Object.keys(TIME_TABLE).map((key) => (
                        <CTableRow color={TIME_TABLE[key].color} key={key}>
                            <CTableHeaderCell scope="row">
                                <i>{TIME_TABLE[key].label}</i>
                                <div>{`(${TIME_TABLE[key].from}h - ${TIME_TABLE[key].to}h)`}</div>
                            </CTableHeaderCell>
                            {Array.from({ length: 7 }, (_, index) => index).map((dayIndex) => (
                                <CTableDataCell key={dayIndex}>
                                    {filterTime(
                                        listFixSchedule.filter(
                                            (schd) => schd.dayOfWeek === dayIndex + 2,
                                        ),
                                        key,
                                    ).map((schedule) => (
                                        <ScheduleWrap
                                            key={schedule.id}
                                            schedule={schedule}
                                            turn={schedule.trip.id === tripGoId}
                                        ></ScheduleWrap>
                                    ))}
                                </CTableDataCell>
                            ))}
                        </CTableRow>
                    ))}
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
        </div>
    )
}

const RouteInfo = ({ route, fixSchedule }) => {
    const [companyRouteData, setCompanyRouteData] = useState(null)
    const listOfficialRoute = useSelector(selectListOfficialRoute)
    const [officialRoute, setOfficialRoute] = useState(null)
    const tripGo = route.trips[0]
    const tripBack = route.trips[1]
    const updateCompanyData = () => {
        const offRoute = listOfficialRoute.find(
            (r) =>
                ((r.departure === route.departure && r.destination === route.destination) ||
                    (r.departure === route.destination && r.destination === route.departure)) &&
                r.startStation === tripGo.startStation.name &&
                r.endStation === tripGo.endStation.name &&
                r.journey === route.schedule,
        )
        setOfficialRoute(offRoute)
    }
    useEffect(() => {
        updateCompanyData()
    }, [])
    return (
        <div>
            <Tabs className="tabStyle">
                <TabList>
                    <Tab>Thông tin tuyến</Tab>
                    <Tab>Lịch trình</Tab>
                </TabList>
                <TabPanel>
                    <CRow className="mb-3 justify-content-center align-items-center">
                        <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                            <b>Tỉnh đi - đến</b>
                        </CFormLabel>
                        <CCol sm="3">
                            <CFormInput readOnly value={route.departure.name}></CFormInput>
                        </CCol>
                        <CCol sm="2" className="d-flex justify-content-center align-items-center">
                            <CIcon icon={cilTransfer}></CIcon>
                        </CCol>
                        <CCol sm="3">
                            <CFormInput readOnly value={route.destination.name}></CFormInput>
                        </CCol>
                    </CRow>

                    <CRow className="mb-3 justify-content-center align-items-center">
                        <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                            <b>Bến đi - đến</b>
                        </CFormLabel>
                        <CCol sm="3">
                            <CFormInput readOnly value={tripGo.startStation.name}></CFormInput>
                        </CCol>
                        <CCol sm="2" className="d-flex justify-content-center align-items-center">
                            <CIcon icon={cilTransfer}></CIcon>
                        </CCol>
                        <CCol sm="3">
                            <CFormInput readOnly value={tripGo.endStation.name}></CFormInput>
                        </CCol>
                    </CRow>
                    <CRow className="mb-3 justify-content-center align-items-center">
                        <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                            <b>Lộ trình</b>
                        </CFormLabel>
                        <CCol sm={8}>
                            <CFormInput readOnly value={route.schedule}></CFormInput>
                        </CCol>
                    </CRow>
                </TabPanel>
                <TabPanel>
                    <TableSchedule
                        listFixSchedule={fixSchedule}
                        tripGoId={tripGo.id}
                    ></TableSchedule>
                </TabPanel>
            </Tabs>
        </div>
    )
}

const CompanyDetail = () => {
    const curCompany = useSelector(selectCurCompany)
    const [validated, setValidated] = useState(false)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [isUpdate, setIsUpdate] = useState(false)
    const listFixSchedule = useSelector(selectListFixSchedule)
    const listCurFix = listFixSchedule.filter((schedule) => {
        if (schedule.trip && schedule.trip.busCompany)
            return schedule.trip.busCompany.id === curCompany.id
        else return false
    })
    const [companyInfo, setCompanyInfo] = useState({
        firmName: curCompany ? curCompany.name : '',
        representName: curCompany ? curCompany.admin.staffUser.name : '',
        email: curCompany ? curCompany.admin.staffUser.email : '',
        idCard: curCompany ? curCompany.admin.staffUser.staff.idCard : '',
        telephone: curCompany ? curCompany.admin.staffUser.tel : '',
        businessLicense: curCompany ? curCompany.businessLicense : '',
        address: curCompany ? curCompany.admin.staffUser.staff.address : '',
    })
    const listAssign = useSelector(selectListAssign)
    const curAssign = listAssign.filter((assign) => assign.busCompanyId === curCompany.id)
    const listRoute = useSelector(selectListRoute)
    const handleChangeCompanyInfo = (e) => {
        setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value })
    }
    const dataForm = useRef(null)
    const handleUpdateInfo = () => {
        if (isUpdate) {
            if (dataForm.current.checkValidity() === true) {
                setValidated(true)
                setLoading(true)
                const companyData = {
                    id: curCompany.id,
                    representName: companyInfo.representName,
                    email: companyInfo.email,
                    telephone: companyInfo.telephone,
                    idCard: companyInfo.idCard,
                    address: companyInfo.address,
                    beginWorkDate: curCompany.coopDay,
                    firmName: companyInfo.firmName,
                    businessLicense: companyInfo.businessLicense,
                }
                dispatch(companyThunk.editCompanyInfor(companyData))
                    .unwrap()
                    .then((res) => {
                        dispatch(companyActions.setCurCompany(res))
                        setLoading(false)
                        setIsUpdate(false)
                        addToast(() =>
                            CustomToast({
                                message: 'Sửa thông tin thành công',
                                type: 'success',
                            }),
                        )
                    })
                    .catch((err) => {
                        setLoading(false)
                        addToast(() =>
                            CustomToast({
                                message: err.message || err,
                                type: 'error',
                            }),
                        )
                    })
            } else {
                setValidated(true)
            }
        } else {
            setIsUpdate(true)
        }
    }
    const handleCancel = () => {
        setIsUpdate(false)
        setCompanyInfo({
            firmName: curCompany ? curCompany.name : '',
            representName: curCompany ? curCompany.admin.staffUser.name : '',
            email: curCompany ? curCompany.admin.staffUser.email : '',
            idCard: curCompany ? curCompany.admin.staffUser.staff.idCard : '',
            telephone: curCompany ? curCompany.admin.staffUser.tel : '',
            businessLicense: curCompany ? curCompany.businessLicense : '',
            address: curCompany ? curCompany.admin.staffUser.staff.address : '',
        })
    }
    useEffect(() => {
        dispatch(scheduleThunk.getFixSchedule())
    }, [])
    return (
        <div>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <CCard className="my-3">
                <CCardHeader style={{ backgroundColor: '#ccc' }}>Thông tin liên hệ</CCardHeader>
                <CCardBody>
                    <CForm className="w-100" noValidate validated={validated} ref={dataForm}>
                        <CRow className="mb-3 justify-content-center align-items-center">
                            <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                                <b>Tên nhà xe</b>
                            </CFormLabel>
                            <CCol sm={8}>
                                <CFormInput
                                    type="text"
                                    id="firmName"
                                    readOnly={!isUpdate}
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
                            <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                                <b>Đại diện</b>
                            </CFormLabel>
                            <CCol sm={3}>
                                <CFormInput
                                    type="text"
                                    id="representName"
                                    readOnly={!isUpdate}
                                    name={companyInput.representName.name}
                                    pattern={companyInput.representName.pattern}
                                    value={companyInfo.representName}
                                    onChange={handleChangeCompanyInfo}
                                />
                                <CFormFeedback invalid>
                                    {companyInput.representName.errorMessage}
                                </CFormFeedback>
                            </CCol>
                            <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                                <b>Số điện thoại</b>
                            </CFormLabel>
                            <CCol sm={3}>
                                <CFormInput
                                    type="text"
                                    id="telephone"
                                    name="telephone"
                                    readOnly={!isUpdate}
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
                            <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                                <b>CCCD</b>
                            </CFormLabel>
                            <CCol sm={8}>
                                <CFormInput
                                    type="text"
                                    id="idCard"
                                    name="idCard"
                                    readOnly={!isUpdate}
                                    required={companyInput.idCard.required}
                                    pattern={companyInput.idCard.pattern}
                                    value={companyInfo.idCard}
                                    onChange={handleChangeCompanyInfo}
                                />
                                <CFormFeedback invalid>
                                    {companyInput.idCard.errorMessage}
                                </CFormFeedback>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3 justify-content-center align-items-center">
                            <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                                <b>Email</b>
                            </CFormLabel>
                            <CCol sm={8}>
                                <CFormInput
                                    type="text"
                                    id="email"
                                    name="email"
                                    readOnly={!isUpdate}
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
                            <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                                <b>Địa chỉ</b>
                            </CFormLabel>
                            <CCol sm={8}>
                                <CFormInput
                                    type="text"
                                    id="address"
                                    name="address"
                                    readOnly={!isUpdate}
                                    required={companyInput.address.required}
                                    pattern={companyInput.address.pattern}
                                    value={companyInfo.address}
                                    onChange={handleChangeCompanyInfo}
                                />
                                <CFormFeedback invalid>
                                    {companyInput.address.errorMessage}
                                </CFormFeedback>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3 justify-content-center align-items-center">
                            <CFormLabel htmlFor="color" className="col-sm-2 col-form-label">
                                <b>Số giấy phép kinh doanh</b>
                            </CFormLabel>
                            <CCol sm={8}>
                                <CFormInput
                                    type="text"
                                    id="businessLicense"
                                    name="businessLicense"
                                    readOnly={!isUpdate}
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
                    </CForm>
                </CCardBody>
                <CCardFooter className="d-flex justify-content-center align-items-center gap-3">
                    <CustomButton
                        color="success"
                        onClick={handleUpdateInfo}
                        text={isUpdate ? 'Lưu' : 'Sửa thông tin'}
                        loading={loading}
                    ></CustomButton>
                    {isUpdate && (
                        <CButton variant="outline" color="danger" onClick={handleCancel}>
                            Hủy
                        </CButton>
                    )}
                </CCardFooter>
            </CCard>
            <CCard className="my-3">
                <CCardHeader style={{ backgroundColor: '#ccc' }}>Thông tin tuyến xe</CCardHeader>
                <CCardBody>
                    {curAssign.length > 0 ? (
                        <CAccordion flush>
                            {curAssign.map((assign, index) => (
                                <CAccordionItem itemKey={index} key={index}>
                                    <CAccordionHeader>{`Tuyến ${index + 1}: ${getRouteJourney(
                                        listRoute.find((route) => route.id === assign.routeId),
                                    )}`}</CAccordionHeader>
                                    <CAccordionBody>
                                        <RouteInfo
                                            route={listRoute.find(
                                                (route) => route.id === assign.routeId,
                                            )}
                                            fixSchedule={listCurFix.filter((schedule) => {
                                                if (schedule.trip && schedule.trip.route)
                                                    return schedule.trip.route.id === assign.routeId
                                                else return false
                                            })}
                                        ></RouteInfo>
                                    </CAccordionBody>
                                </CAccordionItem>
                            ))}
                        </CAccordion>
                    ) : (
                        <div>Chưa có tuyến xe</div>
                    )}
                </CCardBody>
            </CCard>
            <CCard className="my-3">
                <CCardHeader style={{ backgroundColor: '#ccc' }}>Đánh giá nhà xe</CCardHeader>
                <CCardBody></CCardBody>
            </CCard>
        </div>
    )
}

export default CompanyDetail
