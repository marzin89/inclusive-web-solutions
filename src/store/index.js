import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import pageSlice from './slices/page-slice';
import testSlice from './slices/test-slice';
import userSlice from './slices/user-slice';
import postSlice from './slices/post-slice';

const rootReducer = combineReducers({
    page: pageSlice.reducer,
    test: testSlice.reducer,
    post: postSlice.reducer,
    user: userSlice.reducer,
    /*
    solution: solutionSlice.reducer,
    course: courseSlice.reducer,
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