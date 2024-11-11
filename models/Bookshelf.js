const mongoose = require('mongoose');

const Bookshelf = new mongoose.Schema({
    name: {
        type : mongoose.Schema.Types.String,
    }, books: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Book',
        }
    ],

})

module.exports = mongoose.model("Bookshelf", Bookshelf);