const client = require('../../client');
const jwt = require('../../utils/jwt-util');
const { redisClient } = require('../../utils/redis');

const login = async (req, res) => {
  /**
  * #swagger.tags= ['User API']
  * #swagger.summary = '로그인 API'
  * #swagger.description = '로그인'
  */
  const {id, password} = req.body;

  const user = await client.users.findFirst({
    where:{
      id : id,
      password : password
    }
  })
  console.log(user);
  
  if (user) {
      const accessToken = jwt.sign(user);
      const refreshToken = jwt.refresh();

      await redisClient.set(user.id, refreshToken);

      res.status(200).send({
        ok: true,
        data: {
          accessToken,
          refreshToken,
        },
      });
  }else{
    res.status(401).send({
      ok: false,
      message: 'user not exist',
    });
  }
}

module.exports = login;
