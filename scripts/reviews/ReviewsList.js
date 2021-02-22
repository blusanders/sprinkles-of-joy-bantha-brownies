import { authHelper } from "../auth/authHelper.js"
import { getReviews, useReviews} from "./ReviewsProvider.js"
import { ReviewForm } from "./ReviewForm.js"
import { Reviews } from "./Reviews.js"

const eventHub = document.querySelector("#container")
const reviewsContainer = document.querySelector(".userReviews")

export const ReviewsList = () => {
    getReviews()
    .then(() => {
        let reviewsArray = useReviews()
        render(reviewsArray)
    })
}

const render = (reviewsArray) => {
// debugger
    let reviewsHTML =""
    
    reviewsHTML +=`
    <div id="orders__modal" class="modal--parent">
    <div class="modal--content">
    <h3>Rate Product</h3>
    <div>`

    reviewsHTML += ReviewForm()
    
    
    reviewsHTML += `<h3>All Past Reviews</h3>`

    let eachReviewHTML = ""
    reviewsArray.forEach(review => {
        eachReviewHTML += Reviews(review)
    });

    reviewsHTML += eachReviewHTML

    reviewsHTML +=`
    </div>
    <br>
    <button id="modal--close">Close</button>
    </div>
    </div>
    `
    reviewsContainer.innerHTML = reviewsHTML

}

//listen for the New Review click from the customer nav
eventHub.addEventListener("showNewReviewForm", () => {
    // debugger
    ReviewsList()
})

eventHub.addEventListener("click", event => {
// debugger
    if (event.target.id === "modal--close") {
        closeModal()
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal()  }
})

const closeModal = () => {
    reviewsContainer.innerHTML = ""
}