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
//serve static assets
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'build','index.html'))
    })

}

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

app.enable('trust proxy')
const usersRouter = require(__dirname+'/routes/users');
const tribRouter = require(__dirname+'/routes/tribunaux');
const clientRouter = require(__dirname+'/routes/clients');
const serviceRouter = require(__dirname+'/routes/services');
const emplacementRouter = require(__dirname+'/routes/emplacements');
const dossierRouter = require(__dirname+'/routes/dossiers');
const archiveRouter = require(__dirname+'/routes/archives');
const demandeursRouter = require(__dirname+'/routes/demandeurs');
const tacheRouter = require(__dirname+'/routes/taches');
const honoraireRouter = require(__dirname+'/routes/honoraires');
const ssDossierRouter = require(__dirname+'/routes/sousDossiers');
const cRouter = require(__dirname+'/routes/collaborateursReg');

const ReglementsRouter = require(__dirname+'/routes/reglements');
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

const collaborateursRouter = require(__dirname+'/routes/collaborateurs');

app.use('/collaborateurs', collaborateursRouter);

const greffiersRouter = require(__dirname+'/routes/greffiers');

app.use('/greffiers', greffiersRouter);

const primegreffiersRouter = require(__dirname+'/routes/primegreffiers');

app.use('/primegreffiers', primegreffiersRouter);

const typedossiersRouter = require(__dirname+'/routes/typedossiers');

app.use('/typedossiers', typedossiersRouter);

const parametreRouter = require(__dirname+'/routes/parametre');
app.use('/parametre', parametreRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});