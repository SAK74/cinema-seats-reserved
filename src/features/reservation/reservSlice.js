import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSeats = createAsyncThunk('seats/fetch', async () => {
    const response = await fetch('http://localhost:3000/seats');
    return await response.json();
});

const initialState = {
    seats: [],
    reservedSeats: [],
    status: 'iddle',
    error: null
};

const reservSlice = createSlice({
    initialState,
    name: 'seats',
    reducers: {
        submit: (state, action) => {
            const changeArr = action.payload;
            for (let i = 0; i < changeArr.length; i++)
                state.seats.find(value => value.id === changeArr[i].id).reserved = true;
            state.reservedSeats = changeArr;
        }
    },
    extraReducers: {
        [fetchSeats.pending]: state => {state.status = 'loading'},
        [fetchSeats.fulfilled]: (state, action) => {
            state.status = 'complete';
            state.seats = action.payload;
        },
        [fetchSeats.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        }
    }
});
export const {submit} = reservSlice.actions;
export default reservSlice.reducer;