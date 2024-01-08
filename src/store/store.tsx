import { configureStore } from '@reduxjs/toolkit'
import covidDataReducer from './slices/data.slice';

export const store = configureStore({
    reducer: {
        covidData: covidDataReducer
    },
})