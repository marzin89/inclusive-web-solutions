import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import pageSlice from './slices/page-slice';
import testSlice from './slices/test-slice';
import solutionSlice from './slices/solution-slice';
import courseSlice from './slices/course-slice';
import userSlice from './slices/user-slice';
import postSlice from './slices/post-slice';

const rootReducer = combineReducers({
    page: pageSlice.reducer,
    test: testSlice.reducer,
    solution: solutionSlice.reducer,
    course: courseSlice.reducer,
    post: postSlice.reducer,
    user: userSlice.reducer,
    /*
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