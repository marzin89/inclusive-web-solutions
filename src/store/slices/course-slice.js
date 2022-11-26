import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
    name: 'course',
    initialState: {
        courses: [],
        course:  [],
    },
    reducers: {
        getAllCourses(state, action) {
            return {
                ...state,
                courses: action.payload,
            };
        },
    }
});

export const courseActions = courseSlice.actions;
export default courseSlice;