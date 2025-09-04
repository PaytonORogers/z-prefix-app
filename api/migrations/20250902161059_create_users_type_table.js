/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('uid'); // adds an auto incrementing PK column
    table.string('first_name'); // equivalent of varchar(255)
    table.string('last_name');
    table.string('username').notNullable();
    table.string('hashed_password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};