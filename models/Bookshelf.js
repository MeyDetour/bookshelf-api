const mongoose = require('mongoose');

const Bookshelf = new mongoose.Schema({
    name: {
        type : mongoose.Schema.Types.String,
    },

})

module.exports = mongoose.model("Bookshelf", Bookshelf);