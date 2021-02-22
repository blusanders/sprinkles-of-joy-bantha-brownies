import { authHelper } from "../auth/authHelper.js"
import { bakeryAPI } from "../Settings.js"
import { saveOrderProducts } from "./OrderProductProvider.js"

const eventHub = document.querySelector("#container")

let orders = []

export const useOrders = () => orders.slice()

export const getOrders = () => {

  //get orders for current logged in user with session customer ID
  let fetchURL =`${bakeryAPI.baseURL}/orders?_expand=status&customerId=${authHelper.getCurrentUserId()}`
  // console.log(fetchURL);

  return fetch(fetchURL)
    .then(response => response.json())
    .then(response => {
      orders = response
    })
}

export const saveOrder = (order, productsInOrder) => {
  return fetch(`${bakeryAPI.baseURL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then(res => res.json())
    .then((createdOrder) => {
      const orderProducts = productsInOrder.map(product => {
        return {
          "orderId": createdOrder.id,
          "productId": product.id
        }
      })
      return saveOrderProducts(orderProducts)
    })
    .then(() => getOrders())
    .then(dispatchStateChangeEvent)
}

export const deleteOrder = (orderId) => {
  console.log("DeleteOrder: " + orderId)
  return fetch('http://localhost:8088/orders/'+orderId, {
    method: "DELETE"
  })
  .then(() => getOrders())
  .then(dispatchStateChangeEvent())
}
    
const dispatchStateChangeEvent = () => {
  const ordersStateChangedEvent = new CustomEvent("ordersStateChanged")
  eventHub.dispatchEvent(ordersStateChangedEvent)
}

