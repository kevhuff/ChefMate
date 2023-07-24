const sequelize = require('../config/connection');
const {Recipe} = require('../models');
const recipeData = require('./recipeData.json');

const seedData = async () => {
    await sequelize.sync({force: true});
    const users = await Recipe.bulkCreate(recipeData, {
        individualHooks: true,
        returning: true,
      });
      process.exit(0);
};
seedData();