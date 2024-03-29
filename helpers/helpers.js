export const getPriceQueryParams = (queryParams, key, value) => {
    const hasValueInParam = queryParams.has(key);

    if (value && hasValueInParam) {
        queryParams.set(key, value);
    } else if (value) {
        queryParams.append(key, value);
    } else if (hasValueInParam) {
        queryParams.delete(key);
    }

    return queryParams;
}

export const getUserReview = (reviews, userId) => {
    let userReview = null;

    reviews.forEach((review) => {
        if(review?.user?._id === userId){
            userReview = review;
        }
    });

    return userReview;
};