const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email address: ' + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error('Enter a strong password' + value)
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if(!["Male", "Female", "Others"].includes(value)) {
                throw new Error('Gender data is not valid')
            }  
        }
    },
    skills: {
        type: [String]
    },
    about: {
        type: String,
        default: "This is the default about us!!!1"
    }
}, {timestamps: true})

userSchema.methods.getJWT = async function () {
    const user = this

    const token = jwt.sign({_id: user._id}, 'Devtinder@12345',{
        expiresIn: '1h'
    })

    return token
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash)
    return isPasswordValid    
}

const User = mongoose.model('User', userSchema)
module.exports = {User}