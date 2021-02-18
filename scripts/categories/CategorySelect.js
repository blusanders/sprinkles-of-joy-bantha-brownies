import { getCategories, useCategories } from "./CategoryProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".filter__category")

// let categories = []

// first error fixed- added const to categories inside CategorySelect
export const CategorySelect = () => {
  getCategories()
  .then(()=> {
    const allCats = useCategories()
  render(allCats)
})
}

const render = (cat) => {
  contentTarget.innerHTML = `
      <select class="dropdown" id="categorySelect">
          <option value="0">All baked goods...</option>
          ${cat.map(category => `<option value="${category.id}">${category.name}</option>`).join("")}
      </select>
  `
}

eventHub.addEventListener("change", changeEvent => {
  if (changeEvent.target.id === "categorySelect") {
    // debugger
    const categoryCustomEvent = new CustomEvent("categorySelected", {
      detail: {
        selectedCategory: changeEvent.target.value
      }
    })
    eventHub.dispatchEvent(categoryCustomEvent)
  }
})
