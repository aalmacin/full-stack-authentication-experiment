const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        //   get the token from the authorization header
        const token = req.headers.authorization.split(" ")[1];
        //check if the token matches the supposed origin
        const decodedToken = await jwt.verify(
            token,
            process.env.AUTH_TOKEN
        );
        const user = await decodedToken;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message: "Auth failed!"});
    }
}