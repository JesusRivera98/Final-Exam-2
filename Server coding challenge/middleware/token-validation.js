const {DATABASE_URL,PORT,TOKEN} = require('../config')
function validateToken(req, res, next) {
    let token = req.headers['session-exam-token'];

    if( !token){
        res.statusMessage = "You need to send the 'session-exam-token'."
        return res.status(401).end()
    }
    
    if(token !=  TOKEN){
        console.log(token, TOKEN);
        res.statusMessage = "The 'session-exam-token' is invalid"
        return res.status(401).end()
    }
    next()
}

module.exports = validateToken;
