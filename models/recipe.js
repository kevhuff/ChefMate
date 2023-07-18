const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model { }

Recipe.init(
    {
        name: {
            type: String,
            required: 'This field is required.'
        },
        description: {
            type: String,
            required: 'This field is required.'
        },
        ingredients: {
            type: Array,
            required: 'This field is required.'
        },
        category: {
            type: String,
            enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian'],
            required: 'This field is required.'
        },
        image: {
            type: String,
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