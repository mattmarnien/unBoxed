const moment = require('moment');
module.exports = function(sequelize, DataTypes) {
    const Game = sequelize.define("Game", {
      // Giving the Author model a name of type STRING
      name: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
      image: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
       default: moment.now()
      },
      updatedAt:{
        allowNull: false,
        type: DataTypes.DATE,
       default: moment.now()
      }

    
    });
    Game.associate = function(models){
      Game.belongsToMany(models.User, {through: 'User_Games'})
    }


    return Game;
  };
