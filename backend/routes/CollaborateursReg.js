const router = require('express').Router();
let Collaborateur = require('../model/CollaborateurReglement'); //le model collaborateur
//sconst asyncHandler = require('express-async-handler')
const {protect} = require('../middleware/authMiddleware');
const Clients = require("../model/Client");

//http post
router.route('/add').post( (req, res) => {

    const idCollab = req.body.idCollab;
    const part = req.body.part;
    const mode = req.body.mode;
    const type = req.body.type;
    const idDossier = req.body.idDossier;


    const collaborateur = new Collaborateur(
        {idCollab,part,mode,type,idDossier});


    collaborateur.save()
        .then(() => res.json('collab R added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});





module.exports = router;