const conn = require('../database/conn');

module.exports = {
    async index (req, res) {
        const { page = 1} = req.query;
        
        const [count] = await conn('incidents')
            .count();
        console.log(count);

//Para recuperar os dados armazena em incidentes a join de ongs e incidents,
//usando offset e limit para paginação e escolhendo os dados pelo select
        const incidents = await conn('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.uf',
            ]);
        
        res.header('X-Total-Count', count['count(*)']) //X é o nome da conta de total, utilizando count e a ´ropriadade de SQL count 
        return res.json(incidents);
    },

    async create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await conn('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return res.json({ id });
    },
    async delete (req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await conn('incidents')
            .where('id',id)
            .select('ong_id')
            .first();
// verifica se o ong_id do header é o mesmo ong_id que registrou o incidente
        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted.'});
        }
        await conn('incidents').where('id',id).delete();

        return res.status(204).send();
    }
};