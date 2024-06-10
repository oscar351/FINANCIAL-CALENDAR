const passport = require("passport");
const NaverStrategy = require("passport-google-oauth2").Strategy;
const jwt = require('../utils/jwt-util');
const client = require('../client');

module.exports = () => {

    passport.use(
        new NaverStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT,
                clientSecret: process.env.GOOGLE_SECRET,
                callbackURL: '/auth/google/callback',
                passReqToCallback : true,
            }, 
            async(request, accessToken, refreshToken, profile, done) => {
                try {
                    const exUser = await client.users.findFirst({
                            where: { 
                                email : profile._json.email,
                                provider : "GOOGLE"
                            },
                    });
                    if(exUser) {
                        const accessToken = jwt.sign(exUser);
                        const refreshToken = jwt.refresh();
                        return done(null, {accessToken : accessToken, refreshToken : refreshToken});
                    } else {
                        
                        const newUser = await client.users.create({
                            data : {
                                email: profile._json.email,
                                username : profile.displayName,
                                provider : "GOOGLE"
                            }
                        });
                        const accessToken = jwt.sign(newUser);
                        const refreshToken = jwt.refresh();
                        return done(null, {accessToken : accessToken, refreshToken : refreshToken});
                    }
                } catch(err) {
                    console.error(err);
                    done(err);
                }
            }
        )
    );
}