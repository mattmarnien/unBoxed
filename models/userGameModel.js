module.exports = function(sequelize, Datatypes) {
    const userGame = sequelize.define("UserGame", {
        userId: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        gameId: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Games',
                key: 'id'
            }
        }
    });
    userGame.removeAttribute('id')
    return userGame;
  };