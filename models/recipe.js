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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('ingredients').split(';');
            },
            set(val) {
               this.setDataValue('ingredients', val.join(';'));
            },
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Thai', 'American', 'Chinese', 'Mexican', 'Indian']],
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
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
