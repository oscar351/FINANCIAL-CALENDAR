const passport = require("passport");
const NaverStrategy = require("passport-naver").Strategy;
const jwt = require('../utils/jwt-util');
const client = require('../client');

module.exports = () => {

    passport.use(
        new NaverStrategy(
            {
                clientID: process.env.NAVER_CLIENT,
                clientSecret: process.env.NAVER_SECRET,
                callbackURL: '/auth/naver/callback',
            }, 
            async(accessToken, refreshToken, profile, done) => {
                try {
                    const exUser = await client.users.findFirst({
                            where: { 
                                email : profile.email,
                                provider : "NAVER"
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
                                provider : "NAVER"
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