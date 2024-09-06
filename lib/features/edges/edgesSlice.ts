import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@lib/store'
import { Edge, EdgeDirection } from './edge';


// Define the state structure for edges
export interface EdgesState {
    edges: Record<string, Edge>;  // A dictionary of unique edges, keyed by a string representing the edge
}

// Helper function to generate a unique key for an edge
const createEdgeKey = (source: number, target: number): string => {
    return `${Math.min(source, target)}-${Math.max(source, target)}`;  // Ensure the edge is always uniquely identified
}

// Initial state for edges
const initialState: EdgesState = {
    edges: {}  // No edges initially
}

// Create edges slice
export const edgesSlice = createSlice({
    name: 'edges',
    initialState,
    reducers: {
        // Add or update an edge between two nodes
        addOrUpdateEdge: (state, action: PayloadAction<{ source: number, target: number, props?: Record<string, unknown>, direction?: EdgeDirection }>) => {
            const { source, target, props, direction } = action.payload;
            const edgeKey = createEdgeKey(source, target);  // Generate the unique key for this edge
            state.edges[edgeKey] = {
                edgeId: edgeKey,
                source,
                target,
                props: { ...state.edges[edgeKey]?.props, ...props },
                direction: state.edges[edgeKey]?.direction || direction || EdgeDirection.None
            };  // Update or create the edge with new properties
        },

        // Remove an edge between two nodes
        removeEdge: (state, action: PayloadAction<{ source: number, target: number }>) => {
            const edgeKey = createEdgeKey(action.payload.source, action.payload.target);  // Generate the key
            delete state.edges[edgeKey];  // Remove the edge from the state
        },

        // Reset all edges (clear the edges state)
        resetEdges: (state) => {
            state.edges = {};  // Clear the dictionary of edges
        }
    }
})



// Export the actions to be used in components
export const { addOrUpdateEdge, removeEdge, resetEdges } = edgesSlice.actions

// Export the reducer to be added to the store
export default edgesSlice.reducer

// Selector to get the edges from the global state
export const selectEdges = (state: RootState) => state.unduableRoot.present.edge.edges;
