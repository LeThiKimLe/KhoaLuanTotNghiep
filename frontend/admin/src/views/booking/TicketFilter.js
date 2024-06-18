import React from 'react'
import { CButton, CFormSelect, CTooltip, CRow, CCol } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentTrip } from 'src/feature/booking/booking.slice'
import { useEffect, useState } from 'react'
import { bookingActions } from 'src/feature/booking/booking.slice'
const TicketFilter = ({ schedule }) => {
    const dispatch = useDispatch()
    const curTrip = useSelector(selectCurrentTrip)
    const [station, setStation] = useState(0)
    const [payStatus, setPayStatus] = useState(0)
    const [guestStatus, setGuestStatus] = useState(0)
    const handleSetFilter = () => {
        dispatch(bookingActions.setTicketFilter({ station, payStatus, guestStatus }))
    }
    const handleResetFilter = () => {
        setStation(0)
        setPayStatus(0)
        setGuestStatus(0)
        dispatch(bookingActions.setTicketFilter({ station: 0, payStatus: 0, guestStatus: 0 }))
    }
    useEffect(() => {
        dispatch(bookingActions.setTicketFilter({ station, payStatus, guestStatus }))
    }, [curTrip])
    return (
        <CRow className="align-items-center">
            <CCol className="auto-col">
                <i>Bộ lọc vé</i>
            </CCol>
            <CCol className="auto-col">
                <CTooltip content="Lọc theo trạm đón/trả khách">
                    <CFormSelect
                        value={station}
                        onChange={(e) => setStation(parseInt(e.target.value))}
                        className="col-md-3"
                    >
                        <option value="0">Tất cả trạm</option>
                        {schedule.tripInfor.stopStations
                            .filter((st) => st.stationType == 'pick' || st.stationType == 'drop')
                            .map((station) => {
                                return (
                                    <option value={station.id} key={station.id}>
                                        {station.station.name}
                                    </option>
                                )
                            })}
                    </CFormSelect>
                </CTooltip>
            </CCol>
            <CCol className="auto-col">
                <CTooltip content="Lọc theo trạng thái thanh toán vé">
                    <CFormSelect
                        value={payStatus}
                        onChange={(e) => setPayStatus(parseInt(e.target.value))}
                        className="col-md-3"
                    >
                        <option value="0">Tất cả</option>
                        <option value="1">Đã thanh toán</option>
                        <option value="2">Chưa thanh toán</option>
                    </CFormSelect>
                </CTooltip>
            </CCol>
            <CCol className="auto-col">
                <CTooltip content="Lọc theo trạng thái khách hàng">
                    <CFormSelect
                        value={guestStatus}
                        onChange={(e) => setGuestStatus(parseInt(e.target.value))}
                        className="col-md-3"
                    >
                        <option value="0">Tất cả</option>
                        <option value="1">Đã lên xe</option>
                        <option value="2">Chưa lên xe</option>
                    </CFormSelect>
                </CTooltip>
            </CCol>
            <CCol className="auto-col">
                <CButton color="primary" onClick={handleSetFilter} className="mx-1">
                    Lọc
                </CButton>
                <CButton variant="outline" onClick={handleResetFilter} color="danger">
                    Hủy
                </CButton>
            </CCol>
        </CRow>
    )
}

export default TicketFilter
