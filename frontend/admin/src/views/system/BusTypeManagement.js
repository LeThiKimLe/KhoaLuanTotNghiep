import React, { useEffect } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CCollapse,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormText,
    CInputGroup,
    CInputGroupText,
    CRow,
    CToaster,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButtonGroup,
    CFormCheck,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
} from '@coreui/react'
import { useState, useRef } from 'react'
import { CustomToast } from '../customToast/CustomToast'
import seat_active from '../../assets/items/seat_active.svg'
import seat_disabled from '../../assets/items/seat_disabled.svg'
import seat_hover from '../../assets/items/seat_hover.svg'
import busThunk from 'src/feature/bus/bus.service'
import { selectListBus, selectListBusType } from 'src/feature/bus/bus.slice'
import { useDispatch, useSelector } from 'react-redux'

const Seat = ({ seat, empty, changeSeat, size = 'sm' }) => {
    const [isHover, setIsHover] = useState(false)
    const [seatName, setSeatName] = useState(seat ? seat.name : '')
    const [active, setActive] = useState(seat && seat.active ? 'active' : 'disabled')
    const [openModal, setOpenModal] = useState(false)
    const iconSize = size === 'sm' ? '30px' : '50px'
    const nameSize = size === 'sm' ? '12px' : '15px'
    const getSeatColor = () => {
        if (isHover) return seat_hover
        if (seat.active) return seat_active
        return seat_disabled
    }
    const handleMouseEnter = () => {
        setIsHover(true)
    }
    const handleMouseLeave = () => {
        setIsHover(false)
    }
    const saveSeatInfo = () => {
        const newSeat = {
            ...seat,
            name: seatName,
            active: active === 'active',
        }
        setOpenModal(false)
        changeSeat(newSeat)
    }
    return (
        <>
            {empty ? (
                <CCard style={{ width: iconSize, height: iconSize, visibility: 'hidden' }}></CCard>
            ) : (
                <div
                    className="position-relative cursor-pointer"
                    role="button"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setOpenModal(true)}
                >
                    <img
                        src={getSeatColor()}
                        alt="seat"
                        style={{ width: iconSize, height: iconSize }}
                    />
                    <div className="seatname" style={{ fontSize: nameSize, fontWeight: '600' }}>
                        {seat.name}
                    </div>
                </div>
            )}
            <CModal
                alignment="center"
                visible={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader>
                    <CModalTitle id="seat">Tùy chỉnh ghế</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormLabel>Tên ghế</CFormLabel>
                    <CFormInput
                        value={seatName}
                        onChange={(e) => setSeatName(e.target.value)}
                    ></CFormInput>
                    <CFormLabel>Trạng thái: </CFormLabel>
                    <CFormSelect value={active} onChange={(e) => setActive(e.target.value)}>
                        <option value="active">Hoạt động</option>
                        <option value="disabled">Dừng</option>
                    </CFormSelect>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setOpenModal(false)}>
                        Đóng
                    </CButton>
                    <CButton color="primary" onClick={saveSeatInfo}>
                        Lưu thông tin
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

const SeatMap = ({ seatMap, changeSeatMap, explain = true }) => {
    console.log(seatMap)
    const [view, setView] = useState('active')
    return (
        <>
            <CRow className="justify-content-between"></CRow>
            <CRow className="gap-2 justify-content-center">
                {Array.from({ length: seatMap.floorNo }, (_, index) => index + 1).map(
                    (floorNumber) => (
                        <CCol key={floorNumber} md={5} className="p-3 border">
                            <div className="mb-2">
                                <b className="text-center" style={{ fontSize: '18px' }}>
                                    <i>Tầng {floorNumber}</i>
                                </b>
                            </div>
                            {Array.from({ length: seatMap.rowNo }, (_, index) => index).map(
                                (rowNumber) => (
                                    <CRow key={rowNumber} className="justify-content-center mb-2">
                                        {Array.from(
                                            { length: seatMap.colNo },
                                            (_, index) => index,
                                        ).map((colNumber) => {
                                            const filteredSeats = seatMap.seats.filter(
                                                (seat) =>
                                                    seat.floor === floorNumber &&
                                                    seat.row === rowNumber &&
                                                    seat.col === colNumber,
                                            )
                                            return filteredSeats.length > 0 ? (
                                                filteredSeats.map((seat) => (
                                                    <CCol
                                                        sm={2}
                                                        md={3}
                                                        key={seat.name}
                                                        className="d-flex justify-content-center"
                                                        style={{ width: 'fit-content' }}
                                                    >
                                                        <Seat
                                                            seat={seat}
                                                            empty={
                                                                view === 'active'
                                                                    ? !seat.active
                                                                    : false
                                                            }
                                                            changeSeat={changeSeatMap}
                                                            size={explain ? 'lg' : 'sm'}
                                                        />
                                                    </CCol>
                                                ))
                                            ) : (
                                                <CCol
                                                    sm={2}
                                                    md={3}
                                                    key={`${floorNumber}-${rowNumber}-${colNumber}`}
                                                    style={{ width: 'fit-content' }}
                                                >
                                                    <Seat
                                                        empty={true}
                                                        size={explain ? 'lg' : 'sm'}
                                                    />
                                                </CCol>
                                            )
                                        })}
                                    </CRow>
                                ),
                            )}
                        </CCol>
                    ),
                )}
                {explain && (
                    <CCol md={5} className="mt-1">
                        <div>
                            <b>Hiển thị</b>
                            <CButtonGroup
                                role="group"
                                aria-label="Basic checkbox toggle button group"
                                className="mx-2"
                            >
                                <CFormCheck
                                    type="radio"
                                    button={{ color: 'info', variant: 'outline' }}
                                    name="active"
                                    id="active"
                                    autoComplete="off"
                                    checked={view === 'active'}
                                    label="Ghế hoạt động"
                                    onChange={() => setView('active')}
                                />
                                <CFormCheck
                                    type="radio"
                                    button={{ color: 'info', variant: 'outline' }}
                                    name="all"
                                    id="all"
                                    autoComplete="off"
                                    checked={view === 'all'}
                                    onChange={() => setView('all')}
                                    label="Tất cả"
                                />
                            </CButtonGroup>
                        </div>
                        <br></br>
                        <b>{`Số ghế hiện tại: ${
                            seatMap.seats.filter((s) => s.active === true).length
                        }`}</b>
                        <br></br>
                        <i>
                            * Lưu ý: Vui lòng đặt tên tất cả các ghế trước khi click lưu thông tin
                        </i>
                    </CCol>
                )}
            </CRow>
        </>
    )
}

const AddForm = () => {
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const [typeInfo, setTypeInfo] = React.useState({
        name: '',
        code: '',
        floor: 1,
        col: 2,
        row: 3,
    })
    const [seatMap, setSeatMap] = React.useState(null)
    const handleChangeTypeInfo = (e) => {
        const { name, value } = e.target
        setTypeInfo({
            ...typeInfo,
            [name]: value,
        })
    }
    const createMap = (e) => {
        e.preventDefault()
        if (typeInfo.name === '') {
            addToast(() => CustomToast({ message: 'Vui lòng nhập tên loại xe', type: 'error' }))
            return
        }
        if (typeInfo.code === '') {
            addToast(() => CustomToast({ message: 'Vui lòng nhập codename', type: 'error' }))
            return
        }
        const seats = []
        for (let i = 0; i < typeInfo.floor; i++) {
            for (let j = 0; j < typeInfo.row; j++) {
                for (let k = 0; k < typeInfo.col; k++) {
                    seats.push({
                        floor: i + 1,
                        row: j,
                        col: k,
                        active: true,
                        name: '',
                    })
                }
            }
        }
        setSeatMap({
            floorNo: typeInfo.floor,
            colNo: typeInfo.col,
            rowNo: typeInfo.row,
            seats: seats,
        })
    }
    const updateSeat = (seat) => {
        const newSeats = seatMap.seats.map((s) => {
            if (s.floor === seat.floor && s.row === seat.row && s.col === seat.col) {
                return seat
            }
            return s
        })
        setSeatMap({
            ...seatMap,
            seats: newSeats,
        })
    }
    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <CCard className="my-3">
                <CCardHeader>
                    <b>Tạo loại xe mới</b>
                </CCardHeader>
                <CCardBody>
                    <CForm onSubmit={createMap}>
                        <CRow className="justify-content align-items-center">
                            <CCol md="12">
                                <CInputGroup className="mb-3">
                                    <CInputGroupText id="bus-type-name">
                                        Tên loại xe
                                    </CInputGroupText>
                                    <CFormInput
                                        placeholder="Nhập tên loại xe"
                                        aria-describedby="bus-type-name"
                                        value={typeInfo.name}
                                        name="name"
                                        onChange={handleChangeTypeInfo}
                                    />
                                    <CInputGroupText id="bus-type-name">Code Name</CInputGroupText>
                                    <CFormInput
                                        placeholder="Nhập codename"
                                        aria-describedby="bus-type-code"
                                        pattern="^[a-zA-Z0-9_]+$"
                                        value={typeInfo.code}
                                        name="code"
                                        onChange={handleChangeTypeInfo}
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md="4">
                                <CInputGroup className="mb-3">
                                    <CInputGroupText id="floor-number">Số tầng ghế</CInputGroupText>
                                    <CFormInput
                                        id="floor-number"
                                        type="number"
                                        value={typeInfo.floor}
                                        name="floor"
                                        max={2}
                                        min={1}
                                        onChange={handleChangeTypeInfo}
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md="4">
                                <CInputGroup className="mb-3">
                                    <CInputGroupText id="col-number">Số dãy ghế</CInputGroupText>
                                    <CFormInput
                                        id="col-number"
                                        type="number"
                                        value={typeInfo.col}
                                        name="col"
                                        max={5}
                                        min={2}
                                        onChange={handleChangeTypeInfo}
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md="4">
                                <CInputGroup className="mb-3">
                                    <CInputGroupText id="row-number">Số hàng ghế</CInputGroupText>
                                    <CFormInput
                                        id="row-number"
                                        type="number"
                                        value={typeInfo.row}
                                        name="row"
                                        max={10}
                                        min={3}
                                        onChange={handleChangeTypeInfo}
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md="4">
                                <CButton type="submit">Tạo map</CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                    {seatMap && (
                        <>
                            <CRow className="my-3 justify-content-center align-items-center">
                                <CCol sm={12} className="border-bottom my-2 border-3"></CCol>
                            </CRow>
                            <CRow className="mt-3">
                                <SeatMap seatMap={seatMap} changeSeatMap={updateSeat}></SeatMap>
                            </CRow>
                            <CRow className="my-3 justify-content-center align-items-center">
                                <CCol sm={12} className="border-bottom my-2 border-3"></CCol>
                            </CRow>
                            <CRow className="my-3 justify-content-center align-items-center">
                                <CCol md="4" className="d-flex justify-content-center">
                                    <CButton color="success">Lưu thông tin</CButton>
                                </CCol>
                            </CRow>
                        </>
                    )}
                </CCardBody>
            </CCard>
        </>
    )
}

const BusType = ({ busType }) => {
    const [busData, setBusData] = useState(busType)
    const [isEdit, setIsEdit] = useState(false)
    const triggerEdit = () => {
        setIsEdit(true)
    }
    const listBus = useSelector(selectListBus)
    const handleChangeTypeInfo = (e) => {
        const { name, value } = e.target
        setBusData({
            ...busData,
            [name]: value,
        })
    }
    const editMap = (e) => {
        e.preventDefault()
        setIsEdit(false)
    }
    const addActiveAttributeForSeat = () => {
        const seats = busData.seatMap.seats.map((seat) => {
            return {
                ...seat,
                active: true,
            }
        })
        setBusData({
            ...busData,
            seatMap: {
                ...busData.seatMap,
                seats: seats,
            },
        })
    }
    useEffect(() => {
        addActiveAttributeForSeat()
    }, [])
    return (
        <CRow className="my-3">
            <CCol md={7}>
                <SeatMap seatMap={busData.seatMap} explain={false}></SeatMap>
            </CCol>
            <CCol md={5} className="border p-3">
                <CForm onSubmit={editMap}>
                    <CRow className="justify-content align-items-center">
                        <CCol md="12">
                            <CInputGroup className="mb-3">
                                <CInputGroupText id="bus-type-name" style={{ width: '115px' }}>
                                    Tên loại xe
                                </CInputGroupText>
                                <CFormInput
                                    readOnly={!isEdit}
                                    placeholder="Nhập tên loại xe"
                                    aria-describedby="bus-type-name"
                                    value={busData.description}
                                    name="description"
                                    onChange={handleChangeTypeInfo}
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol md="12">
                            <CInputGroup className="mb-3">
                                <CInputGroupText id="bus-type-name" style={{ width: '115px' }}>
                                    Code Name
                                </CInputGroupText>
                                <CFormInput
                                    readOnly={!isEdit}
                                    placeholder="Nhập codename"
                                    aria-describedby="bus-type-code"
                                    pattern="^[a-zA-Z0-9_]+$"
                                    value={busData.name}
                                    name="name"
                                    onChange={handleChangeTypeInfo}
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol md="6">
                            <CInputGroup className="mb-3">
                                <CInputGroupText id="floor-number" style={{ width: '115px' }}>
                                    Số tầng ghế
                                </CInputGroupText>
                                <CFormInput
                                    readOnly
                                    id="floor-number"
                                    type="number"
                                    value={busData.seatMap.floorNo}
                                    name="floor"
                                    max={2}
                                    min={1}
                                    onChange={handleChangeTypeInfo}
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol md="6">
                            <CInputGroup className="mb-3">
                                <CInputGroupText id="col-number" style={{ width: '115px' }}>
                                    Số dãy ghế
                                </CInputGroupText>
                                <CFormInput
                                    id="col-number"
                                    type="number"
                                    value={busData.seatMap.colNo}
                                    name="col"
                                    max={5}
                                    min={2}
                                    readOnly
                                    onChange={handleChangeTypeInfo}
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol md="6">
                            <CInputGroup className="mb-3">
                                <CInputGroupText id="row-number" style={{ width: '115px' }}>
                                    Số hàng ghế
                                </CInputGroupText>
                                <CFormInput
                                    id="row-number"
                                    type="number"
                                    value={busData.seatMap.rowNo}
                                    readOnly
                                    name="row"
                                    max={10}
                                    min={3}
                                    onChange={handleChangeTypeInfo}
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol md="6">
                            <CInputGroup className="mb-3">
                                <CInputGroupText id="row-number" style={{ width: '115px' }}>
                                    Tổng số ghế
                                </CInputGroupText>
                                <CFormInput
                                    readOnly
                                    id="row-number"
                                    type="number"
                                    value={busData.seatMap.seats.length}
                                    name="row"
                                    max={10}
                                    min={3}
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol md="12">
                            <CInputGroup className="mb-3">
                                <CInputGroupText id="bus-type-num" style={{ width: '115px' }}>
                                    Tổng số xe
                                </CInputGroupText>
                                <CFormInput
                                    readOnly
                                    placeholder="Số xe"
                                    aria-describedby="bus-type-num"
                                    type="number"
                                    value={
                                        listBus.filter((bus) => bus.type.id === busData.id).length
                                    }
                                    name="bus_num"
                                    onChange={handleChangeTypeInfo}
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="justify-content-end">
                        <CCol className="col-auto">
                            <CButton onClick={triggerEdit} color="success" variant="outline">
                                {isEdit ? 'Lưu' : 'Sửa'}
                            </CButton>
                        </CCol>
                        {isEdit ? (
                            <CCol className="col-auto">
                                <CButton
                                    onClick={() => setIsEdit(false)}
                                    variant="outline"
                                    color="danger"
                                >
                                    Hủy
                                </CButton>
                            </CCol>
                        ) : (
                            <CCol className="col-auto">
                                <CButton color="warning" variant="outline">
                                    Dừng sử dụng
                                </CButton>
                            </CCol>
                        )}
                    </CRow>
                </CForm>
            </CCol>
        </CRow>
    )
}

const BusTypeManagement = () => {
    const [openAdd, setOpenAdd] = useState(false)
    const listBusType = useSelector(selectListBusType)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(busThunk.getBusType())
        dispatch(busThunk.getBus())
    }, [dispatch])
    return (
        <div>
            <CRow className="justify-content-between align-items-center mb-3">
                <CCol md="3">
                    <b>DANH SÁCH CÁC LOẠI XE</b>
                </CCol>
                <CCol md="3" className="d-flex justify-content-end">
                    <CButton onClick={() => setOpenAdd(!openAdd)}>Thêm loại xe</CButton>
                </CCol>
            </CRow>
            <CCollapse visible={openAdd}>
                <AddForm></AddForm>
            </CCollapse>
            <CAccordion>
                {listBusType.map((busType, index) => (
                    <CAccordionItem itemKey={index + 1} key={index}>
                        <CAccordionHeader>
                            <b>{busType.description}</b>
                        </CAccordionHeader>
                        <CAccordionBody>
                            <BusType busType={busType} key={index}></BusType>
                        </CAccordionBody>
                    </CAccordionItem>
                ))}
            </CAccordion>
        </div>
    )
}

export default BusTypeManagement
