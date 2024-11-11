const express = require('express')

const app = express();
//multiple handlers

// app.use('/user', (req, res) => {
//     console.log(req.query)
//     res.send({
//         firstName: 'Anoop',
//         lastName: 'JM'
//     })
// })

app.use('/user/:userId/:name/:age', (req, res) => {
    console.log(req.params)
    res.send({
        firstName: 'Anoop',
        lastName: 'JM'
    })
})

app.get('/user',

[(req, res, next) => 
{
    next()
   // res.send('Handling route user 1')
},

(req, res, next) => {
    next();
   // res.send('Handlig route user 2')
}],

(req, res) => {
    res.send('Handling route user 3')
})

// app.get('/user', (req, res) => {
//     res.send({firsrName: 'Anoop',
//         lastName: 'JM'
//     })
// })

// app.post('/user', (req, res) => {
//     res.send('Successful saved the data')
// })

// app.delete('/user', (req, res) => {
//     res.send('Data Deleted successfully')
// })

// app.use('/test', (req, res) => {
//     res.send('Hello world')
// })

app.listen(3000, () => {
    console.log('Server is successfully running ...')
})