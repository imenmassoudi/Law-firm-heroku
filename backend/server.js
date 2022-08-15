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
    app.use(express.static(path.join(__dirname,'build')));

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
const usersRouter = require(__dirname+'/routes/Users');
const tribRouter = require(__dirname+'/routes/Tribunaux');
const clientRouter = require(__dirname+'/routes/Clients');
const serviceRouter = require(__dirname+'/routes/Services');
const emplacementRouter = require(__dirname+'/routes/Emplacements');
const dossierRouter = require(__dirname+'/routes/Dossiers');
const archiveRouter = require(__dirname+'/routes/Archives');
const demandeursRouter = require(__dirname+'/routes/Demandeurs');
const tacheRouter = require(__dirname+'/routes/Taches');
const honoraireRouter = require(__dirname+'/routes/Honoraires');
const ssDossierRouter = require(__dirname+'/routes/SousDossiers');
const cRouter = require(__dirname+'/routes/CollaborateursReg');

const ReglementsRouter = require(__dirname+'/routes/Reglements');
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

const collaborateursRouter = require(__dirname+'/routes/Collaborateurs');

app.use('/collaborateurs', collaborateursRouter);

const greffiersRouter = require(__dirname+'/routes/Greffiers');

app.use('/greffiers', greffiersRouter);

const primegreffiersRouter = require(__dirname+'/routes/Primegreffiers');

app.use('/primegreffiers', primegreffiersRouter);

const typedossiersRouter = require(__dirname+'/routes/Typedossiers');

app.use('/typedossiers', typedossiersRouter);

const parametreRouter = require(__dirname+'/routes/Parametre');
app.use('/parametre', parametreRouter);


app.listen(port, "firm-management-ensi",() => {
    console.log(`Server is running on port: ${port}`);
});