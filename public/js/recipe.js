const { Recipe } = require('../../models');
const axios = require('axios');
async function getRecipesFromEdamam(sea) {
  const appId = 'b61503cb';
  const apiKey = 'b3bb8198c324d6d8f860f7a44544fcb6';
  const searchTerm = sea; // Replace with the desired search term

  try {
    const response = await axios.get('https://api.edamam.com/search', {
      params: {
        q: searchTerm,
        app_id: appId,
        app_key: apiKey,
        to: 2
      },
    });

    const recipes = response.data.hits.map((hit) => hit.recipe);
    return recipes; // This will contain an array of recipes
  } catch (error) {
    console.error('Error fetching recipes from Edamam API:', error);
    return [];
  }
}

const recipeFormHandler = async (event) => {
  event.preventDefault();
  const searchQuery = document.querySelector('#recipes').value.trim();
 
  if (searchQuery) {
    try {
      // Call the getRecipesFromEdamam function and wait for the results using await
     // const recipes = await getRecipesFromEdamam(searchQuery);
      //const recipeData = await Recipe.findAll();
      const stuff = getRecipesFromEdamam(searchQuery);
      // Make an AJAX POST request to the server to send the recipes data
      const response = await fetch('/api/recipe', {
        method: 'POST',
        body: JSON.stringify({ stuff }),
        headers: {'Content-Type': 'application/json'},
        
      });

      // Check if the POST request was successful and handle the response accordingly
      if (response.ok) {
        // Redirect the user to the /recipe-search route with the search query
        document.location.replace('/recipe-search-results');
      } else {
        // Handle the case where the POST request was not successful
        console.error('Failed to send recipes data to the server');
        // You can display an error message to the user or take appropriate actions
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      // Handle the error or display an error message to the user
    }
  }
};


document
  .querySelector('.recipe-search')
  .addEventListener('submit', recipeFormHandler);