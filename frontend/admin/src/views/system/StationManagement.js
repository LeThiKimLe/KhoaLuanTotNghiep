import React, { useEffect, useState, useRef } from 'react'
import { classNames } from 'classnames'
import CIcon from '@coreui/icons-react'
import {
    CRow,
    CCol,
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCollapse,
    CFormLabel,
    CFormInput,
    CFormTextarea,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CToaster,
    CSpinner,
    CModalHeader,
    CModal,
    CModalBody,
    CModalTitle,
    CModalFooter,
    CInputGroup,
    CInputGroupText,
} from '@coreui/react'
import {
    cilPlus,
    cilPencil,
    cilOptions,
    cilSave,
    cilMediaPlay,
    cilX,
    cilSearch,
} from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import locationThunk from 'src/feature/location/location.service'
import { selectListLocation, selectLoadingState } from 'src/feature/location/location.slice'
import CustomButton from '../customButton/CustomButton'
import { CustomToast } from '../customToast/CustomToast'
import stationThunk from 'src/feature/station/station.service'
import axios from 'axios'
import { MapContainer, Marker, TileLayer, Popup, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Leaflet from 'leaflet'

Leaflet.Icon.Default.imagePath = '../node_modules/leaflet'

delete Leaflet.Icon.Default.prototype._getIconUrl

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

function ChangeView({ center, zoom }) {
    const map = useMap()
    map.setView(center, zoom)
    return null
}

const Map = ({ location, setLocation }) => {
    const handleMapClick = (e) => {
        fetchData(e.latlng.lat, e.latlng.lng)
    }
    const MapClickHandler = () => {
        useMapEvents({
            click: handleMapClick,
        })
        return null
    }
    const fetchData = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            )
            const data = response.data
            setLocation({
                lat: latitude,
                lng: longitude,
                address: data.display_name,
                name: data.name,
            })
        } catch (error) {
            console.error('Error fetching location data:', error)
        }
    }

    const { lat, lng, address } = location
    const marker = useRef(null)
    useEffect(() => {
        if (marker.current) {
            marker.current.setLatLng([lat, lng])
            marker.current.openPopup()
        }
    }, [location])
    return (
        <MapContainer center={[lat, lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <ChangeView center={[lat, lng]} zoom={13} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler />
            <Marker position={[lat, lng]} ref={marker}>
                <Popup>
                    <div>
                        <p>{address}</p>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    )
}

const SearchBox = ({ onSearch, onConfirm, preLocation }) => {
    const [address, setAddress] = useState(preLocation ? preLocation.address : '')
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState({
        lat: preLocation ? preLocation.lat : 0,
        lng: preLocation ? preLocation.lng : 0,
        address: preLocation ? preLocation.address : '',
        name: preLocation ? preLocation.name : '',
    })

    const handleSearch = () => {
        setLoading(true)
        axios
            .get(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    address,
                )}&format=json`,
            )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const { lat, lon, display_name, name } = response.data[0]
                    setLoading(false)
                    setLocation({ lat: lat, lng: lon, address: display_name, name: name })
                    onSearch({ lat: lat, lng: lon, address: display_name, name: name })
                } else {
                    addToast(() =>
                        CustomToast({
                            message: 'Không tìm thấy địa chỉ',
                            type: 'error',
                        }),
                    )
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.error('Error retrieving coordinates:', error)
                addToast(() =>
                    CustomToast({
                        message: 'Không tìm thấy địa chỉ',
                        type: 'error',
                    }),
                )
                setLoading(false)
            })
    }
    useEffect(() => {
        if (preLocation) onSearch(preLocation)
    }, [])

    useEffect(() => {
        setLocation({
            lat: preLocation ? preLocation.lat : 0,
            lng: preLocation ? preLocation.lng : 0,
            address: preLocation ? preLocation.address : '',
            name: preLocation ? preLocation.name : '',
        })
        setAddress(preLocation ? preLocation.address : '')
    }, [preLocation])

    return (
        <CRow className="my-3">
            <CCol md="8">
                <CInputGroup>
                    <CInputGroupText>Địa điểm</CInputGroupText>
                    <CFormInput
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </CInputGroup>
            </CCol>
            <CCol md="2" className="d-flex justify-content-end">
                <CustomButton
                    style={{ width: '100%' }}
                    onClick={handleSearch}
                    text="Tìm kiếm"
                    loading={loading}
                ></CustomButton>
            </CCol>
            <CCol md="2" className="d-flex justify-content-end">
                <CButton style={{ width: '100%' }} color="success" onClick={onConfirm}>
                    Xác nhận
                </CButton>
            </CCol>
            <CCol md="5" className="my-2">
                <CInputGroup>
                    <CInputGroupText>Kinh độ</CInputGroupText>
                    <CFormInput readOnly type="text" value={location.lng} />
                </CInputGroup>
            </CCol>
            <CCol md="5" className="my-2">
                <CInputGroup>
                    <CInputGroupText>Vĩ độ</CInputGroupText>
                    <CFormInput readOnly type="text" value={location.lat} />
                </CInputGroup>
            </CCol>
            <CToaster ref={toaster} push={toast} placement="top-end" />
        </CRow>
    )
}

export const Station = ({ locationId, station, empty, finishAdd, visibleEmpty }) => {
    const [visible, setVisible] = useState(false)
    const handleShowInfor = () => {
        setVisible(!visible)
    }
    const curInput = useRef(null)
    const nameInput = useRef(null)
    const [isUpdate, setIsUpdate] = useState(false)
    const [name, setName] = useState(station ? station.name : '')
    const [address, setAddress] = useState(station ? station.address : '')
    const [latitude, setLatitude] = useState(station ? station.latitude : 0)
    const [longitude, setLongitude] = useState(station ? station.longitude : 0)
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const dispatch = useDispatch()
    const [showDel, setShowDel] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showConfirmOpen, setShowConfirmOpen] = useState(false)
    const [openMap, setOpenMap] = useState(false)
    const [location, setLocation] = useState({
        lat: latitude,
        lng: longitude,
        address: address,
        name: name,
    })
    const [viewMap, setViewMap] = useState(false)
    const handleSearch = (newLocation) => {
        setLocation(newLocation)
    }
    const updateListLocation = () => {
        dispatch(locationThunk.getLocations())
            .unwrap()
            .then(() => {})
            .catch(() => {})
    }
    const handleMouseEnter = () => {
        setShowDel(true)
    }
    const handleMouseLeave = () => {
        setShowDel(false)
    }
    const handleOnChange = (e) => {
        setAddress(e.target.value)
    }
    const cancelEdit = () => {
        setIsUpdate(false)
        setAddress(station.address)
        setName(station.name)
    }
    const handleUpdate = () => {
        if (isUpdate === false) {
            curInput.current.focus()
            setIsUpdate(true)
        } else {
            if (name === '' || address === '' || latitude === 0 || longitude === 0) {
                addToast(() =>
                    CustomToast({
                        message: 'Vui lòng hoàn thành các thông tin chính xác',
                        type: 'error',
                    }),
                )
            } else {
                if (name !== '' && address !== '') {
                    const newStation = {
                        id: station.id,
                        name: name,
                        address: address,
                        latitude: latitude,
                        longitude: longitude,
                    }
                    dispatch(stationThunk.editStation(newStation))
                        .unwrap()
                        .then(() => {
                            addToast(() =>
                                CustomToast({
                                    message: 'Sửa thông tin thành công',
                                    type: 'success',
                                }),
                            )
                            setIsUpdate(false)
                        })
                        .catch((error) => {
                            addToast(() => CustomToast({ message: error, type: 'error' }))
                        })
                } else {
                    addToast(() =>
                        CustomToast({
                            message: 'Tên và địa chỉ không được để trống',
                            type: 'error',
                        }),
                    )
                }
            }
        }
    }
    const handleAdd = () => {
        if (name !== '' && address !== '') {
            dispatch(
                stationThunk.addStation({
                    locationId: locationId,
                    listStation: [
                        {
                            name: name,
                            address: address,
                            latitude: latitude,
                            longitude: longitude,
                        },
                    ],
                }),
            )
                .unwrap()
                .then(() => {
                    addToast(() =>
                        CustomToast({ message: 'Thêm trạm đi thành công', type: 'success' }),
                    )
                    finishAdd()
                })
                .catch((error) => {
                    addToast(() => CustomToast({ message: error, type: 'error' }))
                })
        } else {
            addToast(() =>
                CustomToast({ message: 'Vui lòng điền đủ tên và địa chỉ trạm đi', type: 'error' }),
            )
        }
    }
    const cancelAdd = () => {
        finishAdd()
    }
    const handleDelete = () => {
        dispatch(stationThunk.activeStation({ id: station.id, active: false }))
            .unwrap()
            .then(() => {
                addToast(() => CustomToast({ message: 'Đã đóng trạm thành công', type: 'success' }))
                updateListLocation()
                setShowConfirm(false)
            })
            .catch((error) => {
                addToast(() => CustomToast({ message: error, type: 'error' }))
                setShowConfirm(false)
            })
    }
    const handleReOpen = () => {
        dispatch(stationThunk.activeStation({ id: station.id, active: true }))
            .unwrap()
            .then(() => {
                addToast(() =>
                    CustomToast({ message: 'Đã mở trạm đi thành công', type: 'success' }),
                )
                updateListLocation()
                setShowConfirmOpen(false)
            })
            .catch((error) => {
                addToast(() => CustomToast({ message: error, type: 'error' }))
                setShowConfirmOpen(false)
            })
    }
    const handleViewMap = () => {
        setOpenMap(true)
        setLocation({ lat: latitude, lng: longitude, address: address })
        setViewMap(true)
    }
    const handleSearchStation = () => {
        setOpenMap(true)
        setViewMap(false)
    }
    const handleConfirmStation = () => {
        setOpenMap(false)
        setLatitude(location.lat)
        setLongitude(location.lng)
        setAddress(location.address)
        setName(location.name)
    }
    useEffect(() => {
        if (empty) {
            nameInput.current.focus()
        }
    }, [])
    if (!empty)
        return (
            <>
                <CToaster ref={toaster} push={toast} placement="top-end" />
                <div className="mb-2">
                    <CCard
                        role="button"
                        onClick={isUpdate ? null : handleShowInfor}
                        className="p-1 mb-1"
                        color="light"
                    >
                        <div
                            id="station-header"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="d-flex align-items-center position-relative"
                        >
                            <CFormInput
                                role="button"
                                value={name}
                                id="station-name"
                                onChange={(e) => setName(e.target.value)}
                                className={isUpdate ? '' : 'border-0'}
                                readOnly={!isUpdate}
                            ></CFormInput>
                            {station.active === true && showDel && (
                                <CButton
                                    color="danger"
                                    className="position-absolute end-0"
                                    variant="outline"
                                    style={{ scale: '0.8' }}
                                    id="station-close"
                                    onClick={() => setShowConfirm(true)}
                                >
                                    <CIcon icon={cilX}></CIcon>
                                </CButton>
                            )}
                            {station.active === false && showDel && (
                                <CButton
                                    color="success"
                                    className="position-absolute end-0"
                                    variant="outline"
                                    id="station-open"
                                    style={{ scale: '0.8' }}
                                    onClick={() => setShowConfirmOpen(true)}
                                >
                                    <CIcon icon={cilMediaPlay}></CIcon>
                                </CButton>
                            )}
                        </div>
                    </CCard>
                    <CCollapse visible={visible}>
                        <CCard className="p-2" style={{ fontSize: '13px' }}>
                            <CRow className="mb-2">
                                <CCol sm={12}>
                                    <CInputGroup>
                                        <CInputGroupText className="col-2">Địa chỉ</CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            readOnly={!isUpdate}
                                            value={address}
                                            onChange={handleOnChange}
                                            ref={curInput}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="my-2">
                                        <CInputGroupText className="col-2">Kinh độ</CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            placeholder="Kinh độ"
                                            value={longitude}
                                            readOnly={!isUpdate}
                                            onChange={(e) => setLongitude(e.target.value)}
                                        ></CFormInput>
                                        <CInputGroupText>Vĩ độ</CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            placeholder="Vĩ độ"
                                            value={latitude}
                                            readOnly={!isUpdate}
                                            onChange={(e) => setLatitude(e.target.value)}
                                        ></CFormInput>
                                    </CInputGroup>
                                    {isUpdate && (
                                        <CButton
                                            onClick={handleSearchStation}
                                            variant="outline"
                                            color="success"
                                            style={{ scale: '0.8' }}
                                        >
                                            Tra vị trí
                                        </CButton>
                                    )}
                                    {!isUpdate && (
                                        <CButton
                                            variant="outline"
                                            color="warning"
                                            onClick={handleViewMap}
                                            style={{ transform: 'scale(0.8)' }}
                                        >
                                            Xem vị trí
                                        </CButton>
                                    )}
                                    <CModal
                                        backdrop="static"
                                        visible={openMap}
                                        onClose={() => setOpenMap(false)}
                                        size="xl"
                                    >
                                        <CModalHeader>Bản đồ</CModalHeader>
                                        <CModalBody>
                                            <div>
                                                {!viewMap && (
                                                    <SearchBox
                                                        onSearch={handleSearch}
                                                        onConfirm={handleConfirmStation}
                                                        preLocation={location}
                                                    />
                                                )}
                                                <Map
                                                    location={location}
                                                    setLocation={setLocation}
                                                />
                                            </div>
                                        </CModalBody>
                                    </CModal>
                                </CCol>
                                <CCol style={{ textAlign: 'right' }}>
                                    <CButton
                                        color={isUpdate ? 'success' : 'warning'}
                                        variant="outline"
                                        style={{ width: 'fit-content', scale: '0.8' }}
                                        onClick={handleUpdate}
                                        className="mr-1"
                                        id="update-station"
                                    >
                                        {!isUpdate ? (
                                            <CIcon icon={cilPencil}></CIcon>
                                        ) : (
                                            <CIcon icon={cilSave}></CIcon>
                                        )}
                                    </CButton>
                                    {isUpdate && (
                                        <CButton
                                            color="danger"
                                            variant="outline"
                                            style={{ width: 'fit-content', scale: '0.8' }}
                                            onClick={cancelEdit}
                                        >
                                            <CIcon icon={cilMediaPlay}></CIcon>
                                        </CButton>
                                    )}
                                </CCol>
                            </CRow>
                        </CCard>
                    </CCollapse>
                </div>
                <CModal
                    backdrop="static"
                    visible={showConfirm}
                    onClose={() => setShowConfirm(false)}
                >
                    <CModalHeader>
                        <CModalTitle>Xác nhận xóa trạm đi</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        Sau khi xóa trạm, các chuyến đi và đến trạm này cũng sẽ bị tạm ngừng.
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setShowConfirm(false)}>
                            Hủy
                        </CButton>
                        <CButton color="primary" onClick={handleDelete}>
                            Xóa
                        </CButton>
                    </CModalFooter>
                </CModal>
                <CModal
                    backdrop="static"
                    visible={showConfirmOpen}
                    onClose={() => setShowConfirmOpen(false)}
                >
                    <CModalHeader>
                        <CModalTitle>Xác nhận mở trạm đi</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        Sau khi mở lại trạm, bạn cần tự mở lại các chuyến đi đến trạm đã bị đóng.
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setShowConfirmOpen(false)}>
                            Hủy
                        </CButton>
                        <CButton color="primary" onClick={handleReOpen}>
                            Mở trạm
                        </CButton>
                    </CModalFooter>
                </CModal>
            </>
        )
    else {
        return (
            <>
                <CToaster ref={toaster} push={toast} placement="top-end" />
                <div className={`mb-2 ${visibleEmpty === true ? '' : 'd-none'}`}>
                    <CCard role="button" className="p-1 mb-1" color="light">
                        <CFormInput
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            ref={nameInput}
                            placeholder="Nhập tên trạm đi"
                        ></CFormInput>
                    </CCard>
                    <CCollapse visible={true}>
                        <CCard className="p-2" style={{ fontSize: '13px' }}>
                            <CRow className="mb-2">
                                <CCol sm={12}>
                                    <CInputGroup>
                                        <CInputGroupText className="col-2">Địa chỉ</CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            readOnly={!isUpdate}
                                            value={address}
                                            onChange={handleOnChange}
                                            ref={curInput}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="my-2">
                                        <CInputGroupText className="col-2">Kinh độ</CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            placeholder="Kinh độ"
                                            value={longitude}
                                            readOnly={!isUpdate}
                                            onChange={(e) => setLongitude(e.target.value)}
                                        ></CFormInput>
                                        <CInputGroupText>Vĩ độ</CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            placeholder="Vĩ độ"
                                            value={latitude}
                                            readOnly={!isUpdate}
                                            onChange={(e) => setLatitude(e.target.value)}
                                        ></CFormInput>
                                    </CInputGroup>
                                    {isUpdate && (
                                        <CButton
                                            onClick={handleSearchStation}
                                            variant="outline"
                                            color="success"
                                            style={{ scale: '0.8' }}
                                        >
                                            Tra vị trí
                                        </CButton>
                                    )}
                                    {!isUpdate && (
                                        <CButton
                                            variant="outline"
                                            color="warning"
                                            onClick={handleViewMap}
                                            style={{ transform: 'scale(0.8)' }}
                                        >
                                            Xem vị trí
                                        </CButton>
                                    )}
                                    <CModal
                                        visible={openMap}
                                        onClose={() => setOpenMap(false)}
                                        size="xl"
                                    >
                                        <CModalHeader>Bản đồ</CModalHeader>
                                        <CModalBody>
                                            <div>
                                                {!viewMap && (
                                                    <SearchBox
                                                        onSearch={handleSearch}
                                                        onConfirm={handleConfirmStation}
                                                    />
                                                )}
                                                <Map location={location} />
                                            </div>
                                        </CModalBody>
                                    </CModal>
                                </CCol>
                                <CCol style={{ textAlign: 'right' }}>
                                    <CButton
                                        id="save-station"
                                        color="success"
                                        variant="outline"
                                        style={{ width: 'fit-content', scale: '0.8' }}
                                        onClick={handleAdd}
                                        className="mr-1"
                                        disabled={
                                            name === '' ||
                                            address === '' ||
                                            latitude === 0 ||
                                            longitude === 0
                                        }
                                    >
                                        <CIcon icon={cilSave}></CIcon>
                                    </CButton>
                                    <CButton
                                        id="cancel-station"
                                        color="danger"
                                        variant="outline"
                                        style={{ width: 'fit-content', scale: '0.8' }}
                                        onClick={cancelAdd}
                                    >
                                        <CIcon icon={cilMediaPlay}></CIcon>
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CCard>
                    </CCollapse>
                </div>
            </>
        )
    }
}

const Location = ({ location, empty, finishAdd, visible }) => {
    const [name, setName] = useState(location ? location.name : '')
    const [isUpdate, setIsUpdate] = useState(false)
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const loading = useSelector(selectLoadingState)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showConfirmOpen, setShowConfirmOpen] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    const [showClosedStation, setShowClosedStation] = useState(false)
    const updateListLocation = () => {
        dispatch(locationThunk.getLocations())
            .unwrap()
            .then(() => {})
            .catch(() => {})
    }
    const changeLocationName = () => {
        dispatch(locationThunk.editLocation({ id: location.id, name: name }))
            .unwrap()
            .then(() => {
                setIsUpdate(false)
                addToast(() => CustomToast({ message: 'Sửa tên thành công', type: 'success' }))
                updateListLocation()
            })
            .catch((error) => {
                setIsUpdate(false)
                addToast(() => CustomToast({ message: error, type: 'error' }))
            })
    }
    const addLocation = () => {
        dispatch(locationThunk.addLocation(name))
            .unwrap()
            .then(() => {
                addToast(() => CustomToast({ message: 'Thêm trạm thành công', type: 'success' }))
                finishAdd()
                updateListLocation()
            })
            .catch((error) => {
                addToast(() => CustomToast({ message: error, type: 'error' }))
            })
    }
    const handleBlur = () => {
        if (name !== location.name) changeLocationName()
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (name !== location.name) changeLocationName()
        }
    }
    const handleEditLocation = () => {
        inputRef.current.focus()
        setIsUpdate(true)
    }

    const finishAddStation = () => {
        setShowAdd(false)
        updateListLocation()
    }

    const handleBlurAdd = () => {
        if (name !== '' && visible) addLocation()
        else finishAdd()
    }
    const handleKeyDownAdd = (event) => {
        if (event.key === 'Enter') {
            if (name !== '') addLocation()
        }
    }

    const handleDelLocation = () => {
        dispatch(locationThunk.activeLocation({ id: location.id, active: false }))
            .unwrap()
            .then(() => {
                addToast(() => CustomToast({ message: 'Xóa trạm thành công', type: 'success' }))
                setShowConfirm(false)
                updateListLocation()
            })
            .catch((error) => {
                addToast(() => CustomToast({ message: error, type: 'error' }))
            })
    }
    const handleOpenLocation = () => {
        dispatch(locationThunk.activeLocation({ id: location.id, active: true }))
            .unwrap()
            .then(() => {
                addToast(() => CustomToast({ message: 'Mở trạm thành công', type: 'success' }))
                setShowConfirmOpen(false)
                updateListLocation()
            })
            .catch((error) => {
                addToast(() => CustomToast({ message: error, type: 'error' }))
            })
    }

    useEffect(() => {
        if (visible === true) inputRef.current.focus()
    }, [visible])

    if (!empty)
        return (
            <>
                <CToaster ref={toaster} push={toast} placement="top-end" />
                <CCard className="col-3" style={{ height: 'fit-content' }}>
                    <CCardHeader style={{ minHeight: '30px', justifyContent: 'space-between' }}>
                        <CRow>
                            <CCol xs="8" className="p-0">
                                <CFormInput
                                    ref={inputRef}
                                    className={isUpdate ? 'fw-bold' : 'fw-bold border-0'}
                                    readOnly={!isUpdate}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                    name="location-name"
                                ></CFormInput>
                            </CCol>
                            <CCol>
                                <CDropdown style={{ float: 'right' }}>
                                    <CDropdownToggle
                                        href="#"
                                        color="light"
                                        style={{ height: '35px' }}
                                    ></CDropdownToggle>
                                    <CDropdownMenu>
                                        <CDropdownItem role="button" onClick={handleEditLocation}>
                                            Đổi tên
                                        </CDropdownItem>
                                        {location.active === true && (
                                            <CDropdownItem
                                                role="button"
                                                onClick={() => setShowConfirm(true)}
                                            >
                                                Xóa trạm
                                            </CDropdownItem>
                                        )}
                                        {location.active === false && (
                                            <CDropdownItem
                                                role="button"
                                                onClick={() => setShowConfirmOpen(true)}
                                            >
                                                Mở trạm
                                            </CDropdownItem>
                                        )}
                                        <CDropdownItem
                                            role="button"
                                            onClick={() => setShowClosedStation(true)}
                                        >
                                            Hiện trạm đi đã đóng
                                        </CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody style={{ minHeight: '100px' }}>
                        {location.stations
                            .filter((sta) => sta.active === true)
                            .map((station) => (
                                <Station
                                    key={station.id}
                                    station={station}
                                    locationId={location.id}
                                ></Station>
                            ))}
                        <Station
                            locationId={location.id}
                            empty={true}
                            finishAdd={finishAddStation}
                            visibleEmpty={showAdd}
                        ></Station>
                        <CButton
                            id="add-station"
                            variant="outline"
                            color="dark"
                            onClick={() => setShowAdd(true)}
                        >
                            <CIcon icon={cilPlus}></CIcon>
                        </CButton>
                    </CCardBody>
                    {showClosedStation && (
                        <CCardBody>
                            <div className="mb-1">Các trạm đã đóng</div>
                            {location.stations.filter((sta) => sta.active === false).length ===
                            0 ? (
                                <span>Không có trạm đi nào</span>
                            ) : (
                                <div>
                                    {location.stations
                                        .filter((sta) => sta.active === false)
                                        .map((station) => (
                                            <Station
                                                key={station.id}
                                                station={station}
                                                locationId={location.id}
                                            ></Station>
                                        ))}
                                </div>
                            )}
                            <CButton
                                variant="outline"
                                onClick={() => setShowClosedStation(false)}
                                style={{ scale: '0.8' }}
                                color="dark"
                            >
                                Ẩn<CIcon icon={cilX}></CIcon>
                            </CButton>
                        </CCardBody>
                    )}
                </CCard>
                <CModal
                    backdrop="static"
                    visible={showConfirm}
                    onClose={() => setShowConfirm(false)}
                >
                    <CModalHeader>
                        <CModalTitle>Xác nhận xóa</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        Bạn có chắc chắn xóa trạm này? Nếu trạm bị xóa, các tuyến xe đi đến trạm sẽ
                        bị đóng.
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setShowConfirm(false)}>
                            Hủy
                        </CButton>
                        <CButton color="primary" onClick={handleDelLocation}>
                            Xóa
                        </CButton>
                    </CModalFooter>
                </CModal>
                <CModal
                    backdrop="static"
                    visible={showConfirmOpen}
                    onClose={() => setShowConfirmOpen(false)}
                >
                    <CModalHeader>
                        <CModalTitle>Xác nhận mở trạm</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        Sau khi mở trạm, bạn cần tự mở lại các tuyến xe đi qua trạm.
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setShowConfirmOpen(false)}>
                            Hủy
                        </CButton>
                        <CButton color="primary" onClick={handleOpenLocation}>
                            Mở
                        </CButton>
                    </CModalFooter>
                </CModal>
            </>
        )
    else {
        return (
            <div className={visible === true ? '' : 'd-none'}>
                <CToaster ref={toaster} push={toast} placement="top-end" />
                <CCard className="col-3" style={{ height: 'fit-content', width: '250px' }}>
                    <CCardHeader style={{ minHeight: '30px', justifyContent: 'space-between' }}>
                        <CRow>
                            <CCol xs="12" className="p-0">
                                <CFormInput
                                    ref={inputRef}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={handleKeyDownAdd}
                                    onBlur={handleBlurAdd}
                                    name="add-form"
                                    placeholder="Nhập tên trạm"
                                ></CFormInput>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        {loading && (
                            <div className="d-flex justify-content-center">
                                <CSpinner />
                            </div>
                        )}
                    </CCardBody>
                </CCard>
            </div>
        )
    }
}

const StationManagement = () => {
    const listLocations = useSelector(selectListLocation)
    const [filterList, setFilterList] = useState(listLocations)
    const [loadingLocal, setLoadingLocal] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const dispatch = useDispatch()
    const emptyLocation = useRef(null)
    const [searchName, setSearchName] = useState('')
    const [filter, setFilter] = useState('active')
    const getLocation = () => {
        setLoadingLocal(true)
        dispatch(locationThunk.getLocations())
            .unwrap()
            .then(() => {
                setLoadingLocal(false)
            })
            .catch(() => {
                setLoadingLocal(false)
            })
    }
    const handleAddLocation = () => {
        setIsAdding(true)
        if (emptyLocation.current) {
            emptyLocation.current.scrollIntoView({ behavior: 'smooth' })
        }
    }
    const handleFilter = (opt) => {
        setFilter(opt)
    }
    useEffect(() => {
        dispatch(locationThunk.getLocations())
            .unwrap()
            .then((res) => {
                setFilterList(res)
            })
            .catch(() => {})
    }, [])
    useEffect(() => {
        if (filter === 'all')
            setFilterList(
                listLocations.filter((location) =>
                    location.name.toLowerCase().includes(searchName.toLowerCase()),
                ),
            )
        else if (filter === 'active')
            setFilterList(
                listLocations.filter(
                    (location) =>
                        location.active === true &&
                        location.name.toLowerCase().includes(searchName.toLowerCase()),
                ),
            )
        else
            setFilterList(
                listLocations.filter(
                    (location) => location.active === false && location.name.includes(searchName),
                ),
            )
    }, [filter, listLocations, searchName])
    return (
        <div>
            <CRow classNames="align-items-center justify-content-between mb-2">
                <CCol>
                    <h3>Danh sách các trạm xe</h3>
                </CCol>
                <CCol className="d-flex justify-content-center align-items-center">
                    <CInputGroup style={{ marginRight: '10px', maxWidth: '250px' }}>
                        <CInputGroupText>
                            <CIcon icon={cilSearch} />
                        </CInputGroupText>
                        <CFormInput
                            placeholder="Nhập tên trạm"
                            name="station name"
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </CInputGroup>
                    <CButton color="info" onClick={handleAddLocation}>
                        <CIcon icon={cilPlus}></CIcon>
                        Thêm trạm xe
                    </CButton>
                    <CustomButton
                        text="Reload"
                        loading={loadingLocal}
                        color="dark"
                        style={{ marginLeft: '10px' }}
                        onClick={getLocation}
                    ></CustomButton>
                </CCol>
            </CRow>
            <CRow>
                <CCol md="2">
                    <CCard
                        role="button"
                        textColor={filter === 'all' ? 'warning' : ''}
                        className="p-1 text-center"
                        onClick={() => handleFilter('all')}
                    >
                        Tất cả
                    </CCard>
                </CCol>
                <CCol md="2">
                    <CCard
                        role="button"
                        textColor={filter === 'active' ? 'warning' : ''}
                        className="p-1 text-center"
                        onClick={() => handleFilter('active')}
                    >
                        Đang hoạt động
                    </CCard>
                </CCol>
                <CCol md="2">
                    <CCard
                        role="button"
                        className="p-1 text-center"
                        textColor={filter === 'inactive' ? 'warning' : ''}
                        onClick={() => handleFilter('inactive')}
                    >
                        Đã đóng
                    </CCard>
                </CCol>
            </CRow>
            {filterList.length > 0 && (
                <div className="d-flex gap-3 overflow-auto mt-4">
                    {filterList.map((location) => (
                        <Location key={location.id} location={location}></Location>
                    ))}
                    <div ref={emptyLocation}>
                        <Location
                            empty={true}
                            finishAdd={() => setIsAdding(false)}
                            visible={isAdding}
                        ></Location>
                    </div>
                </div>
            )}
            {filterList.length === 0 && (
                <CCard>
                    <b>Không có trạm xe nào</b>
                </CCard>
            )}
        </div>
    )
}

export default StationManagement
