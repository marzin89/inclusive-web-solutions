import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
    name: 'course',
    initialState: {
        swedish: [],
        german: [],
        courses: [],
        course:  [],
        errorMessage: '',
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
        setCourse(state, action) {
            const course = state.courses.find((element) => element.id == action.payload.id);
            return {
                ...state,
                course: course,
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

export const courseActions = courseSlice.actions;
export default courseSlice;