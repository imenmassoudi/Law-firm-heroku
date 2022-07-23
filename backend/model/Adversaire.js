const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdversaireSchema = new Schema({
    cin: {
        type: String,
        required: true,
        unique:true,
    },
    nom: {
        type: String,
    },
    adresse: {
        type: String,
    },
    adresseDesigne: {
        type: String,
    },
    tel: {
        type: Number,
    },
    fax: {
        type: Number,
    },
    avocat: {
        type: String,
    },
    adresseAvocat: {
        type: String,
    },
    idDossier:{
        type: String
    }
}, {
    timestamps: true, //when it was created
});

const Adversaire = mongoose.model('Adversaire', AdversaireSchema);

module.exports = Adversaire;