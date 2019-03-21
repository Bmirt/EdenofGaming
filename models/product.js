const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
      }, 
    image: String,
    image2: String,
    genre: String,
    developer: String,  
    release: String,
    platforms: String,
    price: {
        type: Number,
        required: true
      },
    trailer: String,
    description: String,

})

module.exports = mongoose.model('Product', productSchema)