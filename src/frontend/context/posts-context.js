
import { createContext, useContext, useReducer } from 'react';
import { useEffect } from 'react';
import { postsReducer } from "./context-functions/postsReducer"
import  axios  from 'axios';
const PostsContext = createContext()
const usePosts = () => useContext(PostsContext)

const PostsProvider = ({children}) => {

    const [postsState, dispatch] = useReducer(postsReducer, {postsData:[], usersData:[]})


    useEffect(() => {
        getPosts(dispatch);
        getUsers(dispatch)

    },[])
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
