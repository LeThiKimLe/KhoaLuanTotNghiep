import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from '../../api/axios'
import axios from 'axios'

const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
    try {
        const response = await axiosClient.post('auth/login', { username, password })
        localStorage.setItem('manager_user', JSON.stringify(response))
        return response
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        const response = await axiosClient.post('auth/logout')
        return response
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
const register = createAsyncThunk(
    'auth/signup',
    async ({ tel, name, email, password }, thunkAPI) => {
        try {
            const response = await axiosClient.post('auth/signup', {
                tel,
                name,
                email,
                password,
                gender: true,
            })
            return response
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

const updateProfile = createAsyncThunk('profile/update', async ({ updatedInfor }, thunkAPI) => {
    try {
        const formData = new FormData()
        formData.append('tel', updatedInfor.tel)
        formData.append('name', updatedInfor.name)
        formData.append('email', updatedInfor.email)
        formData.append('address', updatedInfor.address)
        if (updatedInfor.file) formData.append('file', updatedInfor.file)
        else formData.append('file', new File([], 'empty-file.txt'))

        formData.append('gender', updatedInfor.gender.value)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }

        const response = await axiosClient.put('user/edit', formData, config)
        const cur_user = JSON.parse(localStorage.getItem('manager_user'))
        cur_user.user = response
        localStorage.setItem('manager_user', JSON.stringify(cur_user))
        return cur_user
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const changePassword = createAsyncThunk(
    'auth/password-change',
    async ({ oldPassword, newPassword }, thunkAPI) => {
        try {
            const response = await axiosClient.put('auth/password-change', {
                oldPassword,
                newPassword,
            })
            return response
        } catch (error) {
            const message =
                'Sai mật khẩu cũ' ||
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

const getRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem('manager_user'))
    if (user && user.refreshToken) {
        return user.refreshToken
    } else return ''
}

const getNewAccessToken = createAsyncThunk('auth/refresh-token', async (_, thunkAPI) => {
    try {
        const API_URL = process.env.REACT_APP_API_URL
        const refreshToken = getRefreshToken()
        const axiosRefreshClient = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${refreshToken}`,
            },
        })
        axiosRefreshClient
            .post('/auth/refresh-token')
            .then((response) => {
                // Xử lý phản hồi thành công
                const user = JSON.parse(localStorage.getItem('manager_user'))
                const updatedUser = {
                    ...user,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                }
                localStorage.setItem('manager_user', JSON.stringify(updatedUser))
                localStorage.setItem('validSession', 'true')
                window.dispatchEvent(new Event('storage'))
                return response.data.accessToken
            })
            .catch((err) => {
                localStorage.setItem('validSession', 'false')
            })
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const authThunk = {
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    getNewAccessToken,
}

export default authThunk
