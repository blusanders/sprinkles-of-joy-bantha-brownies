import { bakeryAPI } from "../Settings.js"

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
