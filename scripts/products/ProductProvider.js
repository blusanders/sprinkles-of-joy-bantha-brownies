import { bakeryAPI } from "../Settings.js"

let products = []

export const useProducts = () => {
  // debugger
  return products.slice()
}

export const getProducts = () => {
  // console.log(bakeryAPI.baseURL + "/products")
  return fetch(`${bakeryAPI.baseURL}/products`)
    .then(response => response.json())
    .then(bakedGoods => {
      // debugger
      products = bakedGoods
    })
}

