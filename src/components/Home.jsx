import "../css/Home.css";
import React, { useState, useEffect } from "react";

export function Home() {
  const [searchKey, setSearchKey] = useState("soup");

  function setIngredient() {
    setSearchKey(document.getElementById("input").value);
  }

  function switchToSelected() {
    const selection = document.getElementById("categories");
    let apiKey = "";

    if (selection.value === "Name") {
      apiKey = `${process.env.REACT_APP_API_BY_NAME}${searchKey}`;
    } else if (selection.value === "Area") {
      apiKey = `${process.env.REACT_APP_API_BY_AREA}${searchKey}`;
    } else if (selection.value === "Category") {
      apiKey = `${process.env.REACT_APP_API_BY_CATEGORY}${searchKey}`;
    } else {
      apiKey = `${process.env.REACT_APP_API_BY_MAIN_INGREDIENT}${searchKey}`;
    }

    fetch(apiKey)
      .then((response) => response.json())
      .then((data) => {
        const images = document.getElementById("images");
        images.innerHTML = "";
        for (let i = 0; i < data.meals.length; i++) {
          const recipeCard = document.createElement("div");
          recipeCard.id = "recipe-card";
          images.appendChild(recipeCard);

          const img = document.createElement("img");
          img.id = "recipe-img";
          img.src = data.meals[i].strMealThumb;
          recipeCard.appendChild(img);

          const name = document.createElement("p");
          name.id = "recipe-name";
          name.innerText = data.meals[i].strMeal;
          recipeCard.appendChild(name);

          const click = document.createElement("a");
          click.id = "details-link";
          click.href = `/${data.meals[i].idMeal}`;
          click.innerText = `View more details`;
          recipeCard.appendChild(click);
        }
      })
      .catch((error) => {
        const images = document.getElementById("images");
        const name = document.createElement("p");
        name.id = "no-recipe";
        name.innerText = "there's no recipes that apply to your search";
        name.style.color = "red";
        images.appendChild(name);
        console.log(error);
      });
  }

  useEffect(() => {
    switchToSelected();
  }, []);

  return (
    <div className="Home">
      <h1>Food Recipe</h1>

      <div className="input-field">
        <select
          onChange={switchToSelected}
          defaultValue="Name"
          name="categories"
          id="categories"
        >
          <option value="Name">Name</option>
          <option value="Area">Area</option>
          <option value="Category">Category</option>
          <option value="main_ingredient">main ingredient</option>
        </select>
        <input id="input" placeholder="food name" />
        <button
          id="submit"
          onClick={(event) => {
            setIngredient();
            switchToSelected();
          }}
        >
          Submit
        </button>
      </div>
      <div id="images"></div>
    </div>
  );
}
