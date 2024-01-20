import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikes } from "../../../store/likes";


const Likes = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const likes = useSelector(state => state.likes);

    useEffect(() => {
        dispatch(fetchLikes())
            .then(() => {
                setIsLoaded(true)
            })
    }, [dispatch])

    const userLikes = Object.values(likes).map(like => {
        return (
            <>
                <p>{like.title}</p>
            </>
        );
    })

    return (
        <div>
            {isLoaded && userLikes}
        </div>
    )
}

export default Likes;