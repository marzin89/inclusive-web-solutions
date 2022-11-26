import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
    name: 'course',
    initialState: {
        swedish: [],
        german: [],
        courses: [],
        course:  [],
    },
    reducers: {
        setCourses(state, action) {
            let swedish = [];
            let german = [];

            action.payload.map((course) => {
                if (course.language == 'swedish') {
                    swedish.push(course);
                
                } else {
                    german.push(course);
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

export const courseActions = courseSlice.actions;
export default courseSlice;