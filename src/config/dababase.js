const mongoose = require('mongoose')

const databaseConnect = async () => {
    await mongoose.connect('mongodb+srv://anoop:AnoopJM86@mycluster.jjzro.mongodb.net/devTinder')
}

module.exports = {databaseConnect}
