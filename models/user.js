module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    User.associate = function(models) {
      // Associating User with Favorites
      // When a User is deleted, also delete any associated Favorites
      User.hasMany(models.Favorite, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  