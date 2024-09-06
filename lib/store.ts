import { configureStore, combineReducers } from '@reduxjs/toolkit'
import edgesReducer from '@lib/features/edges/edgesSlice'
import nodesReducer from '@lib/features/nodes/nodesSlice'
import canvasReducer from '@lib/features/canvas/canvasSlice'
import selectionReducer from '@lib/features/selection/selectionSlice'
import appReducer from '@lib/features/app/appSlice'
import undoable from 'redux-undo'

const rootReducer = undoable(combineReducers({
    edge: edgesReducer,
    node: nodesReducer,
    canvas: canvasReducer
}), {
    limit: 10
})

export const makeStore = () => {
    return configureStore({
        reducer: {
            unduableRoot: rootReducer,
            selection: selectionReducer,
            app: appReducer
        },
    })
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']