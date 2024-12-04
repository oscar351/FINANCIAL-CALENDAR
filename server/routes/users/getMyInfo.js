const client = require('../../client');
const bcrypt = require('bcrypt');


const getMyInfo = async (req, res, next) => {
    /**
    * #swagger.tags= ['User API']
    * #swagger.summary = '아이디 찾기 API'
    * #swagger.description = '아이디 찾기'
    */
    
    const user = await client.users.findFirst({
        where: {
            email: req.email,
            provider: req.provider
        }
    })
    if (user) {
        res.send({
            code: 200,
            message: null,
            value: {
                email : user.email,
                phoneNumber : user.phoneNumber,
                provider : user.provider,
                username : user.username,
                role : user.role
            }
        });
    } else {
        res.send({
            code: 401,
            message: '일치하는 유저가 존재하지 않습니다. 다시 확인해주세요.',
            value: null
        });
    }
}

module.exports = {
    getMyInfo
};
