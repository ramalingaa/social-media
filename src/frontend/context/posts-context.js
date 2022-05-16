
import { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getUsers, getBooksmarks } from './context-functions/index-functions';


const PostsContext = createContext()
const usePosts = () => useContext(PostsContext)

const PostsProvider = ({children}) => {
    const dispatch = useDispatch()
    const { jwtToken } = useSelector((store) => store.post)
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


