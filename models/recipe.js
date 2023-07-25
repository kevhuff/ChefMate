const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model { }

Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      recipe_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'recipe',
    }
  );
module.exports = Recipe;