import { createSlice } from "@reduxjs/toolkit"

const postSlicer = createSlice({
    name: "post",
    initialState: {
        postsData:[],
        usersData:[],
        bookmarksData:[]
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
        }
    }
})
export const postActions = postSlicer.actions
export default postSlicer.reducer