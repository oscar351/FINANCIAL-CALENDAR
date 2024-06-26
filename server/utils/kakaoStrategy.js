const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const jwt = require('../utils/jwt-util');
const client = require('../client');
// const { Users } = require("");


module.exports = () => {

    passport.use(
        new KakaoStrategy(
            {
                clientID : process.env.KAKAO_CLIENT,
                callbackURL : "/auth/kakao/callback"
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const exUser = await client.users.findFirst({
                        where : {
                            email : profile._json.kakao_account.email,
                            provider : "KAKAO"
                        }
                    });
                    if(exUser){
                        const accessToken = jwt.sign(exUser);
                        const refreshToken = jwt.refresh();
                        return done(null, {accessToken : accessToken, refreshToken : refreshToken});
                    }else{
                        const newUser = await client.users.create({
                            data : {
                                email : profile._json.kakao_account.email,
                                username : profile.displayName,
                                provider : "KAKAO"
                            }
                        });
                        const accessToken = jwt.sign(newUser);
                        const refreshToken = jwt.refresh();
                        return done(null, {accessToken : accessToken, refreshToken : refreshToken});
                    }
                } catch(err){
                    console.error(err);
                    done(err);
                }
            }
        )
    )
}