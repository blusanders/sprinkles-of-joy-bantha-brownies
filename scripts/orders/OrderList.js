import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { Order } from "./Order.js"
import { getOrderProducts, useOrderProducts } from "./OrderProductProvider.js"
import { getOrders, useOrders, deleteOrder } from "./OrderProvider.js"

const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userOrders")

// let customerOrders = []

export const OrderList = () => {
  if (authHelper.isUserLoggedIn()) {

    getOrders()
      .then(getOrderProducts)
      .then(() => {
        let customerOrders = useOrders()
        let customerOrderProducts = useOrderProducts()
        render(customerOrders,customerOrderProducts)
      })
  }
}

const render = (customerOrders,customerOrderProducts) => {

  const ordersHtmlRepresentation = customerOrders.map(order => {
    const productsHtmlRepresentation = customerOrderProducts.filter(custOrdProd => custOrdProd.orderId === order.id )
    return Order(order,productsHtmlRepresentation)
  }).join("")

  contentContainer.innerHTML = `
  <div id="orders__modal" class="modal--parent">
        <div class="modal--content">
        <h3>All Customer Orders</h3>
        <div>
        <h5>Ordered on</h5>
        <button id="modal--close">Close</button>
        ${ordersHtmlRepresentation}
        </div>
        <button id="modal--close">Close</button>
        </div>
    </div>
      `
}

eventHub.addEventListener("showPastOrders", () => {
  OrderList()
})

eventHub.addEventListener("ordersStateChanged", () => {
  OrderList()
})

eventHub.addEventListener("click", event => {
  if (event.target.id === "modal--close") {
    closeModal()
  }

  //if show details then unhide details container
  if (event.target.id.startsWith("orderShowDetails--")){
    let linkVar = document.getElementById("orderShowDetails--"+event.target.id.split("--")[1]);
  
    if (linkVar.text==="show details"){
      linkVar.text = "hide details"
      document.getElementById("showOrderDetailsContainer--"+event.target.id.split("--")[1]).style.display = '';
    }else{
      linkVar.text = "show details"
      document.getElementById("showOrderDetailsContainer--"+event.target.id.split("--")[1]).style.display = 'none';
    } 
  }
})

//Delete order if order status = Ready for Pickup id:1
eventHub.addEventListener("click", event => {
  if (event.target.id.startsWith("deleteOrder--")){
    deleteOrder(event.target.id.split("--")[1])
  }
})

const closeModal = () => {
  contentContainer.innerHTML = ""
}
