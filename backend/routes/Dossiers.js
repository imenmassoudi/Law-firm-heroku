const router = require('express').Router();
let Dossiers = require('../model/Dossier');
const {protect} = require('../middleware/authMiddleware')
const Emplacement = require("../model/Emplacement");


//get requests
router.route('/all').get((req, res)=> {
    var a = [];
    Dossiers.aggregate([
            {"$addFields": {"article_id": {"$toObjectId": "$emplacement"}}},
            {
                $lookup: {
                    from: "emplacements",
                    localField: 'article_id',
                    foreignField: '_id',
                    as: 'lib'
                }
            },

            {"$addFields": {"client": {"$toObjectId": "$idClient"}}},
            {
                $lookup: {
                    from: "clients",
                    localField: 'client',
                    foreignField: '_id',
                    as: 'clientC'
                }
            },
            {"$addFields": {"typeD": {"$toObjectId": "$typeDossier"}}},
            {
                $lookup: {
                    from: "typedossiers",
                    localField: 'typeD',
                    foreignField: '_id',
                    as: 'typeDs'
                }
            },
            {"$addFields": {"trib": {"$toObjectId": "$lieu"}}},
            {
                $lookup: {
                    from: "tribunals",
                    localField: 'trib',
                    foreignField: '_id',
                    as: 'lieu'
                }
            },


        ]
    ).then(d => {
        d.map(row => {
            let x = {
                id: row._id,
                numAffaire: row.numAffaire,
                lieu: row.lieu[0].lieu,
                typeDs: row.typeDs[0].libelle,
                emplacement: row.lib[0].libelle,
                client: row.clientC[0].nom,
                tel: row.clientC[0].tel,
                mission: row.mission
            }
            a.push(x)
        })
        res.json(a)
    })
})
//get requests
router.route('/').get(protect,(req, res)=> {
    Dossiers.find() //mongoose method
        .then(d => res.json(d))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/addDonnees').post( (req, res) => {
    const date_format = new Date();
    const lieu = req.body.lieu;
    const typeDossier = req.body.typeDossier
    const mission = req.body.mission
    const emplacement = req.body.emplacement
    const service = req.body.service
    const observation = req.body.observation
    const numAffaire = req.body.numAffaire
    const idClient = req.body.idClient
    const dateCreation = date_format.getDate()+'/'+ (date_format.getMonth()+1)+'/'+date_format.getFullYear()
    const dateModification = "not modified"
    const newDossier = new Dossiers({
        typeDossier,
        mission,
        emplacement,
        lieu,
        service,
        observation,
        numAffaire,
        dateCreation,
        dateModification,
        idClient
    });

    newDossier.save()
        .then(() => res.json(newDossier))
        .catch(err => res.status(400).json('Error: ' + err));
});


//http post
router.route('/add').post( (req, res) => {
    const date_format = new Date();
    const lieu = req.body.lieu;
    const typeDossier = req.body.typeDossier
    const mission = req.body.mission
    const emplacement = req.body.emplacement
    const service = req.body.service
    const observation = req.body.observation
    const numAffaire = req.body.numAffaire
    const idClient = req.body.idClient
    const dateCreation = date_format.getDate()+'/'+ (date_format.getMonth()+1)+'/'+date_format.getFullYear()
    const dateModification = "not modified"
    const newDossier = new Dossiers({
        typeDossier,
        mission,
        emplacement,
        lieu,
        service,
        observation,
        numAffaire,
        idClient,
        dateCreation,
        dateModification
        });

    newDossier.save()
        .then(() => res.json('dossier added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete
router.route('/sup').post((req, res) => {
    console.log(req.body)
    req.body.map(e => {
        console.log("waaaaa "+e.id)
        Dossiers.findByIdAndDelete(e.id)
            .catch(err => console.log(err))

    })
    res.json("deleted")

});

router.put('/', (req, res) => {
    const date_format = new Date();
    let dateModification = date_format.getDate() + '/' + (date_format.getMonth() + 1) + '/' + date_format.getFullYear();

    const emplacement = req.body.emplacement

    if(req.body.dateModification != null){
        dateModification = req.body.dateModification
    }
    req.body.selectedData.map(e => {
        Dossiers.findByIdAndUpdate(e.id, {
            emplacement,
            dateModification})
            .catch(err => console.log(err))


    })
    res.json("Crud updated");

})




module.exports = router;