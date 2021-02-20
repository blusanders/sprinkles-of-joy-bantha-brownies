export const Order = (customerOrder, productsHtmlRepresentation) => {

  let renderHTML= ""
  let buttonHTML = ""
  let prodHTML = ""

  //if order status is ready for pickup then show delete button
  //else add a blank <p> for spacing
  if (customerOrder.status.id===1){
    buttonHTML += "<button id=deleteOrder--"+customerOrder.id+">X</button>"
  }else{
    buttonHTML += "<p></p>"
  }

  renderHTML+=`
  <div border=1 class="order">
  <p>${new Date(customerOrder.timestamp).toLocaleString('en-US')}
  <a href=# id="orderShowDetails--${customerOrder.id}">show details</a>
  <br>1213
  <div id=showOrderDetailsContainer--${customerOrder.id}>`
  
  //list all product names for order
  productsHtmlRepresentation.forEach(element => {
    prodHTML += element.product.name + "<br>"
  });

  renderHTML+=prodHTML
  // debugger
  renderHTML+=`
  </p></div>
  <p>${customerOrder.status.label}</p>
  `

  renderHTML += buttonHTML
  renderHTML += "</div>"
  console.log(renderHTML);
  return renderHTML

}
