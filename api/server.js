let express = require('express')
let app = express()
let path = require('path')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let customerRoute = require('./routes/customer')

const serverName = 'ds151354.mlab.com:51354'
const database = 'shopify-backend'
const dbuser = 'zshahriar'
const dbpassword = '6xdGArjh3ijf'
mongoose.connect(`mongodb://${dbuser}:${dbpassword}@${serverName}/${database}`)

app.use(bodyParser.json())
app.use(customerRoute)
app.use(express.static('public'))

app.get('/', (res, req) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

//Handler for 404 - Resource not found
app.use((req, res, next) => {
    res
        .status(404)
        .send('We think you are lost!')
})

//Handler for 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const port = process.env.PORT || 3000

app.listen(port, () => console.info(`Server has started on ${port}`))
