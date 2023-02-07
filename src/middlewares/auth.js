const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

async function authentication(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        jwt.verify(token, 'myscretekey', (err, decoded) => {
            if (err) {
                return res.status(401).send({ msg: err.message })
            }
            req.payload = decoded
            next()
        })
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

async function authorization(req, res, next) {
    const userIdP = req.payload.user_Id
    const userId = req.body.user_Id
    if (!userId) {
        return res.status(400).send({ msg: "required userId" })
    }
    if (!objectId.isValid(userId)) {
        return res.status(400).send({ msg: `invalid objectId ${userId}` })
    }
    if (userId == userIdP) {
        next()
    }
    else {
        return res.status(403).send({ msg: "not authorized" })
    }
}

async function authorization1(req, res, next) {
    const userIdP = req.payload.user_Id
    const userId = req.query.user_Id
    if (!userId) {
        return res.status(400).send({ msg: "required userId" })
    }
    if (!objectId.isValid(userId)) {
        return res.status(400).send({ msg: `invalid objectId ${userId}` })
    }
    if (userId == userIdP) {
        next()
    }
    else {
        return res.status(403).send({ msg: "not authorized" })
    }
}

module.exports = { authentication, authorization, authorization1 }
