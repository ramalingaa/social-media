import axios from 'axios';
import { postActions } from "../../../redux store/postSlice";

export function getBooksmarks(dispatch, jwtToken) {
    (async () => {
        try {
            const response = await axios.get("/api/users/bookmark", { headers: { authorization: jwtToken } });
            dispatch(postActions.getBookmarkData(response.data.bookmarks));

        }
        catch (e) {
            console.log(e);
        }
    })();
}
