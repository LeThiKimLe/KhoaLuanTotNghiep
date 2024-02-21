import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosClient from "../../api/axios"

const login = createAsyncThunk('auth/login', async ({username, password}, thunkAPI) => {
    try{
        const response = await axiosClient.post('auth/login', {username, password})
        localStorage.setItem("current_user", JSON.stringify(response))
        return response
    }
    catch (error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
} 
)

const logout = createAsyncThunk('auth/logout', async (_,thunkAPI) => {
    try{
        const response = await axiosClient.post('auth/logout')     
        return response
    }
    catch(error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
const register = createAsyncThunk('auth/signup', async({tel, name, email, password}, thunkAPI) => {
    try{
        const response = await axiosClient.post('auth/signup', {tel, name, email, password, gender:true})
        return response
    }
    catch (error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
        }
    }
)

const getOTP = createAsyncThunk('auth/send-otp', async(telno, thunkAPI) => {
    try{
        const response = await axiosClient.post('auth/send-sms', null, {
            params: {
                phoneNumber: telno
            }
        })
        return response
    }
    catch(error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}) 

const validateOTP = createAsyncThunk('auth/verify-otp', async({telno, otp}, thunkAPI) => {
    try{
        const response = await axiosClient.post('auth/sms-verify', 
            {tel: telno, otp: otp}
        )
        return response
    }
    catch(error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const resetPass = createAsyncThunk('auth/reset-pass', async(newpass, thunkAPI) => {
    try{
        const response = await axiosClient.post('auth/password-reset', null,
            {
                params: {
                    password: newpass
                }
            }
        )
        return response
    }
    catch(error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})



const updateProfile = createAsyncThunk('profile/update', async ({updatedInfor}, thunkAPI) => {
    try{
        const formData = new FormData();
        formData.append('tel', updatedInfor.tel);
        formData.append('name', updatedInfor.name);
        formData.append('email', updatedInfor.email);
        formData.append('address', updatedInfor.address);
        if (updatedInfor.file)
            formData.append('file', updatedInfor.file);
        else
            formData.append('file', new File([], 'empty-file.txt'));
        
        formData.append('gender', updatedInfor.gender.value);
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        const response = await axiosClient.put('user/edit', formData, config)
        const cur_user = JSON.parse(localStorage.getItem("current_user"))
        cur_user.user = response
        localStorage.setItem("current_user", JSON.stringify(cur_user))
        return cur_user
    }
    catch (error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
} 
)

const changePassword = createAsyncThunk('auth/password-change', async({oldPassword, newPassword}, thunkAPI) => {
    try{
        const response = await axiosClient.put('auth/password-change', {oldPassword, newPassword})
        return response
    }
    catch(error){
        const message = 'Sai mật khẩu cũ' ||
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const authThunk = {
    register,
    login,
    logout,
    getOTP,
    validateOTP,
    updateProfile,
    changePassword,
    resetPass,
}

export default authThunk