import styles from './styles.module.css'
import TicketInfor from '../../../../customer/ticket/ticketInfor'
import { OptionButton } from '../../../../../components/common/button'

const DetailTicket = ({booking, onClose}) => {
    return(
        <div className={styles.container}>
            <div className={styles.mask}></div>
        <div className={styles.dialog}>
            <TicketInfor booking={booking}></TicketInfor>
            <OptionButton text='Đóng' onClick={onClose}></OptionButton>
        </div>
        </div>
    )
}

export default DetailTicket