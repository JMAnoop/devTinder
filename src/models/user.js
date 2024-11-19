const mongoose = require('mongoose')

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
        trim: true
    },
    password: {
        type: String,
        required: true,
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

const User = mongoose.model('User', userSchema)
module.exports = {User}