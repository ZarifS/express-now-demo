let mongoose = require('mongoose')
const database = 'express-demo'
const dbuser = 'zshahriar'
const dbpassword = 'Aac2FCOndmD8Q3ie'
const dboptions = '?retryWrites=true'
const mongoDBConnection = 'demo-cluster-ae12p.mongodb.net'

function dbConnection() {
    console.log(`Trying to connect to: mongodb+srv://${dbuser}:${dbpassword}@${mongoDBConnection}/${database}${dboptions}}`)
    mongoose
        .connect(`mongodb+srv://${dbuser}:${dbpassword}@${mongoDBConnection}/${database}${dboptions}}`)
        .then(() => {
            console.log('Mongooose: Connected to database successfully!')
        })
        .catch((err) => {
            console.error(err);
        });
}

module.exports = dbConnection