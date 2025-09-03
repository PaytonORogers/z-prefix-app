/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('items', table => {
    table.increments('iid'); // adds an auto incrementing PK column
    table.integer('uid').references('users.uid').notNullable(); // equivalent of varchar(255)
    table.string('item_name').notNullable();
    table.string('description').notNullable();
    table.integer('quantity').notNullable();
    table.timestamps(true, true); // utility columns, adds created_at and updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('items');
};