const express = require('express')

const app = express();

app.use('/helo', (req, res) => {
    res.send('Hello World')
})

app.use('/test', (req, res) => {
    res.send('Hello from Anoop')
})

app.use('/qa', (req, res) => {
    res.send('Learn Test Automation')
})


app.listen(3000, () => {
    console.log('Server is successfully running ...')
})