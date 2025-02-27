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
        type: mongoose.SchemaTypes.String,
        get: value => value ? value : null,
    }

})

module.exports = mongoose.model("Bookshelf", Bookshelf);
