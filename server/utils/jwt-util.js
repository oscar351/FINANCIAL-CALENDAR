const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const client = require('../client');
const secret = process.env.JWT_SECRET_KEY;


module.exports = {
    sign: (user) => {
        const payload = {
            email: user.email,
            role: user.role,
            provider : user.provider
        };
        return jwt.sign(payload, secret, {
            algorithm: 'HS256',
            expiresIn: '1h'
        });
    },
    verify: (token) => {
        let decoded = null;
        try {
            decoded = jwt.verify(token, secret);
            return {
                ok: true,
                email: decoded.email,
                role: decoded.role,
                provider : decoded.provider
            };
        } catch (err) {
            return {
                ok: false,
                message: err.message
            };
        }
    },
    refresh: () => {
        return jwt.sign({}, secret, {
            algorithm: 'HS256',
            expiresIn: '14d',
        });
    },
    refreshVerify: async (token, userId) => {

        try {
            const refreshToken = await client.users.findUnique({
                where : {email : userId},
                select : {refreshToken:true},
            });
            if (token === refreshToken.refreshToken) {
                try {
                    jwt.verify(token, secret);
                    return true;
                } catch (err) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

}