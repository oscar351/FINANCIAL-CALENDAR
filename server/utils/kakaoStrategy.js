const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const jwt = require('../utils/jwt-util');
const client = require('../client');
// const { Users } = require("");


module.exports = () => {
    passport.serializeUser((token, done) => {
        done(null, token);
    });
      
    passport.deserializeUser(async (token, done) => {
        // 토큰을 이용하여 사용자를 인증 또는 사용자 정보를 가져오는 로직 구현
        // 예시: 토큰에서 userId를 추출하여 사용자 정보를 가져옴
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("test");
        const userId = decoded.userId;
        
        const user = await client.users.findFirst({
           where:{
             email : userId
           }
        })
        if (user) {
            done(null, token);
        }else{
            done(err);
        }

        // Users.findByPk(userId)
        //   .then((user) => {
        //     done(null, user); // 사용자 객체를 세션에서 가져옴
        //   })
        //   .catch((err) => {
        //     done(err);
        //   });
    });


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
                        }
                    });
                    if(exUser){
                        console.log(exUser);
                        const accessToken = jwt.sign(exUser);
                        const refreshToken = jwt.refresh();
                        return done(null, {accessToken : accessToken, refreshToken : refreshToken});
                    }else{
                        console.log(profile);
                        const newUser = await client.users.create({
                            data : {
                                email : profile._json.kakao_account.email,
                                username : profile.displayName,
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