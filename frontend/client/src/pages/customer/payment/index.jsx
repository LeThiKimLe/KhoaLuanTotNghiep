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
import paymentThunk from '../../../feature/payment/payment.service'
import paymentSlice, { paymentURL, setPaymentURL } from '../../../feature/payment/payment.slice'
import atm_img from '../../../assets/atn_logo.png'
import visa_img from '../../../assets/visa_logo.png'
import mobi_img from '../../../assets/mobi_banking.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import clock_img from '../../../assets/timer-clock.gif'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './TimeoutDialog/StripeCheckoutForm'
import { format } from 'date-fns'

const publicStripe = process.env.REACT_APP_STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(publicStripe);

const Payment = () => {
    const message = useSelector(selectMessage)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)
    const navigate = useNavigate()
    const bookingCode = useSelector(selectBookingCode)
    const bookingSession = useSelector(selectBookingSessionTime)
    const [payment, setPayment] = useState('VNPay')
    const isLogin = useSelector(selectIsLoggedIn)
    const handleChooseMethod = (e) => {
        setPayment(e.target.value)
    }
    const payURL = useSelector(paymentURL)
    const dispatch = useDispatch()
    const bookingInfor = useSelector(selectBookingInfor)
    const [showPendingDialog, setShowPendingDialog] = useState(false)
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const [showCancelDialog, setShowCancelDialog] = useState(false)
    const [showInvalidDialog, setShowInvalidDialog] = useState(false)
    // const [showConfirmOutDialog, setShowConfirmOutDialog] = useState(false)
    const [isValidPayment, setValidPayment] = useState(false)
    const [showCountDown, setShowCountDown] = useState(true)
    const { bookingCode: urlBookingCodeIn } = useParams()
    const urlBookingCode = urlBookingCodeIn.includes('and') ? urlBookingCodeIn.split('and')[0] : urlBookingCodeIn
    const bookingReturnCode = urlBookingCodeIn.includes('and') ? urlBookingCodeIn.split('and')[1] : ''
    console.log(urlBookingCode, bookingReturnCode)
    const [paid, setPaid] = useState(false)
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const [vnp_ResponseCode, setResponseCode] = useState(params.get('vnp_ResponseCode'))
    const [vnp_TransactionNo, setTransactionNo] = useState(params.get('vnp_TransactionNo') || params.get('payment_intent'))
    const [vnp_TransactionDate, setTransactionDate] = useState(params.get('vnp_PayDate') || format(new Date(), 'yyyyMMddHHmmss'))
    const [stripe_Status, setStripeStatus] = useState(params.get('redirect_status'))
    const [processing, setProcessing] = useState(false)
    const [stripeClientSecret, setStripeClientSecret] = useState('')
    const [showStripeDialog, setShowStripeDialog] = useState(false)
    const [returnUrl, setReturnUrl] = useState('')
    const handleCancelOut = async () => {
        let bookingCode = urlBookingCode
        if (bookingReturnCode !== '') {
            bookingCode = bookingCode + 'and' + bookingReturnCode
        }
        await dispatch(bookingThunk.cancelPayment(bookingCode))
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
        let bookingCode = urlBookingCode
        if (bookingReturnCode !== '') {
            bookingCode = bookingCode + 'and' + bookingReturnCode
        }
        await dispatch(bookingThunk.cancelPayment(bookingCode))
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
        console.log(urlBookingCode, bookingReturnCode)
        dispatch(bookingActions.resetMessage())
        if (bookingReturnCode == '') {
            setProcessing(true)
            dispatch(bookingThunk.bookingPayment(
                { bookingCode: urlBookingCode,
                  payment: stripe_Status === 'succeeded' ? 'Stripe' : 'VNPay',
                  transactionNo: vnp_TransactionNo,
                  transactionDate: vnp_TransactionDate}
            ))
            .unwrap()
            .then(() => {
                setProcessing(false)
                setPaid(true)
                setShowCountDown(false)
                setShowSuccessDialog(true)
            })
            .catch((error) => {
                setPaid(true)
                setValidPayment(false)
                setShowInvalidDialog(true)
            })
        } else {
            setProcessing(true)
            dispatch(bookingThunk.bookingReturnPayment(
                { bookingCode: urlBookingCode,
                  bookingCodeReturn: bookingReturnCode,
                  payment: stripe_Status === 'succeeded' ? 'Stripe' : 'VNPay',
                  transactionNo: vnp_TransactionNo,
                  transactionDate: vnp_TransactionDate}
            ))
            .unwrap()
            .then(() => {
                setProcessing(false)
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
    }
    const handleBackToHome = () => {
        setPaid(true)
        navigate('/')
    }

    const handleContinue = () => {
        let bookingCode = urlBookingCode
        if (bookingReturnCode !== '') {
            bookingCode = bookingCode + 'and' + bookingReturnCode
        }
        dispatch(bookingThunk.keepPayment(bookingCode))
            .unwrap()
            .then((res) => {
                dispatch(setPaymentURL(res.paymentURL))
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
        if (bookingReturnCode != '')
            return bookingInfor
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

    const openPayment = () => {
        if (payment == "VNPay") {
            if (payURL !== '') {
                window.location.href = payURL
            }
        } else if (payment == "Stripe") {
            setShowStripeDialog(true)
        }
    }

    const getTotalCost = () => {
        const costGo = bookingInfor.bookingTrip.ticketPrice * bookingInfor.bookedSeat.length
        const costReturn = bookingInfor.bookingReturn ? bookingInfor.bookingReturn.bookingTrip.ticketPrice * bookingInfor.bookingReturn.bookedSeat.length : 0
        return costGo + costReturn
    }
    const getClientSecret = () => {
        dispatch(paymentThunk.createStripePayment({bookingCode: urlBookingCodeIn, amount: getTotalCost()}))
        .unwrap()
        .then((res) => {
            setStripeClientSecret(res.clientSecret)
            setReturnUrl(res.returnURL)
        })
    }
    const appearance = {
        theme: 'stripe',
      };
    const options = {
        clientSecret: stripeClientSecret,
        appearance,
    };
    
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
        // const handleBeforeUnload = (event) => {
        //     event.preventDefault(); // Hủy bỏ sự kiện mặc định để ngăn người dùng rời khỏi trang
        //     event.returnValue = 'Bạn chắc chắn muốn thoát khỏi trang? Vé sẽ bị hủy'
        //   }
        // const handleUnload = (event) => {
        //     dispatch(bookingThunk.cancelPayment(urlBookingCode))
        // };
        // window.addEventListener('beforeunload', handleBeforeUnload);
        // window.addEventListener('unload', handleUnload);
        // return () => {
        //     dispatch(bookingActions.resetMessage())
        //     // dispatch(bookingActions.clearBookingSession())
        //     window.removeEventListener('beforeunload', handleBeforeUnload);
        //     window.removeEventListener('unload', handleUnload);
        // }
    }, [])

    useEffect(() => {
        if (vnp_ResponseCode === '00' || stripe_Status === 'succeeded') {
            handlePayment()    
        }
        else if (vnp_ResponseCode) {
            // Dùng nav để trigger xác nhận out trang
            navigate('/')
        }
    }, [])
    useEffect(() => {
        if (payment === 'Stripe' && stripeClientSecret === '') {
            getClientSecret()
        }
    }, [payment])
    return (
        <div>
            {message !== '' && <Message message={message} messagetype={error ? 2 : 1} />}
            {isValidPayment && showPendingDialog && <SessionTimeoutDialog onCancelPayment={handleCancel} onContinue={handleContinue} type='pending'></SessionTimeoutDialog>}
            {isValidPayment && showSuccessDialog && <SessionTimeoutDialog onCancelPayment={handleBackToHome} type='success' ></SessionTimeoutDialog>}
            {isValidPayment && showCancelDialog && <SessionTimeoutDialog onCancelPayment={handleBackToHome} onContinue={remainPayment} type='success' ></SessionTimeoutDialog>}
            {isValidPayment && showConfirmOutDialog && 
                <SessionTimeoutDialog 
                    onCancelPayment={confirmNavigation} 
                    onContinue={!vnp_ResponseCode ? cancelNavigation : () => {cancelNavigation(); handleContinue()}} 
                    type='cancel' >
                </SessionTimeoutDialog>}
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
                                            <h3 className={styles.colTitle}>Hình thức thanh toán</h3>
                                            <div className={styles.methods}>
                                                <label style={{ margin: '15px 0' }}>
                                                    {/* <FontAwesomeIcon icon={faCircleCheck} style={{color: 'green'}}/> */}
                                                    <input 
                                                        type="radio" 
                                                        name="pay-method" 
                                                        value="VNPay" 
                                                        checked={payment === 'VNPay'}
                                                        onChange={handleChooseMethod}
                                                    >
                                                    </input>
                                                    <img src={vnpay} alt=""/>
                                                    <b>VNPay</b>
                                                </label>
                                                <br></br>
                                                <label style={{ margin: '15px 0' }}>
                                                    {/* <FontAwesomeIcon icon={faCircleCheck} style={{color: 'green'}}/> */}
                                                    <input 
                                                        type="radio" 
                                                        name="pay-method" 
                                                        value="Stripe" 
                                                        checked={payment === 'Stripe'}
                                                        onChange={handleChooseMethod}
                                                    >
                                                    </input>
                                                    <img src={visa_img} alt=""/>
                                                    <b>Thẻ Visa/Master/JCB</b>
                                                </label>
                                                {/* <br></br>
                                                <label style={{ margin: '15px 0' }}>
                                                    <FontAwesomeIcon icon={faCircleCheck} style={{color: 'green'}}/>
                                                    <img src={mobi_img} alt=""/>
                                                    <b>MobileBanking</b>
                                                </label>
                                                <br></br>
                                                <label style={{ margin: '15px 0' }}>
                                                    <FontAwesomeIcon icon={faCircleCheck} style={{color: 'green'}}/>
                                                    <img src={atm_img} alt=""/>
                                                    <b>Thẻ ATM nội địa</b>
                                                </label>
                                                <br></br> */}
                                            </div>
                                        </Col>
                                        <Col lg={7} md={7} className={styles.qrCol}>
                                            <h4 className={styles.colTitle}>Tổng thanh toán</h4>
                                            <h2>{`${getTotalCost().toLocaleString()} đ`}</h2>
                                            {
                                                !processing ? (
                                                    <i style={{ color: 'red', fontSize: '14px' }}>{`Thời gian giữ chỗ còn lại `}
                                                        {showCountDown ? <CountDown onTimeout={handleTimeout}></CountDown> : <i>00:00</i>}
                                                    </i>
                                                ) : (
                                                    <i style={{ color: 'green' }}>Đang xử lý thông tin ...</i>
                                                )
                                            }
                                            <br></br>
                                            <img src={clock_img} style={{width: '50px', height: '50px', marginTop: '10px'}}></img>
                                            <div className={styles.direction}>
                                                <h4>Hướng dẫn thanh toán</h4>
                                                <ol>
                                                    <li>Click vào nút "Thanh toán tại đây"</li>
                                                    <li>Chọn phương thức thanh toán phù hợp</li>
                                                    <li>Thực hiện các bước xác nhận thanh toán tương ứng</li>
                                                    <li>Sau khi thanh toán thành công, bạn sẽ nhận được thông báo và trở về trang chủ</li>
                                                </ol>
                                            </div>
                                            <Button text='Thanh toán tại đây' onClick={openPayment} loading={loading}></Button>
                                            {
                                                showStripeDialog && (
                                                    <Elements stripe={stripePromise} options={options}>
                                                        <CheckoutForm  returnUrl={returnUrl} onClose={() => setShowStripeDialog(false)}/>
                                                    </Elements>
                                                )
                                            }
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
                                                {`${bookingInfor.bookingTrip.tripInfor.startStation.name} ⇒ ${bookingInfor.bookingTrip.tripInfor.endStation.name}`} 
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
                                    {
                                        bookingInfor.bookingReturn && (
                                            <div className={styles.trip_sum}>
                                                <h3 className={styles.sum_title}>Thông tin lượt về</h3>
                                                <div className={styles.sum_infor}>
                                                    <span className={styles.sum_infor_title}>Chuyến xe</span>
                                                    <span className={styles.sum_infor_value}>
                                                        {`${bookingInfor.bookingReturn.bookingTrip.tripInfor.startStation.name} ⇒ ${bookingInfor.bookingReturn.bookingTrip.tripInfor.endStation.name}`}
                                                    </span>
                                                </div>
                                                <div className={styles.sum_infor}>
                                                    <span className={styles.sum_infor_title}>Thời gian</span>
                                                    <span className={styles.sum_infor_value}>{`${(bookingInfor.bookingReturn.bookingTrip.departTime).slice(0, -3)} ${bookingInfor.bookingReturn.bookingTrip.departDate}`}</span>
                                                </div>
                                                <div className={styles.sum_infor}>
                                                    <span className={styles.sum_infor_title}>Số lượng ghế</span>
                                                    <span className={styles.sum_infor_value}>{`${bookingInfor.bookingReturn.bookedSeat.length} ghế`}</span>
                                                </div>
                                                <div className={styles.sum_infor}>
                                                    <span className={styles.sum_infor_title}>Vị trí ghế</span>
                                                    <span className={styles.sum_infor_value}>{bookingInfor.bookingReturn.bookedSeat.join(', ')}</span>
                                                </div>
                                                <div className={styles.sum_infor}>
                                                    <span className={styles.sum_infor_title}>Tổng tiền</span>
                                                    <span className={styles.sum_infor_value}>{`${(bookingInfor.bookingReturn.bookingTrip.ticketPrice * bookingInfor.bookingReturn.bookedSeat.length).toLocaleString()} đ`}</span>
                                                </div>
                                            </div>
                                        )
                                    }
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