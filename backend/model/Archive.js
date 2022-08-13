const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArchiveSchema = new Schema({
    emplacement: {
        type: String,
        required: true,
        minlength: 3
    },
    idDossier:{
        type:String,
        required: true
    }
}, {
    timestamps: true, //when it was created
});

const Archive = mongoose.model('Archive', ArchiveSchema);

module.exports = Archive;