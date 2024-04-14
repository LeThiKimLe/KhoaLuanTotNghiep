import React, { useState } from 'react';
import styles from './styles.module.css'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'
import SectionTitle from '../../../components/common/sectionTitle'
import Footer from '../../../components/footer'
import FormInput from '../../../components/common/formInput';
import Button from '../../../components/common/button';
import joinImg from '../../../assets/join.png'
import moneyImg from '../../../assets/money-growth.png'
import assistImg from '../../../assets/assist.png'
import bussinessImg from '../../../assets/business-insights.png'
import exclusiveImg from '../../../assets/exclusive-1.png'
import worthinessImg from '../../../assets/worthiness.png'
import driverImg from '../../../assets/driver.png'
import checkImg from '../../../assets/check.png'

const InforBox = ({ index, title, content }) => {
    return (
        <div className={`d-flex flex-column align-items-center ${styles.step}`}>
            <div className={styles.round}>{index}</div>
            <b>{title}</b>
            <p>{content}</p>
        </div>
    )
}

const PartnerSignup = () => {

    const [driverInfo, setDriverInfo] = useState({})
    const [vehicleInfo, setVehicleInfo] = useState({})

    const driverInput = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "Nhập tên chủ xe",
            errorMessage: "Tên chủ xe không được để trống",
            label: "Tên chủ xe",
            pattern: "^.+$",
            required: true,
        },
        {
            id: 2,
            name: "id",
            type: "text",
            placeholder: "Nhập số căn cước công dân",
            errorMessage: "Căn cước công dân không được để trống",
            label: "CCCD",
            pattern: "^.{9,}$",
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
            pattern: "^(0\d{9,10}|\+\d{1,3}\s?\d{1,14})$",
            required: true,
        },
        {
            id: 5,
            name: "license",
            type: "text",
            placeholder: "Nhập số giấy phép lái xe",
            errorMessage: "Số giấy phép không để trống",
            label: "Số GPLX",
            pattern: "^.+$",
            required: true,
        }
    ]

    const vehicleInput = [
        {
            id: 1,
            name: "licensPlate",
            type: "text",
            placeholder: "Nhập biển số xe",
            errorMessage: "Biển số xe không được để trống",
            label: "Biển số xe",
            pattern: "^.+$",
            required: true,
        },
        {
            id: 2,
            name: "type",
            type: "text",
            placeholder: "Nhập loại xe",
            errorMessage: "Loại xe không được để trống",
            label: "Loại xe",
            pattern: "^.+$",
            required: true,
        },
        {
            id: 3,
            name: "color",
            type: "text",
            placeholder: "Nhập màu xe",
            errorMessage: "Màu xe không được để trống",
            label: "Màu xe",
            pattern: "^.+$",
            required: true,
        },
        {
            id: 4,
            name: "manufactureYear",
            type: "text",
            placeholder: "Nhập năm sản xuất",
            errorMessage: "Năm sản xuất không hợp lệ",
            label: "Năm sản xuất",
            pattern: "^[0-9]{4}$",
            required: true,
        },
    ]

    const onChangeDriverInfo = (e) => {
        setDriverInfo({ ...driverInfo, [e.target.name]: e.target.value })
    }

    const onChangeVehicleInfo = (e) => {
        setVehicleInfo({ ...vehicleInfo, [e.target.name]: e.target.value })
    }

    const handleSignupClick = () => {
        // Scroll to the form data section
        const formDataSection = document.getElementById('form-data');
        formDataSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div >
            <Navbar></Navbar>
            <Header type="list" active="cooperate" />
            <div className={styles.container}>
                <div className={styles.wrapper} >
                    <div className={`row ${styles.intro}`}>
                        <div className='col-4 d-flex flex-column justify-content-center align-items-center'>
                            <h2>
                                😎 Bạn là tài xế đầy nhiệt huyết ? Bạn muốn tận dụng thời gian và tăng thu nhập?
                                Hãy gia nhập đội ngũ đối tác vận chuyển của chúng tôi ngay hôm nay ! 😉
                            </h2>
                            <h5> 👇 Đăng ký ngay hôm nay 👇</h5>
                            <Button text="Đăng ký ngay" onClick={handleSignupClick}></Button>
                        </div>
                        <div className='col-4'>
                            <img src={driverImg} className='w-100'></img>
                        </div>
                        <div className={`col-4 ${styles.props}`}>
                            <img src={checkImg}></img>
                            <i><b>Tăng khả năng kiếm tiền</b></i>
                            <p>
                                Bạn có thể kiếm thu nhập ổn định và linh hoạt, làm việc theo giờ và kiểm soát thu nhập của riêng mình.
                            </p>
                            <br></br>
                            <img src={checkImg}></img>
                            <i><b>Được hỗ trợ 24/7</b></i>
                            <p>
                                Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng 24/7 để giải đáp mọi thắc mắc và hỗ trợ bạn trong quá trình làm việc.
                            </p>
                            <br></br>
                            <img src={checkImg}></img>
                            <i><b>Thu nhập ổn định</b></i>
                            <p>
                                Bạn có thể nhận thêm tiền thưởng, khuyến mãi và các chương trình thúc đẩy thu nhập.
                                Chúng tôi luôn nỗ lực để tạo ra những cơ hội tăng thu nhập cho tài xế.
                            </p>
                        </div>
                        <div className={`${styles.signup} col-12`}>
                            <div>
                                <form id="form-data">
                                    <div className='row justify-content-center'>
                                        <div className='col-6'>
                                            <div >
                                                <h2>Thông tin tài xế</h2>
                                                {driverInput.map((input) => (
                                                    <FormInput
                                                        key={input.id} {...input}
                                                        value={driverInfo[input.name]}
                                                        onChange={onChangeDriverInfo}>
                                                    </FormInput>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div >
                                                <h2>Thông tin phương tiện</h2>
                                                {vehicleInput.map((input) => (
                                                    <FormInput
                                                        key={input.id} {...input}
                                                        value={vehicleInfo[input.name]}
                                                        onChange={onChangeVehicleInfo}>
                                                    </FormInput>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <Button text="Đăng ký trở thành đối tác"></Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-12'>
                            <div className='text-center p-3'>
                                <h1>Đăng ký nhanh chóng bằng 4 bước cơ bản</h1>
                            </div>
                            <div className='row'>
                                <div className='col-3'>
                                    <InforBox
                                        index={1}
                                        title="Đăng ký hồ sơ"
                                        content="Chủ phương tiện vui lòng cung cấp thông tin cá nhân và phương tiện để được tư vấn hỗ trợ"
                                    >
                                    </InforBox>
                                </div>
                                <div className='col-3'>
                                    <InforBox
                                        index={2}
                                        title="Tư vấn"
                                        content="Chúng tôi sẽ liên hệ xác minh thông tin và tư vấn sớm nhất.
                                     Giải đáp tất cả thắc mắc của bạn"
                                    >
                                    </InforBox>
                                </div>
                                <div className='col-3'>
                                    <InforBox
                                        index={3}
                                        title="Ký hợp đồng"
                                        content="Sau khi tư vấn thành công, chủ xe sẽ tiến hành ký kết hợp đồng."
                                    >
                                    </InforBox>
                                </div>
                                <div className='col-3'>
                                    <InforBox
                                        index={4}
                                        title="Sẵn sàng nhận chuyến"
                                        content="Chúng tôi sẽ thông tin cho bạn sớm nhất về các chuyến xe của khách hàng để bạn có thể sẵn sàng nhận chuyến"
                                    >
                                    </InforBox>
                                </div>
                            </div>
                        </div>
                        <div className='col-4 mt-4'>
                            <Button text="ĐĂNG KÝ NGAY" onClick={handleSignupClick}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerSignup;