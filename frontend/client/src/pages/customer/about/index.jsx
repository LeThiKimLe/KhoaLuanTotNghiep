import styles from './styles.module.css'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'
import SectionTitle from '../../../components/common/sectionTitle'
import busImage from '../../../assets/bus.png'
import coreValue from '../../../assets/core-value.png'
import Footer from '../../../components/footer'
import './custom.css'

const About = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Header type="list" active="about" />
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <SectionTitle title="Xe Kim Nguyên" subtitle="Kết nối mọi nhà"></SectionTitle>
                        <p>
                            Với mong muốn được phục vụ cho những chuyến hành trình của bà con cô bác Việt Nam đến với các tỉnh / thành phố trên
                            quê hương thân yêu hình chữ S. Xe Kim Nguyên luôn hoàn thiện mỗi ngày để đưa đến cho quý khách hàng những trải nghiệm
                            hoàn hảo nhất.
                        </p>
                        <br></br>
                        Thấu hiểu những nhu cầu đi lại của khách hàng, chúng tôi hi vọng quý khách hàng sẽ luôn tin tưởng
                        và chọn đồng hành cùng Kim Nguyên trong những chuyến hành trình của mình.
                        <br></br>
                        <div className='about d-flex' style={{ marginTop: '30px' }}>
                            <div style={{ flex: 1, padding: '20px' }}>
                                <img src={busImage} alt="" style={{ width: '300px', height: '300px', borderRadius: '50%' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <SectionTitle title="Tầm nhìn và sứ mệnh" subtitle=""></SectionTitle>
                                <ul>
                                    <h2 style={{ color: '#fac83f' }}>Tầm nhìn</h2>
                                    <li>
                                        Trở thành hãng xe vận tải hành khách đường dài hàng đầu trong nước, được công nhận và tin cậy bởi khách hàng và ngành công nghiệp.
                                    </li>
                                    <li>
                                        Xây dựng một mạng lưới vận tải hiệu quả và bền vững, cung cấp dịch vụ vượt trội và trải nghiệm tốt nhất cho khách hàng.
                                    </li>
                                    <li>
                                        Đóng góp tích cực vào phát triển và mở rộng hệ thống giao thông công cộng, đóng vai trò quan trọng trong việc kết nối các địa điểm và cộng đồng trong nước.
                                    </li>
                                </ul>
                                <ul>
                                    <h2 style={{ color: '#fac83f' }}>Sứ mệnh</h2>
                                    <li>
                                        Cung cấp dịch vụ vận tải hành khách đường dài chất lượng cao, an toàn và đáng tin cậy dưới thương hiệu Xe Kim Nguyên, tạo điều kiện thuận lợi cho người dân di chuyển trong nước.

                                    </li>
                                    <li>
                                        Tạo ra trải nghiệm du lịch và di chuyển thoải mái, tiện lợi và đáng nhớ cho khách hàng của Xe Kim Nguyên.
                                    </li>

                                </ul>

                            </div>
                        </div>
                        <div className='about d-flex' style={{ marginTop: '30px' }}>
                            <div style={{ flex: 1, justifyContent:'space-between' }}>
                                <SectionTitle title="Giá trị cốt lõi" subtitle=""></SectionTitle>
                                <ul>
                                    <li>
                                        <h2 style={{ color: '#fac83f' }}>Chất lượng </h2>
                                        <span>
                                             Xe Kim Nguyên cam kết cung cấp chất lượng dịch vụ hàng đầu trong lĩnh vực vận tải hành khách đường dài. Chất lượng không chỉ bao gồm sự an toàn và đáng tin cậy của các phương tiện vận chuyển, mà còn bao gồm cả trải nghiệm tốt nhất cho khách hàng.
                                        </span>
                                    </li>
                                    <li>
                                        <h2 style={{ color: '#fac83f' }}>Sự chuyên nghiệp </h2>
                                        <span>
                                            Xe Kim Nguyên đặt sự chuyên nghiệp lên hàng đầu, từ nhân viên lái xe cho đến nhân viên tiếp nhận và các nhân viên hỗ trợ khác. Đội ngũ nhân viên được đào tạo chuyên sâu, có kiến thức vững và kỹ năng tốt để đảm bảo dịch vụ được cung cấp một cách chuyên nghiệp và tận tâm.
                                        </span>
                                    </li>
                                    <li>
                                        <h2 style={{ color: '#fac83f' }}>Tiện nghi và thoải mái </h2>
                                        <span>
                                            Xe Kim Nguyên tạo ra một môi trường thoải mái và tiện nghi cho khách hàng. Các phương tiện vận chuyển được trang bị các tiện ích hiện đại như ghế nệm êm ái, không gian rộng rãi, hệ thống điều hòa nhiệt độ, giải trí và kết nối internet để đảm bảo hành khách có một trải nghiệm di chuyển thoải mái và tiện lợi.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div style={{ flex: 1, padding: '20px' }}>
                                <img src={coreValue} alt="" style={{ width: '300px', height: '300px' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}

export default About
