const express = require('express')
const app = express();
const {databaseConnect} = require('./config/dababase')
const {User} = require('./models/user')
const validator = require('validator')
const {validateSignupData} = require('./utils/validations')
const {valaidateSingninData} = require('./utils/validations')
const {userAuth, adminAuth} = require('./middlewares/auth')

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')

databaseConnect()
    .then(() => {
    //throw new err('Something went wrong')
    console.log('Connected to Database successfully!!!')
    app.listen(3000, () => {
        console.log('Server is successfully running ...')
    })
})
.catch(err => {
    console.log('Something went wrong!! DB connection not established')
})

app.use(express.json())
app.use(cookieParser())

app.post('/signup', async (req, res) => {

    console.log(req.body)
    try{
        validateSignupData(req)
        const {firstName, lastName, emailId, password} = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash)
    
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        })
        await user.save()
        res.send('User added successfully!!')
    }
    catch(err) {
        res.send('ERROR: '+ err.message)
    }
})

app.post('/login', async (req, res) => {

    try {
        const {emailId, password} = req.body
        valaidateSingninData(req)

        const user = await User.findOne({emailId: emailId})
        if(!user) {
            throw new Error('Invalid credentials')
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid) {
            throw new Error('Invalid credentials')
        }
        else {
            //Create a jwt token
            const token = jwt.sign({_id: user._id}, 'Devtinder@12345', {expiresIn: '1h'})
            console.log(token)
            //Add the token to cookie and sending back with the response
            res.cookie('token', token, {
                expires: new Date(Date.now() + 900000)
            })
            res.send('Login successfull !!!!')
        }
    }
    catch(err) {
        res.status(404).send('ERROR: ' + err.message)
    }
})

app.get('/profile', userAuth, async (req, res) => {

    try {
        const user = req.user
        res.send(user)
    }
    catch(err) {
        res.status(404).send('ERROR: ' + err.message)
    }
  
})

app.post('/sendConnectionRequest', userAuth, async (req, res) => {

    const user = req.user

    res.send(user.firstName + ' has send a connection request')
})

app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const users = await User.find({emailId: userEmail})
        //throw new Error()

        if(users.length === 0) {
            res.status(404).send('User not found!!')
        }
        else {
            res.send(users)
        }
    }
    catch(err) {
        console.log('Something went wwrong')
    }
})

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({})
        //throw new Error('Something went wrong')

        if(users.length === 0) {
            res.status(404).send('No user found in database')
        }
        else {
            res.send(users)
        }
    }
    catch(err) {
        res.status(400).send(err.message)
    }


})
// Delete data of a user
app.delete('/user', async (req, res) => {
    const userId = req.body.userId
    try {
        const user = await User.findByIdAndDelete(userId)
        res.send('User deleted successfully!!!')
    }
    catch(err) {
        res.status(404).send('User not found in the database!!')
    }
})

//Update data of a user
app.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId
    const data = req.body

    try {
        const ALLOWED_UPDATES = [
            "age",
            "skills",
            "gender",
            "about"
        ]
    
        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k))
        if(!isUpdateAllowed) {
            throw new Error('Update not allowed')
        }

        const skills = req.body.skills
        if(skills.length > 10) {
            throw new Error('Cannot add more than 10 skills')
        }
    
        const user = await User.findByIdAndUpdate(userId, data,
            {
                returnDocument: 'after',
                runValidators: true
        })
        console.log(user)
        res.send("User updated successfulluy")
    }
    catch(err) {
        res.status(400).send(err.message)
    }
})

app.use('/admin',adminAuth)

app.get('/admin/getAllUsers', (req, res) => {
    res.send('User is authorized and data is been sent')
})

app.get('/admin/deleteUser', (req, res) => {
    res.send('Deleted a user')
})

app.get('/user', userAuth, (req, res) => {
    res.send('User is added successfully')
})

// app.listen(3000, () => {
//     console.log('Server is successfully running ...')
// })