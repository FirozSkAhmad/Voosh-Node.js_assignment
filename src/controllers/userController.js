const userModel = require("../model/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { isValid, isValidPhone, checkPassword } = require('../validations')

async function createUser(req, res) {
    try {
        const data = req.body
        const { phone, password } = data
        const keys = ["userName", "phone", "password"]
        for (let key of keys) {
            if (!data[key]) {
                return res.status(400).send({ msg: `required ${key}` })
            }
        }
        for (let key of keys) {
            if (!isValid(data[key])) {
                return res.status(400).send({ msg: `${key} must be in string formate` })
            }
        }

        if (!isValidPhone(phone)) {
            return res.status(400).send({
                msg: "phone number format is invalid"
            });
        }

        if (!checkPassword(password)) {
            return res.status(400).send({
                msg:
                    "password should contain at least (1 lowercase, uppercase ,numeric alphabetical character and at least one special character and also The string must be  between 8 characters to 16 characters)"
            });
        }
        let unique = ["userName", "phone"];
        for (field of unique) {
            let emp = {};
            emp[field] = data[field];
            let document = await userModel.findOne(emp);
            if (document) {
                return res
                    .status(400)
                    .send({ status: false, msg: `${field} is already taken` });
            }
        }
        const hashPassword = await bcrypt.hash(password, 10);
        data.password = hashPassword
        const createdUser = await userModel.create(data)
        return res.status(201).send(createdUser)
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

async function login(req, res) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const credentials = req.body
        const user = await userModel.findOne({ phone: credentials.phone })
        if (!user) {
            return res.status(400).send({ msg: "user doesn't exists with the given phone number" })
        }
        else {
            const match = await bcrypt.compare(credentials.password, user.password)
            if (match) {
                const token = jwt.sign({
                    user_Id: user._id
                }, "myscretekey")
                return res.status(201).send({ token })
            }
            else {
                return res.status(201).send({ msg: "incorrect Password" })
            }
        }
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

module.exports = { createUser, login }