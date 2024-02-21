import styles from './styles.module.css'
import Header from '../../../components/header'
import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer'
import { Container, Col, Row } from 'react-bootstrap'
import momo from '../../../assets/momo.svg'
import vnpay from '../../../assets/vnpay.svg'
import icon_scan from '../../../assets/icon_scan.svg'
import { useSelector } from 'react-redux'
import { selectBookingInfor, selectMessage, selectLoading, selectError, bookingActions } from '../../../feature/booking/booking.slice'
import { useState, useEffect } from 'react'
import { convertToTime } from '../../../utils/unitUtils'
import QRCode from 'react-qr-code'
import CountDown from './CountDown'
import Button from '../../../components/common/button'
import { useDispatch } from 'react-redux'
import bookingThunk from '../../../feature/booking/booking.service'
import { selectBookingCode } from '../../../feature/booking/booking.slice'
import { useNavigate } from 'react-router-dom'
import SessionTimeoutDialog from './TimeoutDialog/SessionTimeoutDialog'
import Message from '../../../components/message'
import { selectUserBookingHistory, selectBookingSessionTime } from '../../../feature/booking/booking.slice'
import { useParams } from 'react-router-dom';
import { STATE_DICTIONARY } from '../../../utils/constants'
import { selectIsLoggedIn } from '../../../feature/auth/auth.slice'
import { useCallbackPrompt } from './hooks/useCallbackPrompt'

const Payment = () => {
    const message = useSelector(selectMessage)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)
    const navigate = useNavigate()
    const bookingCode = useSelector(selectBookingCode)
    const bookingSession = useSelector(selectBookingSessionTime)
    const [payment, setPayment] = useState('Momo')
    const isLogin = useSelector(selectIsLoggedIn)
    const handleChooseMethod = (e) => {
        setPayment(e.target.value)
    }
    const dispatch = useDispatch()
    const bookingInfor = useSelector(selectBookingInfor)
    const [showPendingDialog, setShowPendingDialog] = useState(false)
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const [showCancelDialog, setShowCancelDialog] = useState(false)
    const [showInvalidDialog, setShowInvalidDialog] = useState(false)
    // const [showConfirmOutDialog, setShowConfirmOutDialog] = useState(false)
    const [isValidPayment, setValidPayment] = useState(false)
    const [showCountDown, setShowCountDown] = useState(true)
    const { bookingCode: urlBookingCode } = useParams()
    const [paid, setPaid] = useState(false)
    const handleCancelOut = async () => {
        await dispatch(bookingThunk.cancelPayment(urlBookingCode))
            .unwrap()
            .then(() => {
                setPaid(true)
            })
            .catch((error) => {
                setPaid(true)
                setValidPayment(false)
                setShowInvalidDialog(true)
            })
    }
    const handleCancel = async () => {
        await dispatch(bookingThunk.cancelPayment(urlBookingCode))
            .unwrap()
            .then(() => {
                setPaid(true)
                navigate('/')
            })
            .catch((error) => {
                setPaid(true)
                setValidPayment(false)
                setShowInvalidDialog(true)
            })
    }

    const [showConfirmOutDialog, confirmNavigation, cancelNavigation] =
        useCallbackPrompt(!paid, handleCancelOut)

    const handlePayment = () => {
        dispatch(bookingActions.resetMessage())
        dispatch(bookingThunk.bookingPayment({ bookingCode: urlBookingCode, payment }))
            .unwrap()
            .then(() => {
                setPaid(true)
                setShowCountDown(false)
                setShowSuccessDialog(true)
            })
            .catch((error) => {
                setPaid(true)
                setValidPayment(false)
                setShowInvalidDialog(true)
            })
    }
    const handleBackToHome = () => {
        setPaid(true)
        navigate('/')
    }

    const handleContinue = () => {
        dispatch(bookingThunk.keepPayment(urlBookingCode))
            .unwrap()
            .then(() => {
                setPaid(false)
                setShowPendingDialog(false)
                setShowCountDown(true)
            })
            .catch((error) => {
                setPaid(true)
                setValidPayment(false)
                setShowInvalidDialog(true)
            })
    }

    const handleTimeout = () => {
        setShowPendingDialog(true)
        setPaid(true)
        setShowCountDown(false)
    }

    const remainPayment = () => {
        setShowCancelDialog(false)
        setShowCountDown(true)
    }

    const getBookingInfor = (booking) => {
        const { trip, ...bookingInfor } = booking
        return {
            bookingTrip: {
                ...booking.tickets[0].schedule,
                tripInfor: trip
            },
            bookingUser: {
                name: booking.name,
                tel: booking.tel,
                email: booking.email
            },
            bookedSeat: booking.tickets.map((ticket) => ticket.seat),
            pickPoint: booking.pickStation.id,
            dropPoint: booking.dropStation.id
        }
    }

    useEffect(() => {
        const getBookingState = (status) => {
            return STATE_DICTIONARY.filter((state) => state.value === status)[0].key
        }
        const isValidBookingSession = (bookingTime) => {
            const today = new Date()
            const timeDifference = new Date(today.setSeconds(today.getSeconds() + 10)).getTime() - new Date(bookingTime).getTime();
            const minutesDifference = Math.floor(timeDifference / (1000 * 60));
            return minutesDifference >= 0 && minutesDifference < 10
        }
        if (isValidPayment === false) {
            if (isLogin)
                dispatch(bookingThunk.getUserHistory())
                    .unwrap()
                    .then((history) => {
                        if (history.filter((booking) => booking.code === urlBookingCode
                            && getBookingState(booking.status) === 'pending'
                            && isValidBookingSession(booking.bookingDate) === true
                            && booking.tickets.some((ticket) => ticket.state === 'Chờ thanh toán').length === 1
                        )) {
                            setPaid(false)
                            setValidPayment(true)
                            setShowInvalidDialog(false)
                            const currentBooking = history.filter((booking) => booking.code === urlBookingCode)[0]
                            dispatch(bookingActions.updateBookingSession({
                                bookingCode: currentBooking.code,
                                bookingSession: currentBooking.bookingDate,
                                bookingInfor: getBookingInfor(currentBooking)
                            }))
                        }
                        else {
                            setPaid(true)
                            setValidPayment(false)
                            setShowInvalidDialog(true)
                        }
                    })
                    .catch((error) => {
                        if (bookingCode !== '') {
                            if (bookingSession && isValidBookingSession(bookingSession) === true) {
                                setPaid(false)
                                setValidPayment(true)
                                setShowInvalidDialog(false)
                            }
                            else {
                                setPaid(true)
                                setValidPayment(false)
                                setShowInvalidDialog(true)
                            }
                        }
                    })
            else
                if (bookingCode !== '') {
                    if (bookingSession && isValidBookingSession(bookingSession) === true) {
                        setPaid(false)
                        setValidPayment(true)
                        setShowInvalidDialog(false)
                    }
                    else {
                        setPaid(true)
                        setValidPayment(false)
                        setShowInvalidDialog(true)
                    }
                }
        }
    }, [bookingCode])

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(bookingActions.resetMessage())
        const handleBeforeUnload = (event) => {
            event.preventDefault(); // Hủy bỏ sự kiện mặc định để ngăn người dùng rời khỏi trang
            event.returnValue = 'Bạn chắc chắn muốn thoát khỏi trang? Vé sẽ bị hủy'
          }
        const handleUnload = (event) => {
            dispatch(bookingThunk.cancelPayment(urlBookingCode))
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('unload', handleUnload);
        return () => {
            dispatch(bookingActions.resetMessage())
            // dispatch(bookingActions.clearBookingSession())
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('unload', handleUnload);
        }
    }, [])
    return (
        <div>
            {message !== '' && <Message message={message} messagetype={error ? 2 : 1} />}
            {isValidPayment && showPendingDialog && <SessionTimeoutDialog onCancelPayment={handleCancel} onContinue={handleContinue} type='pending'></SessionTimeoutDialog>}
            {isValidPayment && showSuccessDialog && <SessionTimeoutDialog onCancelPayment={handleBackToHome} type='success' ></SessionTimeoutDialog>}
            {isValidPayment && showCancelDialog && <SessionTimeoutDialog onCancelPayment={handleBackToHome} onContinue={remainPayment} type='success' ></SessionTimeoutDialog>}
            {isValidPayment && showConfirmOutDialog && <SessionTimeoutDialog onCancelPayment={confirmNavigation} onContinue={cancelNavigation} type='cancel' ></SessionTimeoutDialog>}
            {!isValidPayment && showInvalidDialog && <SessionTimeoutDialog onCancelPayment={handleBackToHome} type='deny' ></SessionTimeoutDialog>}
            <Navbar></Navbar>
            <Header type="list" />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    {isValidPayment &&
                        <Container fluid>
                            <Row>
                                <Col lg={8} className={styles.paymentContainer}>
                                    <Row>
                                        <Col lg={5} md={5} className={styles.methodCol}>
                                            <h3 className={styles.colTitle}>Chọn hình thức thanh toán</h3>
                                            <div className={styles.methods}>
                                                <label style={{ margin: '15px 0' }}>
                                                    <input
                                                        type="radio"
                                                        value="Momo"
                                                        checked={payment === 'Momo'}
                                                        onChange={handleChooseMethod}
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                    <img src={momo} alt="" style={{ marginRight: '10px' }} />
                                                    <b>MoMo</b>
                                                </label>
                                                <br></br>
                                                <label style={{ margin: '15px 0' }}>
                                                    <input
                                                        type="radio"
                                                        value="VNPay"
                                                        checked={payment === 'VNPay'}
                                                        onChange={handleChooseMethod}
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                    <img src={vnpay} alt="" style={{ marginRight: '10px' }} />
                                                    <b>VNPay</b>
                                                </label>
                                            </div>
                                        </Col>
                                        <Col lg={7} md={7} className={styles.qrCol}>
                                            <h4 className={styles.colTitle}>Tổng thanh toán</h4>
                                            <h2>{`${(bookingInfor.bookingTrip.ticketPrice * bookingInfor.bookedSeat.length).toLocaleString()} đ`}</h2>
                                            <i style={{ color: 'red', fontSize: '14px' }}>{`Thời gian giữ chỗ còn lại `}
                                                {showCountDown ? <CountDown onTimeout={handleTimeout}></CountDown> : <i>00:00</i>}
                                            </i>
                                            <div className={styles.qr}>
                                                <QRCode
                                                    value={payment}
                                                    size={200}
                                                    level={'H'}
                                                />
                                            </div>
                                            <div className={styles.direction}>
                                                <h4>Hướng dẫn thanh toán</h4>
                                                <ol>
                                                    <li>Mở ứng dụng tương ứng trên điện thoại</li>
                                                    <li>{`Dùng biểu tượng `}
                                                        <img src={icon_scan} alt="" />
                                                        {` để quét mã QR`}
                                                    </li>
                                                    <li>Quét mã tại trang và thực hiện các bước
                                                        xác nhận thanh toán ở ứng dụng</li>
                                                </ol>
                                            </div>
                                            <Button text='Thanh toán' onClick={handlePayment} loading={loading}></Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={4}>
                                    <div className={styles.trip_sum}>
                                        <h3 className={styles.sum_title}>Thông tin hành khách</h3>
                                        <div className={styles.sum_infor}>
                                            <span className={styles.sum_infor_title}>Họ tên: </span>
                                            <span className={styles.sum_infor_value}>{bookingInfor.bookingUser.name}</span>
                                        </div>
                                        <div className={styles.sum_infor}>
                                            <span className={styles.sum_infor_title}>Số điện thoại: </span>
                                            <span className={styles.sum_infor_value}>{bookingInfor.bookingUser.tel}</span>
                                        </div>
                                        <div className={styles.sum_infor}>
                                            <span className={styles.sum_infor_title}>Email: </span>
                                            <span className={styles.sum_infor_value}>{bookingInfor.bookingUser.email}</span>
                                        </div>
                                    </div>
                                    <div className={styles.trip_sum}>
                                        <h3 className={styles.sum_title}>Thông tin lượt đi</h3>
                                        <div className={styles.sum_infor}>
                                            <span className={styles.sum_infor_title}>Chuyến xe</span>
                                            <span className={styles.sum_infor_value}>
                                                {bookingInfor.bookingTrip.tripInfor.turn === true ?
                                                    `${bookingInfor.bookingTrip.tripInfor.startStation.name} ⇒ ${bookingInfor.bookingTrip.tripInfor.endStation.name}`
                                                    : `${bookingInfor.bookingTrip.tripInfor.endStation.name} ⇒ ${bookingInfor.bookingTrip.tripInfor.startStation.name}`}
                                            </span>
                                        </div>
                                        <div className={styles.sum_infor}>
                                            <span className={styles.sum_infor_title}>Thời gian</span>
                                            <span className={styles.sum_infor_value}>{`${(bookingInfor.bookingTrip.departTime).slice(0, -3)} ${bookingInfor.bookingTrip.departDate}`}</span>
                                        </div>
                                        <div className={styles.sum_infor}>
                                            <span className={styles.sum_infor_title}>Số lượng ghế</span>
                                            <span className={styles.sum_infor_value}>{`${bookingInfor.bookedSeat.length} ghế`}</span>
                                        </div>
                                        <div className={styles.sum_infor}>
                                            <span className={styles.sum_infor_title}>Vị trí ghế</span>
                                            <span className={styles.sum_infor_value}>{bookingInfor.bookedSeat.join(', ')}</span>
                                        </div>
                                        <div className={styles.sum_infor}>
                                            <span className={styles.sum_infor_title}>Tổng tiền</span>
                                            <span className={styles.sum_infor_value}>{`${(bookingInfor.bookingTrip.ticketPrice * bookingInfor.bookedSeat.length).toLocaleString()} đ`}</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    }
                </div>

            </div>
            <Footer></Footer>
        </div>
    )
}

export default Payment