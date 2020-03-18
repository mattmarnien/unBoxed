
module.exports = function (sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
        // Giving the Author model a name of type STRING
        ranks: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        bgg_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        names: {
            type: DataTypes.STRING,
            allowNull: false
        },
        min_players: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        max_players: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        avg_time: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        min_time: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        max_time: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        avg_rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        geek_rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        num_votes: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        mechanic: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owned: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        designer: {
            type: DataTypes.STRING,
            allowNull: true
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
       
    });
    Game.associate = function(models){
        Game.belongsToMany(models.User, {through: 'User_Games'})
      }
   
    return Game;

};


    
