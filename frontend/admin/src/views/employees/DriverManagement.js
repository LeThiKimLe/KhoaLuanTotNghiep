import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import staffThunk from 'src/feature/staff/staff.service'
import { useEffect, useState, useRef } from 'react'
import { selectListDriver, selectLoadingState, selectRedirect } from 'src/feature/staff/staff.slice'
import 'react-datepicker/dist/react-datepicker.css'
import {
    CTable,
    CTableBody,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
    CTableHead,
    CCardFooter,
    CCard,
    CCardBody,
    CForm,
    CFormLabel,
    CFormInput,
    CFormSelect,
    CButton,
    CToaster,
    CRow,
    CCol,
    CFormFeedback,
    CModalFooter,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CCardHeader,
    CSpinner,
    CFormCheck,
} from '@coreui/react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import DatePicker from 'react-datepicker'
import CustomButton from '../customButton/CustomButton'
import { CustomToast } from '../customToast/CustomToast'
import { staffAction } from 'src/feature/staff/staff.slice'
import { convertToDisplayDate, convertDataTimeToDisplayDate } from 'src/utils/convertUtils'
import CIcon from '@coreui/icons-react'
import { cilReload, cilSend, cilVerticalAlignBottom } from '@coreui/icons'
import format from 'date-fns/format'
import { selectListCompanyRoute, selectListRoute } from 'src/feature/route/route.slice'
import routeThunk from 'src/feature/route/route.service'
import { getTripJourney, getRouteJourney } from 'src/utils/tripUtils'
import { selectCompanyId } from 'src/feature/auth/auth.slice'
import { tripProcess } from 'src/utils/tripUtils'
import TripPicker from 'src/components/TripPicker'
import axios from 'axios'
import { SAMPLE_FILE_TYPE } from 'src/utils/constants'
const AddDriverForm = ({ visible, setVisible, finishAddDriver, currentTrip, currentRoute }) => {
    const [validated, setValidated] = useState(false)
    const listRoute = useSelector(selectListCompanyRoute)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [gender, setGender] = useState(false)
    const [idCard, setIdCard] = useState('')
    const [address, setAddress] = useState('')
    const [driverLicense, setDriverLicense] = useState('D')
    const [licenseNumber, setLicenseNumber] = useState('')
    const [issueDate, setIssueDate] = useState(new Date())
    const [beginWorkDate, setBeginWorkDate] = useState(new Date())
    const [error, setError] = useState('')
    const errorShow = useRef(null)
    const dispatch = useDispatch()
    const loading = useSelector(selectLoadingState)
    const [curRoute, setCurRoute] = useState(currentRoute ? currentRoute : 0)
    const [curTrip, setCurTrip] = useState(currentTrip ? currentTrip : 0)
    const [file, setFile] = useState(undefined)
    const [errorFile, setErrorFile] = useState('')
    const [loadingUpload, setLoadingUpload] = useState(false)
    const addDriverToTrip = (driverId) => {
        if (curTrip !== 0)
            dispatch(
                staffThunk.distributeDriver({
                    tripId: curTrip,
                    driverId: driverId,
                }),
            )
                .unwrap()
                .then(() => {})
                .catch(() => {})
    }
    const handleAddDriver = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
            setValidated(true)
            const driverInfor = {
                name: name,
                email: email,
                tel: tel,
                gender: gender,
                idCard: idCard,
                address: address,
                driverLicense: driverLicense,
                beginWorkDate: format(beginWorkDate, 'yyyy-MM-dd'),
                licenseNumber: licenseNumber,
                issueDate: format(issueDate, 'yyyy-MM-dd'),
            }
            dispatch(staffThunk.addDriver(driverInfor))
                .unwrap()
                .then((res) => {
                    setError('')
                    setVisible(false)
                    if (res.driver) addDriverToTrip(res.driver.driverId)
                    finishAddDriver()
                })
                .catch((error) => {
                    setError(error.toString())
                })
        }
        setValidated(true)
    }
    const getListTrip = (routeId) => {
        const routeIn = listRoute.find((rt) => rt.id == routeId)
        var listTrip = []
        var tempTrip = null
        routeIn.trips.forEach((trip) => {
            if (trip.active === true) {
                tempTrip = listTrip.find(
                    (tp) =>
                        (tp.startStation.id === trip.startStation.id &&
                            tp.endStation.id === trip.endStation.id) ||
                        (tp.startStation.id === trip.endStation.id &&
                            tp.endStation.id === trip.startStation.id),
                )
                if (!tempTrip) listTrip.push(trip)
            }
        })
        return listTrip
    }
    const handleUpFile = (e) => {
        setFile(e.target.files[0])
    }
    const handleImportExcelFile = () => {
        if (file) {
            setLoadingUpload(true)
            dispatch(staffThunk.uploadDriverFile(file))
                .unwrap()
                .then(() => {
                    setError('')
                    setLoadingUpload(false)
                    setVisible(false)
                    finishAddDriver()
                })
                .catch((err) => {
                    setLoadingUpload(false)
                    setErrorFile(err)
                })
        }
    }
    const handleDownloadSampleFile = () => {
        const fileType = SAMPLE_FILE_TYPE.driver
        const baseURL = process.env.REACT_APP_API_URL
        axios({
            url: baseURL + 'infomation/download-sample',
            method: 'GET',
            responseType: 'blob',
            params: {
                fileType: fileType,
            },
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `${fileType}.xlsx`)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                setErrorFile('')
            })
            .catch((error) => {
                setErrorFile('Có lỗi xảy ra khi tải file')
            })
    }
    const reset = () => {
        setValidated(false)
        setName('')
        setEmail('')
        setTel('')
        setGender(false)
        setIdCard('')
        setAddress('')
        setBeginWorkDate(new Date())
        setLicenseNumber('')
        setIssueDate(new Date())
        setError('')
    }
    useEffect(() => {
        if (visible) {
            reset()
            setCurRoute(currentRoute)
            setCurTrip(currentTrip)
        }
    }, [visible])
    useEffect(() => {
        if (error != '') {
            errorShow.current.scrollIntoView()
        }
    }, [error])
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
                <CModalTitle>Thêm tài xế</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <Tabs className="tabStyle">
                    <TabList>
                        <Tab>Dữ liệu thủ công</Tab>
                        <Tab>Dữ liệu Excel</Tab>
                    </TabList>
                    <TabPanel>
                        <CRow>
                            <CCard className="mt-3 p-0">
                                <CCardHeader className="bg-info">
                                    <b>Thông tin tài xế</b>
                                </CCardHeader>
                                <CCardBody>
                                    <CForm
                                        className="w-100"
                                        noValidate
                                        validated={validated}
                                        onSubmit={handleAddDriver}
                                    >
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="name"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Họ tên</b>
                                            </CFormLabel>
                                            <CCol sm={8}>
                                                <CFormInput
                                                    type="text"
                                                    id="name"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <CFormFeedback invalid>
                                                    Tên không được bỏ trống
                                                </CFormFeedback>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="email"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Email</b>
                                            </CFormLabel>
                                            <CCol sm={8}>
                                                <CFormInput
                                                    type="email"
                                                    id="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <CFormFeedback invalid>
                                                    Điền đúng định dạng email
                                                </CFormFeedback>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="tel"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>SĐT</b>
                                            </CFormLabel>
                                            <CCol sm={3}>
                                                <CFormInput
                                                    type="text"
                                                    id="tel"
                                                    patterns="^(0\d{9,10}|\+\d{1,3}\s?\d{1,14})$"
                                                    value={tel}
                                                    onChange={(e) => setTel(e.target.value)}
                                                    required
                                                />
                                                <CFormFeedback invalid>
                                                    Điền đúng định dạng số điện thoại
                                                </CFormFeedback>
                                            </CCol>
                                            <CFormLabel
                                                htmlFor="gender"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Giới tính</b>
                                            </CFormLabel>
                                            <CCol sm={3}>
                                                <CFormSelect
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                >
                                                    <option value={true}>Nữ</option>
                                                    <option value={false}>Nam</option>
                                                </CFormSelect>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="email"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Số CCCD</b>
                                            </CFormLabel>
                                            <CCol sm={8}>
                                                <CFormInput
                                                    type="text"
                                                    id="cccd"
                                                    pattern="\d{9}|\d{12}"
                                                    required
                                                    value={idCard}
                                                    onChange={(e) => setIdCard(e.target.value)}
                                                />
                                                <CFormFeedback invalid>
                                                    Hãy điền đúng định dạng căn cước
                                                </CFormFeedback>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="address"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Địa chỉ</b>
                                            </CFormLabel>
                                            <CCol sm={8}>
                                                <CFormInput
                                                    type="text"
                                                    id="address"
                                                    required
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                                <CFormFeedback invalid>
                                                    Địa chỉ không được bỏ trống
                                                </CFormFeedback>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center align-items-center">
                                            <CFormLabel
                                                htmlFor="datework"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Ngày vào làm</b>
                                            </CFormLabel>
                                            <CCol sm={3}>
                                                <DatePicker
                                                    selected={beginWorkDate}
                                                    onChange={(date) => setBeginWorkDate(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Chọn ngày"
                                                    maxDate={new Date()}
                                                    className="form-control"
                                                />
                                            </CCol>
                                            <CFormLabel
                                                htmlFor="datework"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Hạng GPLX</b>
                                            </CFormLabel>
                                            <CCol sm={3}>
                                                <CFormSelect
                                                    value={driverLicense}
                                                    onChange={(e) =>
                                                        setDriverLicense(e.target.value)
                                                    }
                                                >
                                                    <option value={'D'} label="D"></option>
                                                    <option value={'E'} label="E"></option>
                                                </CFormSelect>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="license"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Số bằng lái</b>
                                            </CFormLabel>
                                            <CCol sm={3}>
                                                <CFormInput
                                                    type="text"
                                                    id="license"
                                                    patterns="\d{12}"
                                                    value={licenseNumber}
                                                    onChange={(e) =>
                                                        setLicenseNumber(e.target.value)
                                                    }
                                                    required
                                                />
                                                <CFormFeedback invalid>
                                                    Điền đúng định dạng số bằng lái
                                                </CFormFeedback>
                                            </CCol>
                                            <CFormLabel
                                                htmlFor="gender"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Ngày cấp</b>
                                            </CFormLabel>
                                            <CCol sm={3}>
                                                <DatePicker
                                                    selected={issueDate}
                                                    onChange={(date) => setIssueDate(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Chọn ngày"
                                                    maxDate={new Date()}
                                                    className="form-control"
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3 justify-content-center">
                                            <CFormLabel
                                                htmlFor="color"
                                                className="col-sm-2 col-form-label"
                                            >
                                                <b>Chọn tuyến</b>
                                            </CFormLabel>
                                            <CCol sm="8">
                                                {/* <CFormSelect
                                            value={curRoute}
                                            onChange={(e) => setCurRoute(parseInt(e.target.value))}
                                        >
                                            <option value={0} disabled>
                                                Chọn tuyến
                                            </option>
                                            {listRoute.map((route) => (
                                                <option key={route.id} value={route.id}>
                                                    {getRouteJourney(route)}
                                                </option>
                                            ))}
                                        </CFormSelect> */}
                                                <TripPicker
                                                    listRoute={listRoute}
                                                    route={curRoute}
                                                    setRoute={setCurRoute}
                                                    trip={curTrip}
                                                    setTrip={setCurTrip}
                                                    baseOption={{
                                                        label: 'Chọn tuyến xe',
                                                        value: 0,
                                                    }}
                                                ></TripPicker>
                                            </CCol>
                                        </CRow>
                                        {/* {curRoute !== 0 && (
                                    <CRow className="mb-3 justify-content-center align-items-center">
                                        <CFormLabel
                                            htmlFor="color"
                                            className="col-sm-2 col-form-label"
                                        >
                                            <b>Chọn tuyến xe</b>
                                        </CFormLabel>
                                        <CCol sm="8">
                                            {getListTrip(curRoute).map((trip) => (
                                                <CFormCheck
                                                    type="radio"
                                                    key={trip.id}
                                                    name="tripOptions"
                                                    required
                                                    id={trip.id}
                                                    value={trip.id}
                                                    label={getTripJourney(trip)}
                                                    checked={curTrip == trip.id}
                                                    onChange={() => setCurTrip(parseInt(trip.id))}
                                                />
                                            ))}
                                        </CCol>
                                    </CRow>
                                )} */}
                                        <CRow className="mb-3 justify-content-center">
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
                                </CCardBody>
                                <CCardFooter className="bg-light text-danger" ref={errorShow}>
                                    {error !== '' ? error : ''}
                                </CCardFooter>
                            </CCard>
                        </CRow>
                    </TabPanel>
                    <TabPanel>
                        <CRow className="justify-content-center">
                            <CCol md="5">
                                <CFormInput
                                    type="file"
                                    accept=".xls,.xlsx"
                                    onChange={handleUpFile}
                                ></CFormInput>
                            </CCol>
                            <CCol md="3">
                                <CButton variant="outline" onClick={handleDownloadSampleFile}>
                                    <CIcon icon={cilVerticalAlignBottom}></CIcon>
                                    Tải file mẫu
                                </CButton>
                            </CCol>
                            <CCol md="4" className="d-flex justify-content-end">
                                <CustomButton
                                    color="success"
                                    onClick={handleImportExcelFile}
                                    loading={loadingUpload}
                                >
                                    <CIcon icon={cilSend}></CIcon>
                                    Lưu dữ liệu
                                </CustomButton>
                            </CCol>
                        </CRow>
                        <div className="mt-3">
                            <b>Thông tin về mã tuyến dùng trong file</b>
                            <CTable striped className="p-2">
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Tuyến</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Mã tuyến</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {tripProcess(listRoute).map((trip, index) => (
                                        <CTableRow key={index}>
                                            <CTableHeaderCell scope="row">
                                                {index + 1}
                                            </CTableHeaderCell>
                                            <CTableDataCell>
                                                {getRouteJourney(trip.route)}
                                            </CTableDataCell>
                                            <CTableDataCell>{trip.routeCode}</CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </div>
                        <CRow className="mt-2">
                            <i style={{ color: 'red' }}>{errorFile != '' ? errorFile : ''}</i>
                        </CRow>
                    </TabPanel>
                </Tabs>
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

const DriverManagement = () => {
    const listDriver = useSelector(selectListDriver)
    const listRoute = useSelector(selectListCompanyRoute)
    const [showAddForm, setShowAddForm] = useState(false)
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [loading, setLoading] = useState(false)
    const [loadingDriver, setLoadingDriver] = useState(false)
    const redirect = useSelector(selectRedirect)
    const [curRoute, setCurRoute] = useState(redirect.currentRoute)
    const [curTrip, setCurTrip] = useState(redirect.currentTrip)
    const [listFullDriver, setListFullDriver] = useState([])
    const [listCurDriver, setListCurDriver] = useState(
        listDriver.map((drv) => ({ ...drv, trip: 0 })),
    )
    const dispatch = useDispatch()
    const reloadListDriver = () => {
        setLoading(true)
        dispatch(staffThunk.getDrivers())
            .unwrap()
            .then(() => {
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
        if (curTrip !== 0) {
            dispatch(staffThunk.getTripDriver(curTrip))
                .unwrap()
                .then((res) => {
                    setListCurDriver(res)
                    setLoading(false)
                })
                .catch(() => {
                    setListCurDriver([])
                    setLoading(false)
                })
        }
    }

    const handleGetTripDriver = async () => {
        const listTrip = tripProcess(listRoute)
        if (listTrip.length === 0) return
        setLoading(true)
        const listTemp = listDriver.map((drv) => ({ ...drv, trip: 0 }))
        for (let i = 0; i < listTrip.length; i++) {
            await dispatch(staffThunk.getTripDriver(listTrip[i].turnGo.id))
                .unwrap()
                .then((res) => {
                    for (let j = 0; j < res.length; j++) {
                        const index = listTemp.findIndex((drv) => drv.id === res[j].id)
                        if (index !== -1) {
                            listTemp[index].trip = listTrip[i].turnGo.id
                        }
                    }
                })
                .then(() => {
                    if (i === listTrip.length - 1) {
                        setListFullDriver(listTemp)
                        setLoading(false)
                    }
                })
                .catch(() => {
                    if (i === listTrip.length - 1) {
                        setListFullDriver(listTemp)
                        setLoading(false)
                    }
                })
        }
    }
    const finishAddDriver = () => {
        addToast(() => CustomToast({ message: 'Đã thêm tài xế thành công', type: 'success' }))
        reloadListDriver()
        if (curTrip !== 0) handleGetTripDriver()
    }
    const setCurrentUser = (driver) => {
        dispatch(staffAction.setCurrentDriver(driver))
    }
    useEffect(() => {
        dispatch(staffThunk.getDrivers())
            .unwrap()
            .then(() => {})
            .catch(() => {})
        if (listRoute.length === 0) {
            dispatch(routeThunk.getRoute())
                .unwrap()
                .then(() => {})
                .catch(() => {})
        }
    }, [])
    useEffect(() => {
        if (curRoute !== 0 && curRoute !== -1) {
            if (curTrip !== 0)
                setListCurDriver(listFullDriver.filter((drv) => drv.trip === curTrip))
        } else if (curRoute === 0) {
            setListCurDriver(listFullDriver)
        } else if (curRoute === -1) {
            console.log(listFullDriver)
            setListCurDriver(listFullDriver.filter((drv) => drv.trip === 0))
        }
    }, [curTrip, curRoute, listFullDriver])
    useEffect(() => {
        if (redirect.currentRoute === 0) {
            // setListCurDriver([])
        } else {
            dispatch(
                staffAction.setRedirect({
                    currentRoute: 0,
                    currentTrip: 0,
                }),
            )
        }
    }, [curRoute])
    useEffect(() => {
        if (listDriver.length > 0 && listRoute.length > 0) {
            handleGetTripDriver()
        }
    }, [listDriver, listRoute])
    useEffect(() => {
        setListFullDriver(listDriver.map((drv) => ({ ...drv, trip: 0 })))
        // setListCurDriver(listDriver.map((drv) => ({ ...drv, trip: 0 })))
    }, [listDriver])
    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <div className="tabStyle">
                <CRow className="justify-content-between">
                    <CCol>
                        <b>DANH SÁCH TÀI XẾ</b>
                    </CCol>
                    <CCol style={{ textAlign: 'right' }}>
                        <CButton
                            className="mt-2 mr-2"
                            onClick={reloadListDriver}
                            variant="outline"
                            color="dark"
                            style={{ marginRight: '10px' }}
                        >
                            <CIcon icon={cilReload}></CIcon>
                        </CButton>
                        <CButton className="mt-2" onClick={() => setShowAddForm(true)}>
                            Thêm tài xế
                        </CButton>
                    </CCol>
                </CRow>
                <CRow className="mt-3 mb-3">
                    {/* <CCol md="4">
                        <CFormSelect
                            value={curRoute}
                            onChange={(e) => setCurRoute(parseInt(e.target.value))}
                        >
                            <option value={0}>Tất cả</option>
                            {listRoute
                                .filter((rt) => rt.active === true)
                                .map((route) => (
                                    <option key={route.id} value={route.id}>
                                        {getRouteJourney(route)}
                                    </option>
                                ))}
                        </CFormSelect>
                    </CCol>
                    {curRoute !== 0 && (
                        <div className="mt-3">
                            {getListTrip(curRoute).map((trip) => (
                                <CFormCheck
                                    inline
                                    type="radio"
                                    key={trip.id}
                                    name="tripOptions"
                                    required
                                    id={trip.id}
                                    value={trip.id}
                                    label={getTripJourney(trip)}
                                    checked={curTrip == trip.id}
                                    onChange={() => setCurTrip(parseInt(trip.id))}
                                />
                            ))}
                        </div>
                    )} */}
                    <CCol md="5">
                        <TripPicker
                            listRoute={listRoute}
                            route={curRoute}
                            setRoute={setCurRoute}
                            trip={curTrip}
                            setTrip={setCurTrip}
                            baseOption={{ value: 0, label: 'Tất cả' }}
                            additionalOption={[{ value: -1, label: 'Chưa phân công' }]}
                        ></TripPicker>
                    </CCol>
                </CRow>
                {!loading &&
                    listDriver.filter(
                        (driver) =>
                            curRoute === 0 ||
                            (curRoute !== 0 && listCurDriver.find((dr) => dr.id === driver.id)),
                    ).length !== 0 && (
                        <CTable striped color="secondary">
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Mã nhân viên</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Họ tên</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Ngày vào làm</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Tình trạng</CTableHeaderCell>
                                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {listDriver
                                    .filter(
                                        (driver) =>
                                            curRoute === 0 ||
                                            (curRoute !== 0 &&
                                                listCurDriver.find((dr) => dr.id === driver.id)),
                                    )
                                    .reverse()
                                    .map((emp) => (
                                        <CTableRow key={emp.id}>
                                            <CTableHeaderCell scope="row">{`#${emp.driver.driverId}`}</CTableHeaderCell>
                                            <CTableDataCell>{emp.name}</CTableDataCell>
                                            <CTableDataCell>{emp.tel}</CTableDataCell>
                                            <CTableDataCell>{emp.email}</CTableDataCell>
                                            <CTableDataCell>
                                                {convertDataTimeToDisplayDate(
                                                    emp.driver.beginWorkDate,
                                                )}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                {emp.account.active ? (
                                                    <i style={{ color: 'green' }}>Đang làm việc</i>
                                                ) : (
                                                    <i style={{ color: 'red' }}>Nghỉ việc</i>
                                                )}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <i onClick={() => setCurrentUser(emp)}>
                                                    <a href="#/employee-manage/drivers/detail">
                                                        Xem chi tiết
                                                    </a>
                                                </i>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                            </CTableBody>
                        </CTable>
                    )}
                {loading && (
                    <div className="d-flex justify-content-center">
                        <CSpinner />
                    </div>
                )}
                {!loading &&
                    curTrip !== 0 &&
                    listDriver.filter(
                        (driver) =>
                            curRoute === 0 ||
                            (curRoute !== 0 && listCurDriver.find((dr) => dr.id === driver.id)),
                    ).length === 0 && <b>Chưa có tài xế cho tuyến này</b>}
            </div>
            <AddDriverForm
                visible={showAddForm}
                setVisible={setShowAddForm}
                finishAddDriver={finishAddDriver}
                currentRoute={curRoute}
                currentTrip={curTrip}
            ></AddDriverForm>
        </>
    )
}

export default DriverManagement
