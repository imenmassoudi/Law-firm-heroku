const router = require('express').Router();
let Honoraire = require('../model/Honoraire');
const {protect} = require('../middleware/authMiddleware')


//http post
router.route('/add').post( (req, res) => {
    const honoraireAvocat = req.body.honoraireAvocat;
    const netApayer = req.body.netApayer;
    const idDossier = req.body.idDossier;
    const h = new Honoraire({
        honoraireAvocat,netApayer,idDossier});

    h.save()
        .then(() => res.json('hon added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;