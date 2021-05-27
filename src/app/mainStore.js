import { configureStore } from "@reduxjs/toolkit";
import reservReducer from '../features/reservation/reservSlice';

export const store = configureStore({reducer: reservReducer});