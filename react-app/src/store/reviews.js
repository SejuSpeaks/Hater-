
const GET_USER_REVIEWS = 'reviews/GETREVIEWS';
const ADD_REVIEW = "reviews/ADD_REVIEW";
const GET_ALBUM_REVIEWS = 'reviews/GET_ALBUM_REVIEWS';

/*---------------------------------------------------------------------------------------------- */

const getReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        reviews
    }
}

const addReview = (review) => ({
	type: ADD_REVIEW,
	payload: review,
});

const getReviewsByAlbum = (reviews) => {
    return {
        type: GET_ALBUM_REVIEWS,
        payload: reviews
    }
}


export const fetchUserReviews = () => async dispatch => {
    const response = await fetch('api/reviews/current');

    if (response.ok) {
        const data = await response.json()
        dispatch(getReviews(data["user reviewed albums"]))
        return data["user reviewed albums"];
    }
}

export const createReview = (review) => async (dispatch) => {
    const { album_id, rating, review_text} = review;
	const response = await fetch(`/api/albums/${album_id}/reviews`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            rating,
            review_text
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(addReview(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const fetchAlbumReviews = (albumId) => async(dispatch) => {
    console.log("about to hit error")
    const response = await fetch(`/api/albums/${albumId}/reviews`);

    if (response.ok) {
        console.log("res was ok")
        const data = await response.json()
        dispatch(getReviewsByAlbum(data["album reviews"]))
        return response;
    } else {
        console.log("got an error")
        console.log(Object.keys(response))
        console.log(Object.values(response))
    }
}


/*---------------------------------------------------------------------------------------------- */

const reviews = (state = {}, action) => {

    switch (action.type) {
        case GET_USER_REVIEWS:
            const reviews = action.reviews.reduce((obj, review) => {
                obj[review.id] = review;
                return obj
            }, {});
            return { ...reviews }
        case ADD_REVIEW:
            return { ...state, [action.payload.id]: action.payload };
        case GET_ALBUM_REVIEWS:
            const albumReviews = action.reviews.reduce((obj, review) => {
            obj[review.id] = review;
            return { ...state, albumReviews: albumReviews }}, {});
        default:
            return state;
    }
}

export default reviews;
