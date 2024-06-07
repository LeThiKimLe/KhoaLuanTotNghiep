import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from 'src/feature/auth/auth.slice'

const Lock = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            dispatch(authActions.deleteUserInfor())
            navigate('/login')
        }, [5000])
    }, [])
    return (
        <div>
            <h1>
                Hệ thống đã ngừng cung cấp dịch vụ cho nhà xe của bạn. Liên hệ 090.9453.344 để được
                hỗ trợ
            </h1>
        </div>
    )
}

export default Lock
