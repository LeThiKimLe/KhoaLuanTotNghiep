import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";


const cancelTicket = createAsyncThunk('tickets/request-cancel', async ({bookingCode, payment, listCancel}, thunkAPI) => {
    try {
        const response = await axiosClient.post('tickets/request-cancel',
            {
                "bookingCode": bookingCode,
                "numberTicket": listCancel.length,
                "paymentMethod": payment,
                "ticketIdList": listCancel.map((ticket)=> ticket.id)
            }
        )
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const changeTicket = createAsyncThunk('tickets/change', async ({bookingCode, listChange, listNew, newScheduleId}, thunkAPI) => {
    try {
        const response = await axiosClient.post('tickets/change',
        {
            "bookingCode": bookingCode,
            "numberTicket": listChange.length,
            "tickets": listChange.map((ticket, index) => {
                return {
                    ticketId: ticket.id,
                    newSeatName: listNew[index]
                }
            }),
            "newScheduleId": newScheduleId
          }
        )
        return response
    }
    catch (error) {
        const message = 'Vé không thỏa điều kiện đổi vé (trước 24h trước giờ khởi hành)' ||
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const verifyCancelTicketPolicy = createAsyncThunk('tickets/cancel-policy', async ({bookingCode, payment, listCancel}, thunkAPI) => {
    try {
        const response = await axiosClient.post('tickets/cancel-policy',
            {
                "bookingCode": bookingCode,
                "numberTicket": listCancel.length,
                "paymentMethod": payment,
                "ticketIdList": listCancel.map((ticket)=> ticket.id)
            }
        )
        return response
    }
    catch (error) {
        const message = 'Vé không thỏa điều kiện hủy vé' ||
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const editTicket = createAsyncThunk('tickets/edit', async ({bookingCode, pickStationId, dropStationId}, thunkAPI) => {
    try {
        const response = await axiosClient.put('tickets/edit',
            {
                "bookingCode": bookingCode,
                "pickStationId": pickStationId,
                "dropStationId": dropStationId
            }
        )
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const getTicketBill = createAsyncThunk('tickets/bill', async (refCode, thunkAPI) => {
    try {
        const response = await axiosClient.get('tickets/bill',
            {
                params: {
                    referCode: refCode,
                }
            }
        )
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const ticketThunk = {
    cancelTicket,
    verifyCancelTicketPolicy,
    changeTicket,
    editTicket,
    getTicketBill,
}

export default ticketThunk