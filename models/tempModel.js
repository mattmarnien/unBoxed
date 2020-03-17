
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the Author model a name of type STRING
      username: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      
    });
  
    Author.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Author.hasMany(models.Post, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };

// const show = {
//     all: function(cb) {
//         orm.all("shows", (data) => {
//             cb(data);
//         })
//     },
//     update: function(column, id, val, cb){
//         orm.update("shows", column, val, "id", id, (data) => {
//             cb(data);
//         })
//     },
//     create: function(value, cb){
//         orm.create("shows", "name", value, (data) => {
//             cb(data);
//         })
//     },
//     delete: function(id, cb){
//         orm.delete("shows", "id", id, (data) => {
//         cb(data);
//         })
//     }
    
// }

// module.exports = show;