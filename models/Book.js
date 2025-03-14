const mongoose = require('mongoose');

const Book = new mongoose.Schema(
    {
        title: {
            type: mongoose.SchemaTypes.String,
            required: true,
            get: value => value ? value : null,
        },
        description: {
            type: mongoose.SchemaTypes.String,

            get: value => value ? value : null,
        },
        image: {
            type: mongoose.SchemaTypes.String, //url de limage

            get: value => value ? value : null,
            required: false,
        },
        pdf: {
            type: mongoose.SchemaTypes.String, //url de limage

            get: value => value ? value : null,
            required: false,
        },
        publishedYear: {
            type: Number,
            max: new Date().getFullYear(),
            getter: value => value ? value : null,
        },
        bookshelves: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Bookshelf',
                get: value => value ? value : null,
            }
        ],
        ine: {
            type: mongoose.SchemaTypes.String,
            get: value => value ? value : null,

        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        toJSON: {getters: true},
        toObject: {getters: true},
    }
)
Book.index({title: 'text', contenu: 'text'})
Book.index({publishedYear: 1});
module.exports = mongoose.model('Book', Book);
