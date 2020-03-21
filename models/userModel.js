const moment = require('moment');
var bcrypt  = require('bcrypt');
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
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
    onlinegaming: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: true
    },
    zipcode: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      default: 00001
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

    User.generateHash = function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    };
    User.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
  };

    User.associate = (models) => {
      User.belongsToMany(models.Game, {
        through: 'userGames',
        as: 'games',
        foreignKey: 'userId'
      });
    };
  
    return User;
  };
