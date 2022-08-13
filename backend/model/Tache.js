const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tacheSchema = new Schema({
    tache: {
        type: String,
        required: true
    },
    dateCritique: {
        type: String,
        required: true
    },
    dateRappel: {
        type: String,
        required: true
    },
    resolu: {
        type: String,
        required: true
    },
    personneChargee: {
        type: String,
    },
    course: {
        type: String,
        required: true
    },
    lieux: {
        type: String,
    },
    Service: {
        type: String,
    },
    dateAudience: {
        type: String,
    },
    dateEcheance: {
        type: String,
    },
    idDossier: {
        type: String,
    },

}, {
    timestamps: true, //when it was created
});

const Tache = mongoose.model('Tache', tacheSchema);

module.exports = Tache;