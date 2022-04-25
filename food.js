const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', clickGetFood);

async function clickGetFood() {
    let info = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    let res = await info.json()
    let meal = res.meals[0]

    createMeal(meal)


}

const createMeal = (meal) => {
    const ingredients = [];
    // Get all ingredients from the object. Up to 20
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            // Stop if no more ingredients
            break;
        }
    }

    const newInnerHTML = `
		<div class="  row mt-5">
			
				<img src="${meal.strMealThumb}"  class= " image img-fluid mb-3" alt="Meal Image">
			
			<div class="row mt-3">
                <div class="col-md-4  text-start">
				<div>
                    ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
                    ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
                    ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
                </div >
                   <div> 
                   <h4 class =" mt-3">Ingredients</h4>
                        <ul >
                            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join(' ')}
                        </ul>
                   </div>
            </div>

                <div class="col-md-7 mx-4 text-start">
                <h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
                </div>

			</div>
		</div>
		${meal.strYoutube ? `
		<div class="row mt-5">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>` : ''}
	`;

    meal_container.innerHTML = newInnerHTML;
}







