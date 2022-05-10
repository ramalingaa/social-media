
import { createContext, useContext, useReducer, useEffect } from 'react';
import { postsReducer } from "./context-functions/postsReducer"
import  axios  from 'axios';
import { useAuth } from "./index-context"
const PostsContext = createContext()
const usePosts = () => useContext(PostsContext)

const PostsProvider = ({children}) => {

    const [postsState, dispatch] = useReducer(postsReducer, {postsData:[], usersData:[], bookmarksData:[]})

    const { jwtToken } = useAuth()
    useEffect(() => {
        if(jwtToken){
            getPosts(dispatch);
            getUsers(dispatch)
            getBooksmarks(dispatch, jwtToken)
        }
    },[jwtToken])
    return (
        <PostsContext.Provider value = {{ postsState, dispatch }}>
            {children}
        </PostsContext.Provider>
    )
}
export { usePosts, PostsProvider }

function getPosts(dispatch) {
    (async () => {
        try {
            const response = await axios.get("/api/posts");
            dispatch({ type: "SET_POSTS_DATA", payload: response.data.posts });
        }
        catch (e) {
            console.log(e);
        }
    })();
}
function getUsers(dispatch) {
    (async () => {
        try {
            const response = await axios.get("/api/users");
            dispatch({ type: "SET_USER_DATA", payload: response.data.users });
        }
        catch (e) {
            console.log(e);
        }
    })();
}
function getBooksmarks(dispatch, jwtToken) {
    (async () => {
        try {
            const response = await axios.get("/api/users/bookmark", {headers:{authorization: jwtToken}});
            dispatch({ type: "SET_BOOKMARK_DATA", payload: response.data.bookmarks });
        }
        catch (e) {
            console.log(e);
        }
    })();
}
