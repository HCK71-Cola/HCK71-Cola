const {sign, verify} = require("jsonwebtoken")
const JWT_SECRET = "test"
const secret = JWT_SECRET  


module.exports = {
    signToken: (payload) => sign(payload,secret),
    verifyToken: (token) => verify(token,secret)
}