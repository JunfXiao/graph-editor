import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@lib/store'
import { Node } from './node';


// Define NodesState interface
export interface NodesState {
    nodes: Record<number, Node>;  // A dictionary of nodes keyed by node ID
    idIncrement: number;  // Incremental counter for generating unique node IDs
}

// Define the initial state for nodes
const initialState: NodesState = {
    nodes: {},  // No nodes initially
    idIncrement: 0  // Start with ID 0
}

// Create the nodes slice
export const nodesSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        // Add or update a node
        addOrUpdateNode: (state, action: PayloadAction<{ id?: number, props?: Record<string, unknown> }>) => {
            let { id, props } = action.payload;
            id = id || state.idIncrement;  // Use the provided ID or the next incremental ID
            // Update existing node or create a new node with default props
            state.nodes[id] = {
                id,
                props: { ...state.nodes[id]?.props, ...props }  // Merge existing props with new props
            };
            state.idIncrement = Math.max(state.idIncrement, id + 1);  // Update the ID increment if needed
        },

        // Remove a node by ID
        removeNode: (state, action: PayloadAction<number>) => {
            delete state.nodes[action.payload];  // Remove the node from the state
        },

        // Update properties of an existing node
        updateNodeProps: (state, action: PayloadAction<{ id: number, props: Record<string, unknown> }>) => {
            const { id, props } = action.payload;
            if (state.nodes[id]) {
                state.nodes[id].props = { ...state.nodes[id].props, ...props };  // Merge new properties with existing ones
            }
        },

        // Reset all nodes (clear the nodes state)
        resetNodes: (state) => {
            state.nodes = {};  // Reset the nodes dictionary
        }
    },

})



// Export actions to be used in components
export const { addOrUpdateNode, removeNode, updateNodeProps, resetNodes } = nodesSlice.actions

// Export reducer to be added to the store
export default nodesSlice.reducer

// Selector to get the nodes from the global state
export const selectNodes = (state: RootState) => state.unduableRoot.present.node.nodes;
