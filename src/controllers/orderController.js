const orderModel = require('../model/orderModel')

const { isValid, isValidPhone, isValidNumber, checkPassword } = require('../validations')

async function addOrder(req, res) {
    try {
        const data = req.body
        const { sub_total, phone } = data
        const keys = ["sub_total", "phone"]
        for (let key of keys) {
            if (!data[key]) {
                return res.status(400).send({ msg: `required ${key}` })
            }
        }

        if (!isValidNumber(sub_total)) {
            return res.status(400).send({ msg: `sub_total must be in number formate` })
        }

        if (!isValid(phone)) {
            return res.status(400).send({ msg: `phone number must be in string formate` })
        }

        if (!isValidPhone(phone)) {
            return res.status(400).send({
                msg: "phone number format is invalid"
            });
        }
        const addOrder = await orderModel.create(data)
        return res.status(201).send(addOrder)
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}


async function getOrder(req, res) {
    try {
        const data = req.query
        const getOrder = await orderModel.find(data)
        return res.status(200).send(getOrder)
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

module.exports = { addOrder, getOrder }