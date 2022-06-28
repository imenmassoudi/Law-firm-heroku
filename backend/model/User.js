const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    nom: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    prenom: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }
}, {
    timestamps: true, //when it was created
});

const User = mongoose.model('User', userSchema);

module.exports = User;