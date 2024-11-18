const mongoose = require('mongoose');

const Bookshelf = new mongoose.Schema({
    name: {
        type : mongoose.SchemaTypes.String
    }, books: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Book',
        }
    ],

})

module.exports = mongoose.model("Bookshelf", Bookshelf);