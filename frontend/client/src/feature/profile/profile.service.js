import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosClient from "../../api/axios"

const updateProfile = createAsyncThunk('profile/update', async ({updatedInfor}, thunkAPI) => {
    try{
        const formData = new FormData();
        formData.append('tel', updatedInfor.tel);
        formData.append('name', updatedInfor.name);
        formData.append('email', updatedInfor.email);
        formData.append('address', updatedInfor.address);
        formData.append('img', updatedInfor.img);
        formData.append('gender', updatedInfor.gender.value);
      
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data', // Ghi đè tiêu đề
          },
        };

        const response = await axiosClient.post('user/edit', formData, config)
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

const profileThunk = {
    updateProfile
}

export default profileThunk