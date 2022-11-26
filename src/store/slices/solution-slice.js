import { createSlice } from '@reduxjs/toolkit';

const solutionSlice = createSlice({
    name: 'solution',
    initialState: {
        solutions: [],
        solution:  [],
    },
    reducers: {
        getAllSolutions(state, action) {
            return {
                ...state,
                solutions: action.payload,
            };
        },
    }
});

export const solutionActions = solutionSlice.actions;
export default solutionSlice;