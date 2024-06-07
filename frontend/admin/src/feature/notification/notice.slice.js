import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    listNotice: [],
}

const noticeSlice = createSlice({
    name: 'notice',
    initialState,
    reducers: {
        addNotice: (state, action) => {
            const notice = state.listNotice.filter(
                (notice) => notice.id === action.payload.id && notice.type === action.payload.type,
            )
            if (notice.length === 0) state.listNotice.push(action.payload)
        },
        removeNotice: (state, action) => {
            state.listNotice = state.listNotice.filter(
                (notice) =>
                    (notice.id !== action.payload.id && notice.type === action.payload.type) ||
                    notice.type !== action.payload.type,
            )
        },
    },
})

export const selectListNotice = (state) => state.notice.listNotice
export const noticeAction = noticeSlice.actions
export default noticeSlice.reducer
