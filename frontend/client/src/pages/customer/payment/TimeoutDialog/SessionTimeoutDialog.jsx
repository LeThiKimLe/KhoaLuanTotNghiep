import { OptionButton } from "../../../../components/common/button";
import styles from './styles.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

let timeout
let countdownInterval
const SessionTimeoutDialog = ({ onCancelPayment, onContinue, type }) => {

  const [countDown, setCountDown] = useState(10)

  useEffect(() => {
    if (type !== 'cancel') {
      const delay = 1000 * 1;
      timeout = setTimeout(() => {
        let countDownDailog = 10;
        setCountDown(countDownDailog);
        countdownInterval = setInterval(() => {
          if (countDownDailog > 0) {
            setCountDown(--countDownDailog);
          } else {
            onCancelPayment();
            clearTimeout(timeout);
            clearInterval(countdownInterval)
          }
        }, 1000);
      }, delay);

      return () => {
        clearTimeout(timeout);
        clearInterval(countdownInterval)
      };
    }

  }, [])

  return (
    <div>
      <div className={styles.dialog_confirmation}>
        <div className={styles.dialog_mask}></div>
        <div className={styles.dialog_dialog}>
          {type === 'pending' && (
            <>
              <div className={styles.dialog_title}>
                <FontAwesomeIcon icon={faCircleExclamation} color='#febb02' size='2x' />
                <h2>Phiên thanh toán sắp hết hạn</h2>
              </div>
              <p>
                {`Vé của bạn sẽ bị hủy trong vòng ${countDown} giây nữa`}
                <br />
                <span>{`Bạn có muốn thanh toán tiếp không?`}</span>
              </p>
              <div className={styles.dialog_actions}>
                <OptionButton onClick={onCancelPayment} text="Hủy"></OptionButton>
                <OptionButton onClick={onContinue} text="Tiếp tục thanh toán"></OptionButton>
              </div>
            </>
          )}
          {type === 'success' && (
            <>
              <div className={styles.dialog_title}>
                <FontAwesomeIcon icon={faCheck} color='var(--primary-color)' size='2x' />
                <h2 style={{ textAlign: 'center' }}>Thanh toán vé thành công</h2>
              </div>
              <div>
                <b>{`Check email đặt vé để nhận các thông tin của vé điện tử bạn đặt nhé`}</b>
                <br />
                <i>{`Hệ thống sẽ tự động trở về trang chủ trong ${countDown} giây nữa`}</i>
              </div>
              <div className={styles.dialog_actions}>
                <OptionButton onClick={onCancelPayment} text="Trở về"></OptionButton>
              </div>
            </>
          )}
          {type === 'cancel' && (
            <>
            <div className={styles.dialog_title}>
              <FontAwesomeIcon icon={faCircleExclamation} color='#febb02' size='2x' />
              <h2>Vé vẫn đang được giữ cho bạn</h2>
            </div>
            <p>
              <span>{`Bạn có muốn thanh toán tiếp không?`}</span>
            </p>
            <div className={styles.dialog_actions}>
              <OptionButton onClick={onCancelPayment} text="Hủy vé"></OptionButton>
              <OptionButton onClick={onContinue} text="Tiếp tục thanh toán"></OptionButton>
            </div>
          </>
          )}
          {
            type === 'deny' && (
              <>
                <div className={styles.dialog_title}>
                  <FontAwesomeIcon icon={faCircleExclamation} color='#febb02' size='2x' />
                  <h2 style={{ textAlign: 'center' }}>Thanh toán không hợp lệ</h2>
                </div>
                <div>
                  <b>Giao dịch đã được thanh toán hoặc phiên thanh toán đã hết hạn</b>
                  <br />
                  <i>{`Hệ thống sẽ tự động trở về trang chủ trong ${countDown} giây nữa`}</i>
                </div>
                <div className={styles.dialog_actions}>
                  <OptionButton onClick={onCancelPayment} text="Trở về"></OptionButton>
                </div>
              </>
            )
          }
        </div>
      </div>
    </div >
  );
}


export default SessionTimeoutDialog;