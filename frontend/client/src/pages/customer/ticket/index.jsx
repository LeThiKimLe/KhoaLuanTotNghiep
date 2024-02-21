import styles from './styles.module.css'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import FormInput from '../../../components/common/formInput'
import { TICKET_INFOR } from '../../../utils/constants'
import Button from '../../../components/common/button'
import {useState, useRef, useEffect} from 'react'
import SectionTitle from '../../../components/common/sectionTitle'
import ReCAPTCHA from 'react-google-recaptcha'
import TicketInfor from './ticketInfor'
import { selectLoading, selectError, selectMessage, selectBookingHistory } from '../../../feature/booking/booking.slice'
import { useDispatch } from 'react-redux'
import bookingThunk from '../../../feature/booking/booking.service'
import { useSelector } from 'react-redux'
import Message from '../../../components/message'
import { bookingActions } from '../../../feature/booking/booking.slice'

const Ticket = () => {
    const loading = useSelector(selectLoading)
    const message = useSelector(selectMessage)
    const dispatch = useDispatch()
    const ticketInfor = TICKET_INFOR
    const [searchInfor, setSearchInfor] = useState({tel:'', booking_code:''})
    const captchaRef = useRef()
    const handleSearchInfor = (e) => {
        setSearchInfor({ ...searchInfor, [e.target.name]: e.target.value })
    }
    const bookingInfor = useSelector(selectBookingHistory)
    const [showTicket, setShowTicket] = useState(false)
    const handleSearchTicket = async (e) => {
        e.preventDefault()
        const token = captchaRef.current.getValue()
        captchaRef.current.reset()
        dispatch(bookingActions.reset())
        dispatch(bookingThunk.getBookingInfor({searchInfor, captcha:token}))
        .unwrap()
        .then((resp)=>{
            setShowTicket(true)
        })
        .catch((error) => {
            setShowTicket(false)
        })
    }

    useEffect(()=>{
        return () => {
            dispatch(bookingActions.resetMessage())
        };
    }, [])
    
    return (
        <>
            {message !== '' && <Message message={message} messagetype={2} />}
            <div>
                <Navbar></Navbar>
                <Header type="list" active="ticket" />
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <SectionTitle title='Tra cứu thông tin đặt vé'></SectionTitle>
                        <form action="" className={styles.formSearchTicket} onSubmit={handleSearchTicket}>
                            {ticketInfor.map((infor) => (
                                <FormInput key={infor.id} {...infor} 
                                           value={searchInfor[infor.name]} 
                                           onChange={handleSearchInfor}
                                           inputWidth = '100%'
                                           className={styles.inputInfor}>
                                </FormInput>
                            ))
                            }
                            <div className={styles.captcha}> 
                            <ReCAPTCHA  sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                                        ref={captchaRef}
                            ></ReCAPTCHA>
                            </div>
                            <Button text="Tra cứu vé" className={styles.searchBtn} loading={loading}></Button>
                        </form>
                        { showTicket===true && bookingInfor ? (
                            <TicketInfor booking={bookingInfor}></TicketInfor>
                        ) : null }
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}

export default Ticket
