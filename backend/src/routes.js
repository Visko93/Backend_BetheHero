const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);


// Utiliza metodo index da pasta de controllers
routes.get('/ongs', OngController.index);
// Utiliza metodo create da pasta de controllers
routes.post('/ongs', OngController.create);   // ('/TabelaSendoUsada', Controller.metodo)

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);   
routes.delete('/incidents/:id', IncidentController.delete);





module.exports = routes;