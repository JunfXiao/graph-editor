import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@lib/store'

// Define the initial state for selection
interface SelectionState {
    selectedNodes: number[];  // Array of selected node IDs
    selectedEdges: string[];  // Array of selected edge keys (edge keys can be generated similarly to edgesSlice)
}

// Initial state for selection
const initialState: SelectionState = {
    selectedNodes: [],  // No nodes selected initially
    selectedEdges: []  // No edges selected initially
}

// Create the selection slice
export const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        // Select a single node (replaces current selection)
        selectNode: (state, action: PayloadAction<number>) => {
            state.selectedNodes = [action.payload];  // Only select the specified node
        },

        // Select multiple nodes (replaces current selection)
        selectMultipleNodes: (state, action: PayloadAction<number[]>) => {
            state.selectedNodes = action.payload;  // Replace the current selection with multiple nodes
        },

        // Add a node to the current selection
        addNodeToSelection: (state, action: PayloadAction<number>) => {
            if (!state.selectedNodes.includes(action.payload)) {
                state.selectedNodes.push(action.payload);  // Add the node if it's not already selected
            }
        },

        // Remove a node from the current selection
        removeNodeFromSelection: (state, action: PayloadAction<number>) => {
            state.selectedNodes = state.selectedNodes.filter(id => id !== action.payload);  // Remove the specified node
        },

        // Clear the selection of nodes
        clearNodeSelection: (state) => {
            state.selectedNodes = [];  // Clear all selected nodes
        },

        // Select a single edge (replaces current selection)
        selectEdge: (state, action: PayloadAction<string>) => {
            state.selectedEdges = [action.payload];  // Only select the specified edge
        },

        // Select multiple edges (replaces current selection)
        selectMultipleEdges: (state, action: PayloadAction<string[]>) => {
            state.selectedEdges = action.payload;  // Replace the current selection with multiple edges
        },

        // Add an edge to the current selection
        addEdgeToSelection: (state, action: PayloadAction<string>) => {
            if (!state.selectedEdges.includes(action.payload)) {
                state.selectedEdges.push(action.payload);  // Add the edge if it's not already selected
            }
        },

        // Remove an edge from the current selection
        removeEdgeFromSelection: (state, action: PayloadAction<string>) => {
            state.selectedEdges = state.selectedEdges.filter(key => key !== action.payload);  // Remove the specified edge
        },

        // Clear the selection of edges
        clearEdgeSelection: (state) => {
            state.selectedEdges = [];  // Clear all selected edges
        },

        // Clear all selections (both nodes and edges)
        clearAllSelections: (state) => {
            state.selectedNodes = [];
            state.selectedEdges = [];
        }
    }
})

// Export actions for use in components
export const {
    selectNode,
    selectMultipleNodes,
    addNodeToSelection,
    removeNodeFromSelection,
    clearNodeSelection,
    selectEdge,
    selectMultipleEdges,
    addEdgeToSelection,
    removeEdgeFromSelection,
    clearEdgeSelection,
    clearAllSelections
} = selectionSlice.actions

// Export the reducer to be added to the store
export default selectionSlice.reducer

// Selectors to get the selected nodes and edges from the global state
export const selectSelectedNodeIds = (state: RootState) => state.selection.selectedNodes;
export const selectSelectedEdgeIds = (state: RootState) => state.selection.selectedEdges;
