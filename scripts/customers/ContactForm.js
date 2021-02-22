
const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector('.contactForm')

// Listens for contact in navbar to be clicked, will display contact form 
eventHub.addEventListener("click", event => {
    if (event.target.id==='contact') {
      ContactForm()
    }
})

export const ContactForm = () => {
    renderContactForm()
}

const renderContactForm = () => {
    contentTarget.innerHTML = `
    <div>
        <fieldset>
            <legend>Contact Us</legend>
            <label for="name">Name</label><br />
            <input type="text" name="name" id="name"><br />
            <label for="phone">Phone Number</label><br />
            <input type="tel" name="phone" id="phone"><br />
            <label for="email">E-mail</label><br />
            <input type="email" name="email" id="email"><br />
            <label for="message">Message</label><br />
            <textarea name="message" id="message"></textarea><br />         
            <button id="saveContactForm">Send</button>
        </fieldset>
    </div>`
}


// Listens for send button on contact form to be clicked, posts the info to db and clears form
eventHub.addEventListener("click", event => {
    if(event.target.id==='saveContactForm'){
        let nameId = document.querySelector('#name').value
        let phoneId = document.querySelector('#phone').value
        let emailId = document.querySelector('#email').value
        let messageId = document.querySelector('#message').value

        const newContact = {
            name: nameId,
            phone: phoneId,
            email: emailId,
            message: messageId,
        }
        saveContactForm(newContact)
        .then(()=>{
            nameId= ""
            phoneId = ""
            emailId = ""
            messageId = ""
            ContactForm()
        })
    }
})




//Function posts info from contact form to database
export const saveContactForm = contact => {
    return fetch('http://localhost:8088/contacts', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
    })
   
}