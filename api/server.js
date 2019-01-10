let express = require('express')
let app = express()
let path = require('path')
let bodyParser = require('body-parser')
let customerRoute = require('./routes/customer')
let dbConnection = require('./dbConnection')

dbConnection()
app.use(bodyParser.json())
app.use(customerRoute)

app.get("/api", (req, res, next) => {
    //Home URL
    res.send('Use the /api method with the api documentation for REST Calls.')
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
    res
        .status(404)
        .sendFile(path.join(__dirname, '../public/500.html'))
})

const port = process.env.PORT || 3000

app.listen(port, () => console.info(`Server has started on ${port}`))
