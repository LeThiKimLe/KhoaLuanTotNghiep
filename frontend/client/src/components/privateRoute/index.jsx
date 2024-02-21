import {
    Navigate,
    Outlet,
  } from 'react-router-dom';

import LogoutConfirmation from '../logout/Logout';
import { useState } from 'react';
import { authActions } from '../../feature/auth/auth.slice';
import { useDispatch } from 'react-redux';
const ProtectedRoute = ({
    redirectPath = '/login',
    children,
  }) => {
    
    const [confirm, setConfirm] = useState(false)
    const dispatch = useDispatch()
    const validSession = JSON.parse(localStorage.getItem('validSession'))
    const handleLogout = () => {
        dispatch(authActions.deleteUserInfor())
        setConfirm(true)
    }

    if (!validSession) {
        if (confirm)
            return <Navigate to={redirectPath} replace />;
        else
            return <LogoutConfirmation onConfirm={handleLogout} type='interupt'></LogoutConfirmation>
    }
    return children ? children : <Outlet />;
  };

export default ProtectedRoute