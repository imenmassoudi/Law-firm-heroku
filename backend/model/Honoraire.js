const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const honoraireSchema = new Schema({
    honoraireAvocat: {
        type: String,
    },
    netApayer: {
        type: String,
    },
    idDossier: {
        type: String,
    }

}, {
    timestamps: true, //when it was created
});

const Honoraire = mongoose.model('HonoraireReglement', honoraireSchema);

module.exports = Honoraire;