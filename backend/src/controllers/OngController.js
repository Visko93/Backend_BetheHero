const crypto = require('crypto');

const conn = require('../database/conn');

module.exports = {
    //lista as ongs já cadastradas no Banco de dados
    async index (req, res) {
        const ongs = await conn('ongs').select('*');

        return res.json(ongs);
    },
    async create(req, res) {
    
    const {name, email, whatsapp, city, uf} = req.body; //Desestrutura { } para limitar os dados enviados
        
    const id = crypto.randomBytes(4).toString('HEX'); //gera um id criptografado
    
    await conn('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })
    
    return res.json({ id });
    }
};