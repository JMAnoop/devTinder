const jwt = require('jsonwebtoken')
const {User} = require("../models/user")

const adminAuth = (req, res, next) => {

    console.log('Admin auth is getting checked')
    const token = 'xyz';
    if(token === 'xyz') {
        next()
    }
    else {
        res.status(401).send('User is not authorized!!')
    }
}

const userAuth = async (req, res, next) => {

    try {
        const { token } = req.cookies

        if(!token) {
            throw new Error('Token is not valid !!!')
        }
        const decodedMessage = await jwt.verify(token, 'Devtinder@12345')
        console.log(decodedMessage)

        const { _id } = decodedMessage
        const user = await User.findById(_id)
        
        if(!user) {
            throw new Error('User not found')
        }
        req.user = user
        next()
    }
    catch(err) {
        res.status(404).send('ERROR : ' + err.message)
    }
}
module.exports = {
    userAuth,
    adminAuth
}