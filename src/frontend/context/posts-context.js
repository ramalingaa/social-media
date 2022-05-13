
import { createContext, useContext, useReducer, useEffect } from 'react';
import { postsReducer } from "./context-functions/postsReducer"
import  axios  from 'axios';
import { useAuth } from "./index-context"
import { useDispatch } from 'react-redux';
import { postActions } from "../../redux store/postSlice"
const PostsContext = createContext()
const usePosts = () => useContext(PostsContext)


const PostsProvider = ({children}) => {
    const dispatch = useDispatch()
    const { jwtToken } = useAuth()
    useEffect(() => {
        if(jwtToken){
            getPosts(dispatch);
            getUsers(dispatch)
            getBooksmarks(dispatch, jwtToken)
        }
    },[jwtToken])
    return (
        <PostsContext.Provider value = {{ dispatch }}>
            {children}
        </PostsContext.Provider>
    )
}
export { usePosts, PostsProvider }

function getPosts(dispatch) {
    (async () => {
        try {
            const response = await axios.get("/api/posts");
            dispatch(postActions.getPostsData(response.data.posts))
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
            dispatch(postActions.getUserData(response.data.users))

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
            dispatch(postActions.getBookmarkData(response.data.bookmarks))

        }
        catch (e) {
            console.log(e);
        }
    })();
}
