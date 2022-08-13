const router = require('express').Router();
let Adversaires = require('../model/Adversaire');
const {protect} = require('../middleware/authMiddleware')


//get requests
router.route('/').get((req, res)=> {
    Adversaires.find() //mongoose method
        .then(d => res.json(d))
        .catch(err => res.status(400).json('Error: ' + err));
});
//http post
router.route('/add').post( (req, res) => {
    const cin = req.body.cin;
    const nom = req.body.nom
    const adresse = req.body.adresse
    const adresseDesigne = req.body.adresseDesigne
    const tel = req.body.tel
    const fax = req.body.fax
    const avocat = req.body.avocat
    const adresseAvocat = req.body.adresseAvocat
    const idDossier = req.body.idDossier
    const newAd = new Adversaires({
        cin,
        nom,
        adresse,
        adresseDesigne,
        tel,
        fax,
        avocat,
        adresseAvocat,
        idDossier});

    newAd.save()
        .then(() => res.json('adv added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete
router.route('/:id').delete((req, res) => {
    Adversaires.findByIdAndDelete(req.params.id)
        .then(() => res.json('adv deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/:id', (req, res) => {
    Adversaires.findByIdAndUpdate(req.params.id, req.body)
        .then(function () {
            res.json("Crud updated");
        })
        .catch(function (err) {
            res.status(422).send("Crud update failed.");
        });
});

module.exports = router;