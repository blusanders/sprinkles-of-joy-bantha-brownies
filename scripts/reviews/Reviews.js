import { authHelper } from "../auth/authHelper.js"

export const Reviews = (reviewArray) => {
// debugger
    let renderHTML= ""

    renderHTML+=`
    <div>
    ${reviewArray.text}
    </div>
    <div>`

    //write out stars. replace with star image
    for (let index = 0; index < reviewArray.stars; index++) {
        renderHTML+=`<img width=20 src="https://cdn.icon-icons.com/icons2/1389/PNG/512/star_96096.png">`
    }

    if (reviewArray.customerId === authHelper.getCurrentUserId()){
        // debugger
        renderHTML+=`<img width=20 src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png"`
    }

    renderHTML+=`
    </div>
    `
    return renderHTML

}