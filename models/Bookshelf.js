const mongoose = require('mongoose');

const Bookshelf = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    books: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Book',
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

})

module.exports = mongoose.model("Bookshelf", Bookshelf);
