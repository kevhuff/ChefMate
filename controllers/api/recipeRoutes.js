const router = require('express').Router();

router.post('/recipes', async (req, res) => {
    const searchQuery = req.body.searchQuery;
    const appId = process.env.APP_ID;
    const apiKey = process.env.API_KEY;

    try {
        const baseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${apiKey}&from=0&to=20`;
        const response = await fetch(baseUrl);
        const data = await response.json();

        const html = generateHTML(data.hits);

        res.send(html);
    } catch (err) {
        res.status(500).send(err);
    }
});


function generateHTML(results) {
    let generatedHTML = "";

    results.forEach((result) => {
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

    return html;
    // document.getElementById("save-btn").addEventListener("click", saveToProfile);
}