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
        pageSwedish: [],
        pageGerman: [],
        numberOfPagesSwedish: 0,
        numberOfPagesGerman: 0,
        activeBlogPageSwedish: 1,
        activeBlogPageGerman: 1,
        blogIndexSwedish: 0,
        blogIndexGerman: 0,
        errorMessage: '',
    },
    reducers: {
        setPosts(state, action) {
            let swedish = [];
            let german = [];
            let featuredSwedish = [];
            let featuredGerman = [];
            let numberOfPagesSwedish;
            let numberOfPagesGerman;

            if (swedish.length > 5) {
                numberOfPagesSwedish = Math.ceil(swedish.length / 5);
            
            } else {
                numberOfPagesSwedish = 1;
            }

            if (german.length > 5) {
                numberOfPagesGerman = Math.ceil(german.length / 5);
            
            } else {
                numberOfPagesGerman = 1;
            }

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
                numberOfPagesSwedish: numberOfPagesSwedish,
                numberOfPagesGerman: numberOfPagesGerman,
                featuredSwedish: featuredSwedish,
                featuredGerman: featuredGerman,
                swedish: swedish,
                german: german,
            };
        },
        toggleSwedish(state, action) {
            let index;
            let page = [];

            if (action.payload == 1) {
                index = 0;
            
            } else {
                index = (action.payload - 1) * 5;
            }

            for (let i = index; i < (index + 5); i++) {
                if (state.swedish[i]) {
                    page.push(state.swedish[i]);
                }
            }

            return {
                ...state,
                pageSwedish: page,
                activeBlogPageSwedish: action.payload,
                blogIndexSwedish: index,
            };
        },
        toggleGerman(state, action) {
            let index;
            let page = [];

            if (action.payload == 1) {
                index = 0;
            
            } else {
                index = (action.payload - 1) * 5;
            }

            for (let i = index; i < (index + 5); i++) {
                if (state.german[i]) {
                    page.push(state.german[i]);
                }
            }

            return {
                ...state,
                pageGerman: page,
                activeBlogPageGerman: action.payload,
                blogIndexGerman: index,
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