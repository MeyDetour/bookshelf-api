const mongoose = require('mongoose');

const Book = new mongoose.Schema(
    {
        title: {
            type : mongoose.SchemaTypes.String,
            required:true,


        },
        description :{
            type :  mongoose.SchemaTypes.String,
        },
        image : {
            type : mongoose.SchemaTypes.String, //url de limage
            required:false,
        },
        publishedYear: {
            type: Number,
            max: new Date().getFullYear()
        },
        bookshelf : {
            type:mongoose.Types.ObjectId,
            ref:'book',
        }
    }
)

module.exports = mongoose.model('Book',Book);