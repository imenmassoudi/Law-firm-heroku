const router = require('express').Router();
let Archives = require('../model/Archive');
const {protect} = require('../middleware/authMiddleware')
const Dossiers = require("../model/Dossier");


//get requests
router.route('/').get(protect,(req, res)=> {
    Archives.find() //mongoose method
        .then(a => res.json(a))
        .catch(err => res.status(400).json('Error: ' + err));
});
//http post
router.route('/add').post( (req, res) => {

    const emplacement = req.body.emplacement;
    req.body.selectedData.map(e => {
        const idDossier  = e.id
        const newArchive = new Archives({
            emplacement,idDossier})
        newArchive.save()
            .then(() => {
                console.log(emplacement)
                Dossiers.findByIdAndDelete(idDossier)

            })
    })
    res.json("added")

});

module.exports = router;