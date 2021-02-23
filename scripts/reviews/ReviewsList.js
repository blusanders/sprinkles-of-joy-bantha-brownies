import { authHelper } from "../auth/authHelper.js"
import { addReview, deleteReview, getReviews, useReviews} from "./ReviewsProvider.js"
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

    let reviewsHTML =""
    
    reviewsHTML +=`
    <div id="orders__modal" class="modal--parent">
    <div class="modal--content">
    <h3>Rate - ${productName}
    </h3>
    <div class=reviewStars>`

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


//**********************
//click events
//**********************

eventHub.addEventListener("click", event => {

    //close modal click
    if (event.target.id === "modal--close") {
        closeModal()
    }

    //add review click
    if (event.target.id === "reviewFormButton") {
    
        let reviewFormRating = document.getElementById("reviewFormRating").value
        let reviewFormText = document.getElementById("reviewFormText").value
        let productIdForReview = document.getElementById("reviewFormProductId").value

        if (parseInt(reviewFormRating)===0 || reviewFormText===""){
            alert("Rating and review are required.")
            return
        }

        const newReview = {
            customerId: authHelper.getCurrentUserId(),
            productId: productIdForReview,
            text: document.getElementById("reviewFormText").value,
            stars: parseInt(document.getElementById("reviewFormRating").value),
        }

        addReview(newReview)
    }

    //delete review click
    //if delete then delete entry after confirmation
    if (event.target.id.startsWith("deleteReview--")) {
        if (confirm("Are you sure?")) {
            deleteReview(event.target.id.split("--")[1])
        }
    }
})

//listen for review state change
eventHub.addEventListener('reviewsStateChangedEvent', event => {
    let productNameForRerender = document.getElementById("reviewFormProductName").value
    let productIdForRerender = document.getElementById("reviewFormProductId").value
    ReviewsList(productIdForRerender, productNameForRerender)
})

//close modal if user presses escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal()  }
})

//close modal
const closeModal = () => {
    reviewsContainer.innerHTML = ""
}

