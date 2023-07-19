const { Model, DataTypes} = require('sequelize');
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
        name: {
            type: DataTypes.STRING,
            required: 'This field is required.'
        },
        description: {
            type: DataTypes.STRING,
            required: 'This field is required.'
        },
        ingredients: {
            type: DataTypes.ARRAY,
            required: 'This field is required.'
        },
        category: {
            type: DataTypes.STRING,
            enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian'],
            required: 'This field is required.'
        },
        image: {
            type: DataTypes.STRING,
            required: 'This field is required.'
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe',
    }
);

module.exports = Recipe;