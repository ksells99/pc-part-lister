const mongoose = require('mongoose');

const PartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
    price: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'cpu'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('part', PartSchema);