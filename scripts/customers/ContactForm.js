
const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector('.contactForm')


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

// Handle browser-generated click event in component
// eventHub.addEventListener("click", clickEvent => {
//     if (clickEvent.target.id === "saveNote") {
//         const dateId = document.querySelector("#date").value
//         // const suspectId = document.querySelector("#suspect").value
//         const noteId = document.querySelector("#note").value
//         const criminalId = document.querySelector("#noteForm--criminal").value
//         // Make a new object representation of a note
//         const newNote = {
//             date: dateId,
//             criminalId: parseInt(criminalId),
//             note: noteId,
//         }

//         // Change API state and application state
//         saveNote(newNote)
//     }
// })



export const saveContactForm = contact => {
    return fetch('http://localhost:8088/contacts', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
    })
   
}