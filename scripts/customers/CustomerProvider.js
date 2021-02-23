import { bakeryAPI } from "../Settings.js"
import { CustomerNav } from './CustomerNav.js'
const eventHub = document.querySelector("#container")
let customers = []

export const useCustomers = () => customers.slice()

export const getCustomers = () => {
  return fetch(`${bakeryAPI.baseURL}/customers`)
    .then(response => response.json())
    .then(parsedResponse => {
      customers = parsedResponse
    })
}

export const getCustomer = (id) => {
  return fetch(`${bakeryAPI.baseURL}/customers/${id}`)
    .then(response => response.json())
}

export const customerLogin = (email, password) => {
  
  let fetchURL = `${bakeryAPI.baseURL}/customers?email=${email}&password=${password}`
//  debugger
  console.log(fetchURL);

  //if fetch returns data then return the first (only) element of the object otherwise return false 
  return fetch(`${bakeryAPI.baseURL}/customers?email=${email}&password=${password}`)
    .then(res => res.json())
    .then(user => user.length ? user[0] : false)
}

eventHub.addEventListener('rewardsSignUp', event => {
  const custId = event.detail.customerId
  RewardSignUp(custId)
})

export const RewardSignUp = (customerId) => {

  return fetch(`${bakeryAPI.baseURL}/customers/${customerId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
  },
    body: JSON.stringify({
      rewardsMember: true
    })
  })
  .then(getCustomer(customerId))
  .then(CustomerNav())
}