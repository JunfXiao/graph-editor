import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@lib/store'

// Define the initial state for the canvas
export interface AppState {
    lastSaved?: string;
    showSidebar: boolean;
    hasUnsavedChanges: boolean;
}

// Define the initial state for canvas
const initialState: AppState = {
    showSidebar: true,
    hasUnsavedChanges: false
}

// Create the canvas slice
export const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        toggleSidebar: (state, action: PayloadAction<boolean | undefined>) => {
            state.showSidebar = action.payload ?? !state.showSidebar;
        },
        setLastSaved: (state, action: PayloadAction<Date | undefined>) => {
            const date = action.payload ?? new Date();
            state.lastSaved = date.toLocaleString();
            state.hasUnsavedChanges = false;
        }
    }
})

// Export actions for use in components
export const {
    toggleSidebar,
    setLastSaved
} = canvasSlice.actions

// Export the reducer to be added to the store
export default canvasSlice.reducer

// Selector to get the canvas state from the global state
export const selectCanvas = (state: RootState) => state.app;
