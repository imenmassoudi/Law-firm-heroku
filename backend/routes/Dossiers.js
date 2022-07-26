const router = require('express').Router();
let Dossiers = require('../model/Dossier');
const {protect} = require('../middleware/authMiddleware')
const Emplacement = require("../model/Emplacement");


//get requests
router.route('/all').get((req, res)=> {
    Dossiers.aggregate([
        { "$addFields": { "article_id": { "$toObjectId": "$emplacement" }}},
        {
        $lookup: {
            from: "emplacements",
            localField: 'article_id',
            foreignField: '_id',
            as: 'lib'
        }},

            { "$addFields": { "client": { "$toObjectId": "$idClient" }}},
            {
                $lookup: {
                    from: "clients",
                    localField: 'client',
                    foreignField: '_id',
                    as: 'clientC'
                }}]

        ).then(d=>res.json(d))
})
//get requests
router.route('/').get(protect,(req, res)=> {
    Dossiers.find() //mongoose method
        .then(d => res.json(d))
        .catch(err => res.status(400).json('Error: ' + err));
});
    // Dossiers.aggregate([{
    //     $lookup: {
    //         from: `Emplacement`,
    //         localField: `emplacement`,
    //         foreignField: `_id`,
    //         as: `lib`
    //     }}]).exec((err, result)=>{
    //     if (err) {
    //         console.log("error" ,err)
    //     }
    //     if (result) {
    //         console.log(result);
    //     }
    // });
 /*   Dossiers.find().populate({path:"Emplacement"}.select["libelle"])
        .then(d => res.json(d))
        .catch(err => res.status(400).json('Error: ' + err));
*/





//http post
router.route('/add').post( (req, res) => {
    var date_format = new Date();
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
router.route('/:id').delete((req, res) => {
    Dossiers.findByIdAndDelete(req.params.id)
        .then(() => res.json('dossier deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/:id', (req, res) => {
    const date_format = new Date();
    let dateModification = date_format.getDate() + '/' + (date_format.getMonth() + 1) + '/' + date_format.getFullYear();
    const lieu = req.body.lieu;
    const typeDossier = req.body.typeDossier
    const mission = req.body.mission
    const emplacement = req.body.emplacement
    const service = req.body.service
    const observation = req.body.observation
    const numAffaire = req.body.numAffaire
    const idClient = req.body.idClient
    if(req.body.dateModification != null){
        dateModification = req.body.dateModification
    }
    Dossiers.findByIdAndUpdate(req.params.id, {
        typeDossier,
        mission,
        emplacement,
        lieu,
        service,
        observation,
        numAffaire,
        idClient,
        dateModification})
        .then(function () {
            res.json("Crud updated");
        }).catch(function (err) {
        res.status(422).send("Emplacement dossier update failed.");
    });
        })




module.exports = router;