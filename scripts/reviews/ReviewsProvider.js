import { authHelper } from "../auth/authHelper.js"
import { bakeryAPI } from "../Settings.js"

let reviews = []

export const useReviews = () => {
    // debugger
    return reviews.slice()
}

export const getReviews = () => {
    let fetchURL = `${bakeryAPI.baseURL}/reviews?_expand=product&customerId=${authHelper.getCurrentUserId()}`
    console.log(fetchURL);
    return fetch(fetchURL)
        .then(response => response.json())
        .then(reviewsArray => {
        // debugger
        reviews = reviewsArray
    })
}

