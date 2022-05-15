import axios from 'axios';
import { postActions } from "../../../redux store/postSlice";

export function getUsers(dispatch) {
    (async () => {
        try {
            const response = await axios.get("/api/users");
            dispatch(postActions.getUserData(response.data.users));

        }
        catch (e) {
            console.log(e);
        }
    })();
}
