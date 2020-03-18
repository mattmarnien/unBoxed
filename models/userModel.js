const moment = require('moment');
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
             msg: "Must be a valid email address",
        }}
    },
      firstname: {
          type: DataTypes.STRING
        },
      lastname:{
          type: DataTypes.STRING
      },
      password:{
        type: DataTypes.STRING,        
        allowNull: false,
        
    }, 
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    onlineGaming: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
     default: moment.now()
    },
    updatedAt:{
      allowNull: true,
      type: DataTypes.DATE,
     default: moment.now()
    }
    });

    User.associate = function(models) {
      User.belongsToMany(models.Game, { through: 'User_Games'});
    }
    
  
    return User;
  };
