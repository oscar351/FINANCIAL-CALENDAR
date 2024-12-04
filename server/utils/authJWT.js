const { verify } = require('./jwt-util');

const authJWT = (req, res, next) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ') [1];
        const result = verify(token);
        if(result.ok){
            req.email = result.email;
            req.role = result.role;
            req.provider = result.provider;
            next();
        }else{
            res.json({
                code:401,
                message : result.message,
                value : null
            });
        }
    }else{
        res.json({
            code:401,
            message : null,
            value : null
        });
    }
}

module.exports = authJWT;