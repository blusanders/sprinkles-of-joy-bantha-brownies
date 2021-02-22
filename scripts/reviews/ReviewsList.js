import { authHelper } from "../auth/authHelper.js"
import { addReview, getReviews, useReviews} from "./ReviewsProvider.js"
import { ReviewForm } from "./ReviewForm.js"
import { Reviews } from "./Reviews.js"

const eventHub = document.querySelector("#container")
const reviewsContainer = document.querySelector(".userReviews")

export const ReviewsList = (productId,productName) => {
    getReviews(productId)
    .then(() => {
        let reviewsArray = useReviews()
        render(reviewsArray,productName, productId)
    })
}

const render = (reviewsArray, productName, productId) => {
// debugger
    let reviewsHTML =""
    
    reviewsHTML +=`
    <div id="orders__modal" class="modal--parent">
    <div class="modal--content">
    <h3>Rate - ${productName}
    </h3>
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
    <input type=hidden id=reviewFormProductId value="${productId}">
    <input type=hidden id=reviewFormProductName value="${productName}">
    <br>
    <button id="modal--close">Close</button>
    </div>
    </div>
    `
    reviewsContainer.innerHTML = reviewsHTML

}

//listen for the New Review click from the customer nav
eventHub.addEventListener("showNewReviewForm", (event) => {
    ReviewsList(event.detail.productId,event.detail.productName )
})

eventHub.addEventListener("click", event => {
// debugger
    if (event.target.id === "modal--close") {
        closeModal()
    }

    if (event.target.id === "reviewFormButton") {
    
        let productNameForRerender = document.getElementById("reviewFormProductName").value
        let productIdForReview = document.getElementById("reviewFormProductId").value

        const newReview = {
            customerId: authHelper.getCurrentUserId(),
            productId: productIdForReview,
            text: document.getElementById("reviewFormText").value,
            stars: parseInt(document.getElementById("reviewFormRating").value),
        }

        //add review sending name and Id 
        addReview(newReview)
        .then(ReviewsList(productIdForReview, productNameForRerender))

    }

})



document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal()  }
})

const closeModal = () => {
    reviewsContainer.innerHTML = ""
}