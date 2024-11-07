const mongoose = require('mongoose');
const image = new mongoose.Schema({
    name: mongoose.SchemaTypes.String,
})

module.exports  = image;