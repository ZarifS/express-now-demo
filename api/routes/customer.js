let CustomerModel = require('../models/customerModel')
let express = require('express')
let router = express.Router()

//Create a new customer
router.post('/api/customer', (req, res) => {
    if (req.body) {
        let model = new CustomerModel(req.body)
        model
            .save()
            .then(doc => {
                if (!doc || doc.length === 0) {
                    return res
                        .status(500)
                        .send(doc)
                }
                res
                    .status(201)
                    .send(doc)
            })
            .catch(err => {
                res
                    .status(500)
                    .json(err)
            })
    } else {
        return res
            .status(400)
            .send('Request body is missing.')
    }
})

//Get a customer by email
router.get('/api/customer', (req, res) => {
    if (!req.query.email) {
        return res
            .status(400)
            .send('Missing URL parameter: email')
    }
    CustomerModel
        .findOne({email: req.query.email})
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res
                .status(500)
                .json(err)
        })
})

//Update a customer by email
router.put('/api/customer', (req, res) => {
    if (!req.query.email) {
        return res
            .status(400)
            .send('Missing URL parameter: email')
    }
    CustomerModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {new: true}).then(doc => {
        res.json(doc)
    }).catch(err => {
        res
            .status(500)
            .json(err)
    })
})

//Delete a customer by email
router.delete('/api/customer', (req, res) => {
    if (!req.query.email) {
        return res
            .status(400)
            .send('Missing URL parameter: email')
    }
    CustomerModel
        .findOneAndDelete({email: req.query.email})
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res
                .status(500)
                .json(err)
        })
})

module.exports = router