const sequelize = require('../config/connection');
const { User, Project } = require('../models');
const {Recipe} = require('../models');
const userData = require('./userData.json');
const projectData = require('./projectData.json');
const recipeData = require('./recipeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // for (const project of projectData) {
  //   await Project.create({
  //     ...project,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }
  
    const recipes = await Recipe.bulkCreate(recipeData, {
        individualHooks: true,
        returning: true,
      });

  process.exit(0);
};



seedDatabase();
