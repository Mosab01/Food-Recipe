import { useState, useEffect } from "react";
import "../css/MealDetails.css";

function MealDetails() {
  const [meal, setMeal] = useState(null);
  // Use useParams hook to get the `idMeal` param from the URL

  var newPath = window.location.pathname.replace("/", "");


  useEffect(() => {
    async function fetchMeal() {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${newPath}`
      );
      const data = await response.json();
      setMeal(data.meals[0]);
    }
    fetchMeal();
  });

  // Render loading message until meal data is fetched
  if (!meal) {
    return <div>Loading meal details...</div>;
  }

  return (
    <div className="MealDetails">
      <h1 id="header-1">{meal.strMeal}</h1>
      <div id="header_details">
      <img id="thumbnail" src={meal.strMealThumb} alt={meal.strMeal} />
      <iframe
        src={meal.strYoutube.replace("watch?v=", "embed/")}
      ></iframe>
      </div>

      <h2 id="header-2">Ingredients:</h2>
      <ul>
        {Object.keys(meal)
          .filter((key) => key.startsWith("strIngredient") && meal[key])
          .map((key) => (
            <li id="ingredient-mealDetails" key={key}>
              {meal[key]} - {meal[`strMeasure${key.slice(-1)}`]}
            </li>
          ))}
      </ul>
      <h2>Instructions:</h2>
      <p id="instruction">{meal.strInstructions}</p>
    </div>
  );
}

export default MealDetails;
