const express = require('express')

const app = express();


app.get('/user', (req, res) => {
    res.send({firsrName: 'Anoop',
        lastName: 'JM'
    })
})

app.post('/user', (req, res) => {
    res.send('Successful saved the data')
})

app.delete('/user', (req, res) => {
    res.send('Data Deleted successfully')
})

app.use('/test', (req, res) => {
    res.send('Hello world')
})

app.listen(3000, () => {
    console.log('Server is successfully running ...')
})