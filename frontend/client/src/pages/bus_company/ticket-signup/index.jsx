import React, { useReducer } from 'react';
import styles from './styles.module.css'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'
import SectionTitle from '../../../components/common/sectionTitle'
import Footer from '../../../components/footer'
import { useState, useRef } from 'react';
import FormInput from '../../../components/common/formInput';
import Button from '../../../components/common/button';
import joinImg from '../../../assets/join.png'
import moneyImg from '../../../assets/money-growth.png'
import assistImg from '../../../assets/assist.png'
import bussinessImg from '../../../assets/business-insights.png'
import exclusiveImg from '../../../assets/exclusive-1.png'
import worthinessImg from '../../../assets/worthiness.png'
import { useDispatch } from 'react-redux';
import busCompanyThunk from '../../../feature/bus-company/busCompany.service';
import SessionTimeoutDialog from './TimeoutDialog/SessionTimeoutDialog';
import { useNavigate } from 'react-router-dom';

const StepBox = ({ index, title, content }) => {
    return (
        <div className={`d-flex flex-column align-items-center ${styles.step}`}>
            <div className={styles.round}>{index}</div>
            <b>{title}</b>
            <p>{content}</p>
        </div>
    )
}

const InforBox = ({ image, title, content }) => {
    return (
        <div>
            <img src={image} alt="image" style={{ width: '75px', height: '75px'}}></img>
            <h4>{title}</h4>
            <p>{content}</p>
        </div>
    )
}

const TicketSignup = () => {
    const handleSignupClick = () => {
        const formDataSection = document.getElementById('form-data');
        formDataSection.scrollIntoView({ behavior: 'smooth', block: 'center'});
    };
    const navigate = useNavigate()
    const [showTimeoutDialog, setShowTimeoutDialog] = useState(false)
    const dispatch = useDispatch()
    const formRegister = useRef(null)
    const [loading, setLoading] = useState(false)
    const [companyInfo, setCompanyInfo] = useState({
        firmName: "",
        representName: "",
        email: "",
        telephone: "",
        businessLicense: "",
    })
    const companyInput = [
        {
            id: 1,
            name: "firmName",
            type: "text",
            placeholder: "Nhập tên hãng xe",
            errorMessage: "Tên hãng xe không được để trống",
            label: "Tên hãng xe",
            pattern: "^.+$",
            required: true,
        },
        {
            id: 2,
            name: "representName",
            type: "text",
            placeholder: "Nhập tên người đại diện",
            errorMessage: "Tên người đại diện không được để trống",
            label: "Tên người đại diện",
            pattern: "^.{6,}$",
            required: true,
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Nhập email",
            errorMessage: "Email không hợp lệ",
            label: "Email",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            required: true,
        },
        {
            id: 4,
            name: "telephone",
            type: "text",
            placeholder: "Nhập số điện thoại",
            errorMessage: "Số điện thoại không hợp lệ",
            label: "Nhập số điện thoại",
            pattern: "^[0-9]{10,11}$",
            required: true,
        },
        {
            id: 5,
            name: "businessLicense",
            type: "text",
            placeholder: "Nhập số giấy phép kinh doanh",
            errorMessage: "Số giấy phép không để trống",
            label: "Số GPKD",
            pattern: "^.+$",
            required: true,
        }
    ]
    const onChangeCompanyInfo = (e) => {
        setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value })
    }
    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true)
        dispatch(busCompanyThunk.registerBusCompany(companyInfo))
        .unwrap()
        .then((res) => {
            setShowTimeoutDialog(true)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }
    const returnToHome = () => {
        navigate('/')
    }
    return (
        <div >
            <Navbar></Navbar>
            <Header type="list" active="cooperate" />
            <div className={styles.container}>
                <div className={styles.wrapper} >
                    <div className={styles.signup}>
                        <div className="row justify-content-between">
                            <div className='col-5 d-flex flex-column justify-content-center align-items-center'>
                                <h1>
                                    Tăng 30% lượng khách đặt vé khi mở bán online ngay hôm nay!
                                </h1>
                                <h5>Đăng ký hoàn toàn miễn phí hôm nay</h5>
                                <img className='w-75 h-50' src={joinImg} alt="join"></img>
                            </div>
                            <div className='col-6'>
                                <div id="form-data">
                                    <h2>Hãy trở thành thành viên của nền tảng bán vé xe khách trực tuyến của chúng tôi</h2>
                                    <form ref={formRegister} onSubmit={handleRegister}>
                                        {companyInput.map((input) => (
                                            <FormInput
                                                key={input.id} {...input}
                                                value={companyInfo[input.name]}
                                                onChange={onChangeCompanyInfo}>
                                            </FormInput>
                                        ))}
                                        <br></br>
                                        <Button text="Đăng ký mở bán" loading={loading}></Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='text-center p-3'>
                            <h1>Lợi ích khi bán vé cùng chúng tôi</h1>
                        </div>
                        <div className='row'>
                            <div className='col-6 my-3'>
                                <InforBox
                                    image={moneyImg}
                                    title="Tăng doanh thu từ 30-50%"
                                    content="Chúng tôi là một giải pháp toàn diện để bán được nhiều vé trong thời gian ngắn nhờ kênh bán vé với 5000+ đại lý trong và ngoài nước.
                                    Với việc tiếp cận nhanh chóng và dễ dàng tới hàng triệu khách hàng, và là thương hiệu đáng tin cậy nhất cho việc đặt vé xe khách trực tuyến,
                                    chúng tôi có thể giúp các công ty xe khách bán vé nhanh chóng."
                                >
                                </InforBox>
                            </div>
                            <div className='col-6'>
                                <InforBox
                                    image={worthinessImg}
                                    title="Đảm bảo công bằng cho tất cả các nhà xe"
                                    content="Chúng tôi có thuật toán sắp xếp thứ tự hiển thị của nhà xe dành cho khách trên các tuyến đường dựa vào các tiêu chí nhất định như chất lượng phục vụ của nhà xe, chính sách hủy vé, hình ảnh, cho phép khách thanh toán tại nhà xe,… mà không có sự can thiệp của con người.
                                    Hệ thống sẽ ưu tiên giới thiệu cho khách các nhà xe có chất lượng phục vụ tốt."
                                >
                                </InforBox>
                            </div>
                            <div className='col-6'>
                                <InforBox
                                    image={bussinessImg}
                                    title="Cung cấp đầy đủ công cụ giúp nhà xe tăng doanh thu bán vé qua sàn"
                                    content="Hệ thống cung cấp công cụ giúp tăng lượng truy cập vào gian hàng của nhà xe trên sàn, hỗ trợ nhà xe tăng lượng khách mua vé bằng những công cụ, chương trình ưu đãi như ưu đãi đặt sớm, ưu đãi phút chót,… 
                                    Chúng tôi cũng cung cấp những đánh giá của khách hàng về độ an toàn, thái độ nhân viên, chất lượng xe,…
                                    Những điều đó giúp nhà xe cải thiện và nâng cao chất lượng phục vụ."
                                >
                                </InforBox>
                            </div>
                            <div className='col-6'>
                                <InforBox
                                    image={exclusiveImg}
                                    title="Chương trình độc quyền từ hệ thống"
                                    content="Nhà xe của bạn sẽ tận hưởng bộ quyền lợi truyền thông lên đến 50 triệu đồng, ưu tiên hiển thị trên các trang bán vé của hệ thống, ưu đãi các sản phẩm trong hệ sinh thái của chúng tôi.
                                     Để tận hưởng những quyền lợi này, bạn chỉ cần hoàn tất việc đăng ký mở bán vé của mình trên Vexere!"
                                >
                                </InforBox>
                            </div>
                            <Button text="ĐĂNG KÝ MỞ BÁN NGAY" onClick={handleSignupClick}></Button>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-12'>
                            <div className='text-center p-3'>
                                <h1>Đăng ký nhanh chóng bằng 4 bước đơn giản</h1>
                            </div>
                            <div className='row'>
                                <div className='col-3'>
                                    <StepBox
                                        index={1}
                                        title="Đăng ký hồ sơ"
                                        content="Chủ nhà xe vui lòng để lại thông tin hoặc liên hệ hotline để được tư vấn hỗ trợ"
                                    >
                                    </StepBox>
                                </div>
                                <div className='col-3'>
                                    <StepBox
                                        index={2}
                                        title="Tư vấn"
                                        content="Chúng tôi sẽ liên hệ xác minh thông tin và tư vấn sớm nhất. Giải đáp tất cả thắc mắc của nhà xe về tệp khách hàng mục tiêu và kỷ vọng của nhà xe."
                                    >
                                    </StepBox>
                                </div>
                                <div className='col-3'>
                                    <StepBox
                                        index={3}
                                        title="Ký hợp đồng"
                                        content="Sau khi tư vấn thành công, chủ xe sẽ tiến hành ký kết hợp đồng."
                                    >
                                    </StepBox>
                                </div>
                                <div className='col-3'>
                                    <StepBox
                                        index={4}
                                        title="Sẵn sàng mở bán vé"
                                        content="Mở bán cùng chúng tôi, chúng tôi luôn đồng hành và hỗ trợ nhà xe cho đến khi phát sinh doanh thu.
                                         Chủ nhà xe hoàn toàn kiểm soát được nội dung hiển thị trên sàn về thương hiệu nhà xe."
                                    >
                                    </StepBox>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showTimeoutDialog && <SessionTimeoutDialog onBack={returnToHome} timerout={15}></SessionTimeoutDialog>
            }
        </div>
    );
};

export default TicketSignup;