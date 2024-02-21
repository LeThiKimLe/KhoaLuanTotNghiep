import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { OptionButton } from '../common/button';
import { useRef, useEffect } from 'react';

const LogoutConfirmation = ({ onConfirm, onCancel, type }) => {
  const acceptBtn = useRef(null)

  useEffect(() => {
    acceptBtn.current.focus();
  }, []);

  return (
    <div className={styles.logout_confirmation}>
      <div className={styles.logout_mask} onClick={onCancel}></div>
      <div className={styles.logout_dialog}>
        <div className={styles.logout_title}>
          <FontAwesomeIcon icon={faCircleExclamation} color='#febb02' size='2x' />
          { type === 'inform' &&
            (<span>Bạn vừa đổi mật khẩu, hãy đăng nhập lại với mật khẩu mới</span>)}
          {type === 'confirm' &&
             (<span>Bạn thực sự muốn đăng xuất?</span>)
          }
          {type === 'interupt' &&
             (<span>Phiên đăng nhập của bạn bị gián đoạn. Hãy đăng nhập lại</span>)
          }
        </div>
        <div className={styles.logout_actions}>
          { type === 'confirm' && <OptionButton onClick={onCancel} text="Hủy"></OptionButton>}
          <OptionButton onClick={onConfirm} text="Xác nhận" ref={acceptBtn}></OptionButton>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmation;