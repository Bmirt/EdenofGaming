const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
      }, 
    image: String,
    genre: String,
    developer: String,  
    release: Number,
    platforms: String,
    price: {
        type: Number,
        required: true
      },
    trailer: String,

})

module.exports = mongoose.model('Product', productSchema)