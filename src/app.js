const express = require('express')
const {adminAuth, userAuth} = require('./middlewares/auth')
const app = express();
const {databaseConnect} = require('./config/dababase')
const {User} = require('./models/user')

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

app.post('/signup', async (req, res) => {

    console.log(req.body)
    const user = new User(req.body)
    
    // const user = new User({
    //     firstName: "Hendry",
    //     lastName: "Klassen",
    //     emailId: "hendry@test.com",
    //     password: 'klassen@123',
    //     age: '28',
    //     gender: 'Male' 
    // })

    await user.save()
    res.send('User added successfully!!')

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
app.patch('/user', async (req, res) => {
    const userId = req.body.userId
    const data = req.body
    try {
        const user = await User.findByIdAndUpdate(userId, data)
        res.send(user)
    }
    catch(err) {
        res.status(404).send('User not found in the database')
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