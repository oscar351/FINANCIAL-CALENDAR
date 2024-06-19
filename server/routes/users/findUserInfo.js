const client = require('../../client');

const findUserId = async (req, res, next) => {
  /**
  * #swagger.tags= ['User API']
  * #swagger.summary = '아이디 찾기 API'
  * #swagger.description = '아이디 찾기'
  */

    const {name, email} = req.body;

    const user = await client.users.findFirst({
        where:{
            username : name,
            email : email,
            provider : "LOCAL"
        }
    })
    if (user) {
        res.send({
            code: 200,
            message: null,
            value : user.email
        });
    }else{
        res.send({
            code: 401,
            message: '일치하는 유저가 존재하지 않습니다. 다시 확인해주세요.',
            value : null
        });
    }
}

const resetUserPassword = async (req, res) => {
  console.log(req);
  res.send('테스트중입니다.');
}

module.exports = {
    findUserId,
    resetUserPassword
};
