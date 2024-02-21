import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { authActions, selectUser } from '../../../../feature/auth/auth.slice'
import FormInput from '../../../../components/common/formInput'
import Button, { OptionButton } from '../../../../components/common/button'
import { useDispatch } from 'react-redux'
import authThunk from '../../../../feature/auth/auth.service'
import { selectLoading, selectMessage, selectError, selectIsLoggedIn } from '../../../../feature/auth/auth.slice'
import Message from '../../../../components/message'
import LogoutConfirmation from '../../../../components/logout/Logout'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {

    const dispatch = useDispatch()
    const message = useSelector(selectMessage)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)
    const isLogined = useSelector(selectIsLoggedIn)
    const navigate = useNavigate()

    const user = useSelector(selectUser)

    const [resetInfor, setResetInfor] = useState({
        oldpass: '',
        newpass: '',
        repass: ''
    })

    const userInput = [
        {
            id: 1,
            name: "oldpass",
            type: "password",
            placeholder: "Mật khẩu cũ",
            errorMessage: "Mật khẩu có ít nhất 6 ký tự",
            label: "Mật khẩu cũ",
            pattern: "^.{6,}$",
            required: true
        },
        {
            id: 2,
            name: "newpass",
            type: "password",
            placeholder: "Mật khẩu mới",
            errorMessage: "Mật khẩu có ít nhất 6 ký tự",
            label: "Mật khẩu mới",
            pattern: "^.{6,}$",
            required: true
        },
        {
            id: 3,
            name: "repass",
            type: "password",
            placeholder: "Nhập lại mật khẩu",
            errorMessage: "Mật khẩu không khớp",
            label: "Nhập lại mật khẩu",
            pattern: resetInfor.newpass,
            required: true
        }
    ]

    const handleUserInput = (e) => {
        setResetInfor({
            ...resetInfor,
            [e.target.name]: e.target.value
        })
    }

    const handleReset = (e) => {
        e.preventDefault();
        dispatch(authThunk.changePassword({ oldPassword: resetInfor.oldpass, newPassword: resetInfor.newpass }))
            .unwrap()
            .then(() => {
                dispatch(authThunk.logout())
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setResetInfor({
            oldpass: null,
            newpass: null,
            repass: null
        })
    }

    useEffect(() => {
        if (message !== '') {
            const timer = setTimeout(() => {
                dispatch(authActions.reset());
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [message])

    const handleConfirmLogout = () => {
        navigate('/login')
    }

    useEffect(() => {
        dispatch(authActions.reset())
        return () => {
            dispatch(authActions.reset())
        };
    }, [])

    return (
        <div>
            {message !== '' && <Message message={message} messagetype={error ? 2 : 1} />}
            { isLogined === false && <LogoutConfirmation onConfirm={handleConfirmLogout} type='inform'></LogoutConfirmation>}
            <Container fluid>
                <Row>
                    <Col className={styles.container}>
                        <div className={styles.subContainer}>
                            <div style={{ margin: '20px 0' }}>
                                <label style={{ minWidth: '150px', fontSize: '20px', marginRight: '10px', fontWeight: '600' }}>Tài khoản: </label>
                                <span style={{ fontSize: '20px', fontWeight: '600' }}>{user ? user.user.tel : ''}</span>
                            </div>
                            <form action="" onSubmit={handleReset}>
                                {userInput.map((input) => (
                                    <FormInput key={input.id} {...input}
                                        value={resetInfor[input.name]}
                                        onChange={handleUserInput}
                                        inputWidth='100%'
                                    >
                                    </FormInput>
                                ))}
                                <div className={styles.btnGroup}>
                                    <Button text='Xác nhận'
                                        className={styles.btnGroup_item}
                                        loading={loading}
                                    >
                                    </Button>
                                    <OptionButton text='Hủy' className={styles.btnGroup_item} onClick={handleCancel}></OptionButton>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default ResetPassword