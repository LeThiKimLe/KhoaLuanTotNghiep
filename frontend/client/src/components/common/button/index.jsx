import styles from './styles.module.css'
import { ClipLoader } from 'react-spinners';
import React ,{ memo } from 'react';

const Button = (props) => {
    const {text, loading, onClick, className, ...exprops} = props
    return (
        <button className={`${styles.prime_btn} ${className? className : ''} ${styles.prime_btn}`} type='submit' onClick={onClick ? onClick : null} {...exprops}>
            {loading === true ? (
                <>
                <ClipLoader color="#ffffff" size={15} />
                <span>{text}</span>
                </>
            ) : (
                text
            )}
        </button>
    )
}

export const OptionButton = React.forwardRef((props,ref) => {
    const {text, className, ...btnprops} = props
    return (
        <button className={`${styles.option_btn} ${className ? className : '' }`} {...btnprops} ref={ref? ref : null}>
            {text}
        </button>
    )
})

export default memo(Button)