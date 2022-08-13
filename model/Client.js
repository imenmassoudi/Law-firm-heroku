const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({

        collaborateur: {
            type: String,
            required: true,
        },
        codeClient: {
            type: String,
            required: true,
            minlength: 2
        },
        nom: {
            type: String,
            required: true,
            minlength: 3
        },
        typeClient: {
            type: String,
            required: true,
        },
        situationFisc: {
            type: String,
            required: true,
        },
        cin: {
            type: String,
            required: true,
            unique:true,
            length: 8
        },
        ville: {
            type: String,
            minlength: 3
        },
        rue: {
            type: String,
            minlength: 3
        },
        numero: {
            type: Number,
            minlength: 1
        },
        codeP: {
            type: Number,
            length: 4
        },
        adresse: {
            type: String,
            required: true,
        },
        activiteCont: {
            type: String,
            required: true,
        },
        tel: {
            type: Number,
            required: true,
        },

        fax: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        idDossier: {
            type: String,
            required: true,
            unique: true
        },

    },
    {
        timestamps: true, //when it was created
    });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;