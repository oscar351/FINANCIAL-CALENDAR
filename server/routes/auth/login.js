const client = require('../../client');
const jwt = require('../../utils/jwt-util');
const { redisClient } = require('../../utils/redis');

const login = async (req, res, next) => {
  /**
  * #swagger.tags= ['User API']
  * #swagger.summary = '로그인 API'
  * #swagger.description = '로그인'
  */
  const {email, password} = req.body;

  const user = await client.users.findFirst({
    where:{
      email : email,
      password : password,
      provider : "LOCAL"
    }
  })
  
  if (user) {
      const accessToken = jwt.sign(user);
      const refreshToken = jwt.refresh();

      await redisClient.set(user.email, refreshToken);

      res.json({
        code:200,
        message : null,
        value : {
          accessToken,
          refreshToken,
        }
      });
  }else{
    res.send({
      code: 401,
      message: 'user not exist',
      value : null
    });
  }
}

const logout = async (req, res) => {
  console.log(req.user);
  console.log(req.user);
  res.send('테스트중입니다.');
}

module.exports = {
  login,
  logout
};
