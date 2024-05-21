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
    CImage,
} from '@coreui/react'
import { useState, useRef } from 'react'
import { CustomToast } from '../customToast/CustomToast'
import seat_active from '../../assets/items/seat_active.svg'
import seat_disabled from '../../assets/items/seat_disabled.svg'
import seat_hover from '../../assets/items/seat_hover.svg'
import busThunk from 'src/feature/bus/bus.service'
import { selectListBus, selectListBusType } from 'src/feature/bus/bus.slice'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../customButton/CustomButton'
import no_img from '../../assets/images/no_img.png'

const Seat = ({ seat, empty, changeSeat, editable = true, size = 'sm' }) => {
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
                    onClick={() => {
                        if (editable) setOpenModal(true)
                    }}
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

const SeatMap = ({ seatMap, changeSeatMap, explain = true, editable = true }) => {
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
                                                            editable={editable}
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
                            * Lưu ý: Vui lòng đặt tên tất cả các ghế và upload hình ảnh xe trước khi
                            click lưu thông tin
                        </i>
                    </CCol>
                )}
            </CRow>
        </>
    )
}

const AutoName = ({ seatMap, setListSeat }) => {
    const [listApplyRule, setListApplyRule] = useState([])
    const [rule, setRule] = useState(null)
    const ruleOption = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const listRule = {
        seat: {
            value: 'seat',
            label: 'Theo ghế',
            active: false,
            startIndex: 0,
        },
        floor: {
            value: 'floor',
            label: 'Theo tầng',
            active: false,
            options:
                seatMap.floorNo == 2
                    ? [
                          {
                              label: 'Tầng dưới',
                              value: 'bottom',
                              rule: 'A',
                              startIndex: 1,
                          },
                          {
                              label: 'Tầng trên',
                              value: 'top',
                              rule: 'B',
                              startIndex: 1,
                          },
                      ]
                    : [
                          {
                              label: 'Tầng dưới',
                              value: 'bottom',
                              rule: 'A',
                              startIndex: 1,
                          },
                      ],
        },
        col: {
            value: 'col',
            label: 'Theo dãy',
            active: false,
            options: Array.from({ length: seatMap.colNo }, (_, index) => index).map((col) => {
                return {
                    label: `Dãy ${col + 1}`,
                    value: col,
                    rule: ruleOption[col],
                    startIndex: 1,
                }
            }),
        },
    }
    const handleRuleSelect = (e) => {
        setRule(listRule[e.target.value])
    }

    const handleSetRuleDetail = (optionIndex, optionName, optionValue) => {
        //edit options of rule
        if (optionIndex !== 'seat') {
            setRule({
                ...rule,
                options: rule.options.map((option) => {
                    if (option.value === optionIndex) {
                        return {
                            ...option,
                            [optionName]: optionValue,
                        }
                    }
                    return option
                }),
            })
        } else {
            setRule({
                ...rule,
                [optionName]: optionValue,
            })
        }
    }

    console.log(rule)

    const handleSetSeatName = () => {
        let listIndex =
            rule && rule.value !== 'seat' ? rule.options.map((op) => op.startIndex - 1) : []
        const newListSeat = seatMap.seats.map((seat, index) => {
            if (rule.value === 'seat') {
                return {
                    ...seat,
                    name: `${(rule.startIndex + index).toString().padStart(2, '0')}`,
                }
            }
            if (rule.value === 'floor') {
                listIndex[seat.floor - 1] = listIndex[seat.floor - 1] + 1
                return {
                    ...seat,
                    name: `${rule.options[seat.floor - 1].rule}${listIndex[seat.floor - 1]
                        .toString()
                        .padStart(2, '0')}`,
                }
            }
            if (rule.value === 'col') {
                listIndex[seat.col] = listIndex[seat.col] + 1
                return {
                    ...seat,
                    name: `${rule.options[seat.col].rule}${listIndex[seat.col]
                        .toString()
                        .padStart(2, '0')}`,
                }
            }
        })
        setListSeat(newListSeat)
    }

    return (
        <CRow>
            <CCol md={4}>
                <CInputGroup className="mb-3">
                    <CInputGroupText id="rule_name">Đặt tên theo</CInputGroupText>
                    <CFormSelect onChange={handleRuleSelect}>
                        <option value={null}>Chọn ...</option>
                        <option value="seat">Theo ghế</option>
                        <option value="floor">Theo tầng</option>
                        <option value="col">Theo dãy</option>
                    </CFormSelect>
                </CInputGroup>
            </CCol>
            <CCol md={8} className="d-flex gap-2">
                <div className="col-8">
                    {rule &&
                        rule.options &&
                        rule.options.map((option, index) => (
                            <CInputGroup className="mb-3" key={index}>
                                <CInputGroupText id="rule_option">{option.label}</CInputGroupText>
                                <CFormSelect
                                    value={option.rule}
                                    name={'rule'}
                                    onChange={(e) =>
                                        handleSetRuleDetail(
                                            option.value,
                                            e.target.name,
                                            e.target.value,
                                        )
                                    }
                                >
                                    {ruleOption.map((op, i) => (
                                        <option value={op} key={i}>
                                            {op}
                                        </option>
                                    ))}
                                </CFormSelect>
                                <CInputGroupText>Bắt đầu từ</CInputGroupText>
                                <CFormInput
                                    type="number"
                                    value={option.startIndex}
                                    name="startIndex"
                                    onChange={(e) =>
                                        handleSetRuleDetail(
                                            option.value,
                                            e.target.name,
                                            e.target.value,
                                        )
                                    }
                                ></CFormInput>
                            </CInputGroup>
                        ))}
                    {rule && rule.value === 'seat' && (
                        <CInputGroup className="mb-3">
                            <CInputGroupText>Bắt đầu từ</CInputGroupText>
                            <CFormInput
                                type="number"
                                name="startIndex"
                                value={rule.startIndex}
                                onChange={(e) =>
                                    handleSetRuleDetail('seat', e.target.name, e.target.value)
                                }
                            ></CFormInput>
                        </CInputGroup>
                    )}
                </div>
                <CButton
                    color="success"
                    className="col-4"
                    style={{ height: 'fit-content', width: 'fit-content' }}
                    onClick={handleSetSeatName}
                >
                    Áp dụng
                </CButton>
            </CCol>
        </CRow>
    )
}

const AddForm = ({ handleComplete }) => {
    const dispatch = useDispatch()
    const [toast, addToast] = useState(0)
    const [auto_name, setAutoName] = useState(false)
    const toaster = useRef('')
    const [typeInfo, setTypeInfo] = React.useState({
        name: '',
        code: '',
        floor: 1,
        col: 2,
        row: 3,
        fee: 0,
        file: undefined,
    })
    const [seatMap, setSeatMap] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [file, setFile] = useState(undefined)
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
    const setListSeat = (newListSeat) => {
        setSeatMap({
            ...seatMap,
            seats: newListSeat,
        })
    }
    const handleUpImage = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
        setTypeInfo({ ...typeInfo, file: e.target.files[0] })
    }
    const getImage = () => {
        if (file) return file
        else return no_img
    }
    const handleAddBusType = () => {
        //check every seat has name
        const check = seatMap.seats.every((seat) => seat.name !== '')
        //check no name is repeated
        const nameList = seatMap.seats.map((seat) => seat.name)
        const nameSet = new Set(nameList)
        if (nameSet.size !== nameList.length) {
            addToast(() => ({
                message: 'Tên ghế không được trùng nhau',
                type: 'error',
            }))
            return
        }
        if (!file) {
            addToast(() =>
                CustomToast({
                    message: 'Vui lòng chọn hình ảnh xe',
                    type: 'error',
                }),
            )
            return
        }
        if (!check) {
            addToast(() =>
                CustomToast({
                    message: 'Vui lòng đặt tên cho tất cả ghế trước khi lưu',
                    type: 'error',
                }),
            )
        } else {
            const listActiveSeat = seatMap.seats.filter((seat) => seat.active)
            const listSeat = listActiveSeat.map((seat) => {
                return {
                    rowId: seat.row,
                    colId: seat.col,
                    floorId: seat.floor,
                    name: seat.name,
                }
            })
            const busSeatMap = {
                rowNo: seatMap.rowNo,
                colNo: seatMap.colNo,
                floorNo: seatMap.floorNo,
            }
            //add seat map
            setLoading(true)
            dispatch(busThunk.addSeatMap(busSeatMap))
                .unwrap()
                .then(async (result) => {
                    await dispatch(
                        busThunk.addListSeat({ seatMapId: result.id, seatInfors: listSeat }),
                    )
                        .unwrap()
                        .then(() => {
                            console.log('đã thêm map')
                        })
                    await dispatch(
                        busThunk.addBusTypeWithImage({
                            busType: {
                                name: typeInfo.code,
                                capacity: listActiveSeat.length,
                                fee: typeInfo.fee,
                                description: typeInfo.name,
                                file: typeInfo.file,
                            },
                            seatMapId: result.id,
                        }),
                    )
                        .unwrap()
                        .then(() => {
                            addToast(() =>
                                CustomToast({ message: 'Đã thêm loại xe mới', type: 'success' }),
                            )
                            setLoading(false)
                            handleComplete()
                        })
                })
                .catch((err) => {
                    setLoading(false)
                    addToast(() => CustomToast({ message: err, type: 'error' }))
                })
        }
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
                            <CCol md="12">
                                <CInputGroup className="mb-3">
                                    <CInputGroupText id="row-number">Phụ phí xe</CInputGroupText>
                                    <CFormInput
                                        id="fee"
                                        type="number"
                                        value={typeInfo.fee}
                                        name="fee"
                                        max={10000000}
                                        min={0}
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
                            <CRow>
                                <CCol sm={2}>
                                    <CFormCheck
                                        checked={auto_name}
                                        label="Đặt tên tự động"
                                        onChange={() => setAutoName(!auto_name)}
                                    ></CFormCheck>
                                </CCol>
                                <CCol sm={10}>
                                    {auto_name && (
                                        <AutoName
                                            seatMap={seatMap}
                                            setListSeat={setListSeat}
                                        ></AutoName>
                                    )}
                                </CCol>
                            </CRow>
                            <CRow className="mt-3 gap-1 justify-content-center">
                                <CCol md={3}>
                                    <div>
                                        <div>
                                            <b>Hình ảnh</b>
                                        </div>
                                        <CImage
                                            rounded
                                            thumbnail
                                            src={getImage()}
                                            width={200}
                                            height={200}
                                        />
                                        <input
                                            type="file"
                                            onChange={handleUpImage}
                                            name="myImage"
                                            style={{ width: '100%' }}
                                        ></input>
                                    </div>
                                </CCol>
                                <CCol md={8}>
                                    <SeatMap seatMap={seatMap} changeSeatMap={updateSeat}></SeatMap>
                                </CCol>
                            </CRow>
                            <CRow className="my-3 justify-content-center align-items-center">
                                <CCol sm={12} className="border-bottom my-2 border-3"></CCol>
                            </CRow>
                            <CRow className="my-3 justify-content-center align-items-center">
                                <CCol md="4" className="d-flex justify-content-center">
                                    <CustomButton
                                        color="success"
                                        onClick={handleAddBusType}
                                        text="Lưu thông tin"
                                    ></CustomButton>
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
    const [toast, addToast] = useState(0)
    const toaster = useRef('')
    const infoForm = useRef(null)
    const dispatch = useDispatch()
    const [file, setFile] = useState(undefined)
    const listBus = useSelector(selectListBus)
    const [openConfirm, setOpenConfirm] = useState(false)
    const handleChangeTypeInfo = (e) => {
        const { name, value } = e.target
        setBusData({
            ...busData,
            [name]: value,
        })
    }
    const editMap = () => {
        if (isEdit) {
            if (infoForm.current.checkValidity()) {
                const busTypeData = {
                    id: busData.id,
                    name: busData.name,
                    capacity: busData.capacity,
                    fee: busData.fee,
                    description: busData.description,
                    file: busData.file,
                    seatMapId: busData.seatMap.id,
                }
                dispatch(busThunk.updateBusTypeData({ busTypeData }))
                    .unwrap()
                    .then(() => {
                        setIsEdit(false)
                        addToast(() =>
                            CustomToast({ message: 'Đã cập nhật thông tin', type: 'success' }),
                        )
                        dispatch(busThunk.getBusType())
                    })
                    .catch((err) => {
                        addToast(() => CustomToast({ message: err, type: 'error' }))
                    })
            }
        }
        setIsEdit(false)
    }
    const triggerEdit = () => {
        if (!isEdit) setIsEdit(true)
        else editMap()
    }
    const getImage = () => {
        if (file) return file
        else if (busData.image && busData.image !== '') return busData.image
        else return no_img
    }
    const updateBaseData = () => {
        const seats = busType.seatMap.seats.map((seat) => {
            return {
                ...seat,
                active: true,
            }
        })
        setBusData({
            ...busType,
            seatMap: {
                ...busType.seatMap,
                seats: seats,
            },
            img: busType.img,
            file: undefined,
        })
    }
    const handleUpImage = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
        setBusData({ ...busData, file: e.target.files[0] })
    }
    const activeBusType = () => {
        dispatch(busThunk.activeBusType({ id: busData.id, active: !busData.active }))
            .unwrap()
            .then(() => {
                addToast(() =>
                    CustomToast({
                        message: busData.active
                            ? 'Đã ngừng sử dụng loại xe'
                            : 'Đã kích hoạt loại xe',
                        type: 'success',
                    }),
                )
                setOpenConfirm(false)
                dispatch(busThunk.getBusType())
            })
            .catch((err) => {
                addToast(() => CustomToast({ message: err, type: 'error' }))
            })
    }
    useEffect(() => {
        updateBaseData()
    }, [busType])
    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <CRow className="my-3">
                <CCol md={6}>
                    <SeatMap seatMap={busData.seatMap} explain={false} editable={false}></SeatMap>
                </CCol>
                <CCol md={6} className="border p-3 row">
                    <CCol md={4}>
                        <div>
                            <b>Thông tin</b>
                            <CImage rounded thumbnail src={getImage()} width={200} height={200} />
                            {isEdit ? (
                                <input
                                    type="file"
                                    onChange={handleUpImage}
                                    name="myImage"
                                    style={{ width: '100%' }}
                                ></input>
                            ) : (
                                <i>Hình ảnh</i>
                            )}
                        </div>
                    </CCol>
                    <CCol>
                        <CForm ref={infoForm}>
                            <CRow className="justify-content align-items-center">
                                <CCol md="12">
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText
                                            id="bus-type-name"
                                            style={{ width: '115px' }}
                                        >
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
                                        <CInputGroupText
                                            id="bus-type-name"
                                            style={{ width: '115px' }}
                                        >
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
                                        <CInputGroupText
                                            id="floor-number"
                                            style={{ width: '115px' }}
                                        >
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
                                        <CInputGroupText
                                            id="bus-type-num"
                                            style={{ width: '115px' }}
                                        >
                                            Phụ phí xe
                                        </CInputGroupText>
                                        <CFormInput
                                            readOnly={!isEdit}
                                            placeholder="Phụ phí"
                                            aria-describedby="bus-type-num"
                                            type="number"
                                            value={busData.fee}
                                            name="fee"
                                            onChange={handleChangeTypeInfo}
                                        />
                                        <CInputGroupText>VNĐ</CInputGroupText>
                                    </CInputGroup>
                                </CCol>
                                <CCol md="12">
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText
                                            id="bus-type-num"
                                            style={{ width: '115px' }}
                                        >
                                            Tổng số xe
                                        </CInputGroupText>
                                        <CFormInput
                                            readOnly
                                            placeholder="Số xe"
                                            aria-describedby="bus-type-num"
                                            type="number"
                                            value={
                                                listBus.filter((bus) => bus.type.id === busData.id)
                                                    .length
                                            }
                                            name="bus_num"
                                            onChange={handleChangeTypeInfo}
                                        />
                                    </CInputGroup>
                                    {!busType.active && (
                                        <i style={{ color: 'red' }}>Loại xe này đã ngừng sử dụng</i>
                                    )}
                                </CCol>
                            </CRow>
                            <CRow className="justify-content-end">
                                <CCol className="col-auto">
                                    <CButton
                                        onClick={triggerEdit}
                                        color="success"
                                        variant="outline"
                                    >
                                        {isEdit ? 'Lưu' : 'Sửa'}
                                    </CButton>
                                </CCol>
                                {isEdit ? (
                                    <CCol className="col-auto">
                                        <CButton
                                            onClick={() => {
                                                setIsEdit(false)
                                                updateBaseData()
                                            }}
                                            variant="outline"
                                            color="danger"
                                        >
                                            Hủy
                                        </CButton>
                                    </CCol>
                                ) : (
                                    <CCol className="col-auto">
                                        <CButton
                                            color="warning"
                                            variant="outline"
                                            onClick={() => setOpenConfirm(true)}
                                        >
                                            {busType.active ? 'Dừng sử dụng' : 'Kích hoạt'}
                                        </CButton>
                                    </CCol>
                                )}
                            </CRow>
                        </CForm>
                    </CCol>
                </CCol>
            </CRow>
            <CModal visible={openConfirm} onClose={() => setOpenConfirm(false)}>
                <CModalHeader>{busType.active ? 'Xác nhận xóa' : 'Xác nhận mở'}</CModalHeader>
                <CModalBody>
                    <p>Bạn chắc chắn tác vụ này chứ?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton onClick={activeBusType}>Đồng ý</CButton>
                    <CButton onClick={() => setOpenConfirm(false)}>Hủy</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

const BusTypeManagement = () => {
    const [openAdd, setOpenAdd] = useState(false)
    const listBusType = useSelector(selectListBusType)
    const dispatch = useDispatch()
    const handleAddSuccess = () => {
        setOpenAdd(false)
        dispatch(busThunk.getBusType())
    }
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
                <AddForm handleComplete={handleAddSuccess}></AddForm>
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
