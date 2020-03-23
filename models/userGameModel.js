module.exports = function(sequelize, Datatypes) {
    const userGame = sequelize.define("UserGame", {
        userUId: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        gameUId: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Games',
                key: 'id'
            }
        }
    });

    return userGame;
  };