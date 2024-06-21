const client = require('../../client');
const bcrypt = require('bcrypt');

const checkEmail = async(req, res) => {
    const { email } = req.query;

    try {
        const user = await client.users.findFirst({
            where: { email, provider : "LOCAL" },
        });
        res.send({
            code: 200,
            message: null,
            value : !user
        });
    } catch (error) {
        res.send({
            code: 500,
            message: '이메일 중복 확인 중 오류가 발생했습니다.',
            value : null
        });
    }
}

const register = async (req, res) => {
    const { email, name, password, phoneNumber } = req.body;

    try {
        // 입력값 유효성 검사 (예시)
        if (!email || !name || !password || !phoneNumber) {
          res.send({ code: 400, message: '모든 필드를 입력해야 합니다.', value : null });
        }
        // 이메일 중복 확인
        const existingUser = await client.users.findFirst({where: { email },});

        if (existingUser) {
          res.send({ code: 409, message: '이미 사용 중인 이메일입니다.', value : null });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 10은 salt rounds
    
        // 사용자 생성
        const user = await client.users.create({
          data: {
            email,
            username : name,
            password: hashedPassword,
            phoneNumber,
            provider: 'LOCAL', // 로컬 회원가입
          },
        });
        console.log(user);
        res.send({ code: 200, message: '회원가입이 완료되었습니다.', value : null });
      } catch (error) {
        res.send({ code: 500, message: '회원가입 중 오류가 발생했습니다.', value : null });
      }
}

module.exports = {
    checkEmail,
    register
};
