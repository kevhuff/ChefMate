let searchRecipe = document.querySelector("form");
let searchResultDiv = document.querySelector(".search-result");
let container = document.querySelector(".container");
let search = "";
const apiKey = process.env.API_KEY;
const appId = process.env.APP_ID;

searchRecipe.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});


async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${apiKey}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  const recipeUrl = data.hits.recipe.url;
  localStorage.setItem('recipeUrl', JSON.stringify(recipeUrl));
  generateHTML(data.hits);
  console.log(data);
}

// function saveToProfile() {

// }

function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-btn" target="_blank" href="${result.recipe.url
      }">View Recipe</a>
            <a id="save-btn" target="_blank" href="${result.recipe.url
      }">Save Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0
        ? result.recipe.dietLabels
        : "No Data Found"
      }</p>
          <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
        </div>
      `;
  });
  searchResultDiv.innerHTML = generatedHTML;
  // document.getElementById("save-btn").addEventListener("click", saveToProfile);
}