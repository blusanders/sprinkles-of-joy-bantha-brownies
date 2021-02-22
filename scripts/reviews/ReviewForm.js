export const ReviewForm = () => {

    let renderHTML= ""

    renderHTML+=`

    <div>
    <label for="reviewFormRating">Rating:</label>
    <select id="reviewFormRating">
    <option value=0>Select product star rating:</option>
    <option value=1>5 stars</option>
    <option value=2>4 stars</option>
    <option value=3>3 stars</option>
    <option value=4>2 stars</option>
    <option value=4>1 stars</option>
    </select>

    <div class="validation reviewFormRatingValidation"></div>

    <label align=center for="reviewFormText">Review:</label>
    <textarea cols=40 id="reviewFormText"></textarea>
    <br><br>
    <input type="button" class="reviewFormButton" id="reviewFormButton" value="Add Review">
    </div>
    <div><hr></div>
    `
    return renderHTML

}

