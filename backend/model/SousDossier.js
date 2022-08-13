const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sousDossierSchema = new Schema({
    idDossier:{
        type:String
    }

})

const sousDossier = mongoose.model('SousDossier', sousDossierSchema)

module.exports = sousDossier