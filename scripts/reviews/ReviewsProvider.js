import { authHelper } from "../auth/authHelper.js"
import { bakeryAPI } from "../Settings.js"
import { ReviewsList } from "./ReviewsList.js"

let reviews = []

export const useReviews = () => {
    // debugger
    return reviews.slice()
}

export const getReviews = (productId) => {
    
    // let fetchURL = `${bakeryAPI.baseURL}/reviews?_expand=product&customerId=${authHelper.getCurrentUserId()}`
    let fetchURL = `${bakeryAPI.baseURL}/reviews?_expand=product&productId=${productId}`
    console.log(fetchURL);
    return fetch(fetchURL)
        .then(response => response.json())
        .then(reviewsArray => {
        reviews = reviewsArray
    })
}

export const addReview = (reviewObj) => {

    let fetchURL = "http://localhost:8088/reviews"
    return fetch(fetchURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewObj)
    })
}