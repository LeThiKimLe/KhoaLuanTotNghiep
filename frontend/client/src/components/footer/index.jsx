import styles from './styles.module.css'
import { Container, Col, Row } from 'react-bootstrap'

const Footer = () =>
{
    return (
        <div className={styles.footer}>
            <div className={styles.fLists}>
                <Container fluid>
                    <Row>
                        <Col md="6">
                            <h3>Trung tâm tổng đài & CSKH</h3>
                            <h2>0333 843 250</h2>
                            <h3>Công ty cổ phần Xe khách Kim Nguyên - XEKIMNGUYEN</h3>
                            <p>
                                <span>Địa chỉ: </span>
                                <b>Số 1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức</b>
                                <br />
                                <span>Email: </span>
                                <b>20110248@student.hcmute.edu.vn</b>
                                <br />
                                <span>Điện thoại: </span>
                                <b>0333 843 250</b>
                            </p>
                        </Col>
                        <Col md="6">
                        <Row>
                            <Col>
                                <h3>Xe Kim Nguyên</h3>
                                <ul>
                                    <li><a href='#'>Về chúng tôi</a></li>
                                    <li><a href='#'>Lịch trình</a></li>
                                </ul>
                            </Col>
                            <Col>
                            <h3>Hỗ trợ</h3>
                            <ul>
                                <li><a href='#'>Tra cứu thông tin đặt vé</a></li>
                                <li><a href='#'>Điều khoản sử dụng</a></li>
                                <li><a href='#'>Hướng dẫn đặt vé</a></li>
                                <li><a href='#'>Câu hỏi thường gặp</a></li>
                                <li><a href='#'>Chính sách bảo mật</a></li>
                            </ul>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                </Container>  
            </div>
            <div className={styles.fText}>Copyright @ 2023 | Bản quyền thuộc về Công ty cổ phần Xe khách Kim Nguyên</div>
        </div>
    )
}

export default Footer