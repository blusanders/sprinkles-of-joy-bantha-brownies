import { authHelper } from "../auth/authHelper.js"
const eventHub = document.querySelector("#container")

export const Product = (product, category) => {
    // if (!authHelper.isUserLoggedIn()){
    //     addToCartButton.style.display = 'none'
        
    //   }else{
    //     addToCartButton.style.display = 'block'
    //   } 
    return `
    <section class="baked_good">
<header class="baked_good__header">
    <h4>${product.name}</h4>
    <p>$${product.price}</p>
</header>
<div>
    <button class="addProduct" id="addProduct--${product.id}">Add to Cart</button>
    <p>${product.description} [${category.name}]</p>
    <a href="#" id="reviewProduct--${product.id}--${product.name}">reviews</a>
    </div>
    <hr class=fancyHR>
</section>
`
}

eventHub.addEventListener("click", evt => {
    if (evt.target.id.startsWith("addProduct--")) {
        const [prefix, productId] = evt.target.id.split("--")
        
        const addProductEvent = new CustomEvent("addToCart", {
            detail: {
                addedProduct: parseInt(productId)
            }
        })

        eventHub.dispatchEvent(addProductEvent)
    }

    if (evt.target.id.startsWith("reviewProduct--")) {
        
        const [prefix, productId, productName] = evt.target.id.split("--")
// debugger
        let customEvent = new CustomEvent("showNewReviewForm", {
            detail: {
                productId:productId,
                productName:productName
            }
        })

        eventHub.dispatchEvent(customEvent)
    }
})
