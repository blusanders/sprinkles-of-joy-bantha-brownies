export const Reviews = (reviewArray) => {

    let renderHTML= ""

    renderHTML+=`
    <div>${reviewArray.product.name}</div><div>${reviewArray.text}</div>
    `
    return renderHTML

}

