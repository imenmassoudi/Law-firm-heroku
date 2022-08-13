const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CollaborateurRSchema = new Schema({

        idCollab: {
            type: String
        },
        part: {
            type: String
        },
        mode: {
            type: String
        },
        type: {
            type: String
        },
        idDossier: {
            type: String
        },


    },

    {
        timestamps: true, //when it was created
    });

const CollaborateurR = mongoose.model('CollaborateurReglement', CollaborateurRSchema);

module.exports = CollaborateurR;