const { verify } = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: 'Bearer token is required'
        })
    }

    const jwt = authHeader.split(' ')[1];

    try {
        const decodedJwt = verify(jwt, process.env.JWT_SECRET);
        req.userId = decodedJwt.id;
        next();
    } catch (error) {
        return res.status(403).json({
            message: 'User not authorised'
        })
    }
}

module.exports = {
    authMiddleware
}