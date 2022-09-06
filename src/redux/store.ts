// This holds the whole state tree of my application.
// Only way to change the state inside is to dispatch an action on it

import { configureStore } from "@reduxjs/toolkit";
import { reducer } from './slices/RootSlice';

export const store = configureStore({
    // Reducers are functions that take the current state and an 
    // action as arguments, and return a new state result.
    // Look at RootSlice.ts for example
    reducer,
    devTools: true
})