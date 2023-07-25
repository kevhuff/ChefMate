
const withAuth = require('../../utils/auth');
const { Recipe, User, Project } = require('../../models');
const router = require('express').Router();
const express = require('express');
const app = require('express');
const theRec = [];
const axios = require('axios');
//app.use(express.json());
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
        to: 3
      },
    });

    const recipes = response.data.hits.map((hit) => hit.recipe);
    return recipes; // This will contain an array of recipes
  } catch (error) {
    console.error('Error fetching recipes from Edamam API:', error);
    return [];
  }
}
// router.post('/', async (req, res) => {
//   try {
//     const searchQuery = req.body.searchQuery;
//     console.log('Received searchQuery:', searchQuery);
//     const data = req.body.data;
//     // Now you can treat searchQuery as a regular string and use it as needed
//     // For example, you can perform database queries, fetch data from APIs, etc. based on the searchQuery.

//     // Process the searchQuery data and send it back to the client
//     res.status(200).json({ searchQuery, data });
//   } catch (error) {
//     console.error('Error handling recipe data:', error);
//     res.status(500).json({ error: 'Failed to process recipe data' });
//   }
// });
router.post('/', async (req, res) => {
  try {
    const searchQuery = req.body.searchQuery;
    console.log('Received searchQuery:', searchQuery);
    
    // Process the searchQuery data and send it back to the client
    // In this example, we are sending back the searchQuery and the data (array of recipes) as it is
    const recipes = await getRecipesFromEdamam(searchQuery);
    res.status(200).json({ stuff: recipes });
  } catch (error) {
    console.error('Error handling recipe data:', error);
    res.status(500).json({ error: 'Failed to process recipe data' });
  }
});

// GET route to handle requests to /api/recipes
// router.get('/recipes', (req, res) => {
//   try {
//     // Handle the GET request for /api/recipes here
//     // For example, you can send a response or render a template
//     res.send('This is the GET route for /api/recipes');
//   } catch (error) {
//     console.error('Error handling GET request for /api/recipes:', error);
//     // Handle the error or display an error message to the user
//     res.status(500).send('Internal Server Error');
//   }
// });
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }, { model: Recipe }], // Include the Recipe model
//     });

//     const user = userData.get({ plain: true });

//     // Access the recipes from the user object and pass them to the profile template
//     const recipes = user.Recipes || []; // If no recipes found, default to an empty array

//     res.render('profile', {
//       ...user,
//       recipes,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;