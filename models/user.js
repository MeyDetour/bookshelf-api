const mongoose = require('mongoose')

const User = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validation d'email simple
            },
            message: props => `${props.value} n'est pas un email valide!`
        }

    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
        minlength: 5,

    }
})


module.exports = mongoose.model('User', User)
