// store/slices/data.slice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface CovidData {
    positive: number;
    death: number;
    // Add more fields as needed
}

interface DataState {
    data: CovidData | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const fetchCovidData = createAsyncThunk<CovidData>('data/fetchData', async () => {
    const response = await fetch('https://api.covidtracking.com/v1/us/current.json');
    const data = await response.json();
    return data;
});

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    } as DataState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCovidData.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCovidData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchCovidData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'An error occurred';
        });
    },
});

export default dataSlice.reducer;
