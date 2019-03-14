const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
      },
    developer: String, 
    publisher: String,
    genre: String,
    players: String,
    release: Number,
    platforms: String,
    price: {
        type: Number,
        required: true
      }
})

module.exports = mongoose.model('Product', productSchema)