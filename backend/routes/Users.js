const router = require('express').Router();
let User = require('../model/User'); //le model user

//get requests
router.route('/').get((req, res) => {
    User.find() //mongoose method
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});
//http post
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const newUser = new User({username,nom,prenom});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('user deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;