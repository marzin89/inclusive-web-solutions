import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        swedish: [],
        german: [],
        posts: [],
        post: [],
        errorMessage: '',
    },
    reducers: {
        setPosts(state = initialState, action) {
            let swedish = [];
            let german = [];

            action.payload.map((post) => {
                if (post.language == 'swedish') {
                    swedish.push(post);
                
                } else {
                    german.push(post);
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

export const postActions = postSlice.actions;
export default postSlice;