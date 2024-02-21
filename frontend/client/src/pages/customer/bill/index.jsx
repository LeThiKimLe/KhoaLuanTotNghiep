import styles from './styles.module.css'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import SectionTitle from '../../../components/common/sectionTitle'
import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { BILL_INFOR } from '../../../utils/constants'
import FormInput from '../../../components/common/formInput'
import Button from '../../../components/common/button'
import BillDetail from './billDetai'
import { BILL_TEST_DATA } from '../../../utils/test_data'
import ticketThunk from '../../../feature/ticket/ticket.service'
import { useDispatch } from 'react-redux'
import Message from '../../../components/message'

const Bill = () => {

    const [billInfor, setBillInfor] = useState({billCode:'', captchaCode: ''})
    const [captchaText, setCaptchaText] = useState(''); 
    const [userInput, setUserInput] = useState(''); 
    const canvasRef = useRef(null);
    const [showBill, setShowBill] = useState(false)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [billData, setBillData] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChangeInfor = (e) => {
        setBillInfor({...billInfor, [e.target.name] : e.target.value})
    }
  
    useEffect(() => { 
        const canvas = canvasRef.current; 
        const ctx = canvas.getContext('2d'); 
        initializeCaptcha(ctx); 
    }, []); 
  
    const generateRandomChar = (min, max) => 
        String.fromCharCode(Math.floor 
            (Math.random() * (max - min + 1) + min)); 
  
    const generateCaptchaText = () => { 
        let captcha = ''; 
        for (let i = 0; i < 2; i++) { 
            captcha += generateRandomChar(65, 90); 
            captcha += generateRandomChar(97, 122); 
            captcha += generateRandomChar(48, 57); 
        } 
        return captcha.split('').sort( 
            () => Math.random() - 0.5).join(''); 
    }; 
  
    const drawCaptchaOnCanvas = (ctx, captcha) => { 
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)']; 
        const letterSpace = 150 / captcha.length; 
        for (let i = 0; i < captcha.length; i++) { 
            const xInitialSpace = 25; 
            ctx.font = '20px Roboto Mono'; 
            ctx.fillStyle = textColors[Math.floor( 
                Math.random() * 2)]; 
            ctx.fillText( 
                captcha[i], 
                xInitialSpace + i * letterSpace, 
                Math.floor(Math.random() * 16 + 25), 
                100 
            ); 
        } 
    };
  
    const initializeCaptcha = (ctx) => { 
        setUserInput(''); 
        const newCaptcha = generateCaptchaText(); 
        setCaptchaText(newCaptcha); 
        drawCaptchaOnCanvas(ctx, newCaptcha); 
    }; 
  
    const handleUserInputChange = (e) => { 
        setUserInput(e.target.value); 
    }; 
  
    const handleBillSubmit = (e) => { 
        e.preventDefault()
        if (billInfor.captchaCode === captchaText) { 
            setLoading(true)
            dispatch(ticketThunk.getTicketBill(billInfor.billCode))
            .unwrap()
            .then((res) => {
                setBillData(res)
                setShowBill(true)
                setLoading(false)
            })
            .catch((error) => {
                setMessage(error)
                setLoading(false)
            })
        } else { 
            const canvas = canvasRef.current; 
            const ctx = canvas.getContext('2d'); 
            initializeCaptcha(ctx); 
        }
    };

    const cancelBill = () => {
        setShowBill(false)
    }
    console.log(BILL_TEST_DATA)
    return (
        <>
            {message !== '' && <Message message={message} messagetype={2} />}
            <div>
                <Navbar></Navbar>
                <Header type="list" active="bill"/>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <SectionTitle title="Tra cứu hóa đơn"></SectionTitle>
                        <form onSubmit={handleBillSubmit} >
                        {BILL_INFOR.map((infor) => (
                                <FormInput key={infor.id} {...infor} 
                                           value={billInfor[infor.name]} 
                                           onChange={handleChangeInfor}
                                           inputWidth = '100%'
                                           className={styles.inputInfor}>
                                </FormInput>
                            ))
                        } 
                        <div className={styles.captchaContainer}>
                            <canvas ref={canvasRef} className={styles.captcha}
                                width="200"
                                height="50"
                                >
                            </canvas> 
                            <button className={styles['reload-button']} onClick={ 
                                () => initializeCaptcha( 
                                    canvasRef.current.getContext('2d'))}> 
                                <FontAwesomeIcon icon={faRotateRight} color='#504e4e'/>
                            </button> 
                        </div>
                        <Button className={styles["submitBtn"]} loading={loading}
                            text='Tra cứu'>
                        </Button>
                        </form>
                    </div>
                </div>
                <Footer></Footer>
                {showBill===true && billData !=='' ? (<BillDetail bill={billData}  cancelBill={cancelBill}></BillDetail>):null}
            </div>
        </>
    )
}

export default Bill
