const validator = require('validator')
const validateSignupData = function (req) {

    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName) {
        throw new Error('Name is not valid')
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error('Email is not valid')
    }
    else if(!validator.isStrongPassword(password)) {
        throw new Error('Please enter a strong password')
    }
}

const valaidateSingninData = (req) => {
    const {emailId, password} = req.body

    if(!emailId || !password) {
        throw new Error('Please enter a valid username or password')
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error('Please enter a valid email Id !!!')
    }
}
module.exports = {
    validateSignupData,
    valaidateSingninData
}