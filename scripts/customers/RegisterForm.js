import { authHelper } from "../auth/authHelper.js"
import { customerLogin } from "./CustomerProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".form__register")

let categories = []

export const RegisterForm = () => {
  render()
}

const render = () => {
  if (!authHelper.isUserLoggedIn()) {
    contentTarget.innerHTML = `
      <h3>Register for a customer account</h3>
      <p>Already have an account? Login <a href="#" id="link__login">here</a>.</p>
      <form>
        <fieldset>
        <label for="register-firstName">First: </label>
        <input type="text" id="register-firstName" name="register-firstName">
        </fieldset>
        <fieldset>
        <label for="register-lastName">Last: </label>
        <input type="text" id="register-lastName" name="register-lastName">
        </fieldset>
        <fieldset>
        <label for="register-email">Email: </label>
        <input type="text" id="register-email" name="register-email">
        </fieldset>
        <fieldset>
        <label for="register-password">Password: </label>
        <input type="password" id="register-password" name="register-password">
        </fieldset>
        <fieldset>
        <input type="checkbox" id="register-rewards" name="register-rewards">
        <label for="register-rewards">Yes, I would like to join the rewards program. </label>
        </fieldset>
        <button id="customerRegister">Register</button>
      </form>
    `
  }
}

eventHub.addEventListener("showRegisterForm", RegisterForm)

eventHub.addEventListener("click", evt => {
  if (evt.target.id === "link__login") {
    contentTarget.innerHTML = ""

    const customEvent = new CustomEvent("showLoginForm")
    eventHub.dispatchEvent(customEvent)
  }
})

eventHub.addEventListener('click', clickEvent => {
  if(clickEvent.target.id === "customerRegister"){
    let custFirstName = document.querySelector('#register-firstName').value
    let custLastName = document.querySelector('#register-lastName').value
    let custEmail = document.querySelector('#register-email').value
    let custPassword = document.querySelector('#register-password').value
    let custRewards
    if(document.querySelector('#register-rewards').checked){
         custRewards = true
      }else{
        custRewards = false
      }
    const newCustomer = {
      name: custFirstName +' '+ custLastName,
      rewardsMember: custRewards,
      email: custEmail,
      password: custPassword
    } 
    RegisterCustomer(newCustomer) 
  }
})

export const RegisterCustomer = (customer) => {
  return fetch('http://localhost:8088/customers', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(customer)
})
}