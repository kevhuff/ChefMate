let searchRecipe = document.querySelector("form");
let searchResultDiv = document.querySelector(".search-result");
let search = "";

searchRecipe.addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = e.target.query.value;
    const response = await fetch(`/recipes?query=${query}`);

    searchResultDiv.innerHTML = await response.text();
});

