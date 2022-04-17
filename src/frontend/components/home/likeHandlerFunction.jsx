import axios from "axios";

export function likeHandlerFunction(likedDisplay, pInfo, jwtToken, dispatch) {
    return async () => {
        if (!likedDisplay) {
            try {
                const response = await axios.post(`/api/posts/like/${pInfo._id}`, {}, { headers: { authorization: jwtToken } });
                dispatch({ type: "SET_POSTS_DATA", payload: response.data.posts });

            } catch (e) {
                console.log(e);
            }
        }
        else {
            try {
                const response = await axios.post(`/api/posts/dislike/${pInfo._id}`, {}, { headers: { authorization: jwtToken } });
                dispatch({ type: "SET_POSTS_DATA", payload: response.data.posts });

            } catch (e) {
                console.log(e);
            }
        }
    };
}
