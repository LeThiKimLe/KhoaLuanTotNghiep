import styles from './styles.module.css'
import { Container, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faPause, faCircleDown, faCopy } from '@fortawesome/free-solid-svg-icons'
import QRCode from 'react-qr-code'
import html2canvas from 'html2canvas'
import clipboardCopy from 'clipboard-copy'
import { selectMessage, selectError } from '../../../../feature/ticket/ticket.slice'
import { useSelector } from 'react-redux'
import { ticketAction } from '../../../../feature/ticket/ticket.slice'
import { useDispatch } from 'react-redux'
import { selectBookingHistory } from '../../../../feature/booking/booking.slice'
import Message from '../../../../components/message'
import { STATE_DICTIONARY, TICKET_STATE_DICTIONARY } from '../../../../utils/constants'
import { convertToDisplayDate } from '../../../../utils/unitUtils'

const TicketInfor = ({booking}) => {
    
    // const booking = useSelector(selectBookingHistory)
    const message = useSelector(selectMessage)
    const error = useSelector(selectError)
    const dispatch = useDispatch()
    const downloadQR = (code) => {
        const qrCodeContainer = document.getElementById(code);
        html2canvas(qrCodeContainer).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL();
        link.click();
        });
    }

    const copyBillCode = (content) => {
        clipboardCopy(content)
        .then(() => {
            dispatch(ticketAction.setMessage({message: 'Đã copy mã hóa đơn', error: false}))
            
        })
        .catch(() => {
            dispatch(ticketAction.setMessage({message: 'Lỗi xảy ra', error: true}))
            // dispatch(ticketAction.reset())
        })
        dispatch(ticketAction.reset())
    }

    const getTicketState = (status) => {
        return TICKET_STATE_DICTIONARY.filter((state) => state.value === status)[0].key
    }

    const bookingState = STATE_DICTIONARY.filter((state) => state.value === booking.status)[0]
    
    return (
        <div className={styles.container}>
            {message !== '' && <Message message={message} messagetype={error===true ? 2 : 1} />}
            <div className={styles.status} 
                style={{backgroundColor: bookingState.key === 'success' ? '#6AE5D3' :
                         (bookingState.key === 'pending' ? 'rgb(241 219 108)' :'FF8080')}}>
                {bookingState.key === 'success' && (<FontAwesomeIcon icon={faCheck} color='#ffffff' />) }
                {bookingState.key === 'pending' && (<FontAwesomeIcon icon={faXmark} color='#ffffff' />) }
                {bookingState.key === 'cancel' && (<FontAwesomeIcon icon={faPause} color='#ffffff' />) }
            </div>
            <div className={styles.message}>{bookingState.message}</div>
            <div className={styles.inforForm}>
                <div className={styles.formTitle}> Thông tin mua vé </div>
                <Container fluid>
                    <Row className='justify-content-center gutter'>
                        <Col lg={6} md={12} className={`d-flex justify-content-center ${styles.infor}`}>
                            <div style={{minWidth:'300px'}}>
                                <div className={styles.detailInfor}>
                                    <span>Họ và tên:</span>
                                    <span>{booking.name}</span>
                                </div>
                                <div className={styles.detailInfor}>
                                    <span>Số điện thoại:</span>
                                    <span>{booking.tel}</span>
                                </div>
                                <div className={styles.detailInfor}>
                                    <span>Email:</span>
                                    <span>{booking.email}</span>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} md={12} className={`d-flex justify-content-center ${styles.infor}`}>
                            <div style={{minWidth:'300px'}}>
                                <div className={styles.detailInfor}>
                                        <span>Tổng giá vé:</span>
                                        {booking.transaction ? (
                                        <span>{`${(booking.transaction.amount).toLocaleString()}đ`}</span>
                                        ): (
                                            <span>Đang cập nhật</span>
                                        )}
                                </div>
                                <div className={styles.detailInfor}>
                                        <span>PT thanh toán:</span>
                                        {booking.transaction ? (  
                                            <span>{booking.transaction.paymentMethod}</span>
                                        ) : (
                                            <span>Đang cập nhật</span>
                                        )}
                                </div>
                                <div className={styles.detailInfor}>
                                        <span>Trạng thái:</span>
                                        {/* <span>{booking.transaction.status}</span> */}
                                        {booking.transaction ? (  
                                            <span>Đã thanh toán</span>
                                        ) : (
                                            <span>Chưa thanh toán</span>
                                        )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className='justify-content-center gutter'>
                        {booking.tickets.map((ticket) => (
                            <Col lg={4} md={4} xs={12} className={styles.ticketContainer} key={ticket.id}>
                                <div className={styles.ticketCode}>{`Mã vé: ${ticket.id}`}</div>
                                <div className={styles.qrCode} id={ticket.id}>
                                <QRCode
                                        value={ticket.id.toString()}
                                        size={100}
                                        level={'H'}
                                    />
                                </div>
                                <p style={{marginTop:'0'}}>
                                    <FontAwesomeIcon icon={faCircleDown}/>
                                    <a onClick={()=>downloadQR(ticket.id)} className={styles.downloadQR}>
                                        Tải vé
                                    </a>
                                </p>
                                <div className={styles.ticketInfor}>
                                    <div className={styles.ticketDetail}>
                                            <span>Trạng thái</span>
                                            <span className={`${styles['ticket-state']} ${styles[getTicketState(ticket.state)]}`}>{ticket.state}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Mã đặt vé</span>
                                        <span>{booking.code}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Chuyến xe</span>
                                        {booking.trip.turn === true 
                                        ? (
                                            <span>{`${booking.trip.startStation.name} - ${booking.trip.endStation.name}`}</span> 
                                        )
                                        : (
                                            <span>{`${booking.trip.endStation.name} - ${booking.trip.startStation.name}`}</span> 
                                        )
                                        }
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Thời gian</span>
                                        <span>{`${ticket.schedule.departTime.slice(0,-3)} - ${convertToDisplayDate(ticket.schedule.departDate)}`}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Số ghế</span>
                                        <span>{ticket.seat}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Điểm lên xe</span>
                                        <span>{booking.pickStation.station.name}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Điểm xuống xe</span>
                                        <span>{booking.dropStation.station.name}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Giá vé</span>
                                        <span>{`${ticket.schedule.ticketPrice.toLocaleString()}đ`}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Biển số xe</span>
                                        {ticket.schedule.bus ? <span>{ticket.schedule.bus.licensePlate}</span>
                                             : <span> Đang cập nhật </span>}
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Mã hóa đơn</span>
                                        <span>
                                            <FontAwesomeIcon icon={faCopy} onClick={() => copyBillCode(ticket.bill ? ticket.bill.referCode : '')} color='#504e4e' className={styles.copyBtn} />
                                            {`${ticket.bill ? " " + ticket.bill.referCode : ' Đang cập nhật'}`}
                                        </span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Kiểm tra hóa đơn</span>
                                        <span><a href="/bill" target='_blank'>Tại đây</a></span>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default TicketInfor