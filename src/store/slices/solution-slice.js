import { createSlice } from '@reduxjs/toolkit';

const solutionSlice = createSlice({
    name: 'solution',
    initialState: {
        swedish: [],
        german: [],
        solutions: [],
        solution:  [],
    },
    reducers: {
        setSolutions(state, action) {
            let swedish = [];
            let german = [];

            action.payload.map((solution) => {
                if (solution.language == 'swedish') {
                    swedish.push(solution);
                
                } else {
                    german.push(solution);
                }}
            );

            return {
                ...state,
                swedish: swedish,
                german: german,
            };
        },
    }
});

export const solutionActions = solutionSlice.actions;
export default solutionSlice;