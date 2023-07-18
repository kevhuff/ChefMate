const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 20],
      },
    },
  },
  
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
  );
  
  module.exports = User;




  const bcrypt = require('bcrypt');
  const saltRounds = 10; // 10 salt rounds for hashing password 
  
  module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
  
  
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          const hash = bcrypt.hashSync(val, saltRounds);
          this.setDataValue('password', hash);
        }
      }
    });
  };
  
  


  // module.exports = function (sequelize, DataTypes) {
  //   var User = sequelize.define("User", {
  //     username: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //       unique: true,
  //     },
  //     email: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //       unique: true,
  //       validate: {
  //         isEmail: true
  //       }
  //     },
  //     password: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //       length: [8, 20] // pw must be between 8 and 20 characters
  //     }
  //   });
  
  //     User.associate = function (models) {
  //       // Associating User with Favorites
  //       // When a User is deleted, also delete any associated Favorites
  //       User.hasMany(models.Favorite, {
  //         onDelete: "cascade"
  //       });
  //     };
  
  //   return User;
  // };
