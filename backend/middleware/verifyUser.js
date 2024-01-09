
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

const signature = process.env.signature;

const verifyUser = (req, res, next) => {
    // Get the userdetails from the jwt token 
    const token = req.header('JWT');
    // console.log('Received token:', token);
    try {
        const data = jwt.verify(token, signature);
        // console.log('Token decoded successfully:', data);
        req.user = data.user;
        console.log(req.user)
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }



}


module.exports = verifyUser;












