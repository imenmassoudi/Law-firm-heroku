const router = require('express').Router();
let Taches = require('../model/Tache');
const {protect} = require('../middleware/authMiddleware')


//get requests
router.route('/').get((req, res)=> {
    Taches.find() //mongoose method
        .then(t => res.json(t))
        .catch(err => res.status(400).json('Error: ' + err));
});
//http post
router.route('/add').post( (req, res) => {
    const tache = req.body.tache;
    const dateCritique = req.body.dateCritique;
    const dateRappel = req.body.dateRappel;
    const resolu = req.body.resolu;
    const personneChargee = req.body.personneChargee;
    const course = req.body.course;
    const lieux = req.body.lieux;
    const Service = req.body.Service;
    const dateAudience = req.body.dateAudience;
    const dateEcheance = req.body.dateEcheance;
    const idDossier = req.body.idDossier;
    const newTache = new Taches({
        tache,dateCritique,dateRappel,resolu,personneChargee,course,lieux,Service,dateAudience,
        dateEcheance,idDossier});

    newTache.save()
        .then(() => res.json('tache added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete
router.route('/:id').delete((req, res) => {
    Taches.findByIdAndDelete(req.params.id)
        .then(() => res.json('tache deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/:id', (req, res) => {
    Taches.findByIdAndUpdate(req.params.id, req.body)
        .then(function () {
            res.json("Crud updated");
        })
        .catch(function (err) {
            res.status(422).send("Crud update failed.");
        });
});

module.exports = router;