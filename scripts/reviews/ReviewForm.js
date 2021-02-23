export const ReviewForm = () => {

    let renderHTML= ""

    renderHTML+=`

    <fieldset>

    <div>
    <label for="reviewFormRating">Product:</label>
    <select id="reviewFormRating">
    <option value=0>Select product star rating:</option>
    <option value=5>5 stars</option>
    <option value=4>4 stars</option>
    <option value=3>3 stars</option>
    <option value=2>2 stars</option>
    <option value=1>1 stars</option>
    </select>
    </div>

    <div class="validation reviewFormRatingValidation"></div>

    <div>
    <label for="reviewFormText">Review:</label>
    <textarea cols=40 id="reviewFormText"></textarea>
    </div>

    <div>
    <input type="button" class="reviewFormButton" id="reviewFormButton" value="Add Review">
    </div>

    </fieldset>
    `
    return renderHTML

}

