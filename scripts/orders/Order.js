export const Order = (customerOrder) => {

let renderHTML= ""
let buttonHTML = ""

  //if order status is ready for pickup then show delete button
  //else add a blank <p> for spacing
  if (customerOrder.status.id===1){
    buttonHTML += "<button id=deleteOrder--"+customerOrder.id+">X</button>"
  }else{
    buttonHTML += "<p></p>"
  }

  renderHTML+=`
  <div class="order">
  <p>${new Date(customerOrder.timestamp).toLocaleString('en-US')}</p>
  <p>${customerOrder.status.label}</p>
  `

  renderHTML += buttonHTML
  renderHTML += "</div>"

  return renderHTML

}
