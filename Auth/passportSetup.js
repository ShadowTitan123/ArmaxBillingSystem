const passport = require('passport');
const dotenv = require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../DB/config.js');



passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    const user = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        email: profile.emails[0].value,
    }

    try {

        console.log(user);
        const user_id = user.googleId;
        const first_name = user.firstName;
        const last_name = user.lastName;
        const email = user.email;
        const photo = user.image;
        //Check if User Exists 
        const checkUser = "Select * from `tbl_google_admin` where email =  ? limit 1 ";
        db.query(checkUser, [email], function (err, rows, fields) {
            if (err) throw err
            else if (rows.length > 0){
                console.log('User Exists');
            }else{

                var sql = "INSERT INTO `tbl_google_admin` (`google_id`, `first_name`, `last_name`, `email`, `photo_path`) VALUES (?,?,?,?,?)";

                db.query(sql, [user_id, first_name, last_name, email, photo], function (err, rows, fields) {
                    if (err) throw err
                    console.log('User Added');
                })
            }
        })
       

        if (user_id) {
            done(null, user)
        } else {
            console.log(` New User Found ${user.googleId}`);
            done(null, user)
        }
    } catch (err) {
        console.error(err)
    }

}
)
)
//setting session

passport.serializeUser(function (user, callback) {
console.log('serializing user.');
callback(null, user);
});

passport.deserializeUser(function (user, callback) {
console.log('deserialize user.');
callback(null, user);
});
