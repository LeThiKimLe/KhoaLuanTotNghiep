import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import React, { useEffect } from 'react'
import styles from './styles.module.css'

const Message = ({message, messagetype, repeat}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (messagetype==1)
            toast.success(message, {
                autoClose: 3000,
                className: styles['toast-message']
            })
            else if (messagetype==2)
                toast.error(message, {
                    autoClose: 3000,
                    className: styles['toast-message']
                })
            else
            toast.warning(message, {
                autoClose: 3000,
                className: styles['toast-message']
            })
        }, 0);
        return () => clearTimeout(timer)
    },[message, messagetype, repeat])

    return (
        <div>
            <ToastContainer/>
        </div>
    )
}

export default Message