import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import testSlice from './slices/test-slice';

const rootReducer = combineReducers({
    test: testSlice.reducer,
    /*
    solution: solutionSlice.reducer,
    course: courseSlice.reducer,
    post: postSlice.reducer,
    user: userSlice.reducer,
    comment: commentSlice.reducer,
    search: searchSlice.reducer,
    */
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);