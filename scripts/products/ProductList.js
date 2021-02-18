import { getProducts, useProducts } from "./ProductProvider.js"
import { getCategories, useCategories } from "../categories/CategoryProvider.js"
import { Product } from "./Product.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".menu__items")

// let bakeryProducts = []
// let bakeryCategories = []

export const ProductList = (categoryId) => {
  getProducts()
  .then(getCategories)
  .then(() => {
      let bakeryProducts = useProducts()

      //if dropdowm isn't all then filter bakeryproducts array to just what's selected
      if(categoryId!=0){
          let filteredBakeryProducts = bakeryProducts.filter(prod => prod.categoryId === parseInt(categoryId))
          bakeryProducts=filteredBakeryProducts
      }

      const bakeryCategories = useCategories()
      render(bakeryProducts, bakeryCategories)
    })
}

const render = (bakeryProducts, bakeryCategories) => {
  contentTarget.innerHTML = bakeryProducts.map(product => {
    const productCategory = bakeryCategories.find(cat => cat.id === product.categoryId)

    return Product(product, productCategory)
  }).join("")
}

eventHub.addEventListener("categorySelected", event => {
    // console.log(event.detail.selectedCategory)
    ProductList(event.detail.selectedCategory)
})