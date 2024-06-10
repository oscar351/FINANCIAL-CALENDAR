const { verify } = require('./jwt-util');

const authJWT = (req, res, next) => {
    console.log(req.isAuthenticated());
    if(req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ') [1];
        const result = verify(token);
        if(result.ok){
            req.email = result.email;
            next();
        }else{
            res.json({
                code:401,
                message : result.message,
                value : null
            });
        }
    }
}

module.exports = authJWT;