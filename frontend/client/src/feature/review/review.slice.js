import reviewThunk from "./review.service";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    listReview : [],
    listUserReview: [],
}

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => { 
        builder
        .addCase(reviewThunk.getUserReview.fulfilled, (state, action) => {    
            state.listUserReview = action.payload
        })  
        .addCase(reviewThunk.getListReview.fulfilled, (state, action) => {    
            state.listReview = action.payload
        })   
    }
})

export const selectUserReview = (state) => state.review.listUserReview
export const selectListReview = (state) => state.review.listReview
export default reviewSlice.reducer
