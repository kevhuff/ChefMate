const router = require('express').Router();
const { Project, User, Recipe } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');
async function getRecipesFromEdamam() {
  const appId = 'b61503cb';
  const apiKey = 'b3bb8198c324d6d8f860f7a44544fcb6';
  const searchTerm = 'chicken'; // Replace with the desired search term

  try {
    const response = await axios.get('https://api.edamam.com/search', {
      params: {
        q: searchTerm,
        app_id: appId,
        app_key: apiKey,
        to: 5
      },
    });

    const recipes = response.data.hits.map((hit) => hit.recipe);
    return recipes; // This will contain an array of recipes
  } catch (error) {
    console.error('Error fetching recipes from Edamam API:', error);
    return [];
  }
}
router.get('/', async (req, res) => {
  try {
    const rec = await getRecipesFromEdamam();
    const recipeData = await Recipe.findAll();
    var labels = [];
    var ing = [];
    rec.forEach((r) =>{
      console.log('Recipe:', r.label);
      labels.push(r.label);
      console.log('Ingredient Lines:', r.ingredientLines);
      ing.push(r.ingredientLines);
    });
    //const recipes = recipeData.map((recipe) => recipe.get({plain: true}));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      labels,
      ing, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
