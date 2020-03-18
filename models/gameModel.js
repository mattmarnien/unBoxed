
module.exports = function (sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
        // Giving the Author model a name of type STRING
        ranks: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bgg_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        names: {
            type: DataTypes.STRING,
            allowNull: false
        },
        min_players: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        max_players: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg_time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        min_time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        max_time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg_rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        geek_rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        num_votes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mechanic: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owned: {
            type: DataTypes.STRING,
            allowNull: false
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
       
    });
    Game.associate = function(models){
        Game.belongsToMany(models.User, {through: 'User_Games'})
      }
    connection.sync()
    return Game;

};


    
