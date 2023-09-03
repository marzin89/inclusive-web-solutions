import { createSlice } from '@reduxjs/toolkit';

const solutionSlice = createSlice({
    name: 'solution',
    initialState: {
        swedish: [],
        german: [],
        solutions: [],
        solution:  [],
        errorMessage: '',
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
        setSolution(state, action) {
            const solution = state.solutions.find((element) => element.id == action.payload.id);
            return {
                ...state,
                solution: solution,
            };
        },
        setErrorMessage(state, action) {
            return {
                ...state,
                errorMessage: action.payload,
            };
        },
    }
});

export const solutionActions = solutionSlice.actions;
export default solutionSlice;