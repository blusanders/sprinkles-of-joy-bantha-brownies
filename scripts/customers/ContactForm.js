
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