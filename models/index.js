const User = require('./User');
const Project = require('./Project');
const Recipe = require('./recipe');
User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});
// Recipe.belongsTo(User, {
//   foreignKey: 'user_id'
// });

module.exports = { User, Project, Recipe };
