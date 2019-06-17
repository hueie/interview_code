var express = require('express');
var app = express();
const router = express.Router();
app.use('/', router);
const jwt = require('jsonwebtoken');

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })

const API_HEADERS = {
    JWT_TOKEN: 'jwt-token',
    JWT_CONSUMER: ' jwt-consumer'
};
const MESSAGES = {
    NOT_FOUND: 'Valid headers not present ',
    TOKEN_EXPIRES: 'Download token expired',
    USER_NOT_FOUND: 'User with given email doesn\'t exist',
    NOT_VALID_CLIENT: 'Not a valid client',
};
/***************SECRETS***************/
// I would prefer to keep in database if it is more than > 5. Else // keep it in environment.
const SECRETS = {
    'consumer-1-erx97812': 'secret1',
    'consumer-2-i32eecx2': 'secret2',
}
/***************END***************/
// Middleware for JWT Verifier
const JWTVerifier = async (req, res, next) => {
    const jwtToken = req.headers[API_HEADERS.JWT_TOKEN];
    const jwtConsumer = req.headers[API_HEADERS.JWT_CONSUMER];
    const payload = {};
    if (!jwtToken || !jwtConsumer) {
        return res.status(400).json({ message: MESSAGES.NOT_FOUND });
    }
    try {
        const secret = SECRETS[jwtConsumer];
        if (!secret) {
            return res.status(403).json({ message: MESSAGES.NOT_VALID_CLIENT });
        }
        _.merge(payload, req.query, req.body);
        try {
            jwt.verify(jwtToken, secret);// Verify only token not data.
            const decoded = jwt.decode(jwtToken, { complete: true });
            // Verifying the data sent inside the token should be same as payload.
            if (!_.isEqual(decoded.payload, payload)) {
                return res.status(403).json({ message: MESSAGES.NOT_VALID_PAYLOAD });
            }
            return next();
        } catch (err) {
            return res.status(403).json({ message: MESSAGES.NOT_FOUND });
        }
    } catch (error) {
        return next(error);
    }
};
router.get('/v1/api/getdetails', JWTVerifier, function (req, res, next) {
    var customData = {
        'abc@gmail.com': {
            name: 'rachit',
            dob: '26/07/1993'
        },
        'xzy@gmail.com': {
            name: 'suchit',
            dob: '09/09/1996'
        }
    }
    const user = customData[req.query.email];
    if (user) res.json({ user });
    res.json({ message: MESSAGES.USER_NOT_FOUND })
});

