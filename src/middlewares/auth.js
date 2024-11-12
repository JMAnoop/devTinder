
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

const userAuth = (req, res, next) => {

    console.log('User auth is getting checked')
    const token = 'xyz';
    if(token === 'xyz') {
        next()
    }
    else {
        res.status(401).send('User is not authorized!!')
    }
}
module.exports = {
    adminAuth,
    userAuth
}