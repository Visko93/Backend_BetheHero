const express = require('express'); // importa o modulo express 
const routes = require('./routes');
const cors = require('cors');

const app = express(); // cria um objeto express para request/response

app.use(cors());
app.use(express.json()); // Tem que vir antes das rotas, converte o json em um objeto javascript
app.use(routes); //permite a utilização de rotas com import e export

app.listen(3333); // utilizando a porta localhost:3333git -v
