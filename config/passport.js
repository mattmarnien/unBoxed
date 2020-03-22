const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    })

    passport.deserializeUser(function (userid, done) {
        db.User.findOne({ Where: { id: userid } }).then(user => {
            done(null, user.id);
        })
    })

    passport.use(new LocalStrategy(
        function (username, password, done) {


            db.User.findOne({
                where: {
                    username: username
                }
            }).then(function (user, err) {

                if (!user) {
                    console.log("no user found");
                    return done(null, false);
                }



                if (user && !user.validPassword(password)) {

                    return done(null, false);
                }



                return done(null, user);



            });

        }));

};







