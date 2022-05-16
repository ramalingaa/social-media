import { createSlice } from "@reduxjs/toolkit"
const isUserLoggedIn = JSON.parse(localStorage.getItem("ONE"))
const postSlicer = createSlice({
    name: "post",
    initialState: {
        postsData:[],
        usersData:[],
        bookmarksData:[],
        jwtToken:isUserLoggedIn?.JWT_TOKEN_ONE,
        userProfileData: isUserLoggedIn?.USER_PROFILE_ONE
    },
    reducers: {
        getPostsData(state, action){
            state.postsData = action.payload
        },
        getUserData(state, action){
            state.usersData = action.payload
        },
        getBookmarkData(state, action){
            state.bookmarksData = action.payload
        },
        getJwtToken(state, action){
            state.jwtToken = action.payload
        },
        getLoggedUserData(state, action){
            state.userProfileData = action.payload
        }
    }
})
export const postActions = postSlicer.actions
export default postSlicer.reducer