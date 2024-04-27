import React from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { kimnguyenlogo } from 'src/assets/brand/kimnguyenlogo_b'
import { useState, useRef, useEffect } from 'react'
import authThunk from 'src/feature/auth/auth.service'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from 'src/feature/auth/auth.slice'
import { useNavigate } from 'react-router-dom'
import { selectLoading } from 'src/feature/auth/auth.slice'
import CustomButton from 'src/views/customButton/CustomButton'
import { selectUserRoleId } from 'src/feature/auth/auth.slice'
import { CustomToast } from 'src/views/customToast/CustomToast'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [valuesLogin, setValuesLogin] = useState({
        username: '',
        password: '',
    })
    const loading = useSelector(selectLoading)
    const [toast, addToast] = useState(0)
    const toaster = useRef()
    const loginForm = useRef()
    const userRole = useSelector(selectUserRoleId)
    const [reload, setReload] = useState(false)

    const handleLogin = (e) => {
        if (loginForm.current.checkValidity()) {
            localStorage.removeItem('manager_user')
            e.preventDefault()
            dispatch(
                authThunk.login({
                    username: valuesLogin['username'],
                    password: valuesLogin['password'],
                }),
            )
                .unwrap()
                .then(() => {
                    dispatch(authActions.reset())
                    setReload(true)
                })
                .catch((error) => {
                    addToast(() => CustomToast({ message: error, type: 'error' }))
                })
        } else {
            loginForm.current.reportValidity()
        }
    }

    const handleChangeValue = (e) => {
        setValuesLogin({
            ...valuesLogin,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        if (reload) {
            if (!!userRole) {
                if (userRole === 5) navigate('/')
                else
                    addToast(() =>
                        CustomToast({ message: 'Bạn không có quyền truy cập', type: 'error' }),
                    )
            }
            setReload(false)
        }
    }, [userRole, reload])
    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={8}>
                            <CCardGroup>
                                <CCard className="p-4">
                                    <CCardBody>
                                        <CForm ref={loginForm}>
                                            <div className="d-flex flex-column justify-content-center align-items-center h-100">
                                                <CIcon
                                                    icon={kimnguyenlogo}
                                                    height={32}
                                                    className="text-center"
                                                />
                                                <h2>Chúc bạn một ngày làm việc hiệu quả</h2>
                                                <p>---------------</p>
                                                <h1>Đăng nhập</h1>
                                            </div>
                                            <p className="text-medium-emphasis">
                                                Đăng nhập tài khoản quản lý của bạn
                                            </p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    placeholder="Tên đăng nhập"
                                                    autoComplete="username"
                                                    name="username"
                                                    type="email"
                                                    value={valuesLogin['username']}
                                                    onChange={handleChangeValue}
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type="password"
                                                    placeholder="Mật khẩu"
                                                    autoComplete="current-password"
                                                    pattern="^.{6,}$"
                                                    name="password"
                                                    value={valuesLogin['password']}
                                                    onChange={handleChangeValue}
                                                />
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={6}>
                                                    <CustomButton
                                                        type="submit"
                                                        color="primary"
                                                        className="px-4"
                                                        onClick={handleLogin}
                                                        loading={loading}
                                                        text="Đăng nhập"
                                                    ></CustomButton>
                                                </CCol>
                                                <CCol xs={6} className="text-right">
                                                    <CButton color="link" className="px-0">
                                                        Quên mật khẩu?
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </>
    )
}

export default Login
