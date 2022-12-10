import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
    name: 'page',
    initialState: {
        language: 'Swedish',
        query: '',
        accessibility: 'standard',
        previous: '',
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
                previous: state.accessibility,
                accessibility: action.payload,
            };
        },
    }
});

export const pageActions = pageSlice.actions;
export default pageSlice;