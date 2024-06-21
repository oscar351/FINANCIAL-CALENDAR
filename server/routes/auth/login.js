const client = require('../../client');
const jwt = require('../../utils/jwt-util');
const { redisClient } = require('../../utils/redis');
const bcrypt = require('bcrypt');
const bcrypt = require('bcrypt');

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
      provider : "LOCAL"
    }
  })
  
  if (user) {
      const compare = bcrypt.compareSync(password, user.password);

      if(compare){
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
          message: '비밀번호가 일치하지 않습니다. 다시 확인해주세요.',
          value : null
        });
      }
  }else{
    res.send({
      code: 401,
      message: '일치하는 유저가 존재하지 않습니다. 다시 확인해주세요.',
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
