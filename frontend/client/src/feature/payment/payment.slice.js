import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPaymentMethod: '',
    paymentURL: '',
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPaymentMethod(state, action) {
            state.currentPaymentMethod = action.payload
        },
        setPaymentURL(state, action) {
            state.paymentURL = action.payload
        },
    }
});

export const { setPaymentMethod, setPaymentURL } = paymentSlice.actions;
export const paymentURL = state => state.payment.paymentURL;
export const currentPaymentMethod = state => state.payment.currentPaymentMethod;
export default paymentSlice.reducer;
