
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from 'redux-thunk'
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import authReducer from './feature/auth/auth.slice'
import profileReducer from './feature/profile/profile.slice'
import searchReducer from './feature/search/search.slice'
import ticketReducer from "./feature/ticket/ticket.slice";
import routeReducer from './feature/route/route.slice'
import seatReducer from "./feature/seat/seat.slice";
import tripReducer from './feature/trip/trip.slice'
import bookingReducer from './feature/booking/booking.slice'
import navigationReducer from './feature/navigation/navigation.slice'
import reviewReducer from './feature/review/review.slice'


const rootPersistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['route', 'trip', 'booking']
}

// Có thể làm thêm các config riêng cho một reducer riêng
// Để quy định state nào trong reducer đó persist/ko persist

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    search: searchReducer,
    ticket: ticketReducer,
    route: routeReducer,
    seat: seatReducer,
    trip: tripReducer,
    booking: bookingReducer,
    navigation: navigationReducer,
    review: reviewReducer,
})

const persitedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persitedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store);