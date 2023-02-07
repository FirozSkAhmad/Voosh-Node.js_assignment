const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

const orderSchema = new mongoose.Schema(
    {
        user_Id: {
            type: objectId,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        sub_total: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("order", orderSchema)