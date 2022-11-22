import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import testSlice from './slices/test-slice';
import userSlice from './slices/user-slice';

const rootReducer = combineReducers({
    test: testSlice.reducer,
    user: userSlice.reducer,
    /*
    solution: solutionSlice.reducer,
    course: courseSlice.reducer,
    post: postSlice.reducer,
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