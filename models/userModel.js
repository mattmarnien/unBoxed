
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the Author model a name of type STRING
      username: {
          type: DataTypes.STRING,
          unique,
          allowNull: false
        },
      firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
      lastName:{
          type: DataTypes.STRING,
          allowNull: false
      }
    });
  
    User.associate = function(models) {
      // Associating User with Games
      Author.hasMany(models.Game, {
        
      });
    };
  
    return User;
  };
