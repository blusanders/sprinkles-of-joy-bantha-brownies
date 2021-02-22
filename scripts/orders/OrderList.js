import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { Order } from "./Order.js"
import { getOrderProducts, useOrderProducts } from "./OrderProductProvider.js"
import { getOrders, useOrders, deleteOrder } from "./OrderProvider.js"

const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userOrders")

// let customerOrders = []

//render list of all orders
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

//render based on order array and orderProduct array
//order product provider expanded to include product name
//so we don't have to iterate again through products to get name
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

//listen for the order history click from the nav
eventHub.addEventListener("showPastOrders", () => {
  OrderList()
})

//refresh and display orders when order state changes. at this time, when a user orders. 
eventHub.addEventListener("ordersStateChanged", () => {
  OrderList()
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal()  }
})


eventHub.addEventListener("click", event => {

  if (event.target.id === "modal--close") {
    closeModal()
  }

  //if show details link is clicked then render products in order and unhide container
  if (event.target.id.startsWith("orderShowDetails--")){
    
    let linkVar = document.getElementById("orderShowDetails--"+event.target.id.split("--")[1]);
  
    //swap the text in the anchor tag and show/hide the container
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
    OrderList()
  }
})

const closeModal = () => {
  contentContainer.innerHTML = ""
}
