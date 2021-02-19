import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { LoginForm } from "./LoginForm.js"

const eventHub = document.querySelector("#container")
const logoutContainer = document.querySelector(".logoutContainer")
const userNav = document.querySelector(".userNav")

export const LogoutNav = () => {

    if (authHelper.isUserLoggedIn()) {
      getCustomer(authHelper.getCurrentUserId())
        .then(userObject => {
          render(userObject)
        })
    }
  }
  
  const render = (customer) => {
    logoutContainer.innerHTML=`<li><a id=logoutNavLink href="#">Logout</a></li>`
}

eventHub.addEventListener("userLoggedIn", event => {
    LogoutNav()
})

eventHub.addEventListener("click", event => {
  if (event.target.id==="logoutNavLink") {
    authHelper.removeUserInSessionStorage()
    logoutContainer.innerHTML=""
    userNav.innerHTML = ""
    LoginForm()
  }
  })

