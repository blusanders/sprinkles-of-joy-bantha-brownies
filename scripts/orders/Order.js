export const Order = (customerOrder, productsHtmlRepresentation,totalPrice) => {

  let renderHTML= ""
  let buttonHTML = ""
  let prodHTML = ""

  //if order status is ready for pickup then show delete button
  //else add a blank <p> for spacing
  if (customerOrder.status.id===1){
    buttonHTML += `<div class=orderButtonDiv><button id="deleteOrder--${customerOrder.id}">X</button>
    </div>`
  }else{
    buttonHTML += "<div class=orderButtonDiv></div>"
  }

  renderHTML+=`
  <div border=1 class="order">
  <div class=orderDetailsDiv>${new Date(customerOrder.timestamp).toLocaleString('en-US')} Total: ${totalPrice.toFixed(2)}
  <a href=# id="orderShowDetails--${customerOrder.id}">show details</a>
  <div style="display:none;" class=productDetailsDiv id=showOrderDetailsContainer--${customerOrder.id}>`
  
  //list all product names for order
  productsHtmlRepresentation.forEach(element => {
    prodHTML += element.product.name + "<br>"
  });

  renderHTML+=prodHTML
  
  renderHTML+=`
  </div>
  </div>
  <div class=orderStatusDiv><p>${customerOrder.status.label}</div>
  `

  renderHTML += buttonHTML
  renderHTML += "</div><hr>"
  return renderHTML

}
