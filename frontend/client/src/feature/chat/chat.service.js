import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosClient from "../../api/axios"

const sendChatbotQuery = createAsyncThunk('chatbot', async (query,thunkAPI)=>{
    try {
        const answer = await axiosClient.post('chat/chatbot', {
            question: query
        })
        return answer
    }
    catch(error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const chatThunk = {sendChatbotQuery}
export default chatThunk
