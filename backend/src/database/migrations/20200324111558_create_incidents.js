
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments();

        table.string('title').notNullable();
        table.decimal('description').notNullable();
        table.integer('value').notNullable();

        table.string('ong_id').notNullable(); // Valor da Foreign Key

        table.foreign('ong_id').references('id').inTable('ongs'); // Faz a ligação com a tabela externa

      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
