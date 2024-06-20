const client = require('../../client');
const bcrypt = require('bcrypt');


const findUserId = async (req, res, next) => {
  /**
  * #swagger.tags= ['User API']
  * #swagger.summary = '아이디 찾기 API'
  * #swagger.description = '아이디 찾기'
  */

    const {name, phone_number} = req.body;

    const user = await client.users.findFirst({
        where:{
            username : name,
            phoneNumber : phone_number,
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
    console.log(req.body);

    const {name, email, phone_number} = req.body;

    const user = await client.users.findFirst({
        where:{
            username : name,
            email : email,
            phoneNumber : phone_number,
            provider : "LOCAL"
        }
    });

    if (user) {
        const userInfo = {
            username : user.username,
            email : user.email,
            provider : user.provider
        }

        res.send({
            code: 200,
            message: null,
            value : userInfo
        });
    }else{
        res.send({
            code: 401,
            message: '일치하는 유저가 존재하지 않습니다. 다시 확인해주세요.',
            value : null
        });
    }
}

const updateUserPassword = async (req, res) => {
    console.log(req.body);

    const {newPassword, confirmPassword, username, email, provider} = req.body;

    const encryptedPW = bcrypt.hashSync(newPassword, 10);

    const updateUser = await client.users.update({
        where: {
            createProvider: {
                username    : username,
                email       : email,
                provider    : provider
            }
        },
        data: {
          password: encryptedPW,
        },
    })

    console.log(updateUser);
    if(updateUser){
        res.send({
            code: 200,
            message: null,
            value : null
        });
    }else{
        res.send({
            code: 400,
            message: "비밀번호 초기화에 실패하였습니다. 잠시후 다시 시도해주세요.",
            value : null
        });
    }
}

module.exports = {
    findUserId,
    resetUserPassword,
    updateUserPassword
};
