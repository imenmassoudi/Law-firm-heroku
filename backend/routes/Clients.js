const router = require('express').Router();
let Clients = require('../model/Client');
const {protect} = require('../middleware/authMiddleware')


//get requests
router.route('/').get((req, res)=> {
    Clients.find() //mongoose method
        .then(client => res.json(client))
        .catch(err => res.status(400).json('Error: ' + err));
});
//findone
router.route('/find/:nom').get(async (req, res) => {
    const nomr = req.body.nomr;
    const client = await Clients.findOne({nom: req.params.nom}).sort({_id: -1})
    Clients.countDocuments({nom:req.params.nom}, function(err, c) {
        console.log('Count is ' + c);
        res.json(c)

    });
});
//findonebyid
router.route('/findClient/:id').get(async (req, res) => {
    const id = req.params.id;
    const client = await Clients.findOne({_id:id})
    res.json(client)
});
//http post
router.route('/add').post( (req, res) => {
    const collaborateur = req.body.collaborateur;
    const codeClient = req.body.codeClient;
    const nom = req.body.nom;
    const typeClient = req.body.typeClient;
    const situationFisc = req.body.situationFisc;
    const cin = req.body.cin;
    const ville = req.body.ville;
    const rue = req.body.rue;
    const numero = req.body.numero;
    const codeP = req.body.codeP;
    const adresse = req.body.adresse;
    const activiteCont = req.body.activiteCont;
    const tel = req.body.tel;
    const fax = req.body.fax;
    const email = req.body.email;
    const newClient = new Clients({
        collaborateur,
        codeClient,
        nom,
        typeClient,
        situationFisc,
        cin,
        ville,
        rue,
        numero,
        codeP,
        adresse,
        activiteCont,
        tel,
        fax,
        email});

    newClient.save()
        .then(() => res.json('client added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete
router.route('/:id').delete((req, res) => {
    Clients.findByIdAndDelete(req.params.id)
        .then(() => res.json('client deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/:id', (req, res) => {
    Clients.findByIdAndUpdate(req.params.id, req.body)
        .then(function () {
            res.json("Crud updated");
        })
        .catch(function (err) {
            res.status(422).send("Crud update failed.");
        });
});

module.exports = router;