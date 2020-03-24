const knex = require('knex');
const configuration = require('../../knexfile');


//define uma variavel para armazenar a conexão padrão
const conn = knex(configuration.development);

//exporta a variavel com a conexão
module.exports = conn;