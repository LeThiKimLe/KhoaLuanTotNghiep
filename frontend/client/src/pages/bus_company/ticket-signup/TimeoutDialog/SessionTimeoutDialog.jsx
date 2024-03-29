import { OptionButton } from '../../../../components/common/button';
import styles from './styles.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

let timeout
let countdownInterval
const SessionTimeoutDialog = ({ onBack, timerout }) => {

  const [countDown, setCountDown] = useState(timerout)

  useEffect(() => {
      const delay = 1000 * 1;
      timeout = setTimeout(() => {
        let countDownDailog = timerout;
        setCountDown(countDownDailog);
        countdownInterval = setInterval(() => {
          if (countDownDailog > 0) {
            setCountDown(--countDownDailog);
          } else {
            onBack();
            clearTimeout(timeout);
            clearInterval(countdownInterval)
          }
        }, 1000);
      }, delay);

      return () => {
        clearTimeout(timeout);
        clearInterval(countdownInterval)
      };
  }, [])

  return (
    <div>
      <div className={styles.dialog_confirmation}>
        <div className={styles.dialog_mask}></div>
        <div className={styles.dialog_dialog}>
              <div className={styles.dialog_title}>
                <FontAwesomeIcon icon={faCheck} color='var(--primary-color)' size='2x' />
                <h2 style={{ textAlign: 'center' }}>Gửi thông tin đăng ký thành công</h2>
              </div>
              <div>
                <b>{`Cảm ơn bạn đã quan tâm đến dịch vụ bán vé của chúng tôi. Chúng tôi sẽ liên hệ bạn trong thời gian sớm nhất để hoàn tất hồ sơ`}</b>
                <br />
                <b>{`Check email để xác nhận các thông tin bạn đã gửi nhé`}</b>
                <br />
                <i>{`Hệ thống sẽ tự động trở về trang chủ trong ${countDown} giây nữa`}</i>
              </div>
              <div className={styles.dialog_actions}>
                <OptionButton onClick={onBack} text="Trở về"></OptionButton>
              </div>
        </div>
      </div>
    </div >
  );
}


export default SessionTimeoutDialog;