const authConfig = require('../config/auth');


const verifyToken = (req, res, next) => {

    const authheader = req.headers.authorization;
    console.log(authheader);

    // Check if token exists
    if ( !authheader ) {

        return res.status(401).json({ success: false, message: 'Unauthorized User' });
    } else {

        // Basic Auth
        basicAuth = new Buffer.from(authheader.split(" ")[1],
            "base64").toString().split(':');
        let username = basicAuth[0];
        let password = basicAuth[1];

        if (username == authConfig.api_user_master && password == authConfig.api_pass_master) {
            return next();
        }

    }

};


module.exports = verifyToken;