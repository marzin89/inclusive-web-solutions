import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isSignedIn: false,
        username:   '',
        userRole:   '',
    },
    reducers: {
        login(state = initialState, action) {
            return {
                ...state,
                isSignedIn: true,
                username: action.payload.username,
                userRole: action.payload.userRole,
            };
        },
        logout(state = initialState) {
            return {
                ...state,
                isSignedIn: false,
                username: '',
                userRole: '',
            };
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;