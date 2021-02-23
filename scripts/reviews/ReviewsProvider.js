import { authHelper } from "../auth/authHelper.js"
import { bakeryAPI } from "../Settings.js"
import { ReviewsList } from "./ReviewsList.js"

const eventHub = document.querySelector("#container")

let reviews = []

export const useReviews = () => {
    // debugger
    return reviews.slice()
}

export const getReviews = (productId) => {
    
    //get reviews per selected product
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
    .then(dispatchStateChangeEvent)

}

export const deleteReview = reviewId => {
    // debugger
    return fetch('http://localhost:8088/reviews/'+reviewId, {
        method: "DELETE"
    })
    .then(dispatchStateChangeEvent)
}

//dispatch custom event if add or delete reviews
const dispatchStateChangeEvent = () => {
    // debugger
    const reviewsStateChangedEvent = new CustomEvent("reviewsStateChangedEvent")
    eventHub.dispatchEvent(reviewsStateChangedEvent)
}

