const express = require('express')
const {adminAuth, userAuth} = require('./middlewares/auth')
const app = express();

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

app.listen(3000, () => {
    console.log('Server is successfully running ...')
})