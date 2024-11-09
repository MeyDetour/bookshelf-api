const mongoose = require('mongoose');

const Book = new mongoose.Schema(
    {
        title: {
            type : mongoose.SchemaTypes.String,

        },
        description :{
            type :  mongoose.SchemaTypes.String,
        },
        image : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'image',
            required:false,
        }
    }
)

module.exports = mongoose.model('Book',Book);