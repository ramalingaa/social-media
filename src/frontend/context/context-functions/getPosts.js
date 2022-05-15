import axios from 'axios';
import { postActions } from "../../../redux store/postSlice";

export function getPosts(dispatch) {
    (async () => {
        try {
            const response = await axios.get("/api/posts");
            dispatch(postActions.getPostsData(response.data.posts));
        }
        catch (e) {
            console.log(e);
        }
    })();
}
