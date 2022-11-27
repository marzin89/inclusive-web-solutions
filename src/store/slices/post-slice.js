import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        featuredSwedish: [],
        featuredGerman: [],
        swedish: [],
        german: [],
        posts: [],
        post: [],
        errorMessage: '',
    },
    reducers: {
        setPosts(state, action) {
            let swedish = [];
            let german = [];
            let featuredSwedish = [];
            let featuredGerman = [];

            action.payload.map((post, index) => {
                if (post.language == 'swedish') {
                    swedish.push(post);
                
                } else {
                    german.push(post);
                }
                
                if (index < 3) {
                    if (post.language == 'swedish') {
                        featuredSwedish.push(post);
                    
                    } else {
                        featuredGerman.push(post);
                    }
                }
            }
            );

            return {
                ...state,
                featuredSwedish: featuredSwedish,
                featuredGerman: featuredGerman,
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
    },
});

export const postActions = postSlice.actions;
export default postSlice;