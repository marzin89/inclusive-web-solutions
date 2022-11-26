import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
    name: 'page',
    initialState: {
        language: 'Swedish',
        query: '',
        accessibility: 'standard',
    },
    reducers: {
        setLanguage(state, action) {
            return {
                ...state,
                language: action.payload,
            };
        },
        setQuery(state, action) {
            return {
                ...state,
                query: action.payload,
            };
        },
        setAccessibility(state, action) {
            return {
                ...state,
                accessibility: action.payload,
            };
        },
    }
});

export const pageActions = pageSlice.actions;
export default pageSlice;