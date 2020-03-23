module.exports = function(sequelize, Datatypes) {
    const userGame = sequelize.define("UserGame", {
        hasIrl: {
            type: Datatypes.BOOLEAN,
            allowNull: true,            
        }
       
    });

    return userGame;
  };