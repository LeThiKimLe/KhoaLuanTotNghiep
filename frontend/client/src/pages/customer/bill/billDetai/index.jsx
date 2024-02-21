import styles from './styles.module.css'
import Button ,{ OptionButton } from '../../../../components/common/button';
import logo from '../../../../assets/logo10.png'
import BillInput from './billInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import format from 'date-fns/format';
import { getTripJourney } from '../../../../utils/tripUtils';
import { convertToDisplayDate } from '../../../../utils/unitUtils';

const BillDetail = ({ bill, cancelBill }) => {
    const handleDialogClick = (e) => {
        e.stopPropagation();
    }

    const addOneDay = (inputDate) => {
        const parts = inputDate.split('-');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        const date = new Date(year, month - 1, day);
        date.setDate(date.getDate() + 1);

        const nextDay = date.getDate();
        const nextMonth = date.getMonth() + 1; // Tháng trong JavaScript tính từ 0 đến 11
        const nextYear = date.getFullYear();

        return {
            day: nextDay,
            month: nextMonth,
            year: nextYear,
        };
    }

    const issueBillDate = addOneDay(format(new Date(bill.booking.bookingDate), 'dd-MM-yyyy'))

    const downloadBill = () => {
        const qrCodeContainer = document.getElementById('bill');
        html2canvas(qrCodeContainer).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'bill.png';
        link.href = canvas.toDataURL();
        link.click();
        });
    }

    const handlePrintBill = () => {
        const divToPrint = document.getElementById('bill');
        const pdf = new jsPDF();
        pdf.addHTML(divToPrint, () => {
          pdf.save('bill.pdf');
        });
      };

    return (
        <div className={styles.container}>
            <div className={styles.mask} onClick={cancelBill}>
                <div className={styles.billDialog} onClick={handleDialogClick} >
                    <OptionButton text='Close' onClick={cancelBill} className={styles.closeBtn}></OptionButton>
                    <div className={styles.billForm} id='bill'>
                        <div className={styles.companyInfor}>
                            <img src={logo} alt="" style={{ backgroundColor: '#4fc6ed', borderRadius: '10px', width: '200px' }} />
                            <div style={{ fontWeight: '600' }}>CÔNG TY CỔ PHẦN XE KHÁCH KIM NGUYÊN </div>
                        </div>
                        <div className={styles.companyInfor}>
                            <div style={{ textAlign: 'left' }}>
                                <span>Ký hiệu: </span>
                                <span>5K23GLL</span>
                                <br></br>
                                <span>Số: </span>
                                <span style={{ fontSize: '20px', fontWeight: '600' }}>{bill.id}</span>
                            </div>
                            <div style={{ textAlign: 'left', fontWeight: '400' }}>
                                <span>Địa chỉ: </span>
                                <span>486-486A Lê Văn Lương, Phường Tân Phong, Quận 7, Tp Hồ Chí Minh</span>
                                <br></br>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                                    <div>
                                        <span>SĐT: </span>
                                        <span>19006789</span>
                                    </div>
                                    <div>
                                        <span>Mã số thuế: </span>
                                        <span>983873845733-089</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div style={{ textTransform: 'uppercase', marginTop: '10px', fontSize: '20px', fontWeight: '700', color: 'red' }}>Vé Xe Khách</div>
                        <i> {`(Bản thể hiện của hóa đơn điện tử)`}</i>
                        <div className={styles.rowInfor} style={{marginTop:'15px'}}>
                            <span>Tên khách hàng: </span>
                            <BillInput infor={bill.booking.name}></BillInput>
                            <span>Số điện thoại: </span>
                            <BillInput infor={bill.booking.tel}></BillInput>
                        </div>
                        <div className={styles.rowInfor}>
                            <span>Lộ trình: </span>
                            <BillInput infor={getTripJourney(bill.booking.trip)}></BillInput>
                        </div>
                        <div className={styles.rowInfor}>
                            <span>Số ghế: </span>
                            <BillInput infor={bill.seat}></BillInput>
                            <span>Số xe: </span>
                            <BillInput infor={bill.schedule.bus ? bill.schedule.bus.licensePlate :'Đang cập nhật'}></BillInput>
                        </div>
                        <div className={styles.rowInfor}>
                            <span>Xuất bến: </span>
                            <BillInput infor={bill.schedule.departTime.slice(0, -3)}></BillInput>
                            <span>Ngày khởi hành</span>
                            <BillInput infor={convertToDisplayDate(bill.schedule.departDate)}></BillInput>
                        </div>
                        <div className='d-flex' style={{marginTop: '20px'}}>
                            <div style={{flex: 1}}></div>
                            <div className={styles.billDate}>
                                <div className='d-flex' style={{alignItems: 'center'}}>
                                    <span>Ngày</span>
                                    <BillInput infor={issueBillDate.day}></BillInput>
                                    <span>Tháng</span>
                                    <BillInput infor={issueBillDate.month}></BillInput>
                                    <span>Năm</span>
                                    <BillInput infor={issueBillDate.year}></BillInput>
                                </div>
                                <div style={{margin: '3px 0'}}>Người bán hàng</div>
                                <div className='d-flex' style={{ border: '1px solid red', padding: '10px', alignItems:'center'}}>
                                    <FontAwesomeIcon icon={faCheck} color='#4fc6ed' size={'2x'} style={{flex: 0.5}}/>
                                    <span style={{flex: 2}}>Được ký bởi Công ty Cổ Phần xe khách Kim Nguyên</span>
                                </div>
                            </div>
                        </div>
                        <div style={{paddingTop: '10px', fontSize:'14px'}}>{`Tra cứu hóa đơn tại web: https://www.xekimnguyen.id.vn/bill - Mã số tra cứu ${bill.bill?.referCode}`} </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <OptionButton text='Tải hóa đơn' onClick={downloadBill}></OptionButton>
                        {/* <OptionButton text='In hóa đơn' onClick={handlePrintBill}></OptionButton> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BillDetail