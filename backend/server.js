const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config();
//express server
const app = express();
const port = 5000 || process.env.PORT;
//middleware
app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));


const usersRouter = require('./routes/users');
const tribRouter = require('./routes/tribunaux');
const clientRouter = require('./routes/clients');
const serviceRouter = require('./routes/services');
const emplacementRouter = require('./routes/emplacements');
const dossierRouter = require('./routes/dossiers');
const archiveRouter = require('./routes/archives');
const demandeursRouter = require('./routes/demandeurs');
const tacheRouter = require('./routes/taches');
const honoraireRouter = require('./routes/honoraires');
const ssDossierRouter = require('./routes/sousDossiers');
const cRouter = require('./routes/collaborateursReg');

const ReglementsRouter = require('./routes/reglements');
app.use('/reglements', ReglementsRouter);
app.use('/demandeur', demandeursRouter);
app.use('/tache', tacheRouter);
app.use('/reglementCollab', cRouter);

app.use('/users', usersRouter);
app.use('/tribunaux', tribRouter);
app.use('/tribunaux/services', serviceRouter);
app.use('/clients', clientRouter);
app.use('/emplacements', emplacementRouter);
app.use('/dossiers', dossierRouter);
app.use('/archives', archiveRouter);
app.use('/honoraires', honoraireRouter);
app.use('/sousdossier', ssDossierRouter);

const collaborateursRouter = require('./routes/collaborateurs');

app.use('/collaborateurs', collaborateursRouter);

const greffiersRouter = require('./routes/greffiers');

app.use('/greffiers', greffiersRouter);

const primegreffiersRouter = require('./routes/primegreffiers');

app.use('/primegreffiers', primegreffiersRouter);

const typedossiersRouter = require('./routes/typedossiers');

app.use('/typedossiers', typedossiersRouter);

const parametreRouter = require('./routes/parametre');
app.use('/parametre', parametreRouter);

//serve static assets

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('build'));

    app.get('*',(req,res)=>{
            res.sendFile(path.resolve(__dirname,'build','index.html'))
    })

}

app.listen(port,  "0.0.0.0",() => {
    console.log(`Server is running on port: ${port}`);
});