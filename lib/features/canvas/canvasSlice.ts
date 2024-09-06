import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@lib/store'

// Define the initial state for the canvas
export interface CanvasState {
    width: number;
    height: number;
    zoomLevel: number;
    minZoomLevel: number;
    maxZoomLevel: number;
    offsetX: number;
    offsetY: number;
    showGrid: boolean;
    gridSize: number;
    snapToGrid: boolean;
    backgroundColor: string;
    backgroundImage?: string;  // Optional background image
    isEditable: boolean;
}

// Define the initial state for canvas
const initialState: CanvasState = {
    width: 1920,  // Default canvas width
    height: 1080,  // Default canvas height
    zoomLevel: 1.0,  // Default zoom level (100%)
    minZoomLevel: 0.1,  // Minimum zoom level (10%)
    maxZoomLevel: 5.0,  // Maximum zoom level (500%)
    offsetX: 0,  // Default horizontal offset
    offsetY: 0,  // Default vertical offset
    showGrid: true,  // Grid is shown by default
    gridSize: 20,  // Default grid size
    snapToGrid: true,  // Snap to grid is enabled by default
    backgroundColor: '#ffffff',  // Default background color (white)
    isEditable: true  // Canvas is editable by default
}

// Create the canvas slice
export const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        // Set canvas dimensions (width and height)
        setCanvasDimensions: (state, action: PayloadAction<{ width: number, height: number }>) => {
            state.width = action.payload.width;
            state.height = action.payload.height;
        },

        // Set zoom level within the defined bounds (minZoomLevel and maxZoomLevel)
        setZoomLevel: (state, action: PayloadAction<number>) => {
            const zoom = action.payload;
            state.zoomLevel = Math.min(Math.max(zoom, state.minZoomLevel), state.maxZoomLevel);
        },

        // Pan the canvas (set the offsetX and offsetY)
        panCanvas: (state, action: PayloadAction<{ offsetX: number, offsetY: number }>) => {
            state.offsetX = action.payload.offsetX;
            state.offsetY = action.payload.offsetY;
        },

        // Toggle the grid visibility
        toggleGrid: (state) => {
            state.showGrid = !state.showGrid;
        },

        // Set grid size
        setGridSize: (state, action: PayloadAction<number>) => {
            state.gridSize = action.payload;
        },

        // Toggle snapping to grid
        toggleSnapToGrid: (state) => {
            state.snapToGrid = !state.snapToGrid;
        },

        // Set canvas background color
        setBackgroundColor: (state, action: PayloadAction<string>) => {
            state.backgroundColor = action.payload;
        },

        // Set canvas background image (optional)
        setBackgroundImage: (state, action: PayloadAction<string | undefined>) => {
            state.backgroundImage = action.payload;
        },

        // Set the canvas editable mode explicitly
        setEditableMode: (state, action: PayloadAction<boolean>) => {
            state.isEditable = action.payload;
        }
    }
})

// Export actions for use in components
export const {
    setCanvasDimensions,
    setZoomLevel,
    panCanvas,
    toggleGrid,
    setGridSize,
    toggleSnapToGrid,
    setBackgroundColor,
    setBackgroundImage,
    setEditableMode
} = canvasSlice.actions

// Export the reducer to be added to the store
export default canvasSlice.reducer

// Selector to get the canvas state from the global state
export const selectCanvas = (state: RootState) => state.unduableRoot.present.canvas;
