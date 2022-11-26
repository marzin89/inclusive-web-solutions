import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
    name: 'test',
    initialState: {
        swedish: [],
        german: [],
        tests: [],
        test:  [],
        errorMessage: '',
    },
    reducers: {
        setTests(state, action) {
            let swedish = [];
            let german = [];

            action.payload.map((test) => {
                if (test.language == 'swedish') {
                    swedish.push(test);
                
                } else {
                    german.push(test);
                }}
            );

            return {
                ...state,
                swedish: swedish,
                german: german,
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

export const testActions = testSlice.actions;
export default testSlice;