const postsReducer = (postsState, action) => {
switch(action.type) {
    case "SET_POSTS_DATA" : {
        return {...postsState, postsData:action.payload}
    }
    case "SET_USER_DATA" : {
        return {...postsState, usersData:action.payload}
    }
    case "SET_BOOKMARK_DATA": {
        return {...postsState, bookmarksData:action.payload}
    }
    default: {
        return postsState
    }
}

}
export { postsReducer }