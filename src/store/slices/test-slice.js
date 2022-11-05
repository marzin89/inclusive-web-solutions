import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
    name: 'test',
    initialState: {
        tests: [],
        test:  [],
    },
    reducers: {
        getAllTests(state, action) {
            return {
                ...state,
                tests: action.payload,
            };
        },
    }
});

export const testActions = testSlice.actions;
export default testSlice;