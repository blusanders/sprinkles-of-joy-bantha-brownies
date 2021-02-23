import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"

const eventHub = document.querySelector("#container")
const userNav = document.querySelector(".userNav")
const logoutContainer = document.querySelector(".logoutContainer")

export const CustomerNav = () => {
  if (authHelper.isUserLoggedIn()) {
    getCustomer(authHelper.getCurrentUserId())
      .then(userObject => {
        render(userObject)
      })
  }
}

const render = (customer) => {
  let vip = ""
  if(customer.rewardsMember === true){
     vip = `<img class="rewards" src="../images/rewardsBadge.png" alt="badge">`
  }else{
     vip = `<br /><button id="rewardsSignUp--${customer.id}">Click to sign up for rewards!</button>`
  }
  userNav.innerHTML = `
    <h3>Welcome ${customer.name}! ${vip} </h3>
    <ul class="userNav__links">
    <li class="userNav__link" id="userNav--showCart">My Cart</li>
    <li class="userNav__link" id="userNav--newReview">New Review</li>
    <li class="userNav__link" id="userNav--pastOrders">Order History</li>
    </ul>
  `
}

export const LogoutNav = () => {
  logoutContainer.innerHTML=`<li><a id=logoutNavLink href="#">Logout</a></li>`
}

eventHub.addEventListener("userLoggedIn", event => {
  CustomerNav()
})

eventHub.addEventListener("click", event => {
  if (event.target.id.startsWith("userNav--")) {
    const [idPrefix, idSuffix] = event.target.id.split("--")
    let customEvent
    switch (idSuffix) {
      case "showCart":
        customEvent = new CustomEvent("showCustomerCart")
        break;
      case "newReview":
        customEvent = new CustomEvent("showNewReviewForm")
        break;
      case "pastOrders":
        console.log("history");
        customEvent = new CustomEvent("showPastOrders")
        break;
    }
    eventHub.dispatchEvent(customEvent)
  }
})


eventHub.addEventListener('click', clickEvent => {
  if(clickEvent.target.id.startsWith("rewardsSignUp")){
    const [prefix, customerId] = clickEvent.target.id.split("--")
    const customEvent = new CustomEvent('rewardsSignUp', {
          detail: {
            customerId: parseInt(customerId)
          }
    })
    eventHub.dispatchEvent(customEvent)
  }
})